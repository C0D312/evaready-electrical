import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

test("A10/A12 leave original route-scroll code unchanged outside exact authorised additions", () => {
  const source = readFileSync("components/route-scroll-manager.tsx", "utf8").replace(/\r\n/g, "\n");
  const start = source.indexOf("export function installServiceFocusVisibility() {");
  const end = source.indexOf("function scrollToPageTop() {");
  assert.ok(start > 0 && end > start);
  const invocation = "  useEffect(installServiceFocusVisibility, [pathname]);\n\n";
  assert.equal(source.split(invocation).length, 2);
  let original = (source.slice(0, start) + source.slice(end)).replace(invocation, "");
  const additions = [
    'import { installServiceCardReturn } from "./service-card-return";\n',
    `  const cardReturn = useRef<ReturnType<typeof installServiceCardReturn> | null>(null);

  useEffect(() => {
    const controller = installServiceCardReturn();
    cardReturn.current = controller;
    return () => {
      controller.dispose();
      cardReturn.current = null;
    };
  }, []);
`,
    "    const returningToCard = cardReturn.current?.routeCommitted(pathname) === true;\n",
    "    if (returningToCard) return;\n",
  ];
  for (const addition of additions) {
    assert.equal(original.split(addition).length, 2, "Each approved A12 block must appear exactly once");
    original = original.replace(addition, "");
  }
  assert.equal(createHash("sha256").update(original).digest("hex"),
    "0c4559560ad196a6a280a96ba602394a879b649aae11962fe8bf61ef39f2c466");
  const effect = source.slice(start, end);
  assert.doesNotMatch(effect, /\.focus\s*\(|setTimeout|setInterval|\.style\s*[.=]|pushState|replaceState/);
  assert.equal(effect.match(/requestAnimationFrame\(/g)?.length, 1);
  assert.doesNotMatch(effect, /scrollIntoView\(/, "Do not queue a competing native scroll before the measured correction");
  assert.equal(effect.match(/scrollBy\(/g)?.length, 1);
});

test("A12 preserves the complete original root layout and native Skip link", () => {
  const source = readFileSync("app/layout.tsx", "utf8").replace(/\r\n/g, "\n");
  assert.equal(source.split('<a href="#main-content" className="skip-to-content">').length, 2);
  assert.equal(createHash("sha256").update(source).digest("hex"),
    "f30cb0b5aac39a73a7a51fe52fd6b41a83d0a258045d5a20b86d2367491ae628");
});
