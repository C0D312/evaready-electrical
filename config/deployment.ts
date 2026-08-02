export const GITHUB_PAGES_PREVIEW_SITE_URL =
  "https://c0d312.github.io/evaready-electrical";
export const GITHUB_PAGES_PREVIEW_BASE_PATH = "/evaready-electrical";
export const BRANDED_PRODUCTION_SITE_URL =
  "https://evareadyelectrical.com.au";

export type DeploymentTarget =
  | "local"
  | "github-preview"
  | "branded-production";

export type DeploymentConfig = {
  target: DeploymentTarget;
  label: string;
  siteUrl: string;
  basePath: string;
  isBrandedProduction: boolean;
};

function normalizeBasePath(value: string | undefined) {
  const basePath = (value || "").trim();

  if (!basePath || basePath === "/") {
    return "";
  }

  return `/${basePath.replace(/^\/+|\/+$/g, "")}`;
}

function normalizeSiteUrl(value: string) {
  const siteUrl = new URL(value.trim());

  if (siteUrl.protocol !== "https:") {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must use HTTPS. Received: ${value}`,
    );
  }

  if (siteUrl.search || siteUrl.hash || siteUrl.username || siteUrl.password) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be a clean public origin/path. Received: ${value}`,
    );
  }

  return `${siteUrl.origin}${siteUrl.pathname.replace(/\/+$/, "")}`;
}

function readTarget(value: string | undefined): DeploymentTarget {
  const target = (value || "local").trim();

  if (
    target !== "local" &&
    target !== "github-preview" &&
    target !== "branded-production"
  ) {
    throw new Error(
      `Unsupported NEXT_PUBLIC_DEPLOYMENT_TARGET: ${target || "(empty)"}`,
    );
  }

  return target;
}

function assertExpectedValue(
  name: string,
  actual: string,
  expected: string,
) {
  if (actual !== expected) {
    throw new Error(
      `${name} conflicts with the selected deployment target. Expected "${expected}", received "${actual || "(empty)"}".`,
    );
  }
}

export function resolveDeploymentConfig(): DeploymentConfig {
  const target = readTarget(process.env.NEXT_PUBLIC_DEPLOYMENT_TARGET);
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const explicitBasePath = normalizeBasePath(
    process.env.NEXT_PUBLIC_BASE_PATH,
  );

  if (target === "github-preview") {
    const siteUrl = normalizeSiteUrl(
      explicitSiteUrl || GITHUB_PAGES_PREVIEW_SITE_URL,
    );
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH
      ? explicitBasePath
      : GITHUB_PAGES_PREVIEW_BASE_PATH;

    assertExpectedValue(
      "NEXT_PUBLIC_SITE_URL",
      siteUrl,
      GITHUB_PAGES_PREVIEW_SITE_URL,
    );
    assertExpectedValue(
      "NEXT_PUBLIC_BASE_PATH",
      basePath,
      GITHUB_PAGES_PREVIEW_BASE_PATH,
    );

    return {
      target,
      label: "GitHub Pages preview",
      siteUrl,
      basePath,
      isBrandedProduction: false,
    };
  }

  if (target === "branded-production") {
    const siteUrl = normalizeSiteUrl(
      explicitSiteUrl || BRANDED_PRODUCTION_SITE_URL,
    );

    assertExpectedValue(
      "NEXT_PUBLIC_SITE_URL",
      siteUrl,
      BRANDED_PRODUCTION_SITE_URL,
    );
    assertExpectedValue("NEXT_PUBLIC_BASE_PATH", explicitBasePath, "");

    return {
      target,
      label: "Branded production (pre-launch)",
      siteUrl,
      basePath: "",
      isBrandedProduction: true,
    };
  }

  const siteUrl = normalizeSiteUrl(
    explicitSiteUrl || GITHUB_PAGES_PREVIEW_SITE_URL,
  );

  if (siteUrl === BRANDED_PRODUCTION_SITE_URL) {
    throw new Error(
      "The branded site URL requires NEXT_PUBLIC_DEPLOYMENT_TARGET=branded-production.",
    );
  }

  return {
    target,
    label: "Local development",
    siteUrl,
    basePath: explicitBasePath,
    isBrandedProduction: false,
  };
}
