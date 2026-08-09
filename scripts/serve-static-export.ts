import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { brotliCompressSync, constants } from "node:zlib";
import { resolveDeploymentConfig } from "../config/deployment";
import { resolveStaticExportServerOptions } from "./lib/static-export-server-options";

const outDir = path.resolve(process.cwd(), "out");
const deployment = resolveDeploymentConfig();
const {
  basePath,
  host,
  port,
  requireBasePath,
} = resolveStaticExportServerOptions({
  argv: process.argv.slice(2),
  deploymentBasePath: deployment.basePath,
  env: process.env,
});

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".svg",
  ".txt",
  ".xml",
]);

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function resolveOutputPath(requestUrl: string) {
  const pathname = decodeURIComponent(
    new URL(requestUrl, `http://${host}:${port}`).pathname,
  );
  if (
    requireBasePath &&
    basePath &&
    pathname !== basePath &&
    !pathname.startsWith(`${basePath}/`)
  ) {
    return null;
  }
  const applicationPath =
    basePath &&
    (pathname === basePath || pathname.startsWith(`${basePath}/`))
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  const candidate = path.resolve(outDir, applicationPath.replace(/^\/+/, ""));

  if (path.relative(outDir, candidate).startsWith("..")) {
    return null;
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }

  const indexPath = path.join(candidate, "index.html");
  return existsSync(indexPath) ? indexPath : null;
}

if (!existsSync(outDir)) {
  throw new Error("Static export is missing. Run npm run build first.");
}

const server = createServer((request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method ?? "")) {
    response.writeHead(405, { allow: "GET, HEAD" });
    response.end();
    return;
  }

  const filePath = resolveOutputPath(request.url);
  if (!filePath) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  const isSegmentPayload =
    extension === ".txt" &&
    /^__next(?:\.[A-Za-z0-9_$-]+)+\.__PAGE__\.txt$/.test(
      path.basename(filePath),
    );
  const immutable =
    filePath.includes(`${path.sep}_next${path.sep}`) ||
    filePath.includes(`${path.sep}images${path.sep}`) ||
    filePath.includes(`${path.sep}fonts${path.sep}`);
  const headers: Record<string, string | number> = {
    "cache-control": immutable
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
    "content-type": isSegmentPayload
      ? "text/x-component; charset=utf-8"
      : contentTypes[extension] ?? "application/octet-stream",
    vary: "Accept-Encoding",
  };
  let body = readFileSync(filePath);

  if (
    textExtensions.has(extension) &&
    request.headers["accept-encoding"]?.includes("br")
  ) {
    body = brotliCompressSync(body, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 5 },
    });
    headers["content-encoding"] = "br";
  }

  headers["content-length"] = body.byteLength;
  response.writeHead(200, headers);
  response.end(request.method === "HEAD" ? undefined : body);
});

server.listen(port, host, () => {
  console.log(`Static export available at http://${host}:${port}${basePath}/`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => server.close(() => process.exit(0)));
}
