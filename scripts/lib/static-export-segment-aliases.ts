import {
  copyFileSync,
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import path from "node:path";

export type SegmentAlias = {
  alias: string;
  source: string;
  bytes: number;
};

function isInsideDirectory(root: string, candidate: string) {
  const relative = path.relative(root, candidate);
  return (
    relative === "" ||
    (!path.isAbsolute(relative) &&
      relative !== ".." &&
      !relative.startsWith(`..${path.sep}`))
  );
}

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory()
      ? walk(absolute)
      : entry.isFile()
        ? [absolute]
        : [];
  });
}

function sameContents(left: string, right: string) {
  return readFileSync(left).equals(readFileSync(right));
}

/**
 * Next 16 exports segment payloads into nested __next.* directories while the
 * client requests a flat filename. Materialise equivalent files so the export
 * works on static hosts without server rewrites.
 */
export function generateStaticSegmentAliases(outDir: string): SegmentAlias[] {
  const exportRoot = path.resolve(outDir);
  if (!existsSync(exportRoot) || !statSync(exportRoot).isDirectory()) {
    throw new Error(`Static export directory not found: ${exportRoot}`);
  }

  const aliases: SegmentAlias[] = [];
  for (const source of walk(exportRoot)) {
    if (path.basename(source) !== "__PAGE__.txt") continue;
    const relativeParts = path.relative(exportRoot, source).split(path.sep);
    const nextIndex = relativeParts.findIndex((part) => part.startsWith("__next."));
    if (nextIndex < 0) continue;

    const routeParts = relativeParts.slice(0, nextIndex);
    const segmentParts = relativeParts.slice(nextIndex, -1);
    const aliasName = `${segmentParts.join(".")}.__PAGE__.txt`;
    const alias = path.resolve(exportRoot, ...routeParts, aliasName);
    if (!isInsideDirectory(exportRoot, alias)) {
      throw new Error(`Segment alias escaped export directory: ${alias}`);
    }
    if (existsSync(alias) && !sameContents(source, alias)) {
      throw new Error(`Conflicting static segment alias: ${alias}`);
    }
    if (!existsSync(alias)) copyFileSync(source, alias);
    aliases.push({
      source: path.relative(exportRoot, source).replaceAll(path.sep, "/"),
      alias: path.relative(exportRoot, alias).replaceAll(path.sep, "/"),
      bytes: statSync(source).size,
    });
  }
  return aliases.sort((left, right) => left.alias.localeCompare(right.alias));
}
