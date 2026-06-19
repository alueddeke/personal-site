# Phase 1: Foundation Fixes - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-19
**Phase:** 1-Foundation-Fixes
**Areas discussed:** Mobile nav pattern, OG/SEO copy, Gist AI deployment scope

---

## Mobile Nav Pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Slide-down dropdown | Menu drops below navbar, links stacked vertically. Simple state toggle. Reuses existing NavBar.jsx. | ✓ |
| Side drawer | Panel slides in from right/left with overlay. Needs new Drawer component + z-index management. | |
| Full-screen overlay | Takes full viewport. Cinematic but overly complex for a bug fix phase. | |

**User's choice:** Slide-down dropdown

| Option | Description | Selected |
|--------|-------------|----------|
| Theme-neutral / functional only | No investment in current mint/teal tokens. Phase 3 reskins everything. | ✓ |
| Styled to current theme | Use existing design tokens. Phase 3 will replace it anyway. | |

**User's choice:** Theme-neutral / functional only

| Option | Description | Selected |
|--------|-------------|----------|
| Far right | Standard mobile convention, thumb-reachable. | ✓ |
| Far left | Less conventional, conflicts with logo placement. | |
| You decide | Claude picks standard convention. | |

**User's choice:** Far right

**Notes:** None — all standard convention choices.

---

## OG / SEO Copy

| Option | Description | Selected |
|--------|-------------|----------|
| Antoni Lueddeke — Software Engineer | Clean, role-first. 120 chars. | ✓ |
| Antoni Lueddeke \| Full-Stack Engineer | More specific, pipe separator. | |
| Custom | User provides own copy. | |

**User's choice:** `Antoni Lueddeke — Software Engineer`

| Option | Description | Selected |
|--------|-------------|----------|
| "Full-stack software engineer based in Toronto..." | Outcome-focused, 120 chars. | |
| "Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified..." | Keyword-dense, mentions mobile + AI/ML. 118 chars. | ✓ |
| Custom | User provides own copy. | |

**User's choice:** `Software Engineer based in Toronto — full-stack web, mobile, and AI/ML. AWS certified. Currently open to new roles.`

| Option | Description | Selected |
|--------|-------------|----------|
| Skip — text-only unfurl | No og:image. Add after Phase 3 when design is finalized. | ✓ |
| Use existing photo from Contentful | Headshot or performance photo. Fragile until Phase 5. | |
| Use screenshot of site | More work. Current site not worth screenshotting. | |

**User's choice:** Skip for now

**Notes:** OG image deferred until after Phase 3 — when the dark cinematic design is live, a screenshot will look professional enough to share.

---

## Gist AI Deployment Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Separate local repo, different directory | Gist AI is its own codebase, not inside personal-website. | ✓ |
| Subfolder inside this repo | — | |
| Already deployed — just URL fix | — | |

**User's choice:** Separate local repo at `/Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI`

| Option | Description | Selected |
|--------|-------------|----------|
| Fresh Netlify deploy from local build | Build + deploy dist/. | ✓ (with investigation first) |
| Investigate first, then fix | Check current site status before deciding. | ✓ (combined answer) |
| Just update the link | Working URL already exists. | |

**User's choice (free text):** "probably option 1, but investigate what's broken needs to happen first"

| Option | Description | Selected |
|--------|-------------|----------|
| Existing Netlify site — discover via `netlify status` | Repo already linked; executor runs status to find it. | ✓ |
| No existing site — create new | Start fresh deployment. | |
| I know the URL | User provides URL directly. | |

**User's choice:** Existing Netlify site — executor discovers via `netlify status`

**Notes (free text from user):** "Gist has an existing old deployment, but I have updated the local project since, I just need to update the deployment with the new fixes, all new changes have documentation within the project."

---

## Claude's Discretion

- Exact hamburger icon — standard ☰/X pattern, Claude's choice
- Tailwind classes for mobile dropdown container — functional and neutral
- Whether to add `og:url`, `og:type`, `og:site_name` — standard additions with sensible values

## Deferred Ideas

- OG image — add after Phase 3 when dark cinematic design is live and a screenshot looks polished
- Teaching section anchor ID (QUAL-01) — v2 requirement, not Phase 1
- Tailwind token inconsistency in Loading.jsx — Phase 5 cleanup
