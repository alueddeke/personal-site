# Personal Website — Antoni Lueddeke

## What This Is

A recruiter-facing personal portfolio for Antoni Lueddeke, a full-stack software engineer in Toronto. The site showcases professional work history, flagship projects, technical skills, and an active music career, all within a single-page React application backed by Contentful CMS and deployed on Netlify. The site is undergoing a full content refresh and design overhaul to reflect significant career growth since the original build and to make a strong first impression on recruiters being handed the URL directly.

## Core Value

A recruiter who clicks the link should immediately understand Antoni ships real production software — and within minutes, should want to reach out.

## Requirements

### Validated

- ✓ Single-page React SPA with anchor-scroll navigation — existing
- ✓ Contentful CMS headless integration (all content managed via CMS) — existing
- ✓ Sections: Landing, About Me, Experience, Music, Teaching, Projects, Contact, Footer — existing
- ✓ Audio player with waveform visualization (Howler + WaveSurfer) in Music section — existing
- ✓ EmailJS-powered contact form — existing
- ✓ Netlify static deployment — existing
- ✓ Tailwind CSS styling system with custom design tokens — existing
- ✓ NavBar with anchor link navigation — existing

### Active

**Design & UX**
- [ ] Dark cinematic aesthetic replacing current mint/teal palette
- [ ] Smooth, tasteful entrance animations (scroll-triggered reveals, no overdone effects)
- [ ] Impressive, immediate landing hero — "full-stack who ships" message lands within 5 seconds
- [ ] Responsive mobile layout including mobile navigation (currently broken)

**Content — Experiences**
- [ ] Add Freelance Software Engineer role (Aug 2025–Present): Music School SaaS + TalentVibe + Consulting
- [ ] Add Software Engineer role at Risktec (Sep 2024–Aug 2025)
- [ ] SongScope entry as a project/experience hybrid (placeholder, context file incoming)
- [ ] Verify Piano Teacher experience still accurate

**Content — Projects**
- [ ] Music School SaaS as lead project (live client, billing, full stack, full ownership)
- [ ] SongScope placeholder card (ML + AI + team lead) — full detail added when context file arrives
- [ ] Gist AI: updated description, stack tags, screenshot, working live link
- [ ] Remove Wild Oasis and My Frontend Lib entirely

**Content — Skills**
- [ ] Add: AWS Cloud Practitioner certification
- [ ] Add: React Native, Expo (mobile)
- [ ] Add: AI/ML stack (OpenAI API, XGBoost, recommendation systems, adaptive weighting)
- [ ] Add: Docker, Docker Compose, GitHub Actions CI/CD, DigitalOcean, Nginx, SSL

**Music Section**
- [ ] Update to EP "Why We're Living" (6 studio-tracked songs, not demos)
- [ ] Add Spotify link: https://open.spotify.com/album/28d3TgbRj5Y0a7URbWWdgc
- [ ] Keep as footer personality piece — not competing with professional work
- [ ] Evaluate whether existing performance photos are an asset or noise

**Deployment**
- [ ] Investigate and fix main site Netlify deployment (pointing to wrong/stale build)
- [ ] Deploy current Gist AI local version to Netlify and verify live link works

**Bug Fixes**
- [ ] Mobile navigation (NavBar links hidden on mobile, no hamburger menu)
- [ ] Teaching section missing anchor ID
- [ ] Duplicate nested container in ContactMe (right column never renders)
- [ ] Footer hardcoded year → `new Date().getFullYear()`
- [ ] Remove console.log calls from App.jsx and ContactMe.jsx
- [ ] Add `rel="noopener noreferrer"` to all `target="_blank"` external links
- [ ] Fix hardcoded placeholder in ContactMe "Your Name" hidden field

**Code Quality**
- [ ] Replace magic-number array indices for Contentful assets with named field lookup
- [ ] Add Contentful Image API params (webp, size) to image URLs

### Out of Scope

- Wild Oasis project — removing; older work dilutes stronger current projects
- My Frontend Lib project — removing; same reasoning
- Full test suite — not the focus of this refresh
- Server-side rendering / Next.js migration — stack stays React + Vite + Netlify
- Blog or written content section — not in scope for this update
- SongScope full context — placeholder now, full content added when context file arrives
- TalentVibe as separate project card — covered under Freelance experience description

## Context

**Current stack:** React 18 + Vite + Tailwind CSS + Contentful CMS (Axios/REST) + EmailJS + Netlify + Howler + WaveSurfer. No routing, no state management library — all data from Contentful fetched once on mount and prop-drilled.

**Career arc since original build:** Antoni completed BrainStation (Feb–May 2024), won a Shopify hackathon, built Gist AI and Wild Oasis as portfolio pieces. Since then: 1-year eng role at Risktec (fintech, production codebase), AWS certification, independent SongScope ML project with a real team and real users, and freelance work with two active clients including a live production SaaS billing system. This is a substantial career upgrade the site needs to reflect.

**Target audience:** Recruiters handing the URL directly to hiring managers at product companies. Roles targeted: full-stack product engineer, senior/lead positions. Not narrowly sector-focused.

**Design direction:** Dark cinematic aesthetic (think Vercel, Linear — sophisticated developer-as-craftsperson feel). Tasteful motion: scroll-triggered entrance animations, smooth CSS transitions. No excessive animation. Impressive within seconds of landing. Color palette TBD via research but should support dark backgrounds with strong typography.

**Gist AI deployment issue:** The currently deployed Netlify URL may be stale or broken. A fresh local build needs to be deployed and verified end-to-end.

**Main site deployment:** Needs investigation — may be stale, misconfigured, or pointing to an old Netlify site. Diagnose before fixing.

**Music:** Antoni is an active musician. Band: The Daily Commute. EP: "Why We're Living" (6 studio-tracked songs). Spotify: https://open.spotify.com/album/28d3TgbRj5Y0a7URbWWdgc. Music section stays as a personality piece at the bottom — present and proud but not competing with professional content.

## Constraints

- **Stack**: React + Vite + Tailwind + Contentful + Netlify — no migrations, stay on current stack
- **Content management**: All dynamic content must go through Contentful (text, images, projects, music); no hardcoding in JSX
- **Deployment**: Netlify for both main site and Gist AI
- **SongScope context**: Full project detail blocked on incoming context file; use placeholder card for now
- **Timeline**: Recruiter handoff is imminent — prioritize visible impact over deep refactoring

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dark cinematic design | Matches developer-as-craftsperson aesthetic; more memorable than typical portfolio | — Pending |
| Music as footer personality piece | Present but not competing with professional work; shows dimensionality | — Pending |
| Remove Wild Oasis + Frontend Lib | Older tutorial-level projects dilute newer production-grade work | — Pending |
| Lead project: Music School SaaS | Live production billing system = strongest proof of real-world engineering | — Pending |
| SongScope placeholder now | Context file incoming; placeholder holds space without blocking progress | — Pending |
| Stay on React + Vite + Netlify | No business case for migration; stack is solid | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-19 after initialization*
