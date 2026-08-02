# Evaready Electrical

Next.js 16 website for Evaready Electrical.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## GitHub Pages preview

The current preview origin is:

```text
https://c0d312.github.io/evaready-electrical/
```

Preview exports are built with the repository base path:

```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET='github-preview'
$env:NEXT_PUBLIC_BASE_PATH='/evaready-electrical'
$env:NEXT_PUBLIC_SITE_URL='https://c0d312.github.io/evaready-electrical'
npm.cmd run build
npm.cmd run audit:production-domain
```

The GitHub workflow validates this project-site export. No `CNAME` is
published while the branded domain is intentionally disconnected.

## Branded-domain launch profile

The branded-domain configuration is prepared but inactive. It can be checked
locally without changing DNS, GitHub Pages settings, or the public preview:

```powershell
$env:NEXT_PUBLIC_DEPLOYMENT_TARGET='branded-production'
$env:NEXT_PUBLIC_SITE_URL='https://evareadyelectrical.com.au'
Remove-Item Env:NEXT_PUBLIC_BASE_PATH -ErrorAction SilentlyContinue
npm.cmd run build
npm.cmd run audit:production-domain
```

The `branded-production` target deliberately requires an empty base path and
the exact branded origin. The `github-preview` target deliberately requires
the repository base path and GitHub Pages origin. Conflicting values stop the
build instead of producing mixed canonical, sitemap, schema, Open Graph, or
asset-path signals.
