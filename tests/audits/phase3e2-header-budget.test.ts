import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { transformSync } from "esbuild";

const source = readFileSync("tests/e2e/phase3e2-header-height.spec.ts", "utf8");
const compiled = transformSync(source, { loader: "ts", format: "cjs" }).code;
const baseURL = "http://127.0.0.1:4214/evaready-electrical/";

type ProjectUse = { isMobile?: boolean; deviceScaleFactor?: number };
type Fixture = { page: unknown; baseURL: string; browserName: string };

async function chosenBudget(width: number, scale: number, sequentialAnchors: boolean, use: ProjectUse) {
  const callbacks: ((fixture: Fixture) => Promise<void>)[] = [];
  const budgets: number[] = [], calls: string[] = [];
  const stopBeforeBrowser = new Error("synthetic stop after budget selection");
  const mockTest = Object.assign((name: string, callback: (fixture: Fixture) => Promise<void>) => {
    assert.equal(name, `header height ${width}px root-${scale}: initial, hydration, resize and anchors`);
    callbacks.push(callback);
  }, {
    info: () => ({ project: { use } }),
    setTimeout: (budget: number) => { budgets.push(budget); },
  });
  const page = {
    on: (event: string) => { assert.equal(event, "pageerror"); calls.push("errors"); },
    setViewportSize: async (size: { width: number; height: number }) => {
      assert.equal(size.width, width); assert.equal(size.height, 1080); calls.push("viewport");
    },
    addInitScript: async () => { calls.push("budget-selected"); throw stopBeforeBrowser; },
  };
  const modules: Record<string, unknown> = {
    "./support/phase3e2-contained-test": { test: mockTest },
    "./support/quote-enhancement": {},
    "./support/preview-url": {},
    "./support/phase3e2-routes": {
      routes: [{ route: "/synthetic-local-only/" }], widths: [width], scales: [scale],
      requiredLoopbackBaseURL: (actual: string) => { assert.equal(actual, baseURL); return actual; },
    },
    "./support/phase3e2-helpers": {},
    "./support/phase3e2-keyboard": {
      keyboardCapability: async (actualPage: unknown, browser: string) => {
        assert.equal(actualPage, page); assert.equal(browser, "webkit"); calls.push("capability");
        return { sequentialAnchors };
      },
    },
  };
  // Execute the real callback through budget selection, without loading a browser or fixtures.
  const commonJS = { exports: {} };
  runInNewContext(compiled, {
    module: commonJS, exports: commonJS.exports,
    require: (name: string) => { assert(Object.hasOwn(modules, name), name); return modules[name]; },
  });
  assert.equal(callbacks.length, 1);
  await assert.rejects(callbacks[0]({ page, baseURL, browserName: "webkit" }), error => error === stopBeforeBrowser);
  assert.deepEqual(calls, ["errors", "viewport", "capability", "budget-selected"]);
  return budgets;
}

for (const width of [1023, 1024, 2560]) for (const scale of [100, 200]) {
  for (const sequentialAnchors of [false, true]) for (const isMobile of [undefined, false, true]) {
    for (const deviceScaleFactor of [undefined, 1, 2, 3]) {
      test(`header aggregate budget: ${width}px/${scale}%, anchors=${sequentialAnchors}, mobile=${isMobile}, DPR=${deviceScaleFactor}`, async () => {
        const actual = await chosenBudget(width, scale, sequentialAnchors, { isMobile, deviceScaleFactor });
        const expected = sequentialAnchors || width < 1024 ? []
          : [isMobile && (deviceScaleFactor ?? 1) > 1 ? 2_400_000 : 600_000];
        assert.deepEqual(actual, expected);
        assert(actual.every(budget => Number.isFinite(budget) && budget > 0 && budget <= 2_400_000));
      });
    }
  }
}
