import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Link from "next/link";
import { ServiceReviewCard, ServiceReviewCardAction } from "../../components/service-review-card";

type Node = { tagName: string; nodeType: number; text: string; rawText: string; attributes: Record<string, string>;
  childNodes: Node[]; getAttribute(name: string): string | undefined; querySelector(selector: string): Node | null;
  querySelectorAll(selector: string): Node[]; closest(selector: string): Node | null };
const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser") as {
  parse(html: string, options?: { comment: boolean; blockTextElements: Record<string, boolean> }): Node
};
const baselineParserOptions = { comment: true,
  blockTextElements: { script: true, noscript: true, style: true, pre: true } };
const baselineText = readFileSync("tests/fixtures/phase3e2-card-link-baseline.json", "utf8");
function assertBaselineIntegrity(text: string) {
  // Git may convert this immutable text fixture to CRLF in a Windows checkout.
  assert.equal(createHash("sha256").update(text.replace(/\r\n/g, "\n")).digest("hex"),
    "70e09ae94b071da14dda3d51c0f3ab9f7d0373b239fb45cd16f1c4b5cf610c3a");
}
assertBaselineIntegrity(baselineText);
const baseline = JSON.parse(baselineText) as { records: { route: string; hrefs: string[];
  contentBlocks: { tag: string; text: string }[]; contract: { schema: unknown[]; canonical: unknown[];
    metadata: { titles: string[]; metas: unknown[] } } }[] };

test("A11 immutable fixture accepts only Git LF/CRLF equivalence", () => {
  const lf = baselineText.replace(/\r\n/g, "\n");
  assert.doesNotThrow(() => assertBaselineIntegrity(lf));
  assert.doesNotThrow(() => assertBaselineIntegrity(lf.replace(/\n/g, "\r\n")));
});

test("A11 immutable fixture rejects changed content and other whitespace changes", () => {
  assert.throws(() => assertBaselineIntegrity(baselineText.replace(/records/, "changedRecords")));
  assert.throws(() => assertBaselineIntegrity(`${baselineText} `));
  assert.throws(() => assertBaselineIntegrity(baselineText.replace(/\r\n/g, "\n").replace(/\n/g, "\r")));
});

test("A11 disabled helper preserves the original native Next link rendering", () => {
  const props = { href: "/services/fixture", className: "fixture-card", children: createElement("span", null, "Synthetic service") };
  assert.equal(renderToStaticMarkup(createElement(ServiceReviewCard, { ...props, enabled: false })),
    renderToStaticMarkup(createElement(Link, props)));
});

test("A11 selected card has one descriptive real link and no interactive container", () => {
  const action = ServiceReviewCardAction({ href: "/services/fixture", action: "View service",
    label: "Synthetic service", children: "View service" });
  const html = renderToStaticMarkup(ServiceReviewCard({ href: "/services/fixture", className: "fixture-card", children: action }));
  const root = parse(html), card = root.querySelector("article")!;
  assert.ok(card);
  assert.equal(card.getAttribute("tabindex"), undefined);
  assert.equal(card.getAttribute("role"), undefined);
  assert.equal(card.querySelectorAll("a,button,input,select,textarea,summary,[tabindex]").length, 1);
  assert.equal(card.querySelector("a")!.getAttribute("aria-label"), "View service: Synthetic service");
  assert.equal(card.querySelector("a")!.getAttribute("href"), "/services/fixture");
  assert.doesNotMatch(html, /onclick|role="link"|tabindex/);
});

for (const row of baseline.records) test(`A11 exact links, copy and SEO contract: ${row.route}`, () => {
  const root = parse(readFileSync(`out${row.route}/index.html`, "utf8"), baselineParserOptions);
  const main = root.querySelector("main")!;
  assert.deepEqual(main.querySelectorAll("a[href]").map(node => node.getAttribute("href")), row.hrefs);
  assert.deepEqual(main.querySelectorAll("h1,h2,h3,p,li,dt,dd").map(node => ({ tag: node.tagName,
    text: node.text.replace(/\s+/g, " ").trim() })), row.contentBlocks);
  assert.deepEqual(root.querySelectorAll('script[type="application/ld+json"]').map(node => JSON.parse(node.rawText)), row.contract.schema);
  assert.deepEqual(root.querySelectorAll('link[rel="canonical"]').map(node => node.attributes), row.contract.canonical);
  assert.deepEqual(root.querySelectorAll("title").map(node => node.text), row.contract.metadata.titles);
  assert.deepEqual(root.querySelectorAll("meta").map(node => node.attributes), row.contract.metadata.metas);
  const cards = main.querySelectorAll("[data-service-review-card]");
  assert.ok(cards.length > 0);
  for (const card of cards) {
    assert.equal(card.tagName, "ARTICLE");
    assert.equal(card.querySelectorAll("a[href],button,input,select,textarea,summary,[tabindex]").length, 1);
    const action = card.querySelector("a")!;
    assert.match(action.getAttribute("aria-label") ?? "", /^(?:View service|Learn more): \S.+/);
    assert.match(action.getAttribute("class") ?? "", /service-review-card__action/);
    assert.equal(card.getAttribute("tabindex"), undefined);
  }
});
