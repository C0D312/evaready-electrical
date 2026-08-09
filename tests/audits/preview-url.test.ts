import assert from "node:assert/strict";
import test from "node:test";
import { isLocationIndexationSpecFile } from "../../scripts/lib/playwright-evidence";
import { resolveStaticExportServerOptions } from "../../scripts/lib/static-export-server-options";
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

test("static export CLI options override an incorrect environment", () => {
  const options = resolveStaticExportServerOptions({
    argv: [
      "--host=127.0.0.1",
      "--port=4177",
      "--base-path=/evaready-electrical/",
      "--strict-base-path",
    ],
    deploymentBasePath: "",
    env: {
      STATIC_EXPORT_BASE_PATH: "/wrong-environment-path",
      STATIC_EXPORT_HOST: "0.0.0.0",
      STATIC_EXPORT_PORT: "9999",
    },
  });

  assert.deepEqual(options, {
    basePath: "/evaready-electrical",
    host: "127.0.0.1",
    port: 4177,
    requireBasePath: true,
  });
});

test("strict static export mode rejects a root-mounted server", () => {
  assert.throws(
    () =>
      resolveStaticExportServerOptions({
        argv: ["--base-path=/", "--strict-base-path"],
        deploymentBasePath: "",
        env: {},
      }),
    /requires a non-root --base-path/,
  );
});

test("Playwright evidence recognises basename and full-path spec reports", () => {
  assert.equal(isLocationIndexationSpecFile("location-indexation.spec.ts"), true);
  assert.equal(
    isLocationIndexationSpecFile("tests/e2e/location-indexation.spec.ts"),
    true,
  );
  assert.equal(
    isLocationIndexationSpecFile("tests\\e2e\\location-indexation.spec.ts"),
    true,
  );
  assert.equal(isLocationIndexationSpecFile("other.spec.ts"), false);
});
