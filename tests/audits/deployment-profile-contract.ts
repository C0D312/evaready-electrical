import assert from "node:assert/strict";
import postcss from "postcss";

// Independent expectations, deliberately not imported from application config.
export const auditProfiles = {
  "github-preview": {
    siteUrl: "https://c0d312.github.io/evaready-electrical",
    basePath: "/evaready-electrical",
  },
  "branded-production": {
    siteUrl: "https://evareadyelectrical.com.au",
    basePath: "",
  },
} as const;
export type AuditProfileName = keyof typeof auditProfiles;

export function resolveAuditProfile(env: Readonly<Record<string, string | undefined>> = process.env) {
  const name = env.EV_AUDIT_PROFILE ?? "github-preview";
  assert(Object.hasOwn(auditProfiles, name), `Unknown audit profile: ${name}`);
  const profile = auditProfiles[name as AuditProfileName];
  if (env.EV_AUDIT_PROFILE || env.NEXT_PUBLIC_DEPLOYMENT_TARGET === "branded-production") {
    assert.equal(env.NEXT_PUBLIC_DEPLOYMENT_TARGET, name, "Audit/build profile mismatch");
    assert.equal(env.NEXT_PUBLIC_SITE_URL, profile.siteUrl, "Audit/build origin mismatch");
    assert.equal(env.NEXT_PUBLIC_BASE_PATH, profile.basePath, "Audit/build base-path mismatch");
  }
  return { name: name as AuditProfileName, ...profile };
}

export const auditProfile = resolveAuditProfile();
const preview = auditProfiles["github-preview"];
const branded = auditProfiles["branded-production"];
const hasPrefix = (value: string, prefix: string) =>
  value === prefix || ["/", "?", "#"].some(end => value.startsWith(prefix + end));

const urlKeys = new Set(["@id", "url", "href", "src", "poster", "item", "image", "logo", "sameAs", "contentUrl", "embedUrl", "target"]);
function mapUrlValues<T>(value: T, transform: (url: string) => string, urlSlot = true): T {
  if (typeof value === "string") return (urlSlot ? transform(value) : value) as T;
  if (Array.isArray(value)) return value.map(item => mapUrlValues(item, transform, urlSlot)) as T;
  if (value && typeof value === "object") {
    const attrs = value as Record<string, unknown>;
    return Object.fromEntries(Object.entries(attrs).map(([key, item]) => [key,
      mapUrlValues(item, transform, urlKeys.has(key) || (key === "content" &&
        /^(?:og:(?:url|image)|twitter:image)$/.test(String(attrs.property ?? attrs.name ?? "")))),
    ])) as T;
  }
  return value;
}

export function brandedValueFromPreview<T>(value: T): T {
  return mapUrlValues(value, url => {
    if (hasPrefix(url, preview.siteUrl)) return branded.siteUrl + url.slice(preview.siteUrl.length);
    if (hasPrefix(url, preview.basePath)) return url.slice(preview.basePath.length) || "/";
    return url;
  });
}

export function previewValueFromBranded<T>(value: T): T {
  return mapUrlValues(value, url => {
    assert(!hasPrefix(url, preview.siteUrl) && !hasPrefix(url, preview.basePath), "Leftover preview URL in branded output");
    if (hasPrefix(url, branded.siteUrl)) return preview.siteUrl + url.slice(branded.siteUrl.length);
    if (url.startsWith("/") && !url.startsWith("//")) return preview.basePath + url;
    return url;
  });
}

export const expectedFixture = <T>(value: T): T =>
  auditProfile.name === "branded-production" ? brandedValueFromPreview(value) : value;
export const historicalValue = <T>(value: T): T =>
  auditProfile.name === "branded-production" ? previewValueFromBranded(value) : value;

// Reverse only URL-bearing HTML/CSS attributes and parsed JSON-LD. Text, tag order,
// whitespace, classes and all non-URL values remain part of the sealed hash.
export function brandedMarkupForHistoricalHash(html: string): string {
  return html.replace(/(<script\b[^>]*type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g,
    (_, open, json, close) => open + JSON.stringify(previewValueFromBranded(JSON.parse(json))) + close,
  ).replace(/(\s(?:href|src|poster)=")([^"]*)(")/g,
      (_, open, url, close) => open + previewValueFromBranded(url) + close,
    ).replace(/(\s(?:srcSet|srcset)=")([^"]*)(")/g, (_, open, value: string, close) =>
      open + value.split(",").map(part => part.replace(/^(\s*)(\S+)/, (_, gap, url) =>
        gap + previewValueFromBranded(url))).join(",") + close,
    ).replace(/(\sstyle=")([^"]*)(")/g, (_, open, value: string, close) => {
      const css = postcss.parse(value.replaceAll("&quot;", '"'));
      css.walkDecls(decl => {
        decl.value = decl.value.replace(/(url\(\s*)(?:"([^"]*)"|'([^']*)'|([^)]*?))(\s*\))/g,
          (_, start, double, single, bare, end) => {
            const quote = double !== undefined ? '"' : single !== undefined ? "'" : "";
            return start + quote + previewValueFromBranded(double ?? single ?? bare) + quote + end;
          });
      });
      return open + css.toString().replaceAll('"', "&quot;") + close;
    }).replace(/<meta\b[^>]*>/g, tag =>
      /(?:property|name)="(?:og:(?:url|image)|twitter:image)"/.test(tag)
        ? tag.replace(/(content=")([^"]*)(")/, (_, open, url, close) => open + previewValueFromBranded(url) + close)
        : tag,
    );
}

export const historicalHtml = (html: string) => auditProfile.name === "branded-production"
  ? brandedMarkupForHistoricalHash(html) : html;
export const sealedLabel = (label: string) => auditProfile.name === "branded-production"
  ? `${label} [branded exact URL mapping to unchanged historical seal]` : label;
