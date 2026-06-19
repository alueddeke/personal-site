# External Integrations

**Analysis Date:** 2026-06-19

## APIs & External Services

**Headless CMS:**
- Contentful - All site content (bio, projects, experiences, audio clips, images, backgrounds)
  - SDK/Client: `axios` making direct REST calls (not the `contentful` npm SDK despite it being installed)
  - Auth: `VITE_CONTENTFUL_ACCESS_TOKEN` (CDN Delivery API token, Bearer header)
  - Space: `VITE_CONTENTFUL_SPACE_ID`
  - Endpoint: `https://cdn.contentful.com/spaces/{SPACE_ID}/entries`
  - Content type queried: `personalWebsite` (single entry, `include: 10` for deep link resolution)
  - Client defined in: `src/contentful.js`
  - Called from: `src/App.jsx` on mount, data passed as props to all page sections

**Email / Contact:**
- EmailJS - Client-side form submission that sends email without a backend
  - SDK/Client: `@emailjs/browser` 4.4.1
  - Auth: `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`
  - Usage: `emailjs.sendForm()` called on contact form submit in `src/components/ContactMe.jsx`
  - Form fields sent: `from_name`, `reply_to`, `message`, `to_name` (hardcoded as "Your Name")

**Fonts:**
- Google Fonts CDN - Inter, Roboto, Poppins loaded via `<link>` in `index.html`
  - No API key required

## Data Storage

**Databases:**
- None — all content sourced from Contentful CMS at runtime

**File Storage:**
- Contentful Assets CDN - Images, audio files, and background images are served from Contentful's asset CDN
  - URLs resolved from `asset.fields.file.url` (protocol-relative, e.g. `//images.ctfassets.net/...`)
  - Assets include: avatar, profile images, performing pictures, backgrounds, audio clips
  - Asset resolution handled in `src/contentful.js` via `resolveAsset()` helper

**Caching:**
- None — no client-side caching layer; Contentful data is fetched fresh on every page load

## Authentication & Identity

**Auth Provider:**
- None — this is a public-facing portfolio site with no user authentication
- Only auth present is the server-side Contentful API token (CDN read-only key exposed to client via `VITE_` prefix — this is a read-only CDN token, normal for Contentful Delivery API usage)

## Monitoring & Observability

**Error Tracking:**
- None — no error tracking service integrated

**Logs:**
- `console.log` / `console.error` only
  - Contentful fetch errors logged in `src/contentful.js` and `src/App.jsx`
  - EmailJS success/failure logged in `src/components/ContactMe.jsx`

## CI/CD & Deployment

**Hosting:**
- Not explicitly configured in repo — static output from `npm run build` (`dist/`) can be deployed to any static host (Netlify, Vercel, GitHub Pages, etc.)

**CI Pipeline:**
- Not detected — no `.github/workflows/`, `.gitlab-ci.yml`, or similar CI config present

## Environment Configuration

**Required env vars (all must have `VITE_` prefix for Vite to expose them client-side):**
- `VITE_CONTENTFUL_SPACE_ID` — Contentful space identifier
- `VITE_CONTENTFUL_ACCESS_TOKEN` — Contentful CDN Delivery API token (read-only)
- `VITE_EMAILJS_PUBLIC_KEY` — EmailJS account public key
- `VITE_EMAILJS_SERVICE_ID` — EmailJS email service identifier
- `VITE_EMAILJS_TEMPLATE_ID` — EmailJS template identifier

**Secrets location:**
- `.env` file at repo root (present, not committed — excluded from git)
- All secrets are client-side bundle-visible at runtime (acceptable for Contentful CDN read-only tokens and EmailJS public keys, which are designed for browser use)

## Webhooks & Callbacks

**Incoming:**
- None — no webhook endpoints (static site, no server)

**Outgoing:**
- None — no outgoing webhooks configured

---

*Integration audit: 2026-06-19*
