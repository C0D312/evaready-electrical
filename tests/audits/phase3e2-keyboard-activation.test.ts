import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import { transformSync } from "esbuild";

const source = readFileSync("tests/e2e/support/phase3e2-keyboard.ts", "utf8");
const compiled = transformSync(source, { loader: "ts", format: "cjs" }).code;

class NodeStub {
  parent: NodeStub | null = null;
  attributes = new Map<string, string>();
  contains(node: NodeStub): boolean { return node === this || !!node.parent && this.contains(node.parent); }
  setAttribute(name: string, value: string) { this.attributes.set(name, value); }
  removeAttribute(name: string) { this.attributes.delete(name); }
}

type Click = { target: NodeStub | null; isTrusted: boolean; detail: number; prevented: boolean; stopped: boolean;
  preventDefault(): void; stopImmediatePropagation(): void };

function fixture() {
  const listeners = new Set<(event: Click) => void>();
  const window = {
    addEventListener(type: string, listener: (event: Click) => void, capture: boolean) {
      assert.equal(type, "click"); assert.equal(capture, true); listeners.add(listener);
    },
    removeEventListener(type: string, listener: (event: Click) => void, capture: boolean) {
      assert.equal(type, "click"); assert.equal(capture, true); listeners.delete(listener);
    },
  };
  const commonJS = { exports: {} as { interceptIsolatedAnchorActivation: (element: NodeStub) => () => void } };
  runInNewContext(compiled, { module: commonJS, exports: commonJS.exports, require: () => ({}), window, Node: NodeStub });
  const anchor = new NodeStub(), child = new NodeStub(), unrelated = new NodeStub(); child.parent = anchor;
  let delegatedCalls = 0;
  const dispatch = (target: NodeStub | null, isTrusted = true, detail = 0) => {
    const event: Click = { target, isTrusted, detail, prevented: false, stopped: false,
      preventDefault() { this.prevented = true; }, stopImmediatePropagation() { this.stopped = true; } };
    for (const listener of [...listeners]) { listener(event); if (event.stopped) break; }
    if (!event.stopped) delegatedCalls++;
    return event;
  };
  return { anchor, child, unrelated, listeners, dispatch,
    install: () => commonJS.exports.interceptIsolatedAnchorActivation(anchor),
    delegatedCalls: () => delegatedCalls,
    receipt: () => anchor.attributes.get("data-test-keyboard-activation") };
}

for (const target of ["anchor", "child"] as const) test(`isolated ${target} activation precedes document capture`, () => {
  const f = fixture(), cleanup = f.install(), event = f.dispatch(f[target]);
  assert(event.prevented && event.stopped); assert.equal(f.delegatedCalls(), 0);
  assert.equal(f.receipt(), '{"trusted":true,"detail":0}'); assert.equal(f.listeners.size, 0);
  cleanup(); assert.equal(f.receipt(), undefined);
});

for (const target of ["unrelated", "null"] as const) test(`unrelated ${target} event does not consume the interceptor`, () => {
  const f = fixture(), cleanup = f.install(), event = f.dispatch(target === "null" ? null : f.unrelated);
  assert(!event.prevented && !event.stopped); assert.equal(f.delegatedCalls(), 1);
  assert.equal(f.listeners.size, 1); assert.equal(f.receipt(), undefined);
  f.dispatch(f.anchor); assert.equal(f.delegatedCalls(), 1); cleanup();
});

test("cleanup before activation restores normal dispatch", () => {
  const f = fixture(), cleanup = f.install(); cleanup();
  assert.equal(f.listeners.size, 0); assert(!f.dispatch(f.anchor).prevented); assert.equal(f.delegatedCalls(), 1);
});

test("matched activation unregisters before any later event", () => {
  const f = fixture(), cleanup = f.install(); f.dispatch(f.anchor);
  assert(!f.dispatch(f.anchor).prevented); assert.equal(f.delegatedCalls(), 1); cleanup();
});

test("cleanup is idempotent and removes the receipt", () => {
  const f = fixture(), cleanup = f.install(); f.dispatch(f.anchor); cleanup(); cleanup();
  assert.equal(f.listeners.size, 0); assert.equal(f.receipt(), undefined);
});

test("cleanup remains possible when the selected node is detached", () => {
  const f = fixture(), cleanup = f.install(); f.child.parent = null; cleanup();
  assert.equal(f.listeners.size, 0); assert(!f.dispatch(f.child).prevented);
});

test("a failed assertion still releases the interceptor in finally", () => {
  const f = fixture(), cleanup = f.install();
  assert.throws(() => { try { throw new Error("synthetic assertion failure"); } finally { cleanup(); } });
  assert.equal(f.listeners.size, 0); assert(!f.dispatch(f.anchor).prevented);
});

for (const [trusted, detail] of [[false, 0], [true, 1], [false, 2]] as const) test(`receipt preserves actual trusted=${trusted} detail=${detail}`, () => {
  const f = fixture(), cleanup = f.install(); f.dispatch(f.anchor, trusted, detail);
  assert.deepEqual(JSON.parse(f.receipt()!), { trusted, detail }); cleanup();
});

test("independent successive installations leave no stale listener", () => {
  const f = fixture();
  for (let index = 0; index < 3; index++) {
    const cleanup = f.install(); assert.equal(f.listeners.size, 1);
    assert(f.dispatch(f.anchor).prevented); cleanup(); assert.equal(f.listeners.size, 0);
  }
  assert.equal(f.delegatedCalls(), 0);
});

test("browser helper retains trusted activation, cleanup and independent Quote traversal assertions", () => {
  assert.match(source, /evaluateHandle\(interceptIsolatedAnchorActivation\)/);
  assert.match(source, /expect\(await page\.evaluate\(activationIsolationState\)\)\.toEqual\(beforeActivation\)/);
  assert.match(source, /interception\.evaluate\(cleanup => cleanup\(\)\)/);
  assert.match(source, /finally \{ await interception\.dispose\(\); \}/);
  assert.match(source, /quote-native-frame-boundary-evidence/);
  assert.match(source, /quote-sequential-keyboard-evidence/);
});

test("finite combined budgets are confined to unsupported-anchor desktop-width cases", () => {
  const header = readFileSync("tests/e2e/phase3e2-header-height.spec.ts", "utf8");
  assert.equal((header.match(/test\.setTimeout/g) || []).length, 1);
  assert.match(header, /if \(!capability\.sequentialAnchors && width >= 1024\) \{\s*\/\/[^\n]+\s*const \{ isMobile, deviceScaleFactor = 1 \} = test\.info\(\)\.project\.use;\s*test\.setTimeout\(isMobile && deviceScaleFactor > 1 \? 2_400_000 : 600_000\);\s*\}/);
  assert.match(source, /expect\(browserName\)\.toBe\("webkit"\)/);
  assert.match(source, /expect\(process\.platform\)\.toBe\("win32"\)/);
});
