import assert from "node:assert/strict";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { isLocationIndexationSpecFile } from "../../scripts/lib/playwright-evidence";
import { generateStaticSegmentAliases } from "../../scripts/lib/static-export-segment-aliases";
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

test("static export aliases materialise fixed Next segment payloads", () => {
  const outDir = mkdtempSync(path.join(os.tmpdir(), "evaready-segment-fixed-"));
  try {
    const routeDir = path.join(outDir, "services");
    const nested = path.join(routeDir, "__next.services", "__PAGE__.txt");
    mkdirSync(path.dirname(nested), { recursive: true });
    writeFileSync(nested, "segment payload");

    const aliases = generateStaticSegmentAliases(outDir);
    const alias = path.join(routeDir, "__next.services.__PAGE__.txt");
    assert.deepEqual(aliases, [
      {
        alias: "services/__next.services.__PAGE__.txt",
        source: "services/__next.services/__PAGE__.txt",
        bytes: 15,
      },
    ]);
    assert.equal(readFileSync(alias, "utf8"), "segment payload");
  } finally {
    rmSync(outDir, { force: true, recursive: true });
  }
});

test("static export aliases materialise dynamic Next segment payloads", () => {
  const outDir = mkdtempSync(path.join(os.tmpdir(), "evaready-segment-dynamic-"));
  try {
    const routeDir = path.join(outDir, "services", "example");
    const nested = path.join(
      routeDir,
      "__next.services",
      "$d$slug",
      "__PAGE__.txt",
    );
    mkdirSync(path.dirname(nested), { recursive: true });
    writeFileSync(nested, "dynamic segment payload");

    const aliases = generateStaticSegmentAliases(outDir);
    const alias = path.join(
      routeDir,
      "__next.services.$d$slug.__PAGE__.txt",
    );
    assert.equal(aliases.length, 1);
    assert.equal(readFileSync(alias, "utf8"), "dynamic segment payload");
  } finally {
    rmSync(outDir, { force: true, recursive: true });
  }
});

test("static export aliases ignore unrelated files", () => {
  const outDir = mkdtempSync(path.join(os.tmpdir(), "evaready-segment-safe-"));
  try {
    writeFileSync(path.join(outDir, "ordinary.txt"), "ordinary");
    assert.deepEqual(generateStaticSegmentAliases(outDir), []);
  } finally {
    rmSync(outDir, { force: true, recursive: true });
  }
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
