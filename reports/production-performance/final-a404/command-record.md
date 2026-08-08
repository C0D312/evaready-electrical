# Final a404 performance command record

All commands used the detached exact-source worktree at commit
`a404e774fbac6cfe90a54269f20fe95bff744b84`. The original dirty owner
workspace was not used to build or serve the measured export.

## Environment

```powershell
$env:PATH = 'C:\Users\Admin\AppData\Local\Temp\node-v22.23.1-win-x64;' + $env:PATH
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET = 'github-preview'
$env:NEXT_PUBLIC_BASE_PATH = '/evaready-electrical'
$env:NEXT_PUBLIC_SITE_URL = 'https://c0d312.github.io/evaready-electrical'
Remove-Item Env:NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY -ErrorAction SilentlyContinue
Remove-Item Env:NEXT_PUBLIC_GOOGLE_PLACE_ID -ErrorAction SilentlyContinue
```

## Clean install and validation

```powershell
npm.cmd ci --ignore-scripts --no-audit
npm.cmd audit --json
npm.cmd audit --omit=dev --json
npm.cmd run lint
.\node_modules\.bin\tsc.cmd --noEmit
npm.cmd run build
npm.cmd run audit:suburbs
npm.cmd run audit:all-suburb-copy
npm.cmd run audit:links
npm.cmd run audit:metadata
npm.cmd run audit:page-health
npm.cmd run audit:production-domain
npm.cmd run audit:response-times
npm.cmd run audit:claims
npm.cmd run audit:offers
npm.cmd run audit:performance
npm.cmd run audit:visible-copy
npm.cmd run audit:live-links-and-ctas
```

## Static server

```powershell
$env:STATIC_EXPORT_HOST = '127.0.0.1'
$env:STATIC_EXPORT_PORT = '4181'
node.exe .\node_modules\tsx\dist\cli.mjs scripts\serve-static-export.ts
```

The resulting explicit local base URL was
`http://127.0.0.1:4181/evaready-electrical`.

## Lighthouse

```powershell
$env:PERF_BASE_URL = 'http://127.0.0.1:4181/evaready-electrical'
$env:PERF_PHASE = 'final-a404'
$env:PERF_RUNS = '3'
$env:PERF_PROFILES = 'mobile,desktop'
$env:PERF_OUTPUT_DIR = 'C:\Users\Admin\AppData\Local\Temp\evaready-final-a404-reconcile\reports\production-performance\final-a404'
$env:PERF_RAW_DIR = 'C:\Users\Admin\AppData\Local\Temp\evaready-final-a404-lighthouse-raw'
$env:LIGHTHOUSE_BIN = 'C:\Users\Admin\AppData\Local\Temp\evaready-lighthouse-tooling\node_modules\lighthouse\cli\index.js'
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
node.exe .\node_modules\tsx\dist\cli.mjs scripts\benchmark-production-performance.ts
```

No route or profile filter was set. The command produced 60 successful runs:
10 routes x 2 profiles x 3 runs.

## Playwright

```powershell
$env:PLAYWRIGHT_BASE_URL = 'http://127.0.0.1:4181/evaready-electrical/'
$env:PLAYWRIGHT_JSON_OUTPUT_FILE = 'C:\Users\Admin\AppData\Local\Temp\evaready-final-a404-playwright.json'
.\node_modules\.bin\playwright.cmd test tests/e2e/contact-direct-options.spec.ts tests/e2e/footer-copyright.spec.ts tests/e2e/google-rating-live.spec.ts tests/e2e/location-evidence.spec.ts tests/e2e/offers-layout.spec.ts tests/e2e/route-scroll.spec.ts --reporter=json
```

This was a representative non-header interaction matrix. The exhaustive
all-route browser runner was not run and remains incomplete.
