import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import { transformSync } from "esbuild";

const source = readFileSync("tests/e2e/support/phase3e2-helpers.ts", "utf8");
const compiled = transformSync(source, { loader: "ts", format: "cjs" }).code;
const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value));
const valid = { focusVisible: true, outlineStyle: "solid", width: 2, offset: 3,
  color: "rgb(98, 216, 255)", clips: [] as string[], scroll: [0, 12184] };

function fixture(options: { before?: typeof valid; after?: typeof valid; lostFocus?: boolean; settleFailure?: boolean } = {}) {
  const calls: string[] = [], attachments: { name: string; value: unknown }[] = [];
  let settled = false, scrolled = false;
  const assertion = (actual: unknown) => ({
    toBeVisible: async () => { calls.push("visible"); },
    toBeFocused: async () => { calls.push("focused-check"); assert(!settled || !options.lostFocus, "focus lost during settling"); },
    toBe: (expected: unknown) => assert.equal(actual, expected),
    toEqual: (expected: unknown) => assert.deepEqual(copy(actual), copy(expected)),
    toBeGreaterThan: (expected: number) => assert(Number(actual) > expected),
    not: {
      toBe: (expected: unknown) => assert.notEqual(actual, expected),
      toMatch: (expected: RegExp) => assert(!expected.test(String(actual))),
    },
  });
  const expect = Object.assign(assertion, { poll: (observe: () => Promise<boolean>) => ({
    toBe: async (expected: boolean) => { await observe(); assert.equal(await observe(), expected); },
  }) });
  const page = {
    keyboard: { press: async (key: string) => { assert.equal(key, "Tab"); calls.push("tab"); } },
    evaluate: async (observe: () => unknown) => {
      assert.match(observe.toString(), /Layout\/scroll did not settle naturally/);
      calls.push("settle-start");
      await Promise.resolve();
      if (options.settleFailure) throw new Error("synthetic layout never settled");
      settled = true; calls.push("settle-end");
    },
  };
  const control = {
    focus: async () => { calls.push("focus"); },
    evaluate: async (observe: (element: Element) => unknown) => {
      if (observe.toString().includes("element.scrollIntoView")) {
        return observe({ scrollIntoView: (options: ScrollIntoViewOptions) => {
          assert.deepEqual(copy(options), { behavior: "instant", block: "center", inline: "nearest" });
          assert.equal(scrolled, false); scrolled = true; calls.push("initial-scroll");
        } } as Element);
      }
      if (observe.name === "focusIndicatorState") {
        calls.push(settled ? "measure-settled" : "measure-initial");
        return copy(settled ? options.after ?? valid : options.before ?? valid);
      }
      assert.match(observe.toString(), /elementFromPoint/);
      return { rect: [20, scrolled ? 20 : 2000, 44, 44], hits: Array.from({ length: 5 }, () => ({ clear: scrolled })),
        visualViewport: { width: 390, height: 844, offsetLeft: 0, offsetTop: 0, scale: 1 } };
    },
  };
  const commonJS = { exports: {} as { focusVisible: (page: unknown, control: unknown) => Promise<void> } };
  runInNewContext(compiled, {
    module: commonJS, exports: commonJS.exports,
    require: () => ({ expect, test: { info: () => ({ attach: async (name: string, data: { body: string }) => {
      attachments.push({ name, value: JSON.parse(data.body) });
    } }) } }),
  });
  return { calls, attachments, run: () => commonJS.exports.focusVisible(page, control) };
}

test("focus measurement waits for natural scrolling and retains the initial clipped observation", async () => {
  const before = { ...valid, clips: ["html."], scroll: [0, 12172] };
  const f = fixture({ before }); await f.run();
  assert.deepEqual(f.calls, ["visible", "initial-scroll", "tab", "focus", "focused-check", "measure-initial",
    "settle-start", "settle-end", "focused-check", "measure-settled"]);
  assert.deepEqual(f.attachments.find(row => row.name === "keyboard-focus-before-settle")?.value, before);
  assert.deepEqual(f.attachments.find(row => row.name === "keyboard-focus")?.value, valid);
  assert.equal(f.calls.filter(call => call === "initial-scroll").length, 1);
});

test("already stable focus still passes with both observations retained", async () => {
  const f = fixture(); await f.run();
  assert.deepEqual(f.attachments.filter(row => row.name.startsWith("keyboard-focus")).map(row => row.value), [valid, valid]);
});

for (const clips of [["html."], ["div.overflow-panel"], ["html.", "div.overflow-panel"]]) {
  test(`persistent focus clipping still fails: ${clips.join(", ")}`, async () => {
    const after = { ...valid, clips }, f = fixture({ after });
    await assert.rejects(f.run());
    assert.deepEqual(f.attachments.find(row => row.name === "keyboard-focus")?.value, after);
  });
}

for (const [name, changes] of [
  ["not focus-visible", { focusVisible: false }],
  ["no outline", { outlineStyle: "none" }],
  ["zero outline width", { width: 0 }],
  ["transparent outline", { color: "transparent" }],
  ["zero-alpha outline", { color: "rgba(98, 216, 255, 0)" }],
] as const) test(`settled focus still rejects ${name}`, async () => {
  const f = fixture({ after: { ...valid, ...changes } }); await assert.rejects(f.run());
});

test("focus lost during settling fails before accepting a final measurement", async () => {
  const f = fixture({ lostFocus: true }); await assert.rejects(f.run(), /focus lost during settling/);
  assert(f.calls.includes("settle-end")); assert(!f.calls.includes("measure-settled"));
});

test("failed natural settling propagates without retrying focus or repositioning", async () => {
  const f = fixture({ settleFailure: true }); await assert.rejects(f.run(), /synthetic layout never settled/);
  assert.equal(f.calls.filter(call => call === "focus").length, 1);
  assert.equal(f.calls.filter(call => call === "initial-scroll").length, 1);
  assert(!f.calls.includes("measure-settled"));
  assert(f.attachments.some(row => row.name === "keyboard-focus-before-settle"));
});
