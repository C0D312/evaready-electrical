import assert from "node:assert/strict";
import test from "node:test";
import { resolvePreviewUrl } from "../e2e/support/preview-url";

test("preview URL resolver preserves the GitHub Pages base path", () => {
  const target = resolvePreviewUrl(
    "http://127.0.0.1:4176/evaready-electrical/",
    "service-areas/example/example/example/",
  );
  assert.equal(
    target.pathname,
    "/evaready-electrical/service-areas/example/example/example/",
  );
});

test("preview URL resolver rejects origin-relative leading-slash routes", () => {
  assert.throws(
    () =>
      resolvePreviewUrl(
        "http://127.0.0.1:4176/evaready-electrical/",
        "/service-areas/example/example/example/",
      ),
    /must be base-path-relative/,
  );
});

test("preview URL resolver rejects a root-mounted base URL", () => {
  assert.throws(
    () => resolvePreviewUrl("http://127.0.0.1:4176/", "service-areas/example/"),
    /must end with \/evaready-electrical\//,
  );
});
