import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, openSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const profiles = {
  "github-preview": { siteUrl: "https://c0d312.github.io/evaready-electrical", basePath: "/evaready-electrical" },
  "branded-production": { siteUrl: "https://evareadyelectrical.com.au", basePath: "" },
} as const;
const [name, peerArg, evidenceArg] = process.argv.slice(2);
assert(Object.hasOwn(profiles, name), "Specify github-preview or branded-production, peer export, and private evidence directory");
assert(peerArg && path.isAbsolute(peerArg) && evidenceArg && path.isAbsolute(evidenceArg));
const profile = profiles[name as keyof typeof profiles];
const other = profiles[name === "github-preview" ? "branded-production" : "github-preview"];
const cwd = process.cwd(), peer = path.resolve(peerArg), evidence = path.resolve(evidenceArg);
assert.notEqual(peer, path.join(cwd, "out"), "Profiles must use separate exports");
for (const dir of [cwd, path.dirname(peer)]) {
  const relativeEvidence = path.relative(dir, evidence);
  assert(relativeEvidence.startsWith(".." + path.sep) || path.isAbsolute(relativeEvidence), "Evidence must stay outside both public checkouts");
}
const git = (dir: string, args: string[]) => execFileSync("git", args, { cwd: dir, encoding: "utf8" }).trim();
const commit = git(cwd, ["rev-parse", "HEAD"]);
assert.equal(git(cwd, ["diff", "HEAD", "--name-only"]), "", "Commit the tested source first");
assert.equal(git(path.dirname(peer), ["rev-parse", "HEAD"]), commit, "Peer must use the identical source commit");
assert.equal(git(path.dirname(peer), ["diff", "HEAD", "--name-only"]), "");
for (const dir of [cwd, path.dirname(peer)]) {
  assert.equal(git(dir, ["ls-files", "--others", "--exclude-standard"]), "", "Untracked source must be reviewed and committed first");
}
assert.equal(readFileSync("package-lock.json", "utf8"), readFileSync(path.join(peer, "../package-lock.json"), "utf8"));
for (const [root, expected] of [["out", profile], [peer, other]] as const) {
  const marker = JSON.parse(readFileSync(path.join(root, "site-version.json"), "utf8"));
  assert.equal(marker.mainCommit, commit, "Export/commit mismatch");
  assert.equal(marker.siteUrl, expected.siteUrl, "Export origin mismatch");
  assert.equal(marker.basePath, expected.basePath, "Export base-path mismatch");
}
const env = { ...process.env, EV_AUDIT_PROFILE: name, EV_AUDIT_PEER_OUT: peer,
  NEXT_PUBLIC_DEPLOYMENT_TARGET: name, NEXT_PUBLIC_SITE_URL: profile.siteUrl,
  NEXT_PUBLIC_BASE_PATH: profile.basePath, NEXT_TELEMETRY_DISABLED: "1" };
const files = readdirSync("tests/audits").filter(f => f.endsWith(".test.ts")).sort().map(f => "tests/audits/" + f);
const log = path.join(evidence, `${name}-audits.log`), fd = openSync(log, "wx");
const started = new Date().toISOString();
const result = spawnSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "--test", ...files],
  { cwd, env, stdio: ["ignore", fd, fd] });
closeSync(fd);
const receipt = { profile: name, commit, source: cwd, peer, started, finished: new Date().toISOString(),
  status: result.status, error: result.error?.message, tests: files,
  logSha256: createHash("sha256").update(readFileSync(log)).digest("hex") };
writeFileSync(path.join(evidence, `${name}-audits.json`), JSON.stringify(receipt, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify(receipt));
process.exitCode = result.status === 0 ? 0 : 1;
