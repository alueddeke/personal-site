# Phase 2: Content Overhaul - Context

**Gathered:** 2026-06-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace all stale CMS content with current career evidence. In scope: rewrite hero copy, add two experience roles (Freelance, Risktec), fold Piano Teacher into Experiences, update/build project cards (Music School SaaS as lead, Gist AI update, SongScope real card), remove Wild Oasis + My Frontend Lib entirely, update skills values, update Music section to the "Why We're Living" EP.

This phase changes **content (and the minimum code needed to render new content shapes)**. It does NOT do the dark cinematic redesign, section reorder, or ProjectCard hierarchy/stack-tag rendering — those are Phase 3 (DSGN-01/02/04). It does NOT do scroll animations (Phase 4) or image/perf optimization (Phase 5).

Requirements in scope: CONT-01..CONT-08, DSGN-05, MUSC-01, MUSC-02.

</domain>

<decisions>
## Implementation Decisions

### Contentful Write Path (linchpin)
- **D-01:** Content is written programmatically via the **Contentful Management API (CMA)**. The repo `.env` holds only a read-only CDN token; the CMA token already exists as a permitted `curl` command in `.claude/settings.local.json` (space `0mufjfcbiiue`, env `master`, `https://api.contentful.com`). Executor uses this token for all create/update/delete/publish.
- **D-02:** CMA token MUST NOT be committed or copied into `.env`/source. Read it from `.claude/settings.local.json` (untracked) at execution time only.
- **D-03:** Every CMA write must **publish** the entry/asset (not just save a draft) — the live site reads published content via the CDN.

### Asset / Image Handling
- **D-04:** Executor **uploads all new images via the CMA** (create upload → process → publish asset → link to entry). Antoni drops image files into the repo (e.g. `contentful/`) and tells Claude which file maps to which entry.
- **D-05:** New images needed: fresh Gist AI screenshot, EP "Why We're Living" artwork, Music School SaaS thumbnail, SongScope thumbnail. **Execution dependency:** these files must exist in the repo before the asset-upload tasks run; if a file is missing, that asset task blocks (don't invent placeholders silently).

### Experience Achievement Bullets (content model)
- **D-06:** Bullets are stored as **markdown `- ` lines inside the existing `Experience.description` (Text) field** — no schema change. The `technologies` (Project) and `skills` (personalWebsite) fields already exist in the model, so stack tags and skills need no schema change either.
- **D-07:** `src/components/Experiences.jsx` currently renders `description` as plain text. Add **ReactMarkdown** rendering (the dependency is already used in `ProjectCard.jsx`) so bullets/links display. This is the minimal render code change Phase 2 owns.

### Hero Copy (CONT-01)
- **D-08:** The hero tagline is currently **hardcoded** in `src/components/LandingPage.jsx:31` ("...passionate about creating projects from end to end"), violating the no-hardcoding rule. Move it into a **new Contentful field on `personalWebsite`** (e.g. `heroTagline` / `headline`, type Symbol/Text) created via CMA, and read it as a prop in `LandingPage.jsx`.
- **D-09:** Chosen direction — **proof-led**: *"Full-stack engineer who ships production software — live SaaS billing systems, AI/ML products, and mobile apps. AWS certified, based in Toronto."* Exact wording editable in the approval draft (D-18).

### Skills (CONT-08)
- **D-10:** **Update the `skills` array values only**; keep rendering in the existing NavBar dropdown (`SkillsDropdown`). A dedicated on-page Skills section is a Phase 3 layout concern, out of scope here.
- **D-11:** Add at minimum: AWS Cloud Practitioner, React Native / Expo, AI/ML stack (OpenAI API, XGBoost, recommendation systems), Docker, Docker Compose, GitHub Actions CI/CD, DigitalOcean, Nginx, SSL.

### SongScope Card (CONT-06)
- **D-12:** SongScope is **no longer blocked** — the "incoming context file" is the doc set in `~/Desktop/Projects/songscope/` (see canonical refs). Write a **real, outcome-first card**, not a placeholder.
- **D-13:** Card content: led a team; ML hybrid music-recommendation engine (cosine similarity, Gaussian novelty scoring, Thompson sampling, online SGD taste vector, Jaccard diversity); OpenAI natural-language feedback interpretation; Spotify OAuth; Django + Next.js. Outcome-first one-liner + expandable detail. Keep length comparable to other cards (not a deep technical dump).
- **D-14:** Include the working **live demo link** `https://songscope-demo.netlify.app` with a short "demo mode — single seeded account" note (per STATE.md SongScope deploy context).

### Project Set (CONT-04, CONT-05, CONT-07)
- **D-15:** Final project set after this phase = **Music School SaaS (lead), SongScope, Gist AI** only. Music School SaaS framed outcome-first (live client, real Stripe billing, full-stack ownership). Gist AI updated: new description, `technologies` = React, Express, OAuth, Firebase/Firestore, fresh screenshot, working live link (`https://gistai-app.netlify.app`).
- **D-16:** **Hard-remove** Wild Oasis and My Frontend Lib: delete (or unpublish+delete) their `project` entries via CMA AND remove them from the `personalWebsite.projects` link array. Verify they no longer appear in the CDN response.

### Teaching Retirement (DSGN-05)
- **D-17:** Create a **Piano Teacher Experience entry** (folds the existing `teachingBio` content into the Experiences list) and **remove `<Teaching />` from `src/App.jsx`** layout. Leave `Teaching.jsx` file removal/cleanup minimal — the goal is it no longer renders on the page. (`teachingBio` field can remain in the model; just stop rendering the standalone section.)

### Copy Approval Workflow
- **D-18:** **Draft → approve → push.** Executor writes all drafted copy (hero, both experience roles, Music School SaaS / SongScope / Gist AI cards, skills list, music/EP copy) into a review doc (`CONTENT-DRAFT.md` in the phase dir). Antoni reviews/edits. Only **after approval** does the executor push to Contentful via CMA. This is a hard checkpoint — CMA writes are live to production and recruiter handoff is imminent.

### Claude's Discretion
- Exact field id/name for the new hero field (`heroTagline` vs `headline`) — Claude's choice, document it.
- Whether the "Hi, I'm {name}" greeting line stays or is absorbed into the new tagline.
- Exact markdown structure of experience bullets (number, ordering) — draft from REQUIREMENTS detail, refined in approval.
- Exact `technologies` tag wording per project.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements & success criteria
- `.planning/REQUIREMENTS.md` — CONT-01..CONT-08, DSGN-05, MUSC-01, MUSC-02 definitions
- `.planning/ROADMAP.md` §Phase 2 — goal, 5 success criteria, mode (mvp), depends on Phase 1
- `.planning/STATE.md` — SongScope deploy context (demo mode, live URLs), project list state

### Contentful (data layer + write path)
- `.claude/settings.local.json` — holds the CMA token (permitted `curl` to `api.contentful.com`, space `0mufjfcbiiue`); untracked, do NOT commit
- `src/contentful.js` — CDN fetch + link/asset resolution; content type `personalWebsite`, `include: 10`
- Content model (live, fetched via CMA): `experience` {title, description(Text), startDate, endDate, company, isOngoing}; `project` {title, description(Text), thumbnail, projectUrl, technologies(Array<Symbol>), date}; `personalWebsite` {name, bio(RichText), skills(Array<Symbol>), contact, pictures, backgrounds, projects, avatar, audioClips, musicBio, teachingBio, experiences}; `audioClip` {title, description, audioFile, startTime, endTime}

### Components touched
- `src/components/LandingPage.jsx:31` — hardcoded hero tagline to move into Contentful (D-08)
- `src/components/Experiences.jsx` — plain-text description; add ReactMarkdown render (D-07)
- `src/components/ProjectCard.jsx` — already uses ReactMarkdown; reference for markdown render pattern
- `src/App.jsx` — remove `<Teaching />` from layout (D-17); section wiring
- `src/components/SkillsDropdown.jsx` / `src/components/NavBar.jsx` — skills render target (D-10)

### SongScope source docs (the "context file")
- `~/Desktop/Projects/songscope/CONCEPTS.md` — ML/DS algorithm reference (cosine, novelty, Thompson sampling, online SGD, Jaccard, OpenAI NL feedback)
- `~/Desktop/Projects/songscope/SYSTEM_DESIGN.md` — architecture
- `~/Desktop/Projects/songscope/CURRENT_STATE.md` — what works, stack, deploy status
- `~/Desktop/Projects/songscope/INTERVIEW_PREP_SONGSCOPE.md` — outcome/impact framing
- `personal-website/HANDOFF_DEPLOY.md` — SongScope deploy details

### Codebase maps
- `.planning/codebase/INTEGRATIONS.md`, `.planning/codebase/STRUCTURE.md`, `.planning/codebase/CONVENTIONS.md`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ReactMarkdown` + `customRenderer` pattern in `ProjectCard.jsx` — reuse for `Experiences.jsx` bullet rendering
- CMA access via permitted `curl` (settings.local.json) — already wired into allowed Bash commands
- `src/contentful.js` `resolveAsset()` + link resolution — new entries/assets must conform to existing link shapes so the resolver picks them up

### Established Patterns
- Single `personalWebsite` entry with linked `project` / `experience` / `audioClip` entries and linked assets; `include: 10` deep resolution
- Tailwind utilities only; PascalCase components; section IDs kebab-case
- Content via Contentful only — no hardcoding in JSX (this phase fixes the hero violation)

### Integration Points
- New `heroTagline` field → `personalWebsite` entry → prop into `LandingPage.jsx`
- New/updated `project` + `experience` entries must be linked into `personalWebsite.projects` / `.experiences` arrays (and removals unlinked) for the CDN fetch to surface them
- Removing `<Teaching />` in `App.jsx` is the render-side of DSGN-05; Piano Teacher data moves to an `experience` entry

</code_context>

<specifics>
## Specific Ideas

- Hero direction locked to the proof-led line (D-09).
- SongScope real card sourced from the songscope doc set; live demo link + demo-mode note.
- Music: EP "Why We're Living", Spotify album `https://open.spotify.com/album/28d3TgbRj5Y0a7URbWWdgc`; keep existing performance photos (MUSC-02); update `musicBio` / EP artwork accordingly.
- Freelance role (Aug 2025–Present): Music School SaaS + TalentVibe + Consulting — bullets on production billing system, rate-locking pattern, Docker deploy, Stripe Connect, zero-downtime deploy.
- Risktec role (Sep 2024–Aug 2025): portfolio management system, Figma handoffs, Agile, component-library rebuild.

</specifics>

<deferred>
## Deferred Ideas

- Dark cinematic palette, section reorder, ProjectCard name→impact→tags→image hierarchy, stack-tag rendering — Phase 3 (DSGN-01/02/04).
- Scroll/entrance animations — Phase 4 (DSGN-03).
- Contentful Image API (webp/size) + named asset lookup — Phase 5 (PERF-01/02).
- Dedicated on-page Skills section (vs nav dropdown) — Phase 3 layout if desired.
- `teachingBio` field hard-removal from the content model — optional later cleanup; Phase 2 only stops rendering it.

None beyond the above — discussion stayed within phase scope.

</deferred>

---

*Phase: 2-content-overhaul*
*Context gathered: 2026-06-20*
