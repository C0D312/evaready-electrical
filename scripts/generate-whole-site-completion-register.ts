import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  createWholeSiteCompletionRegister,
  normalizeWholeSiteRegisterText,
  validateWholeSiteCompletionRegister,
} from "./whole-site-completion-register";

const outputPath = path.resolve("reports", "whole-site-completion-register.json");
const expected = `${JSON.stringify(createWholeSiteCompletionRegister(), null, 2)}\n`;
const errors = validateWholeSiteCompletionRegister(JSON.parse(expected));

if (errors.length > 0) {
  throw new Error(`Completion register validation failed:\n${errors.join("\n")}`);
}

if (process.argv.includes("--check")) {
  const actual = readFileSync(outputPath, "utf8");
  if (normalizeWholeSiteRegisterText(actual) !== expected) {
    throw new Error(
      "reports/whole-site-completion-register.json is stale; run npm run generate:whole-site-register.",
    );
  }
  console.log("Whole-site completion register PASS (1,001 sitemap routes; no drift).");
} else {
  writeFileSync(outputPath, expected);
  console.log(`Wrote ${outputPath}`);
}
