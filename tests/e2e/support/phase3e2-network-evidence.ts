export type FetchObservation = {
  callId?: string;
  observedAt?: number;
  documentPathname?: string;
  pathname: string;
  requestKey: string;
  method: string;
  status?: number;
  bytes?: number;
  event: "started" | "rejected" | "headers-received" | "consumer-cancel" | "body-complete";
};

export type NetworkRequestEvidence = {
  pathname: string;
  requestKey: string;
  method: string;
  resourceType: string;
  status?: number;
  responseBytes?: number;
  failure?: string;
  prefetch: boolean;
  uniqueFetchRequest: boolean;
};

export type NativeFetchActivity = { pending: unknown[]; lastActivityAt: number; observedAt: number };

export function nativeFetchIsQuiet(activity: NativeFetchActivity, quietMs = 500) {
  return Array.isArray(activity.pending) && activity.pending.length === 0 &&
    Number.isFinite(activity.lastActivityAt) && Number.isFinite(activity.observedAt) &&
    Number.isFinite(quietMs) && quietMs >= 500 && activity.observedAt - activity.lastActivityAt >= quietMs;
}

export function responseInventoryIsComplete(rows: { status?: number }[]) {
  return rows.every(row => Number.isInteger(row.status) && row.status! >= 100 && row.status! <= 599);
}

export type StaticTransportEvidence = {
  id: number;
  pathname: string;
  requestKey: string;
  method: string;
  resourceType: string;
  status?: number;
  failure?: string;
  responseBytes?: number;
  transport?: {
    startTime: number;
    domainLookupStart: number;
    domainLookupEnd: number;
    connectStart: number;
    connectEnd: number;
    requestStart: number;
    responseStart: number;
    responseEnd: number;
    serviceWorker: boolean;
    finished: boolean;
    bytes: number;
    sha256: string;
  };
};

export type ResourceTimingEvidence = {
  id: string;
  pathname: string;
  timeOrigin: number;
  startTime: number;
  transferSize: number;
  responseStart: number;
  workerStart: number;
  nextHopProtocol: string;
};

// This accounts for a retained request event, not an ignored network request.
// The offline reconciler also checks the exact bytes against the served export
// and requires every remaining event to match the fail-closed proxy inventory.
export function provenStaticResourceReuse(row: StaticTransportEvidence,
  requests: StaticTransportEvidence[], resources: ResourceTimingEvidence[], browserName: string) {
  const transport = row.transport;
  if (browserName !== "webkit" || row.method !== "GET" || row.status !== 200 || row.failure ||
    row.requestKey !== row.pathname || !/^\/evaready-electrical\/(?:_next\/static|images)\//.test(row.pathname) ||
    !["script", "stylesheet", "image", "font"].includes(row.resourceType) || !transport ||
    !transport.finished || transport.serviceWorker || transport.bytes <= 0 || transport.bytes !== row.responseBytes ||
    !/^[a-f0-9]{64}$/.test(transport.sha256) || !Number.isFinite(transport.startTime) ||
    [transport.domainLookupStart, transport.domainLookupEnd, transport.connectStart, transport.connectEnd,
      transport.requestStart].some(value => value !== -1) || transport.responseStart < 0 ||
    transport.responseEnd !== transport.responseStart) return null;
  const timing = resources.filter(item => item.pathname === row.pathname &&
    Math.abs(item.timeOrigin + item.startTime - transport.startTime) <= 50);
  if (timing.length !== 1 || !timing[0].id || timing[0].transferSize !== 0 || timing[0].responseStart !== 0 ||
    timing[0].workerStart !== 0 || timing[0].nextHopProtocol !== "") return null;
  const earlier = requests.filter(item => item.id < row.id && item.requestKey === row.requestKey &&
    item.method === "GET" && item.resourceType === row.resourceType && item.status === 200 && !item.failure &&
    item.transport?.finished && !item.transport.serviceWorker && item.transport.requestStart >= 0 &&
    item.transport.startTime < transport.startTime && item.transport.responseEnd > item.transport.responseStart &&
    item.transport.bytes === transport.bytes && item.transport.sha256 === transport.sha256 &&
    item.responseBytes === transport.bytes);
  if (!earlier.length) return null;
  return { requestId: row.id, priorNetworkRequestId: earlier[0].id, resourceTimingId: timing[0].id,
    pathname: row.pathname, bytes: transport.bytes, sha256: transport.sha256,
    classification: "observed-local-static-resource-reuse-without-new-transport" };
}

export function observeResourceTiming(origin: string) {
  const documentId = crypto.randomUUID();
  let sequence = 0;
  const pending = new Set<Promise<void>>();
  const errors: string[] = [];
  const record = (entries: PerformanceEntry[]) => {
    for (const item of entries as PerformanceResourceTiming[]) {
      const url = new URL(item.name, location.href);
      if (url.origin !== origin || url.search || !/\/(?:_next\/static|images)\//.test(url.pathname)) continue;
      const receiver = (window as unknown as { __evRecordResourceTiming: (row: ResourceTimingEvidence) => Promise<void> }).__evRecordResourceTiming;
      const delivery = receiver({ id: `${documentId}:${++sequence}`, pathname: url.pathname,
        timeOrigin: performance.timeOrigin, startTime: item.startTime, transferSize: item.transferSize,
        responseStart: item.responseStart, workerStart: item.workerStart, nextHopProtocol: item.nextHopProtocol });
      pending.add(delivery);
      void delivery.then(() => pending.delete(delivery), error => { errors.push(String(error)); pending.delete(delivery); });
    }
  };
  const observer = new PerformanceObserver(list => record(list.getEntries()));
  observer.observe({ type: "resource", buffered: true });
  Object.defineProperty(window, "__evDrainResourceEvidence", { value: async () => {
    record(observer.takeRecords());
    await Promise.all([...pending]);
    if (errors.length) throw new Error(`Resource evidence delivery failed: ${JSON.stringify(errors)}`);
  } });
}

export function explainedCancellation(row: NetworkRequestEvidence, observations: FetchObservation[]) {
  if (!row.uniqueFetchRequest || row.failure !== "net::ERR_ABORTED" || row.status !== 200 || row.resourceType !== "fetch") return null;
  const matching = observations.filter(item => item.requestKey === row.requestKey && item.pathname === row.pathname && item.method === row.method);
  const receipts = matching.filter(item => item.event === "headers-received");
  if (receipts.length !== 1 || receipts[0].status !== 200) return null;
  if (row.method === "HEAD") return "head-completed-at-headers";
  if (row.method === "GET" && row.prefetch && /\/__next\.[^/]+\.txt$/.test(row.pathname)) {
    if (row.responseBytes !== undefined && row.responseBytes > 0 && matching.some(item =>
      item.event === "body-complete" && item.bytes === row.responseBytes)) return "next-prefetch-body-read-completely";
    if (matching.some(item => item.event === "consumer-cancel")) return "observed-next-prefetch-consumer-cancel";
  }
  return null;
}

// Identical HEAD calls need a complete group proof, not a guessed individual
// pairing: every observed request and every distinct native receipt must be 200.
export function reconciledHeadGroup(row: Omit<NetworkRequestEvidence, "uniqueFetchRequest">,
  requests: Omit<NetworkRequestEvidence, "uniqueFetchRequest">[], observations: FetchObservation[]) {
  if (row.method !== "HEAD" || row.resourceType !== "fetch" || row.status !== 200 || row.failure !== "net::ERR_ABORTED") return null;
  const group = requests.filter(item => item.method === row.method && item.requestKey === row.requestKey && item.pathname === row.pathname);
  const receipts = observations.filter(item => item.method === row.method && item.requestKey === row.requestKey &&
    item.pathname === row.pathname && item.event === "headers-received");
  if (group.length < 2 || receipts.length !== group.length ||
    group.some(item => item.resourceType !== "fetch" || item.status !== 200 || (item.failure && item.failure !== "net::ERR_ABORTED")) ||
    receipts.some(item => item.status !== 200 || !item.callId) || new Set(receipts.map(item => item.callId)).size !== group.length) return null;
  return { explanation: "complete-identical-head-group-at-headers", requestCount: group.length,
    nativeCallIds: receipts.map(item => item.callId!).sort() };
}

export function reconciledPrefetchGroup(row: Omit<NetworkRequestEvidence, "uniqueFetchRequest">,
  requests: Omit<NetworkRequestEvidence, "uniqueFetchRequest">[], observations: FetchObservation[]) {
  if (row.method !== "GET" || !row.prefetch || row.failure !== "net::ERR_ABORTED" ||
    !/\/__next\.[^/]+\.txt$/.test(row.pathname) || !row.responseBytes || row.responseBytes < 0) return null;
  const group = requests.filter(item => item.method === row.method && item.requestKey === row.requestKey && item.pathname === row.pathname);
  const native = observations.filter(item => item.method === row.method && item.requestKey === row.requestKey && item.pathname === row.pathname);
  const receipts = native.filter(item => item.event === "headers-received");
  const ids = new Set(receipts.map(item => item.callId));
  if (group.length < 2 || receipts.length !== group.length || ids.size !== group.length || ids.has(undefined) ||
    group.some(item => item.resourceType !== "fetch" || !item.prefetch || item.status !== 200 ||
      item.responseBytes !== row.responseBytes || (item.failure && item.failure !== "net::ERR_ABORTED")) ||
    receipts.some(item => item.status !== 200) || native.some(item => !ids.has(item.callId))) return null;
  const proof = receipts.map(receipt => ({ callId: receipt.callId!,
    complete: native.some(item => item.callId === receipt.callId && item.event === "body-complete" && item.bytes === row.responseBytes),
    consumerCancel: native.some(item => item.callId === receipt.callId && item.event === "consumer-cancel"),
  }));
  if (proof.some(item => !item.complete && !item.consumerCancel)) return null;
  return { explanation: "complete-identical-next-prefetch-group", requestCount: group.length, nativeCalls: proof };
}

// Observe native calls without consuming response bodies or changing cancellation.
export function observeNativeFetch(origin: string) {
  type Detail = { callId: string; pathname: string; requestKey: string; method: string };
  const documentId = crypto.randomUUID();
  let callSequence = 0;
  const streams = new WeakMap<ReadableStream, Detail>();
  const readers = new WeakMap<object, Detail>();
  const pending = new Set<Promise<unknown>>();
  const pendingFetch = new Map<string, Detail>();
  let lastActivityAt = performance.timeOrigin + performance.now();
  const errors: unknown[] = [];
  const record = (detail: Detail, event: FetchObservation["event"], status?: number, bytes?: number) => {
    const observedAt = performance.timeOrigin + performance.now();
    lastActivityAt = observedAt;
    const receiver = (window as unknown as { __evRecordFetch: (row: FetchObservation) => Promise<void> }).__evRecordFetch;
    const promise = receiver({ ...detail, event, observedAt,
      documentPathname: location.pathname, ...(status !== undefined ? { status } : {}), ...(bytes !== undefined ? { bytes } : {}) });
    pending.add(promise);
    void promise.then(() => pending.delete(promise), error => { errors.push(String(error)); pending.delete(promise); });
  };
  Object.defineProperty(window, "__evDrainFetchEvidence", { value: async () => {
    await Promise.all([...pending]);
    if (errors.length) throw new Error(`Fetch evidence delivery failed: ${JSON.stringify(errors)}`);
  } });
  Object.defineProperty(window, "__evPendingNativeFetch", { get: () => [...pendingFetch.values()] });
  Object.defineProperty(window, "__evNativeFetchActivity", { get: () => ({
    pending: [...pendingFetch.values()], lastActivityAt, observedAt: performance.timeOrigin + performance.now(),
  }) });
  const nativeFetch = window.fetch;
  window.fetch = function (...args) {
    const callId = `${documentId}:${++callSequence}`;
    let detail: Detail | undefined;
    try {
      const input = args[0];
      const url = new URL(input instanceof Request ? input.url : String(input), location.href);
      if (url.origin === origin) detail = { callId, pathname: url.pathname, requestKey: `${url.pathname}${url.search}`,
        method: (args[1]?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase() };
    } catch { /* Leave invalid-input validation and rejection to native fetch. */ }
    if (detail) { pendingFetch.set(callId, detail); record(detail, "started"); }
    return nativeFetch.apply(this, args).then(response => {
      pendingFetch.delete(callId);
      if (detail) {
        record(detail, "headers-received", response.status);
        if (response.body) streams.set(response.body, detail);
      }
      return response;
    }, error => {
      pendingFetch.delete(callId);
      if (detail) record(detail, "rejected");
      throw error;
    });
  };
  const nativeClone = Response.prototype.clone;
  Response.prototype.clone = function () {
    const detail = this.body && streams.get(this.body);
    const clone = nativeClone.call(this);
    if (detail) {
      if (this.body) streams.set(this.body, detail);
      if (clone.body) streams.set(clone.body, detail);
    }
    return clone;
  };
  const nativeTee = ReadableStream.prototype.tee;
  ReadableStream.prototype.tee = function () {
    const result = nativeTee.call(this);
    const detail = streams.get(this);
    if (detail) for (const stream of result) streams.set(stream, detail);
    return result;
  };
  const nativeGetReader = ReadableStream.prototype.getReader;
  ReadableStream.prototype.getReader = new Proxy(nativeGetReader, {
    apply(target, receiver, args) {
      const reader = Reflect.apply(target, receiver, args);
      const detail = streams.get(receiver);
      if (detail) {
        readers.set(reader, detail);
        const nativeRead = reader.read;
        let bytes = 0;
        reader.read = new Proxy(nativeRead, {
          apply(read, owner, readArgs) {
            const reading = Reflect.apply(read, owner, readArgs) as Promise<ReadableStreamReadResult<Uint8Array>>;
            return reading.then(result => {
              if (result.value) bytes += result.value.byteLength;
              if (result.done) record(detail, "body-complete", undefined, bytes);
              return result;
            });
          },
        });
      }
      return reader;
    },
  });
  const nativeStreamCancel = ReadableStream.prototype.cancel;
  ReadableStream.prototype.cancel = function (...args) {
    const result = nativeStreamCancel.apply(this, args);
    const detail = streams.get(this);
    if (detail) record(detail, "consumer-cancel");
    return result;
  };
  const nativeReaderCancel = ReadableStreamDefaultReader.prototype.cancel;
  ReadableStreamDefaultReader.prototype.cancel = function (...args) {
    const result = nativeReaderCancel.apply(this, args);
    const detail = readers.get(this);
    if (detail) record(detail, "consumer-cancel");
    return result;
  };
}
