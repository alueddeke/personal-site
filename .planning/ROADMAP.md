# Roadmap: Antoni Lueddeke — Personal Website Refresh

## Overview

A five-phase brownfield refresh of an existing React + Vite + Tailwind + Contentful + Netlify SPA. The site needs to go from broken/stale to recruiter-ready: fix everything blocking first impression (Phase 1), update all content to reflect real career growth (Phase 2), apply a dark cinematic design overhaul (Phase 3), add tasteful scroll animations (Phase 4), and finish with image performance and code quality cleanup (Phase 5).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation Fixes** - Fix every broken or professionally embarrassing thing before design work ships (completed)
- [x] **Phase 2: Content Overhaul** - Replace all stale content with current career evidence in Contentful CMS (completed 2026-06-21)
- [x] **Phase 3: Dark Cinematic Design** - New Tailwind tokens, section reorder, component restyling (completed 2026-06-21)
- [x] **Phase 4: Scroll Animations** - framer-motion whileInView reveals, hero CSS entrance, reduced-motion support
- [ ] **Phase 5: Performance & Code Quality** - Contentful Image API, named asset lookup, Lighthouse polish

## Phase Details

### Phase 1: Foundation Fixes
**Goal**: Every bug that makes the site broken or professionally embarrassing is resolved — the site is navigable on mobile, shareable with correct link previews, and the Gist AI live link actually works
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: BUG-01, BUG-02, BUG-03, BUG-04, BUG-05, BUG-06, BUG-07, BUG-08, PERF-03
**Success Criteria** (what must be TRUE):
  1. A recruiter opening the site on a phone sees a working hamburger menu and can navigate to any section
  2. A recruiter pasting the URL into Slack or LinkedIn DM sees a properly titled, described unfurl preview with image
  3. The Gist AI project card's "live link" opens a working deployed application on Netlify
  4. The ContactMe section shows both the form (left column) and contact information (right column) fully rendered
  5. The browser dev tools console shows zero log output when browsing the production site
**Plans**: 3 plans
- [x] 01-01-PLAN.md — Mobile nav, ContactMe two-column fix, OG/SEO tags, footer year, console.log + hidden-input hygiene
- [x] 01-02-PLAN.md — Deploy Gist AI Next.js app to a new Netlify site and update the Contentful project card URL
- [x] 01-03-PLAN.md — SongScope demo-mode deploy (Render + Netlify) and project card wiring
**UI hint**: yes

### Phase 2: Content Overhaul
**Goal**: Every section reflects Antoni's actual career as of mid-2026 — two new experience roles, three updated projects, correct skills, updated music EP, and Teaching retired as a standalone section
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, DSGN-05, MUSC-01, MUSC-02
**Success Criteria** (what must be TRUE):
  1. The hero opens with a specific role claim and proof hook — no generic "passionate about creating" language visible anywhere
  2. The Experiences section lists Freelance Software Engineer (Aug 2025–Present) and Risktec Software Engineer (Sep 2024–Aug 2025) with outcome-focused bullets
  3. The Projects section shows only Music School SaaS, SongScope, and Gist AI — Wild Oasis and My Frontend Lib are completely absent from Contentful and the rendered site
  4. The Skills section includes AWS Cloud Practitioner, React Native / Expo, AI/ML stack, and Docker/CI/CD tooling
  5. The Music section shows "Why We're Living" EP with a working Spotify link and no Teaching section appears anywhere in the page layout
**Plans**: 5 plans
- [x] 02-01-PLAN.md — Inventory + CDN verify harness + draft ALL copy + heroTagline field activation + approval gate
- [x] 02-02-PLAN.md — Experiences: Freelance + Risktec + Piano Teacher entries (CMA)
- [x] 02-03-PLAN.md — Projects: Music School SaaS lead + Gist AI + SongScope updates; remove Wild Oasis + My Frontend Lib (unlink-before-delete); thumbnail uploads
- [x] 02-04-PLAN.md — Hero tagline value + skills + music EP (single read-modify-write) + EP artwork upload
- [x] 02-05-PLAN.md — JSX render: ReactMarkdown in Experiences, heroTagline prop, remove Teaching; build + verify all 5 success criteria

### Phase 3: Dark Cinematic Design
**Goal**: The site presents a dark cinematic aesthetic — zinc-950 base palette, reordered sections (Hero → Projects → About → Experiences → Music → Contact), and all components restyled with the new token system
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: DSGN-01, DSGN-02, DSGN-04
**Success Criteria** (what must be TRUE):
  1. The site background is dark (zinc-950 / near-black) with high-contrast white primary text — the mint/teal palette is fully replaced across every component
  2. A visitor scrolling top-to-bottom encounters sections in the order: Hero, Projects, About, Experiences, Music, Contact
  3. Every ProjectCard shows name → one-line impact statement → stack tags → image (in that order), with no date field visible
  4. The NavBar transitions from transparent to a dark blurred backdrop on scroll and passes WCAG AA contrast on dark backgrounds
**Plans**: TBD
**UI hint**: yes

### Phase 4: Scroll Animations
**Goal**: Tasteful framer-motion scroll-triggered reveals are applied to every section below the fold, the hero fires a CSS-only entrance sequence, and prefers-reduced-motion is handled globally
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: DSGN-03
**Success Criteria** (what must be TRUE):
  1. Each section below the hero fades and slides up into view as a visitor scrolls down — content is not visible until it enters the viewport
  2. The hero elements (name, tagline, CTAs) animate in via CSS on page load, before any scroll occurs, with no dependency on IntersectionObserver
  3. A visitor with prefers-reduced-motion enabled sees all content fully visible with no motion effects
  4. Disabling JavaScript in the browser reveals all page content at full opacity — no content is hidden by motion state
**Plans**: TBD
**UI hint**: yes

### Phase 5: Performance & Code Quality
**Goal**: Images are served at appropriate sizes in webp format, all Contentful asset access uses named field lookups (no magic indices), and Lighthouse FCP is under 2.5s on the production URL
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02
**Success Criteria** (what must be TRUE):
  1. Every image on the site loads a webp-formatted, appropriately sized variant from Contentful's Image API — no full-resolution originals are served to the browser
  2. Adding or reordering assets in Contentful does not break any image on the site — there are no positional array accesses in the codebase
  3. A Lighthouse run on the deployed production URL returns a First Contentful Paint under 2.5 seconds on a simulated mobile 4G connection
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation Fixes | 1/2 | In Progress|  |
| 2. Content Overhaul | 5/5 | Complete   | 2026-06-21 |
| 3. Dark Cinematic Design | 1/1 | Complete   | 2026-06-21 |
| 4. Scroll Animations | 0/? | Not started | - |
| 5. Performance & Code Quality | 0/? | Not started | - |
