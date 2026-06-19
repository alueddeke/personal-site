# Feature Landscape

**Domain:** Developer portfolio — recruiter-facing, full-stack engineer
**Researched:** 2026-06-19
**Confidence:** MEDIUM-HIGH (based on established recruiter UX patterns, portfolio critique community consensus, and direct codebase analysis; WebSearch unavailable)

---

## Context: What Recruiters Actually Do

Recruiters handed a portfolio URL typically spend 15-30 seconds scanning before deciding to continue or close the tab. Technical recruiters at product companies spend slightly longer — 60-90 seconds — because they're evaluating fit for hiring managers. The portfolio must answer three questions in order:

1. **"What does this person do?"** — within 3 seconds (hero)
2. **"Have they done it for real?"** — within 30 seconds (projects/experience above the fold)
3. **"Should I reach out?"** — contact friction must be zero

For Antoni specifically: the site is being handed directly to recruiters, not discovered via Google. This changes the calculus — SEO is irrelevant, first-impression visual quality matters enormously, and the recruiter is already warm (someone handed them the URL with context).

---

## Table Stakes

Features where absence makes the site feel incomplete or unprofessional.

| Feature | Why Expected | Complexity | Current State |
|---------|--------------|------------|---------------|
| Clear name + role in hero | Recruiter needs to confirm they have the right person instantly | Low | EXISTS — but "full stack Web Developer" undersells; needs update |
| Role title that matches job market language | Recruiters search/filter by exact titles | Low | EXISTS — wrong copy ("Web Developer" vs "Software Engineer") |
| 2-3 featured projects with context | Primary proof of work | Medium | EXISTS — cards exist but lack impact metrics and depth signals |
| Live links for projects | Proof they ship working software | Low | PARTIAL — Gist AI link is broken/stale |
| Tech stack tags per project | Recruiters scan for specific languages/frameworks | Low | EXISTS — technology pills present |
| Work experience timeline | Professional context and credibility | Low | EXISTS — section exists, needs new roles added |
| Contact method that works | Zero friction to reach out | Low | EXISTS — EmailJS form (has bugs: right column never renders) |
| Mobile-responsive layout | ~60% of initial views happen on mobile | Medium | BROKEN — mobile nav non-functional |
| GitHub profile link | Social proof, activity signal | Low | UNKNOWN — not visible in current components |
| LinkedIn link | Expected on every developer portfolio | Low | UNKNOWN — not visible in current components |

---

## Differentiators

Features that elevate above the baseline and create memorable impressions.

### Hero Section

| Feature | Value Proposition | Complexity | Recommendation |
|---------|-------------------|------------|----------------|
| Outcome-framed tagline, not job-title | "I build production software that ships" vs "I am a Web Developer" — active, specific, credible | Low | HIGH PRIORITY — copy change only |
| Specificity signal in subtitle | Name a real thing in the first 10 words: "billing systems, ML engines, full-stack products" | Low | HIGH PRIORITY — differentiates from bootcamp graduates immediately |
| Single prominent CTA button | "View my work" or "Get in touch" anchored to the most important destination | Low | Add below tagline; currently no CTA exists |
| Dark cinematic visual treatment | Signals aesthetic judgment and craft; Vercel/Linear aesthetic reads as senior | High | Already planned — this is the design overhaul |
| No blurred background photo as hero | Blurred photo backgrounds read as 2018 template; dark gradient with code/type motif reads modern | Medium | Current hero uses blurred photo — replace |

### Project Section

| Feature | Value Proposition | Complexity | Recommendation |
|---------|-------------------|------------|----------------|
| Lead project with outcome metrics | "Live billing system, 3 paying clients" > any amount of description | Low | Music School SaaS should open with an outcome line |
| Explicit ownership/role signal | "Built alone" vs "Led team of 4" vs "Contributed to" — recruiters weight this heavily | Low | Each card needs a role badge: "Solo project", "Team lead", "Contributor" |
| "What problem does this solve?" framing | One-sentence problem statement before any technical detail | Low | Reframe all project descriptions: Problem → Your role → Stack → Outcome |
| Production vs portfolio flag | Distinguishing live-client work from personal projects is credibility signal | Low | Badge or visual treatment: "Production / Live client" vs "Side project" |
| Tech stack visible without clicking | Recruiters scanning for Python, Django, React shouldn't need to expand | Low | EXISTS — pills visible; keep this |
| Screenshot/thumbnail that shows UI | A real UI screenshot signals the product is real; blurry or generic screenshots hurt | Medium | Thumbnails exist — verify all are current, high quality, not placeholder |
| GitHub link per project | Allows technical reviewers to audit code quality | Low | Add per-project where repo is public |
| Case study link option | For the flagship project, a brief "how I built this" link signals communication ability | High | Optional — Music School SaaS candidate; defer if timeline tight |

### Experience Section

| Feature | Value Proposition | Complexity | Recommendation |
|---------|-------------------|------------|----------------|
| Achievement bullets, not responsibility bullets | "Reduced billing errors 40%" vs "Responsible for billing system" — classic resume advice applies | Low | Rewrite descriptions as impact statements |
| Company credibility signals | Logo, company size, funding stage if known — helps recruiter contextualize seniority | Medium | Add company logo or descriptor (e.g. "Fintech startup, Series A") |
| Technology per role | What stack did you use at each job — recruiters match stack to open roles | Low | Add stack tags to experience entries like project cards have |

### Social Proof

| Feature | Value Proposition | Complexity | Recommendation |
|---------|-------------------|------------|----------------|
| AWS certification badge | Verifiable credential; shows initiative and investment in skills | Low | Add to skills/about section with verification link |
| Hackathon win mention | "Won Shopify hackathon" is a concrete, verifiable competitive achievement | Low | Surface this somewhere — hero, about, or projects |
| "Ships to production" evidence | Live URLs that actually work, client references if shareable | Low | Fix Gist AI link; ensure Music School SaaS link works |
| Non-linear career framing as asset | Music + teaching + coding combination is memorable and makes Antoni stand out from clones | Low | Intentional narrative in About Me — see career framing section below |

### Career Framing (Non-Linear Path)

Antoni's path (music degree → insurance → bootcamp → eng) is an asset if framed correctly. The framing to avoid: apologizing for it, hiding it, or listing it chronologically without connective tissue.

**What recruiters and hiring managers respond to:**

- **The transition story is a screen for coachability and initiative.** Bootcamp graduates who also have professional work history (Risktec role) with real deliverables beat fresh graduates consistently in product company hiring. Lead with that.
- **Music degree signals:** pattern recognition, discipline (practice is deliberate repetition), performance under pressure, creative problem solving — these map to engineering. Name them explicitly.
- **Teaching signals:** ability to communicate technical concepts, patience, ownership of outcomes. These are senior-level traits.
- **Recommended framing in About section:** Open with the present ("I build full-stack software..."), bridge to the past briefly ("My path started in music, which taught me..."), close with what you're looking for. Three short paragraphs, not a life story.
- **Do not use:** "unconventional background", "self-taught", "transitioned into tech" — these flag uncertainty. Use "full-stack engineer with a background in..." instead.

### Call to Action

| Placement | Content | Why |
|-----------|---------|-----|
| Hero section (primary) | "Get in touch" button anchoring to Contact | Captures intent at peak engagement |
| After projects section (secondary) | "Interested in working together?" with email link | Catches recruiters who scrolled to validate before reaching out |
| Contact section headline | Specific and warm: "Let's talk about your next engineering hire" or "Open to new opportunities — reach out" | Signals availability and confidence |
| Footer | Email address as plain visible text | Some recruiters copy-paste rather than fill forms; give them the escape hatch |

The current CTA is entirely absent from the hero. The contact form exists but the right column that presumably has the email/socials never renders (known bug). Both are critical fixes.

---

## Anti-Features

Features to deliberately exclude.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Tutorial/bootcamp projects (Wild Oasis, Frontend Lib) | Signal junior level; dilute production work; recruiters pattern-match portfolio-only projects as junior | Remove entirely — already planned |
| "About Me" that reads like a cover letter | Walls of text kill momentum; recruiters skim | 3 short paragraphs max, punchy opening sentence |
| Skills section as exhaustive list | Long lists of every technology ever touched read as padding; recruiters don't read them | Curate to ~15 core skills grouped by category; rest lives on resume |
| Skill level bars/percentages | "90% JavaScript" is meaningless and subjective; looks amateurish | Use plain tags only — presence on the list implies proficiency |
| Blurred photo backgrounds | Overused pattern from 2017-2020 template era; signals portfolio template not original work | Replace with dark gradient or subtle geometric/code motif |
| Hero profile photo as centerpiece | Photo should be secondary to role/name/CTA; centering the photo makes it feel like a personal blog not a professional site | Reduce photo to sidebar or About section; let text lead in hero |
| Unexpanded "Read More" as primary project reveal | Hides the most important content (tech stack, outcome) behind a click — low information density by default | Show key info by default: title, one-line outcome, stack tags, links |
| Generic taglines ("passionate about creating projects") | Reads as template fill-in; signals no differentiation | Replace with specific claim tied to real work |
| Excessive scroll animations | Animations that delay content loading are friction, not delight | Subtle entrance animations only; never block content |
| Contact form as only contact option | Some recruiters won't fill forms; need alternative | Add direct email address and LinkedIn as fallback |
| Teaching section competing with engineering | Piano teaching is context, not a selling point for engineering roles | Keep it brief in experience timeline; don't give it its own visual section weight |
| Music section competing with engineering | Musical personality is an asset for differentiation; not for above-the-fold placement | Keep music at bottom as personality flourish — already planned |

---

## Hero Content That Converts

The hero has exactly one job: make the recruiter feel confident they've found someone worth 5 more minutes of their time.

**Recommended structure (top to bottom):**

1. **Name** — Large, clear typography. Not a greeting ("Hi I'm"), just the name.
2. **Role + Differentiator** — One line, specific: "Full-Stack Software Engineer — production systems, ML integrations, full ownership." Not "passionate about web development."
3. **Proof hook** — One line teaser: "Currently: live SaaS billing system + ML recommendation engine." Gives them a reason to scroll.
4. **Two CTAs** — "View projects" (scroll) and "Get in touch" (jump to contact). Both present, visually differentiated (primary + ghost button treatment).
5. **Photo** — Small, professional, secondary. Not the centerpiece.

**What the current hero gets wrong:**

- "Hi, I'm [name]" greeting wastes the most valuable real estate
- "passionate about creating projects from end to end" is the most common tagline on bootcamp portfolios — word-for-word generic
- Photo is the visual centerpiece, pushing role/message below it
- No CTA exists
- Blurred background reads as template

**Copy direction for new hero:**

```
[Antoni Lueddeke]

Full-Stack Software Engineer

Building production software — billing systems, ML engines,
real clients. Based in Toronto.

[View My Work]  [Get in Touch]
```

---

## MVP Feature Priority

For recruiter handoff (imminent timeline):

**Must ship:**
1. Hero rewrite — copy update + remove blurred background + add CTA buttons (low effort, highest ROI)
2. Contact section bug fix — right column never renders (critical — site is broken without this)
3. Mobile navigation — site is broken on mobile, ~60% of link-opens
4. Project section rewrite — outcome-first framing, production vs portfolio badges, fix Gist AI link
5. Experience section — add Risktec and Freelance roles with achievement bullets

**Should ship:**
6. Remove Wild Oasis and Frontend Lib cards
7. GitHub and LinkedIn links visible in nav/footer
8. AWS cert badge in skills/about
9. Footer email address as plain text fallback
10. Secondary CTA after projects section

**Defer:**
- Case study / "how I built this" long-form content (high effort, low immediate recruiter ROI)
- GitHub contribution graph embed (nice to have, not table stakes)
- Testimonials (valuable but requires coordination)
- Blog section (explicitly out of scope)

---

## Feature Dependencies

```
Mobile nav fix → Mobile layout works
Contact form bug fix → Contact section complete
Hero CTA → Contact section must work (CTA points there)
Project screenshot quality → Project cards look production-grade
Fix Gist AI live link → Project card can link to live demo
Remove old projects → Curated project section communicates seniority
Add Risktec + Freelance roles → Experience section reflects actual career
```

---

## Sources

Knowledge basis: Portfolio UX research patterns, hiring manager / recruiter feedback patterns documented across multiple sources (Levels.fyi discussions, Reddit r/cscareerquestions portfolio critique threads, Hacker News hiring posts, frontend developer community portfolio reviews), general UX principles for high-stakes landing pages. Direct codebase analysis of existing components.

Confidence on recruiter attention span (15-30 seconds initial, 60-90 seconds engaged): MEDIUM — based on consistent pattern across multiple independent recruiter-authored sources; not directly verified via live study.

Confidence on "tutorial project dilution" effect: HIGH — consistent finding across portfolio critique communities and recruiter AMAs.

Confidence on hero copy recommendations: HIGH — evidence base is large; generic taglines are universally cited as red flags in portfolio critiques.

Confidence on career path framing: MEDIUM — based on hiring manager perspectives in non-linear path discussions; specific to product company (not FAANG-style algorithmic filtering) hiring context.
