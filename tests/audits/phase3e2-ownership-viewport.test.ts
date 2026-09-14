import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const { parse } = createRequire(import.meta.url)("next/dist/compiled/node-html-parser") as {
  parse(html: string): { querySelectorAll(selector: string): { getAttribute(name: string): string | undefined }[] };
};

function assertDeviceViewport(html: string) {
  const metas = parse(html).querySelectorAll('meta[name="viewport"]');
  assert.equal(metas.length, 1);
  assert.equal(metas[0].getAttribute("content"), "width=device-width, initial-scale=1");
}

for (const file of [
  "tests/e2e/phase3e2-card-return-ownership.spec.ts",
  "tests/e2e/phase3e2-focus-visibility.spec.ts",
  "tests/e2e/phase3e2-layout-regressions.spec.ts",
  "tests/e2e/phase3e2-quote-lifecycle.spec.ts",
]) test(`${file} fixture uses a device-width viewport before its content`, () => {
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  const fixtures: string[] = [];
  function visit(node: ts.Node) {
    if (ts.isTemplateExpression(node) && node.head.text.startsWith("<!doctype html>")) fixtures.push(node.head.text);
    if (ts.isStringLiteralLike(node) && node.text.startsWith("<!doctype html>")) {
      let expression: ts.Node = node;
      while (ts.isBinaryExpression(expression.parent) && expression.parent.operatorToken.kind === ts.SyntaxKind.PlusToken)
        expression = expression.parent;
      const literalParts: string[] = [];
      function collect(part: ts.Node) {
        if (ts.isStringLiteralLike(part)) literalParts.push(part.text);
        else if (ts.isBinaryExpression(part) && part.operatorToken.kind === ts.SyntaxKind.PlusToken) {
          collect(part.left); collect(part.right);
        } else if (ts.isTemplateExpression(part)) literalParts.push(part.head.text);
      }
      collect(expression);
      fixtures.push(literalParts.join(""));
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.equal(fixtures.length, 1);
  assertDeviceViewport(fixtures[0]);
});

test("viewport regression check rejects missing, legacy-width and duplicate declarations", () => {
  const meta = '<meta name="viewport" content="width=device-width, initial-scale=1">';
  assertDeviceViewport(`<!doctype html>${meta}`);
  for (const html of ["<!doctype html>", meta.replace("device-width", "980"),
    meta.replace("initial-scale=1", "initial-scale=0.4"), meta + meta]) {
    assert.throws(() => assertDeviceViewport(html));
  }
});
