import { createHash } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  realpathSync,
} from "node:fs";
import path from "node:path";

export type SegmentAlias = {
  alias: string;
  source: string;
  bytes: number;
  sha256: string;
};

export type StaticSegmentAliasManifest = {
  schemaVersion: 1;
  strategy: "copy-nested-next-segment-payloads";
  sourceCommit: string;
  nextVersion: string;
  platform: NodeJS.Platform;
  aliasCount: number;
  duplicatedBytes: number;
  aliases: SegmentAlias[];
};

export function isPathInsideDirectory(root: string, candidate: string) {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return (
    relative === "" ||
    (!path.isAbsolute(relative) &&
      relative !== ".." &&
      !relative.startsWith(`..${path.sep}`))
  );
}

function assertInsideDirectory(root: string, candidate: string, label: string) {
  if (!isPathInsideDirectory(root, candidate)) {
    throw new Error(`${label} escaped static export directory: ${candidate}`);
  }
}

function walk(directory: string, exportRootRealPath: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      throw new Error(`Symbolic links are not allowed in static export: ${absolute}`);
    }
    if (entry.isDirectory()) {
      assertInsideDirectory(
        exportRootRealPath,
        realpathSync(absolute),
        "Static export directory",
      );
      return walk(absolute, exportRootRealPath);
    }
    if (entry.isFile()) {
      assertInsideDirectory(
        exportRootRealPath,
        realpathSync(absolute),
        "Static export file",
      );
      return [absolute];
    }
    throw new Error(`Unsupported static export entry: ${absolute}`);
  });
}

function sha256(contents: Buffer) {
  return createHash("sha256").update(contents).digest("hex");
}

export function createStaticSegmentAliasManifest(
  aliases: SegmentAlias[],
  identity: Pick<
    StaticSegmentAliasManifest,
    "sourceCommit" | "nextVersion" | "platform"
  >,
): StaticSegmentAliasManifest {
  const sortedAliases = aliases
    .map((alias) => ({ ...alias }))
    .sort((left, right) => left.alias.localeCompare(right.alias));
  return {
    schemaVersion: 1,
    strategy: "copy-nested-next-segment-payloads",
    ...identity,
    aliasCount: sortedAliases.length,
    duplicatedBytes: sortedAliases.reduce(
      (total, alias) => total + alias.bytes,
      0,
    ),
    aliases: sortedAliases,
  };
}

/**
 * Next 16 exports segment payloads into nested __next.* directories while the
 * client requests a flat filename. Materialise equivalent files so the export
 * works on static hosts without server rewrites.
 */
export function generateStaticSegmentAliases(outDir: string): SegmentAlias[] {
  const exportRoot = path.resolve(outDir);
  if (!existsSync(exportRoot)) {
    throw new Error(`Static export directory not found: ${exportRoot}`);
  }
  const exportRootStats = lstatSync(exportRoot);
  if (exportRootStats.isSymbolicLink() || !exportRootStats.isDirectory()) {
    throw new Error(`Static export directory must be a real directory: ${exportRoot}`);
  }
  const exportRootRealPath = realpathSync(exportRoot);

  const aliases: SegmentAlias[] = [];
  for (const source of walk(exportRoot, exportRootRealPath)) {
    if (path.basename(source) !== "__PAGE__.txt") continue;
    const relativeParts = path.relative(exportRoot, source).split(path.sep);
    const nextIndex = relativeParts.findIndex((part) => part.startsWith("__next."));
    if (nextIndex < 0) continue;

    const routeParts = relativeParts.slice(0, nextIndex);
    const segmentParts = relativeParts.slice(nextIndex, -1);
    const aliasName = `${segmentParts.join(".")}.__PAGE__.txt`;
    const alias = path.resolve(exportRoot, ...routeParts, aliasName);
    assertInsideDirectory(exportRoot, alias, "Segment alias");
    const aliasParentRealPath = realpathSync(path.dirname(alias));
    assertInsideDirectory(
      exportRootRealPath,
      aliasParentRealPath,
      "Segment alias parent",
    );

    const sourceContents = readFileSync(source);
    if (existsSync(alias)) {
      const aliasStats = lstatSync(alias);
      if (aliasStats.isSymbolicLink() || !aliasStats.isFile()) {
        throw new Error(`Static segment alias must be a real file: ${alias}`);
      }
      assertInsideDirectory(
        exportRootRealPath,
        realpathSync(alias),
        "Static segment alias",
      );
      if (!sourceContents.equals(readFileSync(alias))) {
        throw new Error(`Conflicting static segment alias: ${alias}`);
      }
    } else {
      copyFileSync(source, alias);
      if (!sourceContents.equals(readFileSync(alias))) {
        throw new Error(`Static segment alias copy failed byte verification: ${alias}`);
      }
    }
    aliases.push({
      source: path.relative(exportRoot, source).replaceAll(path.sep, "/"),
      alias: path.relative(exportRoot, alias).replaceAll(path.sep, "/"),
      bytes: sourceContents.byteLength,
      sha256: sha256(sourceContents),
    });
  }
  return aliases.sort((left, right) => left.alias.localeCompare(right.alias));
}
