# Phase 1: Foundation Fixes - Context

**Gathered:** 2026-06-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Fix every broken or professionally embarrassing thing before design work ships. The site must be navigable on mobile, shareable with correct link previews, and the Gist AI live link must actually work. No design changes — that's Phase 3.

Requirements in scope: BUG-01, BUG-02, BUG-03, BUG-04, BUG-05, BUG-06, BUG-07, BUG-08, PERF-03.

</domain>

<decisions>
## Implementation Decisions

### Mobile Navigation (BUG-01)
- **D-01:** Pattern: **slide-down dropdown**. Menu drops below the navbar when hamburger is clicked, links stacked vertically. No new Drawer component needed — toggle state lives in NavBar.jsx.
- **D-02:** Styling: **theme-neutral / functional only**. Do not invest in current mint/teal tokens. Phase 3 will restyle everything. Basic dark/light styling that works is sufficient.
- **D-03:** Hamburger icon position: **far right** of the navbar (standard mobile convention, thumb-reachable).

### OG / SEO Meta Tags (BUG-03 + PERF-03)
- **D-04:** `<title>`: `Antoni Lueddeke — Software Engineer`
- **D-05:** `<meta name="description">`: `Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified. Currently open to new roles.`
- **D-06:** `og:title` and `og:description`: same as above.
- **D-07:** `og:image`: **skip for now** — text-only unfurl. Add a real OG image after Phase 3 when design is finalized. Do not hardcode a Contentful image URL.
- **D-08:** Include standard OG and Twitter Card tags. No exotic meta tags needed.

### Gist AI Deployment (BUG-04)
- **D-09:** Gist AI repo path: `/Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI`
- **D-10:** An existing Netlify site is already linked to this repo. Executor must run `netlify status` inside the repo to discover the linked site and current deploy URL.
- **D-11:** The local codebase has been updated since the last deploy. Executor must: (1) investigate what's broken with the existing deployment, (2) build the updated project, (3) deploy to the existing Netlify site, (4) verify the live URL works end-to-end, (5) update the Contentful project card URL to the working Netlify URL.
- **D-12:** The Gist AI repo contains its own documentation describing recent changes — executor should read it before building/deploying.

### Code Hygiene (BUG-02, BUG-05, BUG-06, BUG-07, BUG-08)
These are clear-cut, no decisions needed:
- **BUG-02**: Remove the duplicate nested container in `ContactMe.jsx:77-79` so the right column renders.
- **BUG-05**: Remove all `console.log` calls from `App.jsx:24` and `ContactMe.jsx`.
- **BUG-06**: Replace hardcoded `"2024"` in `Footer.jsx` with `new Date().getFullYear()`.
- **BUG-07**: Add `rel="noopener noreferrer"` to all `target="_blank"` external links across the codebase.
- **BUG-08**: Replace hardcoded `value="Your Name"` hidden input in `ContactMe.jsx:142` with `value="Antoni Lueddeke"`.

### Claude's Discretion
- Exact hamburger icon SVG/emoji — use a standard three-line (☰) or X-close icon, Claude's choice.
- Exact Tailwind classes for the mobile dropdown container — functional and neutral, Claude's choice.
- Whether to add `og:url`, `og:type`, `og:site_name` — standard additions, Claude can include them with sensible values.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` — Full requirement definitions for BUG-01 through BUG-08 and PERF-03
- `.planning/ROADMAP.md` §Phase 1 — Success criteria (5 items), mode, dependencies

### Known Bugs (exact locations)
- `src/components/NavBar.jsx:69` — All nav links wrapped in `hidden md:block`; no hamburger
- `src/components/ContactMe.jsx:77-79` — Duplicate nested container (right column never renders)
- `src/components/ContactMe.jsx:142` — Hardcoded `value="Your Name"` hidden input
- `src/App.jsx:24` — `console.log(result)` in production data fetch
- `src/components/ContactMe.jsx` — `console.log` in success and failure handlers
- `src/components/Footer.jsx` — Hardcoded `"2024"` year
- `index.html` — No `<title>`, no `<meta description>`, no OG tags (currently has only charset + viewport)

### Gist AI
- `/Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI` — Gist AI repo (separate from this repo)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/NavBar.jsx` — existing navbar with anchor links; hamburger menu state will be added here (no new component)
- `src/components/Footer.jsx` — one-line year fix
- `src/components/ContactMe.jsx` — two fixes: remove duplicate container + replace hidden input value
- `index.html` — OG/SEO tags added to `<head>` here

### Established Patterns
- Tailwind utility classes for all styling — no CSS modules or inline style objects for static values
- `hidden md:block` / `block md:hidden` — existing responsive visibility pattern used in NavBar; hamburger icon should follow `block md:hidden`
- React `useState` for toggle state — hamburger open/closed state fits this pattern

### Integration Points
- `index.html` `<head>` — OG tags inserted here (static HTML, not React)
- `src/App.jsx` — no changes needed for most fixes; console.log removal is here
- Contentful project card for Gist AI — URL field updated after Netlify redeploy confirms working URL

</code_context>

<specifics>
## Specific Ideas

- Gist AI repo internal docs describe recent changes — executor should read them before deploying
- OG image deferred to post-Phase-3 (when dark cinematic design is live and screenshots will look professional)
- Teaching section anchor ID (noted in CONCERNS.md) is a v2 requirement (QUAL-01) — NOT in Phase 1 scope

</specifics>

<deferred>
## Deferred Ideas

- OG image — deferred to after Phase 3 when the site has a real screenshot worth sharing
- Teaching section anchor ID (QUAL-01) — v2 requirement, not Phase 1
- Tailwind token inconsistency in Loading.jsx — v2/Phase 5 cleanup

None — all discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Foundation-Fixes*
*Context gathered: 2026-06-19*
