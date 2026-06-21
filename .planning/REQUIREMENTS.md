# Requirements: Antoni Lueddeke — Personal Website Refresh

**Defined:** 2026-06-19
**Core Value:** A recruiter who clicks the link should immediately understand Antoni ships real production software — and want to reach out within minutes.

## v1 Requirements

### Bug Fixes

- [ ] **BUG-01**: Mobile navigation — hamburger menu exists so site is navigable on phones (currently all nav links are `hidden md:block`, site un-navigable on mobile)
- [ ] **BUG-02**: ContactMe layout — duplicate container bug fixed so right column renders and contact info is visible
- [ ] **BUG-03**: Open Graph meta tags — URL unfurls with title, description, and image when shared in Slack/email/DMs
- [ ] **BUG-04**: Gist AI deployment — local version deployed to Netlify, live link verified end-to-end
- [ ] **BUG-05**: Console.log calls removed from App.jsx and ContactMe.jsx (currently logging in production)
- [ ] **BUG-06**: Footer year is dynamic (`new Date().getFullYear()`, not hardcoded "2024")
- [ ] **BUG-07**: All `target="_blank"` external links include `rel="noopener noreferrer"`
- [ ] **BUG-08**: ContactMe hidden input placeholder "Your Name" replaced with actual name

### Content

- [x] **CONT-01**: Hero copy rewritten — specific role claim with proof of shipping (not "passionate about creating projects end to end")
- [x] **CONT-02**: Freelance Software Engineer role added to Experiences (Aug 2025–Present) — Music School SaaS + TalentVibe + Consulting, with achievement bullets covering production billing system, rate-locking pattern, Docker deployment, Stripe Connect, zero-downtime deploy
- [x] **CONT-03**: Risktec Software Engineer role added to Experiences (Sep 2024–Aug 2025) — portfolio management system, Figma handoffs, Agile environment, component library rebuild
- [x] **CONT-04**: Gist AI project updated — new description, current stack tags (React, Express, OAuth, Firebase/Firestore), fresh screenshot, working live link
- [x] **CONT-05**: Music School SaaS added as lead project card with outcome-first framing (live client, real billing, full stack ownership)
- [x] **CONT-06**: SongScope placeholder card added (ML + AI + team lead — full detail when context file arrives)
- [x] **CONT-07**: Wild Oasis and My Frontend Lib removed from Contentful CMS and codebase
- [x] **CONT-08**: Skills section updated — AWS Cloud Practitioner cert, React Native / Expo (mobile), AI/ML stack (OpenAI API, XGBoost, recommendation systems), Docker / Docker Compose / GitHub Actions CI/CD / DigitalOcean / Nginx

### Design

- [x] **DSGN-01**: Dark cinematic color theme — zinc-950 base, replace current mint/teal Tailwind tokens, all components restyled to dark palette
- [x] **DSGN-02**: Section reorder — Hero → Projects → About → Experiences → Music → Contact (Projects currently buried)
- [x] **DSGN-03**: Scroll-triggered entrance animations — framer-motion `whileInView` for section reveals, CSS keyframes for hero mount, `MotionConfig reducedMotion="user"` for accessibility
- [x] **DSGN-04**: ProjectCard content hierarchy — name → one-line impact statement → stack tags → image (currently image-first)
- [x] **DSGN-05**: Teaching section retired as standalone section — Piano Teacher entry folds into Experiences list, Teaching.jsx removed from layout

### Music

- [x] **MUSC-01**: Music section updated with EP "Why We're Living" — title, artwork, Spotify link (https://open.spotify.com/album/28d3TgbRj5Y0a7URbWWdgc)
- [x] **MUSC-02**: Existing performance photos kept — shows real musician identity, not just hobbyist

### Performance & Code Quality

- [ ] **PERF-01**: Contentful Image API optimization — append `?w=800&fm=webp` or equivalent to all image URLs (stop serving full-resolution images)
- [ ] **PERF-02**: Named Contentful asset lookup — replace magic array indices (`pictures[9]`, `backgrounds[10]`, etc.) with named field or slug-based lookup
- [ ] **PERF-03**: SEO meta tags — `<title>`, `<meta name="description">` in index.html

## v2 Requirements

### Rich Text & Media

- **RTXT-01**: Contentful rich text rendered in AboutMe bio (bold, italic, links, multi-paragraph — currently truncated to plain string)
- **RTXT-02**: WaveSurfer memory fix — single audio buffer shared between Howler and WaveSurfer instances instead of two independent fetches per player

### Quality

- **QUAL-01**: Teaching anchor ID added (`<div id="teaching">` wrapper — currently NavBar cannot link to Teaching)
- **QUAL-02**: Shopify Hackathon 1st place award surfaced visibly (currently not prominently shown)
- **QUAL-03**: Unused dependencies removed (`contentful` SDK, `dotenv`)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Wild Oasis project | Older tutorial-level work; dilutes production-grade projects |
| My Frontend Lib project | Same reasoning; removed entirely |
| Full test suite | Not the focus of this refresh |
| Next.js / SSR migration | No business case; React + Vite + Netlify stays |
| Blog / written content | Not in scope for this update |
| SongScope full detail | Placeholder now; context file incoming |
| TalentVibe as project card | Covered under Freelance experience description |
| Testimonials | None available currently |
| GitHub stats widget | Adds noise; GitHub link in nav is sufficient |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BUG-01 | Phase 1 | Pending |
| BUG-02 | Phase 1 | Pending |
| BUG-03 | Phase 1 | Pending |
| BUG-04 | Phase 1 | Pending |
| BUG-05 | Phase 1 | Pending |
| BUG-06 | Phase 1 | Pending |
| BUG-07 | Phase 1 | Pending |
| BUG-08 | Phase 1 | Pending |
| PERF-03 | Phase 1 | Pending |
| CONT-01 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Complete |
| CONT-03 | Phase 2 | Complete |
| CONT-04 | Phase 2 | Complete |
| CONT-05 | Phase 2 | Complete |
| CONT-06 | Phase 2 | Complete |
| CONT-07 | Phase 2 | Complete |
| CONT-08 | Phase 2 | Complete |
| DSGN-05 | Phase 2 | Complete |
| MUSC-01 | Phase 2 | Complete |
| MUSC-02 | Phase 2 | Complete |
| DSGN-01 | Phase 3 | Complete |
| DSGN-02 | Phase 3 | Complete |
| DSGN-04 | Phase 3 | Complete |
| DSGN-03 | Phase 4 | Complete |
| PERF-01 | Phase 5 | Pending |
| PERF-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-19*
*Last updated: 2026-06-19 — traceability updated after roadmap creation*
