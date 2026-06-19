# Phase 01: Foundation Fixes — Research

**Researched:** 2026-06-19
**Domain:** React SPA bug fixes, mobile navigation, OG/SEO meta tags, Netlify deployment, code hygiene
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Mobile Navigation (BUG-01)**
- D-01: Pattern: slide-down dropdown. Menu drops below the navbar when hamburger is clicked, links stacked vertically. No new Drawer component — toggle state lives in NavBar.jsx.
- D-02: Styling: theme-neutral / functional only. Do not invest in current mint/teal tokens. Phase 3 will restyle everything.
- D-03: Hamburger icon position: far right of the navbar (standard mobile convention, thumb-reachable).

**OG / SEO Meta Tags (BUG-03 + PERF-03)**
- D-04: `<title>`: `Antoni Lueddeke — Software Engineer`
- D-05: `<meta name="description">`: `Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified. Currently open to new roles.`
- D-06: `og:title` and `og:description`: same as above.
- D-07: `og:image`: skip for now — text-only unfurl. Add after Phase 3 when design is finalized.
- D-08: Include standard OG and Twitter Card tags. No exotic meta tags needed.

**Gist AI Deployment (BUG-04)**
- D-09: Gist AI repo path: `/Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI`
- D-10: An existing Netlify site is already linked to this repo. Executor must run `netlify status` inside the repo to discover the linked site and current deploy URL.
- D-11: The local codebase has been updated since the last deploy. Executor must: (1) investigate what's broken, (2) build the updated project, (3) deploy to the existing Netlify site, (4) verify the live URL works end-to-end, (5) update the Contentful project card URL to the working Netlify URL.
- D-12: The Gist AI repo contains its own documentation describing recent changes — executor should read it before building/deploying.

**Code Hygiene (BUG-02, BUG-05, BUG-06, BUG-07, BUG-08)**
- BUG-02: Remove the duplicate nested container in `ContactMe.jsx:77-79` so the right column renders.
- BUG-05: Remove all `console.log` calls from `App.jsx:24` and `ContactMe.jsx`.
- BUG-06: Replace hardcoded `"2024"` in `Footer.jsx` with `new Date().getFullYear()`.
- BUG-07: Add `rel="noopener noreferrer"` to all `target="_blank"` external links across the codebase.
- BUG-08: Replace hardcoded `value="Your Name"` hidden input in `ContactMe.jsx:142` with `value="Antoni Lueddeke"`.

### Claude's Discretion
- Exact hamburger icon SVG/emoji — use a standard three-line (☰) or X-close icon, Claude's choice.
- Exact Tailwind classes for the mobile dropdown container — functional and neutral, Claude's choice.
- Whether to add `og:url`, `og:type`, `og:site_name` — standard additions, Claude can include them.

### Deferred Ideas (OUT OF SCOPE)
- OG image — deferred to after Phase 3 when the site has a real screenshot worth sharing.
- Teaching section anchor ID (QUAL-01) — v2 requirement, not Phase 1.
- Tailwind token inconsistency in Loading.jsx — v2/Phase 5 cleanup.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BUG-01 | Mobile navigation — hamburger menu so the site is navigable on phones | NavBar.jsx state management pattern identified; existing `hidden md:block` pattern shows where to add `block md:hidden` hamburger; `useState` for toggle already used in component |
| BUG-02 | ContactMe layout — duplicate container bug fixed so right column renders | Exact duplicate identified at lines 77-79 and 79+151; right column was never built (contact prop passed but unused); must remove duplicate AND add right column |
| BUG-03 | Open Graph meta tags — URL unfurls with title and description | index.html currently has only charset + viewport + partial title; all OG tags are absent; exact text locked in D-04 through D-08 |
| BUG-04 | Gist AI deployment — local version deployed to Netlify, live link verified | Critical discovery: no `.netlify` dir in repo; existing `gist-antonilueddeke.netlify.app` serves OLD capstone frontend; new Next.js app needs a new Netlify site or relink |
| BUG-05 | Console.log calls removed from App.jsx and ContactMe.jsx | Exact locations confirmed: App.jsx:24, ContactMe.jsx:30, ContactMe.jsx:40 |
| BUG-06 | Footer year dynamic | Footer.jsx line 11 hardcodes "2024" in text string |
| BUG-07 | All target="_blank" links include rel="noopener noreferrer" | ALREADY DONE — both occurrences in ProjectCard.jsx (lines 21-22 and 97-98) already have rel="noopener noreferrer"; no changes needed |
| BUG-08 | ContactMe hidden input placeholder fixed | Confirmed at ContactMe.jsx:142 — `value="Your Name"` in hidden `to_name` input |
| PERF-03 | SEO meta tags — title and meta description in index.html | Title tag exists but reads "Antoni Lueddeke" not full desired title; description tag absent |
</phase_requirements>

---

## Summary

Phase 1 is a set of surgical fixes to an existing React + Vite + Tailwind SPA. All bugs have been individually located and understood from direct codebase inspection. No library changes are needed for any fix except the Gist AI deployment, which involves a separate Next.js application.

The most significant surprise is BUG-04 (Gist AI deployment): the user believes an existing Netlify site is already linked to the gistAI repo, but inspection reveals no `.netlify` directory in that repo, and the only Netlify site named `gist-antonilueddeke` is linked to the OLD capstone Vite/React frontend (a subdirectory), not the new Next.js app. The executor must create a new Netlify site for the Next.js app and add all required environment variables to the Netlify dashboard.

A second significant discovery: BUG-07 is already fixed. Both `target="_blank"` links in `ProjectCard.jsx` already carry `rel="noopener noreferrer"`. This requirement is done.

The ContactMe right column (BUG-02) requires more than removing a duplicate div — the right column with contact information was never built. The fix requires both structural repair and adding new contact info JSX. The `contact` prop is passed from App.jsx but never rendered.

**Primary recommendation:** Plan as six independent tasks — four file-level code patches (NavBar, ContactMe, Footer, App.jsx), one HTML patch (index.html OG/SEO), and one deployment task (Gist AI Netlify). BUG-07 requires zero work.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Mobile navigation toggle state | Browser / Client (React state) | — | `useState` in NavBar.jsx; no server involvement |
| Hamburger dropdown rendering | Browser / Client (JSX) | — | Conditional render based on toggle state and viewport |
| OG / SEO meta tags | Static HTML | — | `index.html` `<head>` — served as-is by Netlify CDN, not React |
| ContactMe form submission | Browser / Client + External API | — | EmailJS client SDK sends directly; no backend |
| ContactMe right column rendering | Browser / Client (JSX) | Contentful (data) | Contact data from Contentful `contact` field |
| Console.log removal | Source code only | — | Build-time issue; no runtime tier |
| Footer year calculation | Browser / Client (JS) | — | `new Date().getFullYear()` evaluated at render time |
| Gist AI deployment | CDN / Static + API (Netlify) | — | Next.js 16 App Router deployed to Netlify with SSR functions |

---

## Standard Stack

This phase introduces zero new dependencies to the personal website. All fixes use existing installed packages and native browser/React patterns. [VERIFIED: codebase inspection]

The Gist AI deployment also introduces no new packages — it uses the existing Next.js 16 + Netlify CLI toolchain. [VERIFIED: codebase inspection]

### Environment

| Tool | Version | Available | Purpose |
|------|---------|-----------|---------|
| Node.js | v21.7.1 | Yes | Runtime |
| npm | 10.5.0 | Yes | Package manager |
| Netlify CLI | v17.28.0 | Yes | Deploy gistAI |
| React | 18.3.1 | Yes (installed) | NavBar hamburger state |
| Tailwind CSS | 3.4.6 | Yes (installed) | Responsive classes for hamburger |

---

## Package Legitimacy Audit

No external packages are being installed in this phase. All fixes use already-installed dependencies.

**Packages removed due to slopcheck:** none
**Packages flagged as suspicious:** none

---

## Architecture Patterns

### System Architecture Diagram

```
Recruiter Browser
      |
      v
Netlify CDN (personal-website)
      |
      +-- index.html (static) ← OG/SEO tags inserted here (BUG-03, PERF-03)
      |
      +-- React SPA (src/)
            |
            +-- NavBar.jsx ← hamburger state added here (BUG-01)
            |     |
            |     +-- SkillsDropdown.jsx (existing, unchanged)
            |
            +-- ContactMe.jsx ← duplicate div removed, right col added, console.log removed, hidden input fixed (BUG-02, BUG-05, BUG-08)
            |     |
            |     +-- EmailJS (external API, existing)
            |
            +-- Footer.jsx ← year dynamic (BUG-06)
            |
            +-- App.jsx ← console.log removed (BUG-05)
            |
            +-- ProjectCard.jsx (no changes — BUG-07 already compliant)

Netlify (gistAI — separate site to be created)
      |
      +-- Next.js 16 App Router
            |
            +-- /api/stream/* routes (server functions)
            +-- Firebase Auth + Firestore
            +-- Upstash Redis rate limiting
```

### Recommended Project Structure

No structural changes — all fixes are in-place edits to existing files.

---

## Detailed Fix Map

### BUG-01: Mobile Navigation

**Location:** `src/components/NavBar.jsx`

**Current state (lines 69-116):**
```jsx
// All nav links hidden on mobile:
<div className="hidden md:block">
  <div className="ml-10 flex items-baseline space-x-4">
    {/* buttons */}
  </div>
</div>
// No hamburger, no mobile menu
```

**What to build:**
1. Add `isMenuOpen` state: `const [isMenuOpen, setIsMenuOpen] = useState(false)`
2. Add hamburger button `block md:hidden` at far right of the `flex items-center justify-between` row
3. Add slide-down dropdown `block md:hidden` below the main navbar div, conditionally rendered on `isMenuOpen`
4. Dropdown should contain the same nav buttons stacked vertically (`flex flex-col`)
5. Close menu on nav link click (call `setIsMenuOpen(false)` inside each `scrollToSection` wrapper)

**Pattern:** Existing `scrollToSection` helper is already in place. Hamburger wraps it with `setIsMenuOpen(false)`. [VERIFIED: codebase inspection]

**SkillsDropdown consideration:** On mobile, the Skills entry in the dropdown cannot use hover (`onMouseEnter`/`onMouseLeave`) — it should either be omitted from the mobile dropdown or implemented as a tap-to-toggle. Given D-02 (functional-only), omitting Skills from the mobile dropdown and showing a direct scroll-to-about link instead is simpler. Alternatively, include a plain "Skills" button that is non-functional (since Skills is rendered inline in the About section) — Claude's discretion per D-03 convention. [ASSUMED]

### BUG-02: ContactMe Duplicate Container

**Location:** `src/components/ContactMe.jsx`

**Exact structure (lines 77-152):**
```
Line 77: <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row">
Line 78:   {/* Contact Form */}
Line 79:   <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row">  ← DUPLICATE
Line 80:     <div className="md:w-1/2 mb-8 md:mb-0">   ← form left column
              ...form JSX...
Line 150:   </div>   ← closes the inner div at line 79 AND the form column
Line 151: </div>   ← closes outer div at line 77
```

**The bug:** Line 79 is an identical duplicate of line 77. It wraps ONLY the left column (form), preventing any sibling right column from appearing alongside the form. The right column JSX was never written — `contact` prop is accepted but never rendered.

**Fix requires two actions:**
1. Remove the inner duplicate `div` (line 79) and its closing tag (line 150 area)
2. Add a right column `<div className="md:w-1/2">` with contact information

**Right column content:** The `contact` prop is passed from App.jsx (`data.fields.contact`) but its Contentful shape is unknown from code inspection alone. The safest approach for this phase: add a right column with hardcoded contact info (email, LinkedIn, GitHub) using the same data already visible elsewhere on the site. The `contact` field can be left as a future data-binding point. [ASSUMED — contact prop shape not determinable without Contentful schema access]

### BUG-03 + PERF-03: OG Tags and SEO Meta

**Location:** `index.html` `<head>`

**Current state:**
```html
<meta charset="UTF-8" />
<link rel="icon" type="image/svg+xml" href="/avatar.svg" />
<link href="...Google Fonts..." rel="stylesheet" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Antoni Lueddeke</title>
```

**What to add (all values locked by D-04 through D-08):**
```html
<title>Antoni Lueddeke — Software Engineer</title>
<meta name="description" content="Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified. Currently open to new roles." />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Antoni Lueddeke — Software Engineer" />
<meta property="og:description" content="Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified. Currently open to new roles." />
<meta property="og:url" content="https://antonilueddeke.netlify.app" />
<meta property="og:site_name" content="Antoni Lueddeke" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Antoni Lueddeke — Software Engineer" />
<meta name="twitter:description" content="Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified. Currently open to new roles." />
```

Note: `og:image` and `twitter:image` are intentionally omitted per D-07. `og:url` and `og:site_name` are Claude's discretion additions (D-08 allows). [VERIFIED: codebase inspection for current state; values from CONTEXT.md locked decisions]

### BUG-04: Gist AI Deployment

**Critical discovery — the `.netlify` link does not exist:**

Inspection of `/Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI/` shows:
- No `.netlify/` directory
- No `netlify.toml`
- `netlify status` returns: "Error: You don't appear to be in a folder that is linked to a site"

The Netlify account has a site named `gist-antonilueddeke` (`14c6bacd-7272-4e51-bdce-7ab9b6573788`) at `https://gist-antonilueddeke.netlify.app`, but it is linked to the **GitHub repo `alueddeke/brainstation-capstone-frontend`** — the OLD Vite/React capstone prototype, not the current Next.js app.

The OLD site is currently LIVE and serving the old capstone UI (confirmed: returns HTTP 200 with title "gist").

**What the executor must do:**
1. Read `AGENT_HANDOFF.md` in the gistAI repo for full briefing
2. Create a NEW Netlify site for the Next.js app using `netlify sites:create` and link it
3. Add a `netlify.toml` at the repo root specifying Next.js build settings
4. Set ALL environment variables in the Netlify dashboard (13 variables from `.env.local`)
5. Build locally first (`npm run build`) to verify no build errors
6. Deploy with `netlify deploy --build --prod`
7. Confirm live URL works end-to-end (prompt a comparison, verify streaming works)
8. Update the Contentful project card URL for Gist AI to the new live URL

**Netlify + Next.js 16 support:** Confirmed supported as of October 2025 per Netlify changelog. [VERIFIED: WebSearch confirmed Netlify changelog entry "Next.js 16 is ready to deploy on Netlify"]

**Required `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Environment variables required in Netlify dashboard** (from `.env.local`):
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_API_KEY`
- `GROQ_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY` (multiline PEM — paste as-is with literal newlines)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Firebase Auth domain:** After creating the Netlify site, add the new Netlify URL to Firebase Console → Authentication → Authorized domains. [ASSUMED — standard Firebase Auth requirement]

**middleware.ts situation:** Git status shows `middleware.ts` is deleted locally but tracked in HEAD. The gistAI STATE.md confirms `src/proxy.ts` replaced `middleware.ts` for Next.js 16. The executor should commit the deletion of `middleware.ts` before deploying — leaving an uncommitted deletion could cause issues. [ASSUMED — Next.js 16 middleware naming convention, not verified with Next.js 16 docs directly]

### BUG-05: Console.log Removal

**Exact locations:**
- `src/App.jsx:24` — `console.log(result);` (logs full Contentful API response on every page load)
- `src/components/ContactMe.jsx:30` — `console.log("Email successfully sent!", result.text);`
- `src/components/ContactMe.jsx:40` — `console.log("Failed to send email:", error.text);`

All three are straightforward line deletions. [VERIFIED: codebase inspection]

### BUG-06: Footer Year

**Location:** `src/components/Footer.jsx:11`

**Current:** `This project was created using <strong>REACT, TAILWINDCSS </strong> and <strong>CONTENTFUL</strong>. 2024`

**Fix:** Replace `2024` with `{new Date().getFullYear()}` inside the JSX expression. [VERIFIED: codebase inspection]

### BUG-07: rel="noopener noreferrer"

**STATUS: ALREADY FIXED — no changes required.**

Direct inspection of all JSX/HTML files in the project confirms:
- `ProjectCard.jsx:21-22` — `target="_blank"` with `rel="noopener noreferrer"` (custom renderer `<a>`)
- `ProjectCard.jsx:97-98` — `target="_blank"` with `rel="noopener noreferrer"` (outer project link `<a>`)

These are the only two `target="_blank"` occurrences in the codebase. Both already comply. [VERIFIED: codebase inspection]

### BUG-08: Hidden Input Placeholder

**Location:** `src/components/ContactMe.jsx:142`

**Current:** `<input type="hidden" name="to_name" value="Your Name" />`

**Fix:** `<input type="hidden" name="to_name" value="Antoni Lueddeke" />` [VERIFIED: codebase inspection]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Hamburger icon | Custom SVG art | HTML entity `☰` / `✕` or inline SVG (2-3 lines) | No icon library needed for a basic 3-line icon; D-02 says functional-only |
| Mobile menu animation | CSS transitions / Framer Motion | Tailwind `transition-all` on max-height or simple conditional `block`/`hidden` | Phase 3 will restyle; don't over-engineer now |
| OG tags | React Helmet / next/head | Plain static HTML in `index.html` | Site is a static SPA; meta tags belong in the static shell, not React |
| Email validation | Custom regex | Already exists in ContactMe.jsx (`validateEmail`) | Do not change the existing logic |

---

## Common Pitfalls

### Pitfall 1: Hamburger Closes Without Calling scrollToSection

**What goes wrong:** Mobile menu stays open after a nav link is clicked, obscuring the scrolled-to section.
**Why it happens:** `scrollToSection` is called but `setIsMenuOpen(false)` is not called alongside it.
**How to avoid:** Wrap each mobile menu button's onClick to call both: `() => { scrollToSection("about"); setIsMenuOpen(false); }`.
**Warning signs:** Clicking a nav link on mobile doesn't close the dropdown.

### Pitfall 2: ContactMe Right Column Breaks the Layout

**What goes wrong:** After removing the duplicate div, the flex row wraps incorrectly or the right column overflows.
**Why it happens:** The outer container uses `flex flex-col md:flex-row` — both columns must be direct children of this div with explicit width classes (`md:w-1/2`).
**How to avoid:** Ensure the form (left) and contact info (right) are both direct children of the outer `flex` container, not wrapped in additional divs.
**Warning signs:** On desktop the form takes full width; on mobile columns don't stack.

### Pitfall 3: OG Tags Not Picked Up by Social Scrapers

**What goes wrong:** Pasting the URL in Slack/LinkedIn shows no preview after adding OG tags.
**Why it happens:** Social scrapers request the raw HTML (`index.html`) which is static — this is correct. But if the tags are malformed or placed after `<body>`, scrapers skip them.
**How to avoid:** Place all meta tags inside `<head>` before `</head>`. Standard `<meta property="og:...">` attributes, not `<name="og:...">`.
**Warning signs:** Facebook Sharing Debugger shows no OG data found.

### Pitfall 4: Gist AI Build Fails at Netlify Deploy

**What goes wrong:** `netlify deploy --build --prod` fails on Zod env validation because env vars aren't set in Netlify dashboard.
**Why it happens:** `env.server.ts` validates ALL server env vars at startup with Zod and throws immediately if any are missing. Build-time validation means missing vars = failed build.
**How to avoid:** Set ALL 9 server-side env vars in the Netlify dashboard BEFORE the first deploy. Verify with `netlify env:list` after setting.
**Warning signs:** Build log shows `ZodError` or similar env validation failure in the first few lines.

### Pitfall 5: FIREBASE_ADMIN_PRIVATE_KEY Newlines

**What goes wrong:** Firebase Admin SDK fails to initialize with "invalid_grant" or PEM parsing error.
**Why it happens:** Netlify's env var UI sometimes strips actual newlines from multiline values. The private key PEM must have literal `\n` sequences (not actual newlines) OR actual newlines preserved exactly.
**How to avoid:** Paste the key exactly as it appears in `.env.local` (with literal `\n` inside the PEM). The code in `admin.ts` does `.replace(/\\n/g, '\n')` at runtime. [ASSUMED — standard Firebase Admin on Netlify pattern]
**Warning signs:** `/api/library` returns 500 after deploy; `/api/health` returns 200 (confirming basic routing works).

### Pitfall 6: ContactMe Right Column Uses Unknown contact Prop Shape

**What goes wrong:** Right column crashes or renders nothing because the `contact` prop shape from Contentful is unknown.
**Why it happens:** `contentful.js` doesn't resolve the `contact` field as a special entry (it's not in the resolver logic), so its shape depends entirely on the Contentful content model.
**How to avoid:** Build the right column with hardcoded contact information for Phase 1. Use `contact` prop data binding in Phase 2 after the Contentful content model is examined. Guard with optional chaining if binding any `contact` fields.
**Warning signs:** Runtime error "Cannot read properties of undefined" on the contact section.

---

## Code Examples

### Hamburger Toggle Pattern (NavBar.jsx addition)

```jsx
// Add to existing state declarations:
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Hamburger button — add inside the flex items-center justify-between div, after avatar:
<button
  className="block md:hidden ml-auto p-2"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-label="Toggle menu"
>
  {isMenuOpen ? "✕" : "☰"}
</button>

// Mobile dropdown — add after closing </div> of the desktop nav:
{isMenuOpen && (
  <div className="block md:hidden bg-white border-t border-gray-200">
    <div className="flex flex-col px-4 py-2 space-y-1">
      <button onClick={() => { scrollToSection("about"); setIsMenuOpen(false); }} className={linkClass}>
        About Me
      </button>
      <button onClick={() => { scrollToSection("experiences"); setIsMenuOpen(false); }} className={linkClass}>
        Experiences
      </button>
      <button onClick={() => { scrollToSection("music"); setIsMenuOpen(false); }} className={linkClass}>
        Music
      </button>
      <button onClick={() => { scrollToSection("projects"); setIsMenuOpen(false); }} className={linkClass}>
        Projects
      </button>
      <button onClick={() => { scrollToSection("contact"); setIsMenuOpen(false); }} className={linkClass}>
        Contact Me
      </button>
    </div>
  </div>
)}
```

Note: The `linkClass` variable on line 47 of NavBar.jsx uses `isScrolled` to switch text color — on mobile this will show dark text always since mobile backgrounds default to white. This is acceptable under D-02 (functional only). [VERIFIED: codebase inspection]

### ContactMe Structural Fix

```jsx
// BEFORE (broken):
<div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row">
  {/* Contact Form */}
  <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row">  {/* ← DELETE THIS LINE */}
    <div className="md:w-1/2 mb-8 md:mb-0">
      ...form...
    </div>
  </div>  {/* ← DELETE THIS CLOSING TAG */}
</div>

// AFTER (fixed):
<div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row">
  <div className="md:w-1/2 mb-8 md:mb-0">
    ...form...
  </div>
  <div className="md:w-1/2 md:pl-8">
    <h2 className="text-3xl font-bold mb-6 text-white">Get in touch</h2>
    <div className="text-white space-y-4">
      <p>antonilueddeke@gmail.com</p>
      <p><a href="https://linkedin.com/in/antonilueddeke" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a></p>
      <p><a href="https://github.com/alueddeke" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a></p>
    </div>
  </div>
</div>
```

[ASSUMED — right column content (email, LinkedIn, GitHub URLs) inferred from public portfolio context; executor should confirm URLs before shipping]

### OG/SEO Tags (index.html)

```html
<!-- Replace existing <title> and add after <meta name="viewport"> -->
<title>Antoni Lueddeke — Software Engineer</title>
<meta name="description" content="Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified. Currently open to new roles." />

<meta property="og:type" content="website" />
<meta property="og:title" content="Antoni Lueddeke — Software Engineer" />
<meta property="og:description" content="Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified. Currently open to new roles." />
<meta property="og:url" content="https://antonilueddeke.netlify.app" />
<meta property="og:site_name" content="Antoni Lueddeke" />

<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Antoni Lueddeke — Software Engineer" />
<meta name="twitter:description" content="Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified. Currently open to new roles." />
```

[VERIFIED: exact text from CONTEXT.md D-04 through D-08; og:url inferred from Netlify sites list]

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|------------------|-------|
| `target="_blank"` without rel | Always include `rel="noopener noreferrer"` | Prevents opener access and referrer leaking |
| Static copyright year | `new Date().getFullYear()` | No annual manual update needed |
| All console.log in production | Remove or gate behind `process.env.NODE_ENV !== 'production'` | For this phase: removal is sufficient |
| Monolithic mobile nav | Hamburger + slide-down dropdown | Standard Tailwind pattern, no library needed |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | SkillsDropdown can be omitted from mobile dropdown or shown as non-interactive | BUG-01 fix pattern | Skills may need to be tappable on mobile; if so, add a tap-toggle instead |
| A2 | ContactMe right column should use hardcoded contact info (email, LinkedIn, GitHub) for Phase 1 | BUG-02 fix | If `contact` Contentful field is accessible and populated, could bind directly instead |
| A3 | Right column contact URLs are antonilueddeke@gmail.com, linkedin.com/in/antonilueddeke, github.com/alueddeke | BUG-02 fix | Executor should verify actual URLs before writing them in JSX |
| A4 | A new Netlify site must be created for the gistAI Next.js app | BUG-04 | User may want to reuse the existing `gist-antonilueddeke` site by relinking it to the new repo/branch instead |
| A5 | FIREBASE_ADMIN_PRIVATE_KEY should be pasted with literal `\n` sequences (not actual newlines) in Netlify dashboard | BUG-04 pitfall | If Netlify preserves actual newlines correctly, the `\n` approach may double-escape |
| A6 | `middleware.ts` deletion should be committed before deploy | BUG-04 | If the tracked `middleware.ts` coexists with `proxy.ts` without conflict in Next.js 16, commit order doesn't matter |
| A7 | `og:url` value is `https://antonilueddeke.netlify.app` | BUG-03/PERF-03 | Executor should confirm actual production URL from Netlify; if custom domain is used it would differ |

---

## Open Questions

1. **What is the shape of the `contact` Contentful field?**
   - What we know: `data.fields.contact` is passed to ContactMe but never rendered; `contentful.js` has no special resolver for it
   - What's unclear: Is it a string (email only)? An entry with multiple fields? Null in current Contentful?
   - Recommendation: Build the right column with hardcoded values for Phase 1; bind to Contentful in Phase 2 when Contentful schema is accessible

2. **Should the existing `gist-antonilueddeke` Netlify site be relinked, or should a new site be created?**
   - What we know: the existing site serves the old capstone app; the new Next.js app has no Netlify link
   - What's unclear: user may prefer to preserve the existing URL; relinking would break the old capstone site
   - Recommendation: Create a new Netlify site (preserves the old site, gives a new clean URL for the new app); update Contentful project card URL to the new URL

3. **What GitHub Actions / CI strategy does gistAI use for Netlify auto-deploy?**
   - What we know: there is no `netlify.toml` and no `.github/workflows/` in gistAI
   - What's unclear: user may want auto-deploy from main branch push, or manual CLI deploy only
   - Recommendation: For this phase, manual CLI deploy is sufficient. Add CI later if needed.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Personal website build, gistAI build | Yes | v21.7.1 | — |
| npm | Package management | Yes | 10.5.0 | — |
| Netlify CLI | BUG-04 deploy | Yes | v17.28.0 | Manual Netlify dashboard drag-and-drop (slower) |
| Netlify account | BUG-04 deploy | Yes | Authenticated (a.lueddeke@hotmail.com) | — |
| gistAI dependencies | BUG-04 build | Yes (node_modules present) | per package.json | Run `npm install` if stale |
| .env.local (gistAI) | BUG-04 — env vars for Netlify dashboard | Yes (file present) | — | Must not commit; copy values manually |
| Firebase Console access | BUG-04 — add Netlify domain to auth | Assumed (credentials in .env.local) | — | Without this, Google Sign-in fails in production |

**Missing dependencies with no fallback:** None — all required tools are available.

**Security note:** `.env.local` in gistAI contains live API keys. Do NOT commit it. Copy values to Netlify dashboard env vars manually. [VERIFIED: .env.local contains plaintext API keys for OpenAI, Anthropic, Google, Groq, Firebase Admin]

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None configured |
| Config file | None |
| Quick run command | `npm run build` (build-time TypeScript check for gistAI only; personal website has no tests) |
| Full suite command | Manual visual QA per Phase 1 success criteria |

No test framework exists in the personal website (`package.json` has no test script, no Jest/Vitest config). The gistAI project also has no test framework. All validation for this phase is manual.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Available? |
|--------|----------|-----------|-------------------|------------|
| BUG-01 | Hamburger menu appears on mobile; all nav links work; menu closes on link click | Manual (visual + tap) | — | Manual only |
| BUG-02 | ContactMe shows form (left) + contact info (right) on desktop; stacks on mobile | Manual (visual) | — | Manual only |
| BUG-03 | URL pasted in Slack/LinkedIn DM shows correct title + description unfurl | Manual (paste in Slack) | — | Manual only |
| BUG-04 | Gist AI live link opens working app; prompts stream; speed bars animate | Manual (end-to-end) | — | Manual only |
| BUG-05 | Browser DevTools console shows zero output on page load and form submit | Manual (DevTools) | — | Manual only |
| BUG-06 | Footer shows current year (2026) | Manual (visual) | — | Manual only |
| BUG-07 | No changes needed — already compliant | — | `grep -rn 'target="_blank"' src/` (verify no new violations) | Bash scan |
| BUG-08 | EmailJS `to_name` field receives "Antoni Lueddeke" on form submit | Manual (inspect form data) | — | Manual only |
| PERF-03 | `<title>` and `<meta name="description">` present and correct | `curl URL | grep -i 'title\|description'` | Semi-automated | After deploy |

### Sampling Rate
- Per task commit: `npm run lint` (ESLint check on changed files)
- Per wave merge: manual visual QA against Phase 1 success criteria
- Phase gate: All 5 success criteria from ROADMAP.md verified before marking complete

### Wave 0 Gaps
None — no test framework needed for this phase. All validation is manual per the success criteria.

---

## Security Domain

All fixes in this phase are low-risk code hygiene changes. No new authentication, cryptography, or user data handling is introduced.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | — |
| V3 Session Management | No | — |
| V4 Access Control | No | — |
| V5 Input Validation | Partial | Existing `validateEmail` regex in ContactMe unchanged |
| V6 Cryptography | No | — |

### Relevant Security Notes

- BUG-07 (already fixed): `rel="noopener noreferrer"` prevents opener API access (window.opener = null) and stops referrer header leaking — this is the correct mitigation for `target="_blank"` links. [VERIFIED: codebase inspection]
- BUG-08: Removing the "Your Name" placeholder prevents incorrect recipient identification in EmailJS templates. Not a security issue but a functional one.
- Gist AI .env.local: Contains live API keys. Must not be committed. Standard practice: copy to Netlify env dashboard.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection — `src/components/NavBar.jsx`, `ContactMe.jsx`, `Footer.jsx`, `App.jsx`, `index.html`, `src/components/ProjectCard.jsx` — all findings verified by reading actual file contents
- `.planning/phases/01-foundation-fixes/01-CONTEXT.md` — locked decisions for all BUG fixes
- `/Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI/AGENT_HANDOFF.md` — definitive gistAI architecture and deployment reference
- `netlify sites:list` CLI output — confirmed Netlify account sites and their linked repos

### Secondary (MEDIUM confidence)
- [Netlify changelog: Next.js 16 ready to deploy](https://www.netlify.com/changelog/next-js-16-deploy-on-netlify/) — Next.js 16 Netlify support confirmed
- [Netlify Next.js docs](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) — `@netlify/plugin-nextjs` and `netlify.toml` patterns

### Tertiary (LOW confidence — flagged as [ASSUMED] in body)
- Firebase Admin private key Netlify handling pattern — standard community knowledge, not independently verified for this specific key format

---

## Metadata

**Confidence breakdown:**
- Code fixes (BUG-02, 05, 06, 07, 08): HIGH — exact file/line locations confirmed by inspection
- Mobile nav (BUG-01): HIGH — existing NavBar state pattern confirmed; hamburger pattern is standard React/Tailwind
- OG/SEO tags (BUG-03, PERF-03): HIGH — current head content confirmed; exact tag values locked in decisions
- Gist AI deployment (BUG-04): MEDIUM — deployment gap confirmed; Netlify + Next.js 16 support confirmed; env var handling for Firebase private key is ASSUMED

**Research date:** 2026-06-19
**Valid until:** 2026-07-19 (Netlify + Next.js versions stable; code findings don't expire)
