import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { explainedCancellation, reconciledHeadGroup, reconciledPrefetchGroup, provenStaticResourceReuse, nativeFetchIsQuiet, observeNativeFetch, responseInventoryIsComplete,
  type NativeFetchActivity,
  type StaticTransportEvidence, type ResourceTimingEvidence, type NetworkRequestEvidence, type FetchObservation } from "../e2e/support/phase3e2-network-evidence";

test("static reuse needs a prior identical network body and independent zero-transfer timing", () => {
  const row: StaticTransportEvidence = { id: 2, pathname: "/evaready-electrical/images/synthetic.webp",
    requestKey: "/evaready-electrical/images/synthetic.webp", method: "GET", resourceType: "image", status: 200,
    responseBytes: 123, transport: { startTime: 2000, domainLookupStart: -1, domainLookupEnd: -1,
      connectStart: -1, connectEnd: -1, requestStart: -1, responseStart: 0.02, responseEnd: 0.02,
      serviceWorker: false, finished: true, bytes: 123, sha256: "a".repeat(64) } };
  const prior: StaticTransportEvidence = { ...row, id: 1, transport: { ...row.transport!, startTime: 1000,
    requestStart: 1, responseStart: 3, responseEnd: 10 } };
  const resource: ResourceTimingEvidence = { id: "synthetic:1", pathname: row.pathname, timeOrigin: 1990,
    startTime: 10, transferSize: 0, responseStart: 0, workerStart: 0, nextHopProtocol: "" };
  const proof = (item = row, requests = [prior, item], resources = [resource], browser = "webkit") =>
    provenStaticResourceReuse(item, requests, resources, browser);
  assert.equal(proof()?.priorNetworkRequestId, 1);
  assert.equal(proof()?.requestId, 2);
  for (const change of [{ method: "POST" }, { status: 404 }, { failure: "failed" }, { resourceType: "fetch" },
    { requestKey: `${row.pathname}?x=1` }, { pathname: "/outside/file.webp" }, { responseBytes: 124 }, { transport: undefined }]) {
    assert.equal(proof({ ...row, ...change }), null);
  }
  for (const change of [{ requestStart: 0 }, { connectStart: 0 }, { connectEnd: 0 }, { domainLookupStart: 0 },
    { domainLookupEnd: 0 }, { responseEnd: 1 }, { responseStart: -1 }, { finished: false }, { bytes: 0 },
    { bytes: 124 }, { sha256: "invalid" }, { serviceWorker: true }, { startTime: NaN }]) {
    assert.equal(proof({ ...row, transport: { ...row.transport!, ...change } }), null);
  }
  for (const change of [{ transferSize: 1 }, { responseStart: 1 }, { workerStart: 1 }, { nextHopProtocol: "http/1.1" },
    { timeOrigin: 100 }, { pathname: "/other.webp" }, { id: "" }]) {
    assert.equal(proof(row, [prior, row], [{ ...resource, ...change }]), null);
  }
  assert.equal(proof(row, [row]), null);
  assert.equal(proof(row, [prior, row], []), null);
  assert.equal(proof(row, [prior, row], [resource, resource]), null);
  assert.equal(proof(row, [prior, row], [resource], "chromium"), null);
  for (const change of [{ id: 3 }, { failure: "failed" }, { status: 500 }, { requestKey: "/other.webp" },
    { transport: { ...prior.transport!, sha256: "b".repeat(64) } },
    { transport: { ...prior.transport!, requestStart: -1 } },
    { transport: { ...prior.transport!, startTime: 3000 } },
    { transport: { ...prior.transport!, finished: false } },
    { transport: { ...prior.transport!, bytes: 124 } }]) {
    assert.equal(proof(row, [{ ...prior, ...change }, row]), null);
  }
});

const head: NetworkRequestEvidence = { pathname: "/evaready-electrical/", requestKey: "/evaready-electrical/", method: "HEAD", resourceType: "fetch", status: 200, failure: "net::ERR_ABORTED", prefetch: false, uniqueFetchRequest: true };
const received: FetchObservation = { pathname: head.pathname, requestKey: head.requestKey, method: "HEAD", status: 200, event: "headers-received" };

test("settled-refresh readiness requires continuous native quiescence, not an empty instantaneous list", () => {
  assert.equal(nativeFetchIsQuiet({ pending: [], lastActivityAt: 1000, observedAt: 1500 }), true);
  assert.equal(nativeFetchIsQuiet({ pending: [], lastActivityAt: 1000, observedAt: 1499 }), false);
  assert.equal(nativeFetchIsQuiet({ pending: [], lastActivityAt: 1500, observedAt: 1500 }), false);
  assert.equal(nativeFetchIsQuiet({ pending: ["unresolved"], lastActivityAt: 1000, observedAt: 10000 }), false);
  assert.equal(nativeFetchIsQuiet({ pending: [], lastActivityAt: 2000, observedAt: 1000 }), false);
  assert.equal(nativeFetchIsQuiet({ pending: [], lastActivityAt: NaN, observedAt: 2000 }), false);
  assert.equal(nativeFetchIsQuiet({ pending: [], lastActivityAt: 1000, observedAt: Infinity }), false);
  assert.equal(nativeFetchIsQuiet({ pending: [], lastActivityAt: 1000, observedAt: 2000 }, 499), false);
});

test("response inventory rejects truncated request records instead of inventing successful responses", () => {
  const rows: { status?: number }[] = [{ status: 200 }, {}];
  assert.equal(responseInventoryIsComplete(rows), false);
  for (const status of [undefined, NaN, Infinity, 0, 99, 600, 200.5]) {
    rows[1].status = status;
    assert.equal(responseInventoryIsComplete(rows), false);
  }
  rows[1].status = 200;
  assert.equal(responseInventoryIsComplete(rows), true);
  // Completeness does not turn an HTTP failure into a pass: failure assertions
  // independently reject these actual statuses, including a recorded 404.
  rows[1].status = 404;
  assert.equal(responseInventoryIsComplete(rows), true);
});

test("native fetch observation preserves response/rejection identity and tracks unresolved calls without consuming them", async () => {
  let now = 0;
  let readerRequests = 0;
  const events: FetchObservation[] = [];
  const calls: { input: unknown; resolve: (value: unknown) => void; reject: (error: unknown) => void }[] = [];
  const window: Record<string, unknown> = {
    fetch(this: unknown, input: unknown) {
      assert.equal(this, window);
      return new Promise((resolve, reject) => calls.push({ input, resolve, reject }));
    },
    __evRecordFetch: async (row: FetchObservation) => { events.push(row); },
  };
  class SyntheticResponse {
    body = new SyntheticStream();
    constructor(public status: number) {}
    clone() { return new SyntheticResponse(this.status); }
  }
  class SyntheticReader { cancel() { return Promise.resolve(); } }
  class SyntheticStream {
    getReader() { readerRequests++; return new SyntheticReader(); }
    tee() { return [new SyntheticStream(), new SyntheticStream()]; }
    cancel() { return Promise.resolve(); }
  }
  const sandbox = { window, URL, Request: class {}, Response: SyntheticResponse,
    ReadableStream: SyntheticStream, ReadableStreamDefaultReader: SyntheticReader,
    crypto: { randomUUID: () => "synthetic-document" }, performance: { timeOrigin: 1000, now: () => now },
    location: { href: "http://127.0.0.1:4214/evaready-electrical/", pathname: "/evaready-electrical/" },
    // The tsx transform only names functions; it must not introduce shared globals.
    __name: (value: unknown) => value };
  runInNewContext(`(${observeNativeFetch.toString()})("http://127.0.0.1:4214")`, sandbox);
  const fetch = window.fetch as (input: string) => Promise<unknown>;
  const activity = () => window.__evNativeFetchActivity as NativeFetchActivity;
  const successful = fetch.call(window, "/evaready-electrical/synthetic/");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].input, "/evaready-electrical/synthetic/");
  assert.equal(activity().pending.length, 1);
  now = 10;
  const response = new SyntheticResponse(200);
  calls[0].resolve(response);
  assert.equal(await successful, response);
  assert.equal(activity().pending.length, 0);
  assert.equal(activity().lastActivityAt, 1010);
  assert.deepEqual(events.map(row => row.event), ["started", "headers-received"]);
  const failure = new Error("Synthetic native rejection");
  const rejected = fetch.call(window, "/evaready-electrical/synthetic-rejected/");
  assert.equal(activity().pending.length, 1);
  now = 20;
  calls[1].reject(failure);
  await assert.rejects(rejected, error => error === failure);
  assert.equal(activity().pending.length, 0);
  assert.equal(activity().lastActivityAt, 1020);
  assert.deepEqual(events.slice(2).map(row => row.event), ["started", "rejected"]);
  assert.equal(events.some(row => row.event === "body-complete" || row.event === "consumer-cancel"), false);
  const outside = fetch.call(window, "https://example.invalid/synthetic/");
  assert.equal(calls[2].input, "https://example.invalid/synthetic/");
  assert.equal(activity().pending.length, 0);
  calls[2].resolve(response);
  assert.equal(await outside, response);
  await (window.__evDrainFetchEvidence as () => Promise<void>)();
  assert.equal(events.length, 4);
  assert.equal(readerRequests, 0);
  now = 520;
  assert.equal(nativeFetchIsQuiet(activity()), true);
});

test("only an observed successful HEAD receipt explains Chromium's post-header cancellation", () => {
  assert.equal(explainedCancellation(head, [received]), "head-completed-at-headers");
  assert.equal(explainedCancellation(head, []), null);
  assert.equal(explainedCancellation(head, [received, received]), null);
  for (const change of [{ status: 404 }, { status: undefined }, { failure: "net::ERR_FAILED" }, { method: "GET" }, { resourceType: "document" }, { pathname: "/unknown/" }, { uniqueFetchRequest: false }, { requestKey: `${head.requestKey}?different=1` }]) {
    assert.equal(explainedCancellation({ ...head, ...change }, [received]), null);
  }
});

test("repeated HEAD proof requires a complete unanimous group of distinct native receipts", () => {
  const requests = [head, { ...head, failure: undefined }];
  const receipts = [{ ...received, callId: "synthetic-document:1" }, { ...received, callId: "synthetic-document:2" }];
  assert.deepEqual(reconciledHeadGroup(head, requests, receipts), {
    explanation: "complete-identical-head-group-at-headers", requestCount: 2,
    nativeCallIds: ["synthetic-document:1", "synthetic-document:2"],
  });
  for (const incomplete of [[], receipts.slice(0, 1), [...receipts, { ...received, callId: "extra" }],
    [receipts[0], receipts[0]], [received, received], [receipts[0], { ...receipts[1], status: 404 }],
    [receipts[0], { ...receipts[1], requestKey: "/unrelated/" }]]) {
    assert.equal(reconciledHeadGroup(head, requests, incomplete), null);
  }
  for (const change of [{ status: 500 }, { status: undefined }, { method: "GET" },
    { resourceType: "document" }, { failure: "net::ERR_FAILED" }, { pathname: "/different/" }]) {
    assert.equal(reconciledHeadGroup(head, [head, { ...head, ...change }], receipts), null);
  }
  assert.equal(reconciledHeadGroup({ ...head, method: "GET" }, requests, receipts), null);
  assert.equal(reconciledHeadGroup(head, [head], receipts.slice(0, 1)), null);
});

test("GET cancellation requires an observed consumer cancel of the same successful Next prefetch", () => {
  const row = { ...head, method: "GET", prefetch: true, pathname: "/evaready-electrical/__next._index.txt", requestKey: "/evaready-electrical/__next._index.txt?_rsc=synthetic" };
  const observed: FetchObservation[] = [
    { pathname: row.pathname, requestKey: row.requestKey, method: "GET", status: 200, event: "headers-received" },
    { pathname: row.pathname, requestKey: row.requestKey, method: "GET", event: "consumer-cancel" },
  ];
  assert.equal(explainedCancellation(row, observed), "observed-next-prefetch-consumer-cancel");
  assert.equal(explainedCancellation(row, observed.slice(0, 1)), null);
  assert.equal(explainedCancellation(row, observed.slice(1)), null);
  assert.equal(explainedCancellation({ ...row, prefetch: false }, observed), null);
  assert.equal(explainedCancellation({ ...row, pathname: "/evaready-electrical/image.webp" }, observed), null);
  assert.equal(explainedCancellation({ ...row, status: 500 }, observed), null);
  const completed: FetchObservation[] = [observed[0], { pathname: row.pathname, requestKey: row.requestKey, method: "GET", event: "body-complete", bytes: 800 }];
  assert.equal(explainedCancellation({ ...row, responseBytes: 800 }, completed), "next-prefetch-body-read-completely");
  assert.equal(explainedCancellation({ ...row, responseBytes: 801 }, completed), null);
  assert.equal(explainedCancellation(row, completed), null);
});

test("repeated prefetch proof reconciles every distinct receipt and rejects incomplete or mismatched groups", () => {
  const row = { ...head, method: "GET", prefetch: true, responseBytes: 800,
    pathname: "/evaready-electrical/__next._index.txt", requestKey: "/evaready-electrical/__next._index.txt?_rsc=synthetic" };
  const receipt: FetchObservation = { pathname: row.pathname, requestKey: row.requestKey, method: "GET", status: 200,
    event: "headers-received", callId: "synthetic-document:1" };
  const proof: FetchObservation[] = [receipt, { ...receipt, event: "body-complete", bytes: 800 },
    { ...receipt, callId: "synthetic-document:2" }, { ...receipt, callId: "synthetic-document:2", event: "consumer-cancel" }];
  assert.equal(reconciledPrefetchGroup(row, [row, row], proof)?.requestCount, 2);
  for (const invalid of [proof.slice(0, 3), proof.slice(1), [...proof, receipt],
    proof.map(item => ({ ...item, callId: "duplicate" })), proof.map(item => ({ ...item, callId: undefined })),
    proof.map(item => item.event === "body-complete" ? { ...item, bytes: 799 } : item),
    [...proof, { ...receipt, callId: "unmatched", event: "body-complete" as const, bytes: 800 }]]) {
    assert.equal(reconciledPrefetchGroup(row, [row, row], invalid), null);
  }
  for (const change of [{ status: 500 }, { responseBytes: 799 }, { prefetch: false }, { resourceType: "document" },
    { failure: "net::ERR_FAILED" }, { requestKey: "/other/" }]) {
    assert.equal(reconciledPrefetchGroup(row, [row, { ...row, ...change }], proof), null);
  }
  assert.equal(reconciledPrefetchGroup({ ...row, pathname: "/image.webp" }, [row, row], proof), null);
  assert.equal(reconciledPrefetchGroup({ ...row, method: "HEAD" }, [row, row], proof), null);
  assert.equal(reconciledPrefetchGroup(row, [row], proof.slice(0, 2)), null);
});
