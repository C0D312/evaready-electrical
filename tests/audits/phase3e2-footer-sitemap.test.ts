import { strict as assert } from "node:assert";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("A8 changes only the exact footer sitemap branch in the shared header/footer file", () => {
  const source = readFileSync("components/site-frame.tsx", "utf8").replace(/\r\n/g, "\n");
  const original = `            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link ev-footer-legal-link">
                {link.label}
              </Link>
            ))}`;
  const replacement = `            {legalLinks.map((link) => link.href === "/sitemap.xml" ? (
              <a key={link.href} href={assetPath(link.href)} className="footer-link ev-footer-legal-link">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="footer-link ev-footer-legal-link">
                {link.label}
              </Link>
            ))}`;
  assert.equal(source.split(replacement).length, 2, "Exactly one native sitemap branch; application links remain Next Link");
  const restored = source.replace(replacement, original);
  assert.equal(createHash("sha256").update(restored).digest("hex"),
    "7e9a4b5d3ef4eb1363d487aa3560683e3d1bd83a240c2dcfc6b2155625a6911b",
    "Every other byte after LF normalisation matches the Phase 3E2 starting file, including the protected header");
});
