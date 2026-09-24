export function resolveBrandedUrl(baseUrl: string, relativeRoute: string) {
  const base = new URL(baseUrl);
  if (base.protocol !== "http:" || base.hostname !== "127.0.0.1" ||
      base.pathname !== "/" || base.username || base.password || base.search || base.hash) {
    throw new Error("Branded test base must be a root-mounted HTTP loopback origin");
  }
  if (relativeRoute.startsWith("/") || relativeRoute.includes("\\")) {
    throw new Error("Branded test route must be relative");
  }
  const target = new URL(relativeRoute, base);
  if (target.origin !== base.origin || target.pathname === "/evaready-electrical" || target.pathname.startsWith("/evaready-electrical/")) {
    throw new Error("Branded test route escaped its profile");
  }
  return target;
}
