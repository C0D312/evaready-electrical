import { defineConfig, devices, type PlaywrightTestConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const chromePaths = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];

const edgePaths = [
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

const hasExecutable = (paths: string[]) => paths.some((path) => existsSync(path));

const projects: PlaywrightTestConfig["projects"] = [
  {
    name: "desktop-chromium-1366",
    use: { browserName: "chromium", viewport: { width: 1366, height: 768 } },
  },
  {
    name: "desktop-chromium-1440",
    use: { browserName: "chromium", viewport: { width: 1440, height: 900 } },
  },
  {
    name: "desktop-chromium-1920",
    use: { browserName: "chromium", viewport: { width: 1920, height: 1080 } },
  },
  {
    name: "desktop-firefox-1440",
    use: { browserName: "firefox", viewport: { width: 1440, height: 900 } },
  },
  {
    name: "desktop-webkit-1440",
    use: { browserName: "webkit", viewport: { width: 1440, height: 900 } },
  },
  ...(hasExecutable(chromePaths)
    ? [
        {
          name: "google-chrome-1440",
          use: { browserName: "chromium" as const, channel: "chrome", viewport: { width: 1440, height: 900 } },
        },
      ]
    : []),
  ...(hasExecutable(edgePaths)
    ? [
        {
          name: "microsoft-edge-1440",
          use: { browserName: "chromium" as const, channel: "msedge", viewport: { width: 1440, height: 900 } },
        },
      ]
    : []),
  {
    name: "mobile-chrome-360",
    use: { ...devices["Pixel 5"], viewport: { width: 360, height: 800 } },
  },
  {
    name: "mobile-chrome-390",
    use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } },
  },
  {
    name: "mobile-chrome-412",
    use: { ...devices["Pixel 5"], viewport: { width: 412, height: 915 } },
  },
  {
    name: "mobile-chrome-430",
    use: { ...devices["Pixel 5"], viewport: { width: 430, height: 932 } },
  },
  {
    name: "mobile-safari-390",
    use: { ...devices["iPhone 14"], viewport: { width: 390, height: 844 } },
  },
  {
    name: "mobile-safari-430",
    use: { ...devices["iPhone 14 Pro Max"], viewport: { width: 430, height: 932 } },
  },
  {
    name: "ipad-768",
    use: { ...devices["iPad (gen 7)"], viewport: { width: 768, height: 1024 } },
  },
  {
    name: "ipad-pro-1024",
    use: { ...devices["iPad Pro 11"], viewport: { width: 1024, height: 1366 } },
  },
];

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 240_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  workers: 3,
  retries: 0,
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/playwright-html-report", open: "never" }],
    ["json", { outputFile: "reports/playwright-results.json" }],
  ],
  use: {
    baseURL:
      process.env.PLAYWRIGHT_BASE_URL ??
      "https://c0d312.github.io/evaready-electrical/",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  outputDir: "reports/playwright-test-results",
  projects,
});
