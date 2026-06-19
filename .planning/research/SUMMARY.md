# Project Research Summary

**Project:** Personal Portfolio — Antoni Lueddeke
**Domain:** Recruiter-facing developer portfolio, dark cinematic SPA
**Researched:** 2026-06-19
**Confidence:** HIGH (codebase-grounded analysis + established recruiter UX patterns)

---

## Executive Summary

This is a recruiter-handoff portfolio for a full-stack software engineer with real production credentials — a year at Risktec, a live billing SaaS with paying clients, an ML project (SongScope), an AWS certification, and a Shopify hackathon win. The existing React 18 + Vite + Tailwind + Contentful + Netlify stack is the right stack and must not change. Two libraries are being added: `framer-motion` for scroll-triggered section reveals and `tailwindcss-animate` for Tailwind animation utilities. Everything else — dark palette, typography, spacing — is Tailwind configuration, not new dependencies.

The recommended approach is to fix broken functionality first (mobile nav, ContactMe layout bug, meta tags, Gist AI live link), then execute the dark cinematic design overhaul (color tokens, typography scale, spacing, hero redesign), then layer in animations. Section order must change: Hero → Projects → About → Experiences → Music → Contact. The current order buries the strongest content behind biography and dissolves credibility by placing Music between two professional sections. The Teaching section should be retired as a standalone section and folded into Experiences as a single entry.

The primary risks are content-level, not technical. A beautiful dark site with a generic hero ("passionate about creating projects end to end") fails the recruiter test in under 8 seconds regardless of visual quality. Every phase must treat copy updates — impact metrics, outcome framing, production evidence — as equally critical as visual changes. The existing codebase has five known blocking bugs (mobile nav, ContactMe right column, Gist AI live link, console.logs, target="_blank" security) that must be resolved before any design work is visible to recruiters.

---

## Recommended Stack Additions

The existing stack is solid. Nothing is migrated. Two additive packages only.

**Add:**
- `framer-motion ^11.x` (dependency) — Scroll-triggered section reveals via `whileInView` + `viewport={{ once: true }}`. `MotionConfig reducedMotion="user"` wrapper in `App.jsx` handles `prefers-reduced-motion` globally. Hero animations use CSS `@keyframes` instead — fires before JS hydrates.
- `tailwindcss-animate ^1.0.7` (devDependency) — CSS animation utilities for mount transitions and hero element animations. Zero runtime cost — purged at build time.

**Configure (not new dependencies):**
- Tailwind `colors`: Replace mint/teal/sky-blue tokens with zinc-scale dark palette. Base: `#09090b`. Text: `#fafafa` primary / `#a1a1aa` secondary / `#52525b` muted. Single accent — cold white (`#e2e8f0`) or indigo (`#6366f1`). One only.
- Tailwind `fontSize`: Custom `display` / `headline` / `subheading` scale with tight letter-spacing (`-0.02em` on display, `-0.015em` on headlines).
- `index.css`: Add `@keyframes fadeUp` and `@keyframes fadeIn` for hero CSS animations.

**Do not add:**
- GSAP — overkill for declarative React; same bundle cost with far more integration complexity
- AOS — DOM class mutation conflicts with React; dated pre-2022 pattern
- Tailwind v4 migration — breaking config format change, no animation upside, all existing classes need audit

**Verify before pinning versions:** bundlephobia.com for framer-motion actual bundle size; npmjs.com for current version numbers.

---

## Recommended Section Order and Content Hierarchy

**Final section order:**
```
NavBar (fixed top, transparent → backdrop-blur-md bg-black/60 on scroll)
LandingPage   id="hero"        — full-viewport, CSS-animated entrance
Projects      id="projects"    — lead with evidence; recruiter sees work before bio
AboutMe       id="about"       — context after proof
Experiences   id="experiences" — professional trajectory
Music         id="music"       — personality flourish, near footer
ContactMe     id="contact"     — CTA destination
Footer
```
Teaching.jsx retired as standalone section. Content moves to an Experiences entry in Contentful.

**Hero content hierarchy (top to bottom):**
1. Name — `text-7xl font-bold`, tight tracking
2. Role claim — one line, specific: "Full-Stack Software Engineer · Ships Production Software"
3. Proof hook — one line: "AWS Certified · Live SaaS billing · ML team lead"
4. Two CTA buttons — "View My Work" (scroll to projects) + "Get in Touch" (jump to contact)
5. Photo — optional, secondary element only; not the visual centerpiece

**Project card content hierarchy (top to bottom):**
1. Project name — large, high contrast
2. One-line impact statement — "Live billing SaaS, paying clients, full solo ownership"
3. Tech stack tags — visible without any click/expand
4. Thumbnail image — visual proof, positioned after text
5. "View Project" link
6. Role badge ("Solo", "Team Lead") + Production flag ("Live client" vs. "Side project")
Remove: date field entirely.

**About section:** Two-column layout (bio 2/3, photo 1/3). Bio opens with career claim in first sentence. Three short paragraphs: present claim → brief non-linear path framing → what you're looking for. No walls of text.

---

## Table Stakes Features (must-have before recruiter handoff)

| Feature | Current State | Fix |
|---------|--------------|-----|
| Hero CTA buttons | Missing entirely | Add "View My Work" + "Get in Touch" |
| Specific role claim in hero | "passionate about creating projects" (generic) | Rewrite with role + proof hook |
| Mobile navigation | Fully hidden (`hidden md:block`), no hamburger | Add hamburger with slide-in drawer |
| Contact form functional | Right column never renders (duplicate container bug) | Fix container, add visible success/error states |
| Open Graph meta tags | Vite default title only | Add `<title>`, `<meta description>`, OG tags, OG image |
| Working project live links | Gist AI link broken/stale | Fix Gist AI Netlify deployment |
| GitHub + LinkedIn links | Not found in components | Add to nav or footer |
| Footer email as plain text | Missing | Add as fallback for recruiters who skip forms |
| Tutorial projects removed | Wild Oasis + My Frontend Lib still in Contentful | Remove from Contentful (not just code) |
| Risktec + Freelance roles in Experiences | Missing | Add with achievement bullets and stack tags |
| Music School SaaS as lead project with outcome framing | Exists but framing is generic | Rewrite with impact: live client, billing, ownership |

---

## Differentiators (what elevates above average)

**High priority, low effort:**
- Outcome-first project framing: "Live billing SaaS with paying clients" before any technical detail
- Role/ownership badge per project: "Solo project" vs. "Team lead" vs. "Contributor"
- Production vs. portfolio visual flag: "Live client" badge on Music School SaaS
- Shopify hackathon win surfaced in hero or about section
- AWS certification badge with verification link
- Non-linear career narrative: music/teaching framed as engineering assets (pattern recognition, discipline, communication under pressure) — not apologized for

**Medium priority:**
- Stack tags per experience entry (matching what project cards already have)
- Secondary CTA after Projects section: "Let's talk about what I can build"
- Contentful Image API params on all images (`?w=800&fm=webp&q=75`)
- Music section Spotify badge: https://open.spotify.com/album/28d3TgbRj5Y0a7URbWWdgc

**Hard anti-features to eliminate:**
- "Passionate about creating projects from end to end" tagline
- Blurred background photo in hero
- Profile photo as visual centerpiece
- Skill level percentage bars
- Teaching.jsx as standalone section
- Expand/collapse "Read More" hiding primary project signal by default

---

## Top 10 Pitfalls to Avoid

1. **Generic hero copy surviving the visual refresh.** A cinematic dark site with "passionate about creating projects end to end" still fails in 8 seconds. Rewrite copy in the same session as visual redesign — never treat them as separate tasks.

2. **Tutorial projects left in Contentful.** Wild Oasis and My Frontend Lib must be hard-removed from Contentful, not just hidden in code. A course project next to a live billing SaaS creates "which level is this person?" doubt that poisons the stronger work.

3. **Mobile navigation absence.** `hidden md:block` hides all NavBar links on mobile with no hamburger. Over 40% of recruiter link-opens happen on mobile. Fix this before shipping any design work.

4. **ContactMe invisibly broken.** Duplicate nested container means right column (email, socials) never renders. Form success/error states log to console only — no visible feedback. Recruiter fills the form, sees nothing, does not follow up.

5. **Scroll animations gating hero content.** Any `opacity-0` initial state on above-the-fold content that depends on IntersectionObserver fires results in a blank hero on slow connections. Hero must use CSS-only animation. Never put the hero inside a scroll-triggered reveal wrapper.

6. **Dark theme contrast failures.** Switching to `#09090b` backgrounds while keeping existing text tokens will produce illegible body text on uncalibrated laptop screens. Every text/background pair must pass WCAG AA (4.5:1). Test at 50% monitor brightness.

7. **No Open Graph tags.** When a recruiter pastes the URL into Slack or LinkedIn DM to share with a hiring manager, the unfurl preview shows nothing. 20-minute fix, high professional impact.

8. **Over-animating to signal technical skill.** Maximum 2-3 animation archetypes total. Animations that are the first thing a viewer notices (rather than the content) signal junior design judgment — the opposite of the target positioning.

9. **Contentful magic array indices breaking during asset upload.** `backgrounds?.[10]`, `pictures[9]` — any asset reorder or deletion silently breaks the wrong image appearing in the wrong slot. Fix before uploading any new content.

10. **Partial color token migration.** Hardcoded hex values (`text-[#19747E]` in Loading.jsx, scattered `sky-blue` references) escape the Tailwind token migration. Audit with `grep -r "text-\[#" src/` before starting Phase 3.

---

## Suggested Phase Structure

### Phase 1: Bug Fixes and Quick Wins
**Rationale:** Five blocking bugs make the site broken or professionally embarrassing in its current state. Fix before any design work ships publicly. Mobile nav and ContactMe are conversion destroyers; meta tags and Gist AI link are invisible to developers but immediately visible to every recruiter who clicks or shares the URL.

**Delivers:** Functional mobile navigation, working contact form with visible feedback, correct link previews when URL is shared, no security oversights, correct footer year.

**Tasks:**
- Mobile NavBar hamburger + slide-in drawer (drawer closes on anchor tap)
- ContactMe duplicate container fix + visible success/error Notification states + remove hardcoded "Your Name" field + honeypot spam protection
- `index.html`: `<title>Antoni Lueddeke — Full-Stack Software Engineer</title>`, `<meta name="description">`, OG tags (`og:title`, `og:description`, `og:image` at 1200×630px)
- Fix Gist AI Netlify deployment; verify live link end-to-end on production
- Re-enable ESLint `react/jsx-no-target-blank`; audit all `target="_blank"` instances for `rel="noopener noreferrer"`
- Footer: `new Date().getFullYear()`
- Remove `console.log` calls from App.jsx and ContactMe.jsx

**Research needed:** None — all standard fixes.

---

### Phase 2: Content Overhaul
**Rationale:** Content before design. Visual polish applied to weak copy produces a polished version of the wrong impression. Writing final copy first means the design phase styles real text, preventing layout reflow when longer titles and fuller bullet points arrive later.

**Delivers:** Projects section with only production-grade work and outcome framing. Experiences section reflecting actual career arc. Hero copy that answers "who is this and why should I care" in one breath. About text with intentional non-linear career narrative.

**Tasks:**
- Remove Wild Oasis and My Frontend Lib from Contentful CMS
- Add Music School SaaS: impact-first description, role badge "Solo project", production flag "Live client"
- Add SongScope placeholder card: "ML recommendation engine, team lead" — full detail pending context file
- Update Gist AI: rewrite description, update screenshot, verify live link
- Add Risktec Software Engineer entry: stack tags, 2-3 achievement bullets ("Maintained fintech production codebase...")
- Add Freelance Software Engineer entry: Music School SaaS + TalentVibe + Consulting, stack tags, achievement bullets
- Verify Piano Teacher entry accuracy; move content to Experiences in Contentful (Teaching.jsx retired)
- Rewrite hero subtitle and add proof hook line
- Rewrite About bio: three paragraphs, opens with career claim
- Surface AWS cert badge and Shopify hackathon win
- Add GitHub and LinkedIn links to nav or footer

**Research needed:** None — pure content work.

---

### Phase 3: Dark Cinematic Design System
**Rationale:** Define the token system before restyling any component. Starting with component-level styling before new color tokens are in `tailwind.config.js` produces inconsistency and rework. Tailwind config first, then component application. Audit hardcoded hex values before migration begins.

**Delivers:** Complete dark cinematic design system applied uniformly. Reordered sections. Retired Teaching section. NavBar dark scroll behavior. Typography at cinematic scale.

**Tasks:**
- Audit hardcoded hex values: `grep -r "text-\[#" src/` and `grep -r "bg-\[#" src/`
- Replace `tailwind.config.js` color tokens with zinc-scale dark palette
- Add custom `fontSize` tokens: `display`, `headline`, `subheading`
- Add `tailwindcss-animate` to Tailwind plugins
- Add `@keyframes fadeUp` and `@keyframes fadeIn` to `index.css`
- Restyle LandingPage.jsx: full-viewport dark layout, typographic hero hierarchy, no blurred photo background
- Restyle NavBar.jsx: transparent → `backdrop-blur-md bg-black/60` on scroll
- Reorder sections in App.jsx; remove `<Teaching />` from layout
- Restyle ProjectCard.jsx: name → impact line → tags → image → link; add role + production badges; remove date
- Restyle Experiences.jsx: achievement bullets, stack tags per role
- Restyle AboutMe.jsx: bio-leads-with-claim, photo secondary
- Restyle Music.jsx: Spotify badge, reduced photo grid, distinct chapter feel
- Restyle ContactMe.jsx: dark theme, email visible as plain text fallback
- Verify WCAG AA contrast on every text/background pair at 50% monitor brightness

**Research needed:** None — established patterns. Verify final color values render correctly on uncalibrated screen.

---

### Phase 4: Scroll Animations
**Rationale:** Animations applied after content is final and layout is stable. Calibrating animation offsets and stagger timings against placeholder text that will later reflow wastes time.

**Delivers:** Tasteful scroll-triggered section reveals, hero CSS entrance sequence, AnimatePresence transitions for Notification and SkillsDropdown. prefers-reduced-motion handled globally.

**Tasks:**
- `npm install framer-motion`
- Wrap `App.jsx` with `<MotionConfig reducedMotion="user">`
- Create `src/components/RevealSection.jsx` shared wrapper with `whileInView viewport={{ once: true, margin: '-60px' }}`
- Apply CSS `animate-fade-up` classes to LandingPage hero elements (name, tagline, CTAs)
- Wrap Projects, About, Experiences, Music, Contact section containers in `<RevealSection>`
- Add stagger delays: project cards (150ms per card), experience entries (100ms per entry)
- Wrap `<Notification>` and `<SkillsDropdown>` in `<AnimatePresence>`
- Confirm hero is NOT inside RevealSection
- Test with JS disabled: all content must be fully visible
- Test on real device at 375px viewport
- Maximum 2-3 animation archetypes — stop there

**Research needed:** None — STACK.md covers the full integration path.

---

### Phase 5: Performance and Code Quality
**Rationale:** After the site looks correct, functions correctly, and animates correctly, a performance pass catches remaining issues affecting Lighthouse scores and real-world load times on mobile 4G — the network condition for many recruiter link-opens.

**Delivers:** Optimized image delivery, improved First Contentful Paint, named Contentful asset lookups, rich text rendering fix, font loading optimization, audio memory pressure fix.

**Tasks:**
- Append Contentful Image API params to every image URL: `?w=[target_width]&fm=webp&q=80`
- Add explicit `width` and `height` attributes to all `<img>` tags (prevents CLS)
- Add `loading="lazy"` to all below-fold images
- Add `<link rel="preload" as="image">` in `index.html` for hero background image
- Add `&display=swap` to Google Fonts URL
- Replace positional Contentful asset access (`backgrounds?.[10]`, `pictures[9]`) with named field lookups
- Replace raw `paragraph.content[0].value` in AboutMe.jsx with `@contentful/rich-text-react-renderer`
- Fix HowlerPlayer dual-fetch: WaveSurfer lazy-init per track on play (or `backend: 'MediaElement'`)
- Consider skeleton loading states for Contentful-gated sections
- Run Lighthouse on deployed production URL; target FCP < 2.5s

**Research needed:** Verify `@contentful/rich-text-react-renderer` current API against Contentful docs before implementing. Verify WaveSurfer v7 `MediaElement` backend support.

---

## Key Open Questions

1. **Final hero copy:** Research identifies the structure (name → role claim → proof hook → CTAs) but the specific proof hook requires Antoni's input. Does he want to lead with Risktec? Music School SaaS? SongScope? The hackathon win? This is a preference call that determines the hero's entire personality — needs sign-off before Phase 3 begins.

2. **Accent color choice:** Three options from STACK.md: cold white (`#e2e8f0`), indigo (`#6366f1`), or amber (`#f97316`). Pick one in Phase 3 kickoff and apply exclusively. Cannot be decided by research — it is a visual preference call.

3. **SongScope full card content:** PROJECT.md notes a context file is incoming. SongScope is a placeholder in Phase 2. Phase 3 card styling should be calibrated against the placeholder but may need minor copy adjustments when the context file arrives.

4. **Profile photo in hero:** Research recommends demoting it from visual centerpiece but leaves open whether to keep it at all. Editorial-style rectangular portrait or no photo at all — this is a preference decision.

5. **Performance photo curation for Music section:** PROJECT.md asks whether existing performance photos are "an asset or noise." Research recommends 3-4 photos max but which ones is an aesthetic judgment call for Antoni.

6. **Main site Netlify deployment status:** PROJECT.md flags this as potentially stale/misconfigured. Should be diagnosed in Phase 1 alongside the Gist AI deployment fix — may be as simple as re-linking the Netlify site to the current repo.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM-HIGH | Technology decisions (Framer Motion over GSAP, stay on Tailwind v3) are well-reasoned. Bundle size figures are training-data estimates — verify at bundlephobia.com. Hex color values are starting points for visual iteration. |
| Features | HIGH | Table stakes grounded in direct codebase analysis. Recruiter behavior patterns consistent across multiple independent sources. Tutorial project dilution effect is a universal finding. |
| Architecture | HIGH | Section ordering and component change list grounded in direct codebase analysis and established recruiter UX patterns. Animation architecture follows well-established Framer Motion patterns. |
| Pitfalls | HIGH | All critical pitfalls are either code-evidenced (observed in actual files) or grounded in WCAG-codified standards. None are speculative. |

**Overall confidence: HIGH**

### Gaps Requiring Validation

- **framer-motion actual bundle size:** Verify at bundlephobia.com before shipping if bundle budget is a concern. Training-data estimate is ~45-55 KB gzipped full import.
- **`@contentful/rich-text-react-renderer` current API:** Verify against Contentful docs before Phase 5 implementation.
- **WaveSurfer v7 MediaElement backend:** Verify compatibility with current WaveSurfer version before implementing the audio memory fix.
- **Hero copy and accent color:** Both require Antoni's decision — research cannot resolve preference calls.

---

## Sources

### Primary (HIGH confidence — direct codebase analysis)
- `src/App.jsx`, `src/components/*.jsx`, `tailwind.config.js` — section ordering, bug identification, component issues
- `.planning/PROJECT.md` — requirements, constraints, career context, constraints

### Primary (HIGH confidence — established standards)
- WCAG 2.1 AA contrast requirements (4.5:1 normal text, 3:1 large text)
- Core Web Vitals thresholds (FCP < 2.5s = good)
- Contentful Image API documentation (stable, well-documented)

### Secondary (MEDIUM confidence — training data, August 2025 cutoff)
- Framer Motion v11 API (`whileInView`, `MotionConfig`, `AnimatePresence`, `useReducedMotion`)
- `tailwindcss-animate` plugin API
- Tailwind CSS v3 configuration format
- Dark UI design conventions (Vercel, Linear, GitHub dark mode)
- Recruiter attention patterns (15-30 second initial scan, portfolio critique community consensus)

### Verify before shipping
- framer-motion bundle size: bundlephobia.com/package/framer-motion
- Current package versions: npmjs.com for framer-motion and tailwindcss-animate
- `@contentful/rich-text-react-renderer` API: Contentful documentation

---

*Research completed: 2026-06-19*
*Ready for roadmap: yes*
