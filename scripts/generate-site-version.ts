import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

type SiteVersion = {
  marker: "site-version";
  site: "Evaready Electrical";
  deployTarget: "GitHub Pages";
  basePath: string;
  siteUrl: string;
  buildDate: string;
  mainCommit: string;
  versionNote: string;
};

function readGitSha() {
  try {
    return execSync("git rev-parse HEAD", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "unknown";
  }
}

function normalizeBasePath(value: string | undefined) {
  const basePath = (value || "").trim();
  if (!basePath || basePath === "/") {
    return "";
  }

  return `/${basePath.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

const siteVersion: SiteVersion = {
  marker: "site-version",
  site: "Evaready Electrical",
  deployTarget: "GitHub Pages",
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://c0d312.github.io/evaready-electrical",
  buildDate: new Date().toISOString(),
  mainCommit: process.env.NEXT_PUBLIC_MAIN_SHA || readGitSha(),
  versionNote:
    process.env.NEXT_PUBLIC_DEPLOYMENT_NOTE ||
    "Automatic production build marker.",
};

const outputPath = join(process.cwd(), "public", "site-version.json");
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(siteVersion, null, 2)}\n`, "utf8");

console.log(
  `Generated public/site-version.json for ${siteVersion.mainCommit} at ${siteVersion.buildDate}`,
);
