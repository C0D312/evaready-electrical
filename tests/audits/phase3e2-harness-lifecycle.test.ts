import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { transformSync } from "esbuild";
import ts from "typescript";

type State = { rect: number[]; hits: { clear: boolean }[]; visualViewport: {
  width: number; height: number; offsetLeft: number; offsetTop: number; scale: number;
} | null };
type Rect = { x: number; y: number; width: number; height: number };
type Viewport = { width: number; height: number };
const clone = <T>(value: T): T => structuredClone(value);
const plain = (value: unknown) => JSON.parse(JSON.stringify(value));

function functions(file: string, names: string[]) {
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  const selected = names.map(name => source.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === name));
  assert(selected.every(Boolean), "Audit the actual source functions, not a duplicate implementation");
  const text = selected.map(node => node!.getText(source).replace(/^export /, "")).join("\n");
  return transformSync(`${text}\nexport { ${names.join(", ")} };`, { loader: "ts", format: "cjs" }).code;
}

const scrollCode = functions("tests/e2e/support/phase3e2-helpers.ts", ["visibleWithoutScrolling", "unobscured"]);
const captureCode = functions("tests/e2e/phase3e2-header-height.spec.ts", ["visibleHeaderClip", "captureVisibleHeader"]);

function load<T>(code: string, context: Record<string, unknown> = {}) {
  const commonJS = { exports: {} as T };
  runInNewContext(code, { module: commonJS, exports: commonJS.exports, ...context });
  return commonJS.exports;
}

const base: State = { rect: [20, 20, 100, 44], hits: Array.from({ length: 5 }, () => ({ clear: true })),
  visualViewport: { width: 2560, height: 1080, offsetLeft: 0, offsetTop: 0, scale: 1 } };
const predicate = load<{ visibleWithoutScrolling: (state: State) => boolean }>(scrollCode).visibleWithoutScrolling;

test("fully visible control can omit only the redundant scroll", () => assert.equal(predicate(base), true));
const invalidStates: [string, (state: State) => void][] = [
  ["left outside", s => { s.rect[0] = -1; }], ["top outside", s => { s.rect[1] = -1; }],
  ["zero width", s => { s.rect[2] = 0; }], ["zero height", s => { s.rect[3] = 0; }],
  ["right outside", s => { s.rect[0] = 2500; }], ["bottom outside", s => { s.rect[1] = 1060; }],
  ["nonfinite rect", s => { s.rect[0] = NaN; }], ["covered hit", s => { s.hits[0].clear = false; }],
  ["missing hits", s => { s.hits = []; }], ["missing viewport", s => { s.visualViewport = null; }],
  ["zoomed viewport", s => { s.visualViewport!.scale = 2; }], ["empty viewport", s => { s.visualViewport!.width = 0; }],
  ["infinite viewport", s => { s.visualViewport!.height = Infinity; }],
  ["viewport left offset", s => { s.visualViewport!.offsetLeft = 50; }],
  ["viewport top offset", s => { s.visualViewport!.offsetTop = 50; }],
];
for (const [name, mutate] of invalidStates) test(`scroll precondition rejects ${name}`, () => {
  const state = clone(base); mutate(state); assert.equal(predicate(state), false);
});

async function scenario(states: State[], options: { hidden?: boolean; scrollThrows?: boolean; mode?: "prepare" | "observe" } = {}) {
  let index = 0, scrolls = 0;
  const attachments: { name: string; value: unknown }[] = [];
  const element = { scrollIntoView: (value: ScrollIntoViewOptions) => {
    assert.deepEqual(plain(value), { behavior: "instant", block: "center", inline: "nearest" });
    scrolls++; if (options.scrollThrows) throw new Error("synthetic scroll failure");
  } };
  const control = { evaluate: async (callback: (element: unknown) => unknown) => callback(element) };
  const expect = Object.assign((value: unknown) => ({ toBeVisible: async () => {
    assert.equal(value, control); if (options.hidden) throw new Error("synthetic hidden control");
  } }), { poll: (observe: () => Promise<boolean>) => ({ toBe: async (expected: boolean) => {
    for (let attempt = 0; attempt < 5; attempt++) if (await observe() === expected) return;
    throw new Error("synthetic stable-hit failure");
  } }) });
  const runtime = load<{ unobscured: (control: unknown, mode?: "prepare" | "observe") => Promise<void> }>(scrollCode, {
    expect, inspectControlHits: async () => clone(states[Math.min(index++, states.length - 1)]),
    attach: async (name: string, value: unknown) => { attachments.push({ name, value }); },
  });
  let error: unknown;
  try { await runtime.unobscured(control, options.mode); } catch (caught) { error = caught; }
  return { error, scrolls, attachments };
}

const offscreen = clone(base); offscreen.rect[1] = 5533; offscreen.hits.forEach(hit => { hit.clear = false; });
const partial = clone(base); partial.rect[1] = 1060; partial.hits[4].clear = false;
const covered = clone(base); covered.hits[0].clear = false;
const moved = clone(base); moved.rect[0] = 80;
const cases: [string, State[], number, boolean, { hidden?: boolean; scrollThrows?: boolean }?][] = [
  ["visible settled", [base, base, base], 0, true],
  ["offscreen scrolls once", [offscreen, base, base], 1, true],
  ["partial scrolls once", [partial, base, base], 1, true],
  ["still offscreen fails", [offscreen, offscreen], 1, false],
  ["covered fails", [covered, covered], 1, false],
  ["moving fails", [offscreen, base, moved, base, moved, base], 1, false],
  ["new occlusion fails", [base, covered], 0, false],
  ["hidden fails before scrolling", [base], 0, false, { hidden: true }],
  ["scroll error propagates", [offscreen], 1, false, { scrollThrows: true }],
];
for (const [name, states, count, succeeds, options] of cases) test(`scroll lifecycle: ${name}`, async () => {
  const result = await scenario(states, options);
  assert.equal(result.error === undefined, succeeds); assert.equal(result.scrolls, count);
  if (!options?.hidden && !options?.scrollThrows) {
    assert(result.attachments.some(row => row.name === "control-scroll-decision"));
    assert(result.attachments.some(row => row.name === "control-hit-observations"));
  }
});

const clip = load<{ visibleHeaderClip: (rect: Rect, viewport: Viewport) => Rect }>(captureCode).visibleHeaderClip;

for (const [name, states, succeeds] of [
  ["visible restored", [base, base, base], true],
  ["natural settling only", [offscreen, base, base], true],
  ["offscreen restored", [offscreen, offscreen], false],
  ["partially clipped restored", [partial, partial], false],
  ["covered restored", [covered, covered], false],
  ["moving restored", [base, moved, base, moved, base, moved], false],
  ["newly occluded restored", [base, covered], false],
] as const) test(`observation never repairs scroll: ${name}`, async () => {
  const result = await scenario([...states], { mode: "observe", scrollThrows: true });
  assert.equal(result.error === undefined, succeeds);
  assert.equal(result.scrolls, 0, "An observation must never reposition the target");
  assert(result.attachments.some(row => row.name === "control-hit-observations"));
});

test("observation rejects offscreen bounds even when sampled hit flags are clear", async () => {
  const outside = clone(base); outside.rect[1] = 5533;
  const result = await scenario([outside, outside], { mode: "observe" });
  assert(result.error); assert.equal(result.scrolls, 0);
});

test("quote closure checks focus and restoration before observation-only visibility", () => {
  const source = readFileSync("tests/e2e/support/phase3e2-helpers.ts", "utf8");
  const body = source.slice(source.indexOf('if (mode === "Escape") await page.keyboard.press("Escape");'),
    source.indexOf("export async function assertReducedMotion"));
  assert(body.includes("await expectRestored(page, before);"));
  assert(body.includes("await expect(opener).toBeFocused();"));
  assert(body.indexOf("await expectRestored") < body.indexOf('await unobscured(opener, "observe")'));
  assert(body.indexOf("await expect(opener).toBeFocused()") < body.indexOf('await unobscured(opener, "observe")'));
  assert.equal((body.match(/unobscured\(/g) ?? []).length, 1);
  assert.doesNotMatch(body, /scrollIntoView|scrollTo\(|scrollBy\(|\.focus\(|focusVisible\(/);
});
test("visible header clip encloses fractional bounds without changing DPR", () => {
  assert.deepEqual(plain(clip({ x: 0.5, y: 1.5, width: 99, height: 20.1 }, { width: 200, height: 100 })),
    { x: 0, y: 1, width: 100, height: 21 });
});
const invalidClips: [string, (r: Rect, v: Viewport) => void][] = [
  ["negative x", r => { r.x = -1; }], ["negative y", r => { r.y = -1; }],
  ["zero width", r => { r.width = 0; }], ["zero height", r => { r.height = 0; }],
  ["right outside", r => { r.width = 201; }], ["bottom outside", r => { r.height = 101; }],
  ["nonfinite geometry", r => { r.x = NaN; }], ["empty viewport", (_r, v) => { v.width = 0; }],
];
for (const [name, mutate] of invalidClips) test(`header capture rejects ${name}`, () => {
  const rect = { x: 0, y: 0, width: 100, height: 20 }, viewport = { width: 200, height: 100 };
  mutate(rect, viewport); assert.throws(() => clip(rect, viewport));
});

type Frame = { header: Rect; y: number; width: number };
const frame: Frame = { header: { x: 0, y: 0, width: 390, height: 160 }, y: 0, width: 390 };
async function captureFixture(options: { before?: Frame; after?: Frame; viewport?: Viewport | null; screenshotFailure?: boolean } = {}) {
  let measures = 0, captures = 0;
  const attachments: unknown[] = [], png = Buffer.from("synthetic image bytes, not a real screenshot");
  const expect = (value: unknown) => ({
    toEqual: (expected: unknown) => assert.deepEqual(plain(value), plain(expected)),
    toBe: (expected: unknown) => assert.equal(value, expected),
    not: { toBeNull: () => assert.notEqual(value, null) },
  });
  const page = { viewportSize: () => options.viewport === undefined ? { width: 390, height: 844 } : options.viewport,
    screenshot: async (value: { clip: Rect }) => {
      captures++; assert.deepEqual(plain(value), { clip: frame.header });
      if (options.screenshotFailure) throw new Error("synthetic capture failure"); return png;
    } };
  const runtime = load<{ captureVisibleHeader: (page: unknown, expected: Frame) => Promise<Buffer> }>(captureCode, {
    expect, geometry: async () => clone(measures++ ? options.after ?? frame : options.before ?? frame),
    attach: async (_name: string, value: unknown) => { attachments.push(value); },
  });
  let result: Buffer | undefined, error: unknown;
  try { result = await runtime.captureVisibleHeader(page, frame); } catch (caught) { error = caught; }
  return { result, error, png, captures, measures, attachments };
}
test("header capture returns exact screenshot bytes and records unchanged geometry", async () => {
  const result = await captureFixture(); assert.equal(result.error, undefined); assert.equal(result.result, result.png);
  assert.equal(result.captures, 1); assert.equal(result.measures, 2); assert.equal(result.attachments.length, 1);
});
for (const [name, options, captures] of [
  ["initial mismatch", { before: { ...frame, y: 1 } }, 0],
  ["scroll moved during capture", { after: { ...frame, y: 1 } }, 1],
  ["geometry moved during capture", { after: { ...frame, header: { ...frame.header, height: 161 } } }, 1],
  ["viewport changed during capture", { after: { ...frame, width: 391 } }, 1],
  ["missing viewport", { viewport: null }, 0],
  ["capture failure", { screenshotFailure: true }, 1],
] as const) test(`header capture fails closed: ${name}`, async () => {
  const result = await captureFixture(options); assert(result.error); assert.equal(result.captures, captures);
  assert.equal(result.attachments.length, 0);
});
