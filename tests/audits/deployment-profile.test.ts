import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { resolveBrandedUrl } from "../e2e/support/branded-url";
import { resolvePreviewUrl } from "../e2e/support/preview-url";
import {
  auditProfile, auditProfiles, brandedMarkupForHistoricalHash,
  brandedValueFromPreview, previewValueFromBranded, resolveAuditProfile,
} from "./deployment-profile-contract";

const sha = (text: string | Buffer) => createHash("sha256").update(text).digest("hex");
const fixture = '<main class="unchanged"><a href="/services/">Exact copy</a><img src="/images/a.webp" srcSet="/images/a.webp 1x, /images/b.webp 2x"/><script type="application/ld+json">{"url":"https://evareadyelectrical.com.au/services/","name":"Exact copy"}</script></main>';
const sealed = '<main class="unchanged"><a href="/evaready-electrical/services/">Exact copy</a><img src="/evaready-electrical/images/a.webp" srcSet="/evaready-electrical/images/a.webp 1x, /evaready-electrical/images/b.webp 2x"/><script type="application/ld+json">{"url":"https://c0d312.github.io/evaready-electrical/services/","name":"Exact copy"}</script></main>';

test("audit profiles are explicit and reject mismatched build environment", () => {
  for (const [name, profile] of Object.entries(auditProfiles)) {
    const env = { EV_AUDIT_PROFILE: name, NEXT_PUBLIC_DEPLOYMENT_TARGET: name,
      NEXT_PUBLIC_SITE_URL: profile.siteUrl, NEXT_PUBLIC_BASE_PATH: profile.basePath };
    assert.equal(resolveAuditProfile(env).name, name);
    assert.throws(() => resolveAuditProfile({ ...env, NEXT_PUBLIC_SITE_URL: "https://wrong.invalid" }));
    assert.throws(() => resolveAuditProfile({ ...env, NEXT_PUBLIC_BASE_PATH: "/wrong" }));
  }
  assert.throws(() => resolveAuditProfile({ EV_AUDIT_PROFILE: "unknown" }));
  assert.throws(() => resolveAuditProfile({ EV_AUDIT_PROFILE: "toString" }));
});
test("branded mapping reverses only explicit URL slots, retaining the sealed markup", () => {
  assert.equal(brandedMarkupForHistoricalHash(fixture), sealed);
  assert.equal(brandedMarkupForHistoricalHash('<a data-catalog-href="/services/" href="/services/">Exact</a>'),
    '<a data-catalog-href="/services/" href="/evaready-electrical/services/">Exact</a>');
  const old = { href: "/evaready-electrical/services/", url: auditProfiles["github-preview"].siteUrl + "/#business", text: "Keep /evaready-electrical in explanatory text" };
  assert.deepEqual(previewValueFromBranded(brandedValueFromPreview(old)), old);
  assert.deepEqual(previewValueFromBranded({ name: "/services/", description: "https://evareadyelectrical.com.au/services/" }),
    { name: "/services/", description: "https://evareadyelectrical.com.au/services/" });
});
test("historical seal rejects an unrelated content change", () => {
  assert.notEqual(sha(brandedMarkupForHistoricalHash(fixture.replace("Exact copy", "Changed copy"))), sha(sealed));
});
test("inline CSS maps image URLs without normalising style or copy changes", () => {
  const current = '<main style="--hero:url(&quot;/images/hero.webp&quot;);color:red">Keep /images/hero.webp</main>';
  const expected = current.replace('url(&quot;/images/', 'url(&quot;/evaready-electrical/images/');
  assert.equal(brandedMarkupForHistoricalHash(current), expected);
  assert.notEqual(sha(brandedMarkupForHistoricalHash(current.replace("color:red", "color:blue"))), sha(expected));
  assert.notEqual(sha(brandedMarkupForHistoricalHash(current.replace("hero.webp&quot;", "missing.webp&quot;"))), sha(expected));
  assert.throws(() => brandedMarkupForHistoricalHash(expected));
});
test("historical seal rejects a wrong origin", () => {
  assert.notEqual(sha(brandedMarkupForHistoricalHash(fixture.replace("https://evareadyelectrical.com.au", "https://wrong.invalid"))), sha(sealed));
});
test("branded contract rejects leftover preview prefixes and preview origins", () => {
  assert.throws(() => brandedMarkupForHistoricalHash(fixture.replace('href="/services/', 'href="/evaready-electrical/services/')));
  assert.throws(() => previewValueFromBranded(auditProfiles["github-preview"].siteUrl + "/services/"));
});
test("historical seal rejects missing and changed route destinations", () => {
  assert.notEqual(sha(brandedMarkupForHistoricalHash(fixture.replace('href="/services/"', 'href="/missing/"'))), sha(sealed));
  assert.notEqual(sha(brandedMarkupForHistoricalHash(fixture.replace('<a href="/services/">Exact copy</a>', ''))), sha(sealed));
});
test("branded resolver is local, root mounted and separate from preview", () => {
  assert.equal(resolveBrandedUrl("http://127.0.0.1:4177/", "services/").href, "http://127.0.0.1:4177/services/");
  for (const base of ["https://example.com/", "http://127.0.0.1:4177/evaready-electrical/", "http://user@127.0.0.1/"]) {
    assert.throws(() => resolveBrandedUrl(base, "services/"));
  }
  for (const route of ["/services/", "//example.com/", "https://example.com/", "evaready-electrical", "evaready-electrical/services/", "\\example.com/"]) {
    assert.throws(() => resolveBrandedUrl("http://127.0.0.1:4177/", route));
  }
  assert.throws(() => resolvePreviewUrl("http://127.0.0.1:4177/", "services/"));
});

const peer = process.env.EV_AUDIT_PEER_OUT;
if (peer) test("paired profiles retain exact public markup, metadata, JSON-LD and protected images", () => {
  assert(path.isAbsolute(peer), "Peer export must be explicitly absolute");
  assert.notEqual(path.resolve(peer), path.resolve("out"));
  const previewRoot = auditProfile.name === "github-preview" ? "out" : peer;
  const brandedRoot = auditProfile.name === "branded-production" ? "out" : peer;
  const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
  const htmlFiles = (dir: string) => walk(dir).filter(f => f.endsWith(".html")).map(f => path.relative(dir, f)).sort();
  const files = htmlFiles(previewRoot);
  assert.equal(files.length, 1004);
  assert.deepEqual(htmlFiles(brandedRoot), files, "Missing route in one profile");
  const projection = (html: string) => ({
    main: html.match(/<main\b[\s\S]*?<\/main>/)?.[0],
    header: html.match(/<header\b[\s\S]*?<\/header>/)?.[0],
    footer: html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0],
    title: html.match(/<title>[\s\S]*?<\/title>/)?.[0],
    metas: [...html.matchAll(/<meta\b[^>]*>/g)].map(m => m[0]),
    canonical: html.match(/<link rel="canonical"[^>]*>/)?.[0],
    schemas: [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])),
  });
  for (const file of files) {
    const old = readFileSync(path.join(previewRoot, file), "utf8");
    const current = readFileSync(path.join(brandedRoot, file), "utf8");
    const canonical = current.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    if (canonical) assert(canonical.startsWith(auditProfiles["branded-production"].siteUrl + "/"), file);
    assert.deepEqual(projection(brandedMarkupForHistoricalHash(current)), projection(old), file);
  }
  const imageFiles = walk(path.join(previewRoot, "images"));
  assert(imageFiles.length > 0);
  for (const file of imageFiles) {
    const relative = path.relative(previewRoot, file), other = path.join(brandedRoot, relative);
    assert(existsSync(other), relative);
    assert.equal(sha(readFileSync(other)), sha(readFileSync(file)), relative);
  }
});
