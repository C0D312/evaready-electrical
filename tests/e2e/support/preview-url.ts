export const githubPreviewBasePath = "/evaready-electrical/";

export function resolvePreviewUrl(baseUrl: string, relativeRoute: string) {
  if (!baseUrl) {
    throw new Error("Playwright baseURL is required");
  }
  if (relativeRoute.startsWith("/")) {
    throw new Error(
      `Preview routes must be base-path-relative, not origin-relative: ${relativeRoute}`,
    );
  }

  const base = new URL(baseUrl);
  if (!base.pathname.endsWith(githubPreviewBasePath)) {
    throw new Error(
      `Playwright baseURL must end with ${githubPreviewBasePath}; received ${base.pathname}`,
    );
  }

  const target = new URL(relativeRoute, base);
  if (!target.pathname.startsWith(base.pathname)) {
    throw new Error(`Resolved route escaped the preview base path: ${target.pathname}`);
  }
  return target;
}
