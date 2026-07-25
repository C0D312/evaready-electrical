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
$env:NEXT_PUBLIC_BASE_PATH='/evaready-electrical'
$env:NEXT_PUBLIC_SITE_URL='https://c0d312.github.io/evaready-electrical'
npm.cmd run build
npm.cmd run audit:production-domain
```

The GitHub workflow validates this project-site export. No `CNAME` is
published while the branded domain is intentionally disconnected.
