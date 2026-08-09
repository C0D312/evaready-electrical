export type StaticExportServerOptions = {
  basePath: string;
  host: string;
  port: number;
  requireBasePath: boolean;
};

type ResolveStaticExportServerOptionsInput = {
  argv: string[];
  deploymentBasePath: string;
  env: Readonly<Record<string, string | undefined>>;
};

const valueOptions = new Set(["base-path", "host", "port"]);
const flagOptions = new Set(["strict-base-path"]);

function normaliseBasePath(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed || trimmed === "/") return "";
  if (/[?#]/.test(trimmed)) {
    throw new Error(`Static export base path cannot contain a query or hash: ${trimmed}`);
  }

  const segments = trimmed.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "." || segment === "..")) {
    throw new Error(`Static export base path cannot traverse directories: ${trimmed}`);
  }

  return `/${segments.join("/")}`;
}

function parseCommandLine(argv: string[]) {
  const flags = new Set<string>();
  const values = new Map<string, string>();

  for (const argument of argv) {
    if (!argument.startsWith("--")) {
      throw new Error(`Unsupported static export server argument: ${argument}`);
    }

    const separator = argument.indexOf("=");
    const name = argument.slice(2, separator === -1 ? undefined : separator);
    if (separator === -1) {
      if (!flagOptions.has(name)) {
        throw new Error(`Unknown or valueless static export server option: --${name}`);
      }
      if (flags.has(name)) {
        throw new Error(`Duplicate static export server option: --${name}`);
      }
      flags.add(name);
      continue;
    }

    if (!valueOptions.has(name)) {
      throw new Error(`Unknown static export server option: --${name}`);
    }
    if (values.has(name)) {
      throw new Error(`Duplicate static export server option: --${name}`);
    }

    const value = argument.slice(separator + 1).trim();
    if (!value) {
      throw new Error(`Static export server option --${name} requires a value`);
    }
    values.set(name, value);
  }

  return { flags, values };
}

export function resolveStaticExportServerOptions({
  argv,
  deploymentBasePath,
  env,
}: ResolveStaticExportServerOptionsInput): StaticExportServerOptions {
  const commandLine = parseCommandLine(argv);
  const basePath = normaliseBasePath(
    commandLine.values.get("base-path") ??
      env.STATIC_EXPORT_BASE_PATH ??
      deploymentBasePath,
  );
  const host =
    commandLine.values.get("host") ?? env.STATIC_EXPORT_HOST ?? "127.0.0.1";
  const portText =
    commandLine.values.get("port") ?? env.STATIC_EXPORT_PORT ?? "4176";
  const port = Number(portText);
  const requireBasePath =
    commandLine.flags.has("strict-base-path") ||
    env.STATIC_EXPORT_REQUIRE_BASE_PATH === "1";

  if (!host.trim() || /\s/.test(host)) {
    throw new Error(`Invalid static export host: ${host || "(empty)"}`);
  }
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`Invalid static export port: ${portText}`);
  }
  if (requireBasePath && !basePath) {
    throw new Error("Strict base-path mode requires a non-root --base-path value");
  }

  return { basePath, host, port, requireBasePath };
}
