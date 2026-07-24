# Evaready Electrical

Next.js 16 website for Evaready Electrical.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

The intended production origin is:

```text
https://evareadyelectrical.com.au/
```

Production exports are built at the domain root:

```powershell
$env:NEXT_PUBLIC_BASE_PATH=''
$env:NEXT_PUBLIC_SITE_URL='https://evareadyelectrical.com.au'
npm.cmd run build
npm.cmd run audit:production-domain
```

The GitHub workflow validates this root-hosted export. The generated `CNAME`
identifies the branded domain for the branch-published GitHub Pages site.
Repository Pages settings and DNS still need to point the domain at the
verified build before the custom-domain cutover.
