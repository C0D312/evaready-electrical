import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { isLocationIndexationSpecFile } from "../../scripts/lib/playwright-evidence";
import {
  createStaticSegmentAliasManifest,
  generateStaticSegmentAliases,
  isPathInsideDirectory,
} from "../../scripts/lib/static-export-segment-aliases";
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
      "--pages-like",
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
    pagesLikeMime: true,
    port: 4177,
    requireBasePath: true,
  });
});

test("static export defaults preserve Next segment MIME mode", () => {
  assert.equal(
    resolveStaticExportServerOptions({
      argv: [],
      deploymentBasePath: "/evaready-electrical",
      env: {},
    }).pagesLikeMime,
    false,
  );
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
        sha256: createHash("sha256")
          .update("segment payload")
          .digest("hex"),
      },
    ]);
    assert.equal(readFileSync(alias, "utf8"), "segment payload");
    assert.deepEqual(generateStaticSegmentAliases(outDir), aliases);
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

test("static export aliases accept an existing byte-identical file", () => {
  const outDir = mkdtempSync(path.join(os.tmpdir(), "evaready-segment-existing-"));
  try {
    const routeDir = path.join(outDir, "services");
    const nested = path.join(routeDir, "__next.services", "__PAGE__.txt");
    const alias = path.join(routeDir, "__next.services.__PAGE__.txt");
    mkdirSync(path.dirname(nested), { recursive: true });
    writeFileSync(nested, "same payload");
    writeFileSync(alias, "same payload");
    assert.equal(generateStaticSegmentAliases(outDir).length, 1);
  } finally {
    rmSync(outDir, { force: true, recursive: true });
  }
});

test("static export aliases reject a conflicting existing file", () => {
  const outDir = mkdtempSync(path.join(os.tmpdir(), "evaready-segment-conflict-"));
  try {
    const routeDir = path.join(outDir, "services");
    const nested = path.join(routeDir, "__next.services", "__PAGE__.txt");
    const alias = path.join(routeDir, "__next.services.__PAGE__.txt");
    mkdirSync(path.dirname(nested), { recursive: true });
    writeFileSync(nested, "source payload");
    writeFileSync(alias, "different payload");
    assert.throws(
      () => generateStaticSegmentAliases(outDir),
      /Conflicting static segment alias/,
    );
  } finally {
    rmSync(outDir, { force: true, recursive: true });
  }
});

test("static export path containment rejects traversal", () => {
  const root = path.join(os.tmpdir(), "evaready-contained-root");
  assert.equal(isPathInsideDirectory(root, path.join(root, "services")), true);
  assert.equal(isPathInsideDirectory(root, path.join(root, "..", "escape")), false);
});

test("static export aliases reject directory symlinks and junctions", () => {
  const outDir = mkdtempSync(path.join(os.tmpdir(), "evaready-segment-link-root-"));
  const outside = mkdtempSync(path.join(os.tmpdir(), "evaready-segment-link-target-"));
  try {
    symlinkSync(
      outside,
      path.join(outDir, "linked-output"),
      process.platform === "win32" ? "junction" : "dir",
    );
    assert.throws(
      () => generateStaticSegmentAliases(outDir),
      /Symbolic links are not allowed/,
    );
  } finally {
    rmSync(outDir, { force: true, recursive: true });
    rmSync(outside, { force: true, recursive: true });
  }
});

test("static export manifest is deterministic for identical inputs", () => {
  const aliases = [
    {
      alias: "services/__next.services.__PAGE__.txt",
      source: "services/__next.services/__PAGE__.txt",
      bytes: 15,
      sha256: "0".repeat(64),
    },
  ];
  const identity = {
    sourceCommit: "a".repeat(40),
    nextVersion: "16.3.0",
    platform: process.platform,
  } as const;
  const first = createStaticSegmentAliasManifest(aliases, identity);
  const second = createStaticSegmentAliasManifest(aliases, identity);
  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal("generatedAt" in first, false);
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
