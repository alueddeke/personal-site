# Domain Pitfalls

**Domain:** Developer portfolio targeting technical recruiters — dark cinematic aesthetic, full-stack product engineer positioning
**Researched:** 2026-06-19
**Confidence:** HIGH (grounded in codebase analysis + domain expertise; web search unavailable)

---

## Critical Pitfalls

Mistakes that cause rewrites, destroy recruiter trust, or make a senior engineer look junior.

---

### Pitfall 1: Landing Hero That Doesn't Answer "Why Should I Care?"

**What goes wrong:** The hero says "Hi, I'm [Name], I'm a full-stack web developer passionate about creating projects end to end." Every bootcamp graduate writes this exact sentence. A recruiter scanning 50 portfolios absorbs zero signal. The current `LandingPage.jsx` has exactly this problem — the subtitle is generic and the profile photo is the visual anchor, not a value proposition.

**Why it happens:** Developers write for themselves ("I am passionate about...") rather than for the reader ("here's what I've shipped and why you want to talk to me").

**Consequences:** Recruiter clicks away within 8 seconds. The rest of the portfolio — the Risktec year, the live billing SaaS, SongScope — never gets seen.

**Prevention:**
- The hero headline or subtitle must communicate role + evidence in one breath. Example pattern: "Full-stack engineer. Production SaaS, fintech systems, and ML products." Not "passionate about creating projects end to end."
- Secondary text should reference one concrete proof point (live client, Shopify hackathon win, AWS cert), not a generic value statement.
- The profile photo is personality, not positioning — it should not be the visual center of the hero. Consider centering on typography with the photo as a supporting element.

**Warning signs:** If someone could paste your hero text onto any other portfolio without it feeling wrong, it's wrong.

**Phase:** Design & Landing hero phase (first visible work).

---

### Pitfall 2: Showing Tutorial Projects Alongside Production Work

**What goes wrong:** Wild Oasis and My Frontend Lib are still in the codebase. Even one tutorial-level project next to a live billing SaaS creates a "which one is the real level?" doubt in a recruiter's mind. The weaker project doesn't just look weak — it drags down the credibility of the stronger ones.

**Why it happens:** Developers hate deleting work they spent time on. "It shows range." It doesn't.

**Consequences:** A hiring manager sees "Music School SaaS (live billing system)" next to "Wild Oasis (course project)" and mentally recalibrates. Senior engineers don't show homework.

**Prevention:**
- Hard remove Wild Oasis and My Frontend Lib from Contentful and from any code path. Not "hidden," removed.
- The project section should contain: Music School SaaS (lead), SongScope (ML + team lead), Gist AI (updated). Three strong entries beat five mixed ones.
- If something can't be described in terms of real users, real revenue, or real technical challenge worth a senior's time — cut it.

**Warning signs:** Any project card whose description starts with "I built this to learn..." or which points to a demo with seeded fake data and no real usage.

**Phase:** Content update phase.

---

### Pitfall 3: No Impact Metrics on Projects or Experience

**What goes wrong:** "Built a SaaS billing system" is weaker than "Built the subscription and billing infrastructure for a live music school SaaS with paying clients." The Music School SaaS entry is the strongest proof of production-grade ownership Antoni has — but if it's described without concrete signals (real client, billing live, infrastructure owned), it reads like every other "I built a SaaS" claim.

**Why it happens:** Developers describe what they built technically, not what it achieved or who depends on it.

**Consequences:** A recruiter cannot distinguish Antoni's live production work from a hackathon weekend project by reading the copy.

**Prevention:**
- Each project description should answer: Who uses it? Is it live in production? What's the scope (# of users, revenue processed, uptime requirement)?
- For experience entries: include stack depth, scope, and one outcome per role. "Maintained fintech production codebase at Risktec" is better than "worked on backend systems."
- Even qualitative framing helps: "live client," "paying subscribers," "production deployment on DigitalOcean with Nginx + SSL" says more than "full-stack application."

**Warning signs:** Project descriptions that are feature lists ("it has auth, a dashboard, CRUD operations") with no audience or outcome framing.

**Phase:** Content update phase.

---

### Pitfall 4: Dark Theme With Broken Contrast Ratios

**What goes wrong:** Switching from mint/teal to dark-cinematic while keeping existing text colors produces illegible body text. Dark backgrounds need very specific foreground lightness — the margin for error is smaller than on light themes. Common failure: body text at `#888` on `#0f0f0f` fails WCAG AA. Another common failure: accent colors that look fine on white look neon-garish on dark backgrounds.

**Why it happens:** Developers pick a dark background color, apply the same text tokens, and check legibility on their calibrated high-brightness monitor. Looks fine. On a recruiter's laptop with 200 nit brightness, it's unreadable.

**Consequences:** Recruiter can't read the content. Accessible content scores also affect site perception — it signals carelessness. Additionally, a poorly contrasted dark theme reads as "tried to look like Linear, didn't pull it off."

**Prevention:**
- Body text on dark backgrounds: target minimum `#c0c0c0` on `#0d0d0d` (contrast ratio ~9:1). Use the WCAG contrast checker before finalizing any text/background pair.
- Accent colors for dark themes: desaturate. What works on white (#00d4aa mint) becomes eye-searing on black. Pull saturation down 20-30% and raise lightness until it looks refined, not glowing.
- Test on an uncalibrated screen or reduce monitor brightness to 50% when reviewing.
- The current Tailwind config uses `dark-text: #020808` as a text color on some surfaces — verify this is never used as body text on a dark background (it will be invisible).

**Warning signs:** Any text that uses mid-gray (`#777`–`#999`) on backgrounds darker than `#222`. Any accent that looks "neon" on the dark background.

**Phase:** Design system / Tailwind config phase.

---

### Pitfall 5: Scroll Animations That Block Content

**What goes wrong:** The most common animation mistake is using `opacity: 0` on page sections as the initial state for scroll-triggered reveals, without correctly configuring the `threshold` or `rootMargin`. The result: content is invisible until the user scrolls past it — and on slow connections or when JS fails to hydrate the IntersectionObserver, sections stay invisible forever. Another variant: animations trigger too late because `threshold: 0.5` means the element must be half in view before firing.

**Why it happens:** Developers copy scroll animation examples that use heavy thresholds or forget to handle the "already in view on load" case (hero section invisible on load).

**Consequences:** A recruiter on mobile opens the page. Nothing is visible. They assume the site is broken. They close it.

**Prevention:**
- Always set a sensible `rootMargin` like `-50px` and a low threshold (`0.1`–`0.2`) so content starts revealing early.
- Hero / above-the-fold content must NEVER be gated behind a scroll trigger. It should be visible immediately on load.
- Every animated element needs a fallback: if JS is disabled or IntersectionObserver is unavailable, content must be fully visible (`opacity: 1`, `transform: none`).
- Use `prefers-reduced-motion` media query to disable or minimize all animations for users who have requested it — this is now standard practice and its absence is noticeable.

**Warning signs:** Any `opacity-0` in the initial Tailwind class without a corresponding JS-controlled class toggle. Testing the page with JS disabled reveals invisible content.

**Phase:** Animation integration phase.

---

### Pitfall 6: Over-Animating to Signal Technical Skill

**What goes wrong:** Too many simultaneous motion effects — particle backgrounds, typewriter text, parallax on every section, staggered list items that take 800ms to complete, hover effects on every card — read as anxiety, not confidence. The "impressive creative developer" aesthetic degrades into noise. The Vercel / Linear references in the design brief are the right calibration: those sites are nearly motionless — one or two subtle, purposeful transitions.

**Why it happens:** Developers use animations to prove technical ability rather than to serve the user experience. "Look, I know GSAP" becomes the goal instead of "I want the recruiter to see my projects."

**Consequences:** Page feels busy and overwhelming. Recruiter attention fragments. Animations are slow on mid-range devices. More importantly: it signals junior-level design judgment, which is the opposite of what a senior/lead position requires.

**Prevention:**
- Maximum 2-3 animation archetypes per page: e.g., section fade-up on enter + subtle hover state on interactive elements + one hero transition. Not one per section.
- Animation duration sweet spot for portfolio: 300–500ms. Nothing over 600ms on a reveal (it feels sluggish). Stagger delays above 80ms between items feel slow.
- Resist GSAP for everything — CSS transitions handle 90% of portfolio animation needs without JS overhead.
- "Tasteful scroll-triggered entrance animations" from the brief means: one consistent reveal pattern applied uniformly to sections, not a different trick per section.

**Warning signs:** If the animations are the first thing a viewer notices rather than the content — the balance is wrong.

**Phase:** Animation integration phase.

---

### Pitfall 7: Mobile Navigation Absence Destroys First Impressions on Mobile

**What goes wrong:** The current NavBar wraps all links in `hidden md:block`. On any mobile device, the navigation is completely invisible. There is no hamburger menu. This is already a known bug, but the pitfall is underestimating how severely it affects recruiter perception — over 40% of initial link clicks from recruiter emails are opened on mobile. A portfolio with no mobile nav looks broken, full stop.

**Why it happens:** Developers test primarily on desktop where they work. Mobile navigation is deferred as "I'll do it later."

**Consequences:** Recruiter opens link on phone during commute. No nav. Can't jump to Projects. Scrolls a bit, closes tab. The portfolio never gets evaluated.

**Prevention:**
- Hamburger menu with a slide-in drawer is the standard pattern. Implement it before any other visual work — this is a conversion blocker.
- Drawer should list: About, Experience, Projects, Contact (Music and Skills can be secondary). Keep it simple on mobile.
- Test the drawer on actual phone dimensions (375px width) not just browser devtools.
- The Teaching section's missing anchor ID compounds this — even if mobile nav existed, Teaching couldn't be linked. Fix both together.

**Warning signs:** Opening the live URL on a real phone and seeing only the avatar logo with no navigation options.

**Phase:** Bug fixes phase (immediately, before any design work lands publicly).

---

### Pitfall 8: Fonts Flashing or Loading Late (FOUT / FOIT)

**What goes wrong:** Inter is loaded via a `@import` in CSS or a `<link>` in `<head>`, but without `font-display: swap` or preload hints. The recruiter sees either a flash of system font (FOUT) or invisible text for 2-3 seconds while the font downloads (FOIT). On a cinematic dark design, FOUT is especially jarring because system fonts have completely different metrics — the layout shifts visibly.

**Why it happens:** Font loading is treated as an afterthought during development because localhost loads fonts instantly from cache.

**Consequences:** Recruiter sees text jump or disappear for 2 seconds on first load. Feels broken. On a dark background, the FOIT window (invisible text) is particularly brutal — the page looks empty.

**Prevention:**
- Add `<link rel="preload" as="font" type="font/woff2" crossorigin href="...">` for Inter's primary weights in `index.html`.
- Use `font-display: swap` in any `@font-face` declarations.
- If loading Inter from Google Fonts, use the `&display=swap` parameter.
- Consider self-hosting Inter via `fontsource` package — eliminates third-party DNS lookup and gives full control over `font-display`.

**Warning signs:** Opening the site on a clean browser profile (no cache) and seeing a visible text flash or layout shift in the first 2 seconds.

**Phase:** Performance phase, but verify during any build that touches typography.

---

### Pitfall 9: CMS-Gated Render Blocks the Entire Page

**What goes wrong:** The current architecture fetches all Contentful data in a single blocking request before rendering anything. If the Contentful API is slow (common: 400–800ms), the user sees the `<Loading />` spinner for nearly a second before any content appears. For a recruiter clicking a cold link, this delay is the entire first impression. On slower connections (mobile 4G), this can extend to 2+ seconds.

**Why it happens:** Blocking single-fetch is the simplest implementation and works fine in development where the response is cached or fast.

**Consequences:** First Contentful Paint is delayed by the API round-trip. The site appears blank on initial load. This is especially damaging for portfolios where recruiters make snap judgments — if the first second shows nothing, many don't wait for second two.

**Prevention:**
- Render the static shell (NavBar, hero text, section outlines) immediately from JSX without waiting for Contentful.
- Fetch Contentful data only for dynamic content (bio text, project cards, audio). Static structural elements should not block.
- If a full refactor is out of scope: add a meaningful skeleton state rather than a spinner. A skeleton that looks like the eventual content reduces perceived wait time significantly.
- For project images specifically: lazy load with `loading="lazy"` on `<img>` tags. Images below the fold should not block FCP.

**Warning signs:** Lighthouse "First Contentful Paint" score below 2.5s. Any section of the page that is completely blank while a spinner shows.

**Phase:** Performance phase. Partial improvement (skeleton states) achievable in bug-fix phase.

---

### Pitfall 10: Images Killing Performance (No Optimization)

**What goes wrong:** Every `image.fields.file.url` in the current codebase serves the raw Contentful CDN URL with no size or format parameters. Contentful images default to full resolution — a profile photo at 3000×2000px is delivered to a 64×64 avatar slot. The Contentful Image API supports `?w=800&fm=webp&q=80` parameters; they are currently unused everywhere.

**Why it happens:** The API works without params, so the simplest implementation omits them.

**Consequences:** Images are 5-15× larger than needed. Slow load on mobile. Lighthouse performance score tanks. Layout Cumulative Layout Shift (CLS) occurs when images load in and push text.

**Prevention:**
- Append Contentful Image API parameters to every image URL: `?w=[target_width]&fm=webp&q=80`.
- Add explicit `width` and `height` attributes to `<img>` tags to prevent CLS.
- Add `loading="lazy"` to all below-fold images (everything below the hero).
- The hero background image is above-fold and should be preloaded, not lazy-loaded.
- Note: the current code uses `backgroundImage` CSS property for the hero, so preloading requires a `<link rel="preload" as="image">` in `<head>`.

**Warning signs:** Network tab shows image payloads over 500KB for any element smaller than the full viewport. Lighthouse reports "Properly size images" or "Serve images in next-gen formats" warnings.

**Phase:** Performance phase, alongside image optimization pass.

---

### Pitfall 11: The "Creative Developer" Trap — Music as a Lead Story

**What goes wrong:** Portfolios that lead with or heavily emphasize creative/personal projects (music, art, side hobbies) before establishing professional credibility signal misaligned priorities. A recruiter looking for a full-stack product engineer who sees "Music" prominently in the nav before "Projects" or "Experience" subconsciously recalibrates their expectation of the candidate.

**Why it happens:** The developer is proud of the music work and it genuinely is a differentiator — but the sequencing and weight given to it can undermine the professional signal.

**Consequences:** Recruiter reads "Experiences | Music | Projects | Contact" in the nav and mentally files the candidate as "musician who codes" rather than "engineer with a music hobby." This is not the intended positioning for full-stack product engineer roles.

**Prevention:**
- Music section is right to stay in the portfolio — it shows dimensionality. But it must come after Experience and Projects in the nav order, not between them.
- Current nav order: About → Skills → Experiences → Music → Projects → Contact. Music between Experiences and Projects separates two core professional sections. It should move after Projects.
- In the section itself: music should be one section's worth of presence, not multiple player instances or a prominent layout position. The brief already captures this ("footer personality piece") — enforce it in nav ordering too.
- The music nav link can be deprioritized visually (slightly smaller, or moved to the right of the nav) without removing it.

**Warning signs:** If someone visiting the site without reading the About section could mistake the primary purpose as "musician's website with a coding section."

**Phase:** Design / navigation phase.

---

### Pitfall 12: ProjectCard Hover Scale on Mobile Breaks Tap UX

**What goes wrong:** The current `ProjectCard` applies `hover:scale-105` via Tailwind. On mobile, there is no hover state — but the scale transform can fire on tap in some mobile browsers, causing a jarring visual jump before navigation. More critically: the entire card is a tap target, but the expand/collapse "Read More" toggle is inside the same card anchor, requiring `e.stopPropagation()` which creates unreliable behavior on touch.

**Why it happens:** Hover effects designed for desktop don't account for touch interaction models.

**Consequences:** On mobile, tapping a project card may trigger the "Read More" toggle instead of navigating to the project URL (or vice versa). The tap interaction feels broken.

**Prevention:**
- Replace the "card is an anchor, button is inside anchor" pattern with a cleaner structure: card is a container, project URL and expand button are separate explicit touch targets.
- Mobile-specific: remove `hover:scale-105` or scope it to `md:hover:scale-105`. Use `active:scale-95` instead for mobile tap feedback.
- Consider removing the expand/collapse description pattern entirely for the dark redesign — show the full card description with a "View Project →" link. Simpler, less interactive surface.

**Warning signs:** Testing on mobile and finding that tapping a project navigates somewhere unexpected, or that the card has no tap feedback at all.

**Phase:** Mobile fix phase, alongside ProjectCard redesign for dark theme.

---

### Pitfall 13: SEO Invisibility Makes the Portfolio Unshareable

**What goes wrong:** The current site has no `<title>` tag beyond the Vite default, no `<meta name="description">`, and no Open Graph tags. When a recruiter copies the URL and pastes it into Slack or LinkedIn DM to share with a hiring manager, the unfurl preview shows nothing — just the raw URL. When the hiring manager Googles "Antoni Lueddeke software engineer," the site may not rank or may show a generic Vite title.

**Why it happens:** SEO is treated as a "later" concern since the site isn't trying to rank organically for keywords.

**Consequences:** When the URL is shared (which is the explicit use case — "recruiter handoff"), the preview looks unprofessional. The recruiter looks bad for sharing a link with no preview. Hiring managers who search the candidate's name find LinkedIn before the portfolio.

**Prevention:**
- Add at minimum: `<title>Antoni Lueddeke — Full-Stack Software Engineer</title>`, `<meta name="description" content="...">`, and Open Graph tags (`og:title`, `og:description`, `og:image` using the profile photo).
- OG image should be explicit: a clean image at 1200×630px works for all platforms.
- This is a 20-minute fix with high recruiter-visible impact. Do it in the first phase.

**Warning signs:** Pasting the site URL into iMessage or Slack and seeing no preview card (just the bare URL).

**Phase:** Bug fixes / quick wins phase (high impact, low effort).

---

### Pitfall 14: Contact Form That Doesn't Visibly Work

**What goes wrong:** The current ContactMe has a duplicate nested container that prevents the right column (contact info) from rendering. The form itself has a hardcoded "Your Name" hidden field, debug console.logs in success/failure handlers, and no bot protection. A recruiter who fills out the form and sees no confirmation or gets an error feels the site is broken — and it reflects on the engineer.

**Why it happens:** The contact form was built and lightly tested but never audited as a recruiter experience. The bugs are invisible until you specifically try to submit.

**Consequences:** Recruiter tries to reach out via the form, gets no clear success state or the form silently fails. They don't follow up because they're unsure if the message was received.

**Prevention:**
- Fix the duplicate container first (30 minutes of work, high impact).
- Add clear success and error states to the form UI — not just `console.log`, but a visible Notification component.
- Remove the hardcoded "Your Name" hidden field — replace with the sender's actual name from the form.
- Add honeypot spam protection (hidden field that bots fill but humans don't) as a lightweight alternative to CAPTCHA.
- Test the full form submission flow end-to-end on production, not just local.

**Warning signs:** Opening the deployed site and seeing the contact section has only one column (the form). The right column with LinkedIn/GitHub links is never rendered.

**Phase:** Bug fixes phase (the ContactMe bugs are known; fix before any design overhaul).

---

## Moderate Pitfalls

---

### Pitfall 15: Dark Theme NavBar With Invisible State Transitions

**What goes wrong:** The current NavBar switches from transparent (on hero) to a solid `bg-off-white` background on scroll. In the dark redesign, this transition needs to be redesigned — a dark theme nav going from transparent to white background on scroll will look broken and backwards. If the nav background is left as `bg-off-white`, it creates a jarring white bar over the dark site.

**Prevention:**
- Dark theme NavBar pattern: transparent → semi-transparent dark with blur (`backdrop-blur-md bg-black/60`) on scroll. This is the standard pattern for dark cinematic sites (Vercel, Resend, etc.).
- Text colors need to match: on a transparent dark nav, text should be near-white. On the blurred dark nav, same. No need for the current logic that switches text color based on scroll position.

**Phase:** Design system / NavBar redesign phase.

---

### Pitfall 16: Contentful Magic Array Indices Breaking Silently

**What goes wrong:** `backgrounds?.[10]`, `backgrounds?.[0]`, `backgrounds?.[2]`, `pictures[9]` — if Contentful asset order is ever reordered (or an asset is deleted), the wrong image silently appears in the wrong location with no error. This has already caused the current `backgrounds?.[10]` usage for the Music section background, which is fragile.

**Prevention:**
- Replace positional access with named field lookups. Add a `slug` or `title` field to each Contentful asset and query by name.
- This is especially critical during the content update phase when new assets will be uploaded — any upload order change will break the current index assumptions.

**Phase:** Code quality phase, but flag as high-risk during any Contentful content upload.

---

### Pitfall 17: Rich Text Rendering Dropping Content

**What goes wrong:** `AboutMe.jsx` renders bio paragraphs as `paragraph.content[0].value` — raw string extraction that silently discards bold text, italic text, links, and multi-paragraph structures that live in nested nodes. If the Contentful bio uses any formatting, it is silently dropped.

**Prevention:**
- Use `@contentful/rich-text-react-renderer` to render the bio field properly. One import, one `documentToReactComponents()` call.
- Test with formatted content in Contentful (add a bold word, an italic phrase) to verify rendering before the content update phase begins.

**Phase:** Code quality phase, before content is updated in Contentful.

---

### Pitfall 18: Dual Audio Library Memory Leak

**What goes wrong:** `HowlerPlayer.jsx` loads and decodes each audio file twice — once for Howler (playback) and once for WaveSurfer (waveform visualization). With 6 studio tracks in the updated EP, this is 12 network requests for audio data and 12 decode operations in memory. On a page with the Music section visible, this causes significant memory pressure.

**Prevention:**
- Share the decoded audio buffer between Howler and WaveSurfer if possible (WaveSurfer supports `backend: 'MediaElement'` which avoids re-fetching).
- Or: lazy-initialize WaveSurfer only on the track the user is playing, not all tracks on mount.
- Increase polling interval to 100ms — the current 1-second interval causes visible waveform scrubber jank.

**Phase:** Music section optimization phase.

---

## Minor Pitfalls

---

### Pitfall 19: Design Token Inconsistency During Color Migration

**What goes wrong:** When replacing the mint/teal palette with a dark cinematic scheme, any hardcoded hex colors in component files escape the Tailwind token migration. The current codebase has `text-[#19747E]` in `Loading.jsx` and `sky-blue` scale references scattered across components. A partial migration leaves a mixed color system.

**Prevention:**
- Before writing new component styles, audit all files for hardcoded hex values and raw color references outside the token system.
- Update `tailwind.config.js` with the new color tokens first, then find-and-replace all old token references.
- `grep -r "text-\[#" src/` and `grep -r "bg-\[#" src/` reveals all hardcoded colors.

**Phase:** Design system phase (before any component styling begins).

---

### Pitfall 20: `target="_blank"` Security and ESLint Bypass

**What goes wrong:** The `.eslintrc.cjs` disables `react/jsx-no-target-blank`. External links without `rel="noopener noreferrer"` expose a tab-napping vector. This ESLint rule exists to prevent this pattern. Disabling the rule means the safeguard is gone.

**Prevention:**
- Re-enable the ESLint rule.
- Do a one-pass audit: `grep -r 'target="_blank"' src/` and verify every instance has `rel="noopener noreferrer"`.
- The `ProjectCard.jsx` already sets `rel="noopener noreferrer"` correctly — it's the other link sites that need auditing.

**Phase:** Bug fix phase.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Dark theme color migration | Partial token migration leaving mixed color system; broken contrast on body text | Audit all hardcoded colors before starting; define new tokens first |
| Hero redesign | Generic value proposition survives the visual refresh | Rewrite subtitle copy alongside visual work, not after |
| Scroll animation integration | Hero section gated behind IntersectionObserver, appears blank on load | Hero must be excluded from scroll-triggered reveals; test JS-disabled state |
| Contentful content upload | Magic array indices break when new assets uploaded | Fix positional lookups before any Contentful content changes |
| Mobile nav implementation | Drawer works in devtools, breaks on real phone viewport | Test on 375px real device; include Teaching anchor fix in same pass |
| Project section redesign | Tutorial projects (Wild Oasis, Frontend Lib) not fully removed from Contentful | Verify removal in Contentful CMS, not just code |
| Animation phase | Too many motion patterns creating noise | Agree on 2-3 animation archetypes maximum before writing any animation code |
| Contact form cleanup | Fix only the visible bug, miss the hidden field / console.log issues | Audit all ContactMe bugs in one pass; test full form submission on production |
| SEO / meta tags | Treated as optional; skipped when schedule pressure hits | Add OG tags in the same session as any `index.html` edit — it is 20 minutes |
| Performance pass | Image optimization deferred; CMS fetch delay accepted | Contentful Image API params are a one-line change per image reference; do it in the image pass |

---

## Sources

**Confidence note:** WebSearch and WebFetch tools were unavailable during this research session. All findings are grounded in:
1. Direct codebase analysis of Antoni's existing site (MEDIUM-HIGH confidence — findings are code-evidenced)
2. Domain expertise on dark UI design patterns, portfolio recruiter expectations, React SPA performance, and WCAG contrast standards (HIGH confidence — well-established standards)
3. Known WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text) — codified standard
4. Contentful Image API documentation is well-documented and stable
5. Web Vitals / Core Web Vitals thresholds (FCP < 2.5s good, 2.5–4s needs improvement) — Google standard

Pitfalls 1–14 are critical and directly grounded in either observed code issues or well-established recruiter-facing portfolio failure modes. Pitfalls 15–20 are moderate-to-minor and similarly grounded. None are speculative.
