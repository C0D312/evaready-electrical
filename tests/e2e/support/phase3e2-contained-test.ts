import { expect, test as contained } from "./contained-test";
import type { Request, Response, ConsoleMessage } from "@playwright/test";
import { createHash } from "node:crypto";
import { explainedCancellation, reconciledHeadGroup, reconciledPrefetchGroup, observeNativeFetch,
  observeResourceTiming, provenStaticResourceReuse, type StaticTransportEvidence, type ResourceTimingEvidence,
  nativeFetchIsQuiet, responseInventoryIsComplete, type NativeFetchActivity, type FetchObservation } from "./phase3e2-network-evidence";

export { expect } from "./contained-test";
export type { Locator, Page } from "./contained-test";

type RequestEvidence = {
  id: number;
  pathname: string;
  requestKey: string;
  method: string;
  resourceType: string;
  status?: number;
  responseBytes?: number;
  failure?: string;
  prefetch: boolean;
  transport?: StaticTransportEvidence["transport"];
  transportObservationError?: string;
};

export const test = contained.extend<{ phase3e2RuntimeEvidence: void }>({
  phase3e2RuntimeEvidence: [async ({ page, baseURL, browserName, containedIntegrations }, runFixture, testInfo) => {
    void containedIntegrations;
    const origin = new URL(String(baseURL)).origin;
    const fetchObservations: FetchObservation[] = [];
    const resourceTimings: ResourceTimingEvidence[] = [];
    const pendingTransports = new Set<Promise<void>>();
    const pendingRequests = new Set<Request>();
    let lastRequestActivityAt = performance.now();
    await page.exposeBinding("__evRecordFetch", (_source, row: FetchObservation) => { fetchObservations.push(row); });
    await page.exposeBinding("__evRecordResourceTiming", (_source, row: ResourceTimingEvidence) => { resourceTimings.push(row); });
    await page.addInitScript(observeNativeFetch, origin);
    await page.addInitScript(observeResourceTiming, origin);
    const requests = new Map<Request, RequestEvidence>();
    const consoleErrors: { text: string; pathname: string | null }[] = [];
    const runtimeErrors: string[] = [];
    const expectedMissingPath = "/evaready-electrical/phase3e2-footer-missing-route/";
    const expectsMissingDocument = testInfo.title.startsWith("/phase3e2-footer-missing-route: footer ");
    function onRequest(request: Request) {
      const url = new URL(request.url());
      if (url.origin !== origin) return;
      pendingRequests.add(request);
      lastRequestActivityAt = performance.now();
      requests.set(request, { id: requests.size + 1, pathname: url.pathname, requestKey: `${url.pathname}${url.search}`,
        method: request.method(), resourceType: request.resourceType(), prefetch: request.headers()["next-router-prefetch"] === "1" });
    }
    function onResponse(response: Response) {
      const record = requests.get(response.request());
      if (record) {
        lastRequestActivityAt = performance.now();
        record.status = response.status();
        const bytes = response.headers()["content-length"];
        if (bytes !== undefined && /^\d+$/.test(bytes)) record.responseBytes = Number(bytes);
      }
    }
    function onFailure(request: Request) {
      const record = requests.get(request);
      if (record) {
        pendingRequests.delete(request);
        lastRequestActivityAt = performance.now();
        record.failure = request.failure()?.errorText || "Unspecified request failure";
      }
    }
    function onFinished(request: Request) {
      const row = requests.get(request);
      if (row) {
        pendingRequests.delete(request);
        lastRequestActivityAt = performance.now();
      }
      if (!row || row.method !== "GET" || row.requestKey !== row.pathname ||
        !/\/(?:_next\/static|images)\//.test(row.pathname) ||
        !["script", "stylesheet", "image", "font"].includes(row.resourceType)) return;
      const observation = (async () => {
        try {
          const response = await request.response();
          if (!response) throw new Error("Finished request has no response");
          const finished = await response.finished();
          const body = await response.body();
          row.transport = { ...request.timing(), serviceWorker: response.fromServiceWorker(),
            finished: finished === null, bytes: body.length, sha256: createHash("sha256").update(body).digest("hex") };
        } catch (error) {
          row.transportObservationError = String(error);
        }
      })();
      pendingTransports.add(observation);
      void observation.finally(() => pendingTransports.delete(observation));
    }
    function onConsole(message: ConsoleMessage) {
      if (message.type() !== "error") return;
      const source = message.location().url;
      let pathname: string | null = null;
      if (source) {
        try { const url = new URL(source); if (url.origin === origin) pathname = url.pathname; } catch { /* Non-URL console source is retained as unknown. */ }
      }
      consoleErrors.push({ text: message.text(), pathname });
    }
    const onError = (error: Error) => runtimeErrors.push(error.message);
    page.on("request", onRequest);
    page.on("response", onResponse);
    page.on("requestfailed", onFailure);
    page.on("requestfinished", onFinished);
    page.on("console", onConsole);
    page.on("pageerror", onError);
    try {
      await runFixture();
    } finally {
      const collectionErrors: string[] = [];
      const boundaryBefore = { requests: requests.size, pendingRequestIds: [...pendingRequests].map(request => requests.get(request)!.id) };
      // Keep listeners alive through naturally scheduled prefetches and decoded
      // resource observations. Draining binding messages alone is not network completion.
      if (!page.isClosed()) {
        try {
          await expect.poll(async () => {
            const native = await page.evaluate(() =>
              (window as unknown as { __evNativeFetchActivity: NativeFetchActivity }).__evNativeFetchActivity);
            return !!native && nativeFetchIsQuiet(native) && pendingRequests.size === 0 &&
              pendingTransports.size === 0 && performance.now() - lastRequestActivityAt >= 500;
          }, { message: "Retain request listeners until native activity and all observed local requests settle" }).toBe(true);
        } catch (error) { collectionErrors.push(String(error)); }
      }
      if (!page.isClosed()) await page.evaluate(async () => {
        const drain = (window as unknown as { __evDrainFetchEvidence?: () => Promise<unknown> }).__evDrainFetchEvidence;
        if (drain) await drain();
        const resources = (window as unknown as { __evDrainResourceEvidence?: () => Promise<unknown> }).__evDrainResourceEvidence;
        if (resources) await resources();
      });
      await Promise.all([...pendingTransports]);
      page.off("request", onRequest);
      page.off("response", onResponse);
      page.off("requestfailed", onFailure);
      page.off("requestfinished", onFinished);
      page.off("console", onConsole);
      page.off("pageerror", onError);
      const observed = [...requests.values()];
      const staticResourceReuse = observed.flatMap(row => {
        const proof = provenStaticResourceReuse(row, observed, resourceTimings, browserName);
        return proof ? [proof] : [];
      });
      const expected404 = (row: RequestEvidence) => expectsMissingDocument &&
        row.pathname === expectedMissingPath && row.resourceType === "document" && row.status === 404 && !row.failure;
      const unexpectedResponses = observed.filter(row => row.status !== undefined && row.status >= 400 && !expected404(row));
      const failedRequests = observed.filter(row => row.failure !== undefined);
      const explainedCancellations = failedRequests.map(row => ({ ...row, explanation: explainedCancellation({ ...row,
        uniqueFetchRequest: observed.filter(item => item.resourceType === "fetch" && item.method === row.method && item.requestKey === row.requestKey).length === 1,
      }, fetchObservations) ?? reconciledHeadGroup(row, observed, fetchObservations) ??
        reconciledPrefetchGroup(row, observed, fetchObservations) }));
      const unexplainedFailures = explainedCancellations.filter(row => row.explanation === null);
      const unexpectedConsole = consoleErrors.filter(row => !(expectsMissingDocument &&
        row.pathname === expectedMissingPath && /\b404\b/.test(row.text) && /Failed to load resource/i.test(row.text)));
      await testInfo.attach("first-party-runtime-evidence", { body: JSON.stringify({
        browserName, browserVersion: page.context().browser()?.version(), platform: process.platform,
        requests: observed, consoleErrors, runtimeErrors, fetchObservations, explainedCancellations,
        resourceTimings, staticResourceReuse,
        collectionBoundary: { before: boundaryBefore, requests: requests.size,
          pendingRequestIds: [...pendingRequests].map(request => requests.get(request)!.id),
          pendingTransports: pendingTransports.size, collectionErrors },
        expectedMissingDocument: expectsMissingDocument ? expectedMissingPath : null,
        limitation: "Page-level observations end before controlled context teardown; the separate fail-closed proxy retains teardown decisions.",
      }), contentType: "application/json" });
      expect(collectionErrors, "Network evidence must finish collecting before controlled teardown").toEqual([]);
      expect(pendingRequests.size, "Every observed local request must reach a terminal event").toBe(0);
      expect(responseInventoryIsComplete(observed), "Every local request must retain its actual HTTP response status").toBe(true);
      expect(runtimeErrors, "Uncaught browser runtime errors").toEqual([]);
      expect(unexpectedResponses, "Unexpected first-party HTTP failures").toEqual([]);
      expect(unexplainedFailures, "Unexplained first-party failures; all cancellations remain in evidence").toEqual([]);
      expect(unexpectedConsole, "Unexpected browser console errors").toEqual([]);
    }
  }, { auto: true }],
});
