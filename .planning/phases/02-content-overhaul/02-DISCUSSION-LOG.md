# Phase 2: Content Overhaul - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-20
**Phase:** 2-content-overhaul
**Areas discussed:** Contentful write path, Content model changes, Hero copy, Skills + SongScope card, Copy approval

---

## Contentful Write Path

| Option | Description | Selected |
|--------|-------------|----------|
| Provide a CMA token | Add a Management API token; agent scripts all entry CRUD + asset uploads | ✓ |
| Content-spec doc, you enter | Claude writes a spec, user clicks in Contentful UI | |
| Hybrid | Agent scripts text; user uploads assets | |

**User's choice:** CMA token (already provided — confirmed present in `.claude/settings.local.json`).
**Notes:** Token is a permitted `curl` against `api.contentful.com`, space `0mufjfcbiiue`. Read-only CDN token in `.env` is insufficient. CMA token must never be committed.

### Asset / Image Handling (sub-question)

| Option | Description | Selected |
|--------|-------------|----------|
| Agent uploads all via CMA | User drops files in repo, agent uploads + links | ✓ |
| You upload images manually | Agent does text only; user uploads in UI | |
| Reuse existing, defer new | Use existing assets; new images later | |

**User's choice:** Agent uploads all via CMA.
**Notes:** Execution dependency — image files must be in the repo before asset tasks run.

---

## Content Model Changes (experience bullets)

| Option | Description | Selected |
|--------|-------------|----------|
| Markdown in description + render | Bullets as markdown in existing description; add ReactMarkdown to Experiences.jsx | ✓ |
| New 'highlights' field | Add Array<Symbol> field via CMA; render <ul> | |
| Plain text paragraph | Prose, no bullets | |

**User's choice:** Markdown in description + render.
**Notes:** Live schema check confirmed `Project.technologies` and `personalWebsite.skills` already exist — no schema change for tags/skills.

---

## Hero Copy (CONT-01)

| Option | Description | Selected |
|--------|-------------|----------|
| Proof-led | "Full-stack engineer who ships production software — live SaaS billing systems, AI/ML products, and mobile apps. AWS certified, based in Toronto." | ✓ |
| Builder / ship-verbs | "I build and ship production software — from a live SaaS billing platform with Stripe Connect to ML recommendation systems and React Native apps." | |
| Identity + concrete proof | "Full-stack software engineer. I ship real products: a live client SaaS with real billing, an AI/ML recommendation engine, and production fintech tooling." | |

**User's choice:** Proof-led.
**Notes:** Current tagline is hardcoded in LandingPage.jsx:31 — move to a new Contentful field. Exact wording editable in approval draft.

---

## Skills + SongScope Card

### Skills (CONT-08)

| Option | Description | Selected |
|--------|-------------|----------|
| Update values, keep in nav | Update skills array; keep NavBar dropdown rendering | ✓ |
| Update values + new page section | Build dedicated on-page Skills section now | |

**User's choice:** Update values, keep in nav. Dedicated section deferred to Phase 3.

### SongScope card (CONT-06)

| Option | Description | Selected |
|--------|-------------|----------|
| Real card, outcome-first | Genuine card from songscope docs; outcome-first + demo link | ✓ |
| Deep technical card | Longer, surfaces ML depth | |
| Lean teaser + demo link | Short outcome line + link only | |

**User's choice:** Real card, outcome-first. User directed Claude to find the context file in handoff docs.
**Notes:** "Context file" located = doc set in `~/Desktop/Projects/songscope/` (CONCEPTS.md, SYSTEM_DESIGN.md, CURRENT_STATE.md, INTERVIEW_PREP_SONGSCOPE.md). SongScope no longer blocked.

---

## Copy Approval

| Option | Description | Selected |
|--------|-------------|----------|
| Draft → you approve → push | Executor writes CONTENT-DRAFT.md; user reviews; then push to CMA | ✓ |
| Push directly, fix after | Push straight to Contentful; review on live site | |
| Hybrid: gate hero only | Gate hero; push the rest directly | |

**User's choice:** Draft → approve → push.
**Notes:** CMA writes are live to production; recruiter handoff imminent → hard approval checkpoint.

---

## Claude's Discretion

- New hero field id/name (`heroTagline` vs `headline`).
- Whether "Hi, I'm {name}" greeting stays or folds into the tagline.
- Exact markdown structure/ordering of experience bullets.
- Exact `technologies` tag wording per project.

## Deferred Ideas

- Dark palette, section reorder, ProjectCard hierarchy + stack-tag rendering → Phase 3.
- Scroll/entrance animations → Phase 4.
- Contentful Image API + named asset lookup → Phase 5.
- Dedicated on-page Skills section → Phase 3 layout.
- `teachingBio` field hard-removal from content model → optional later cleanup.
