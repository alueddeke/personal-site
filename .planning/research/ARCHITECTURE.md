# Architecture Patterns

**Domain:** Recruiter-facing developer portfolio — dark cinematic single-page React application
**Researched:** 2026-06-19
**Confidence:** HIGH (based on direct codebase analysis + established UX patterns for recruiter-facing portfolios)

---

## Recommended Architecture

This document covers layout architecture — section ordering, animation placement, content hierarchy, and mobile strategy. It does NOT cover data architecture (the existing Contentful + prop-drill pattern is correct for this project's scale and must not change).

### Current Section Order (App.jsx)

```
Hero → About → Experiences → Music → Teaching → Projects → Contact
```

### Recommended Section Order

```
Hero → Projects → About → Experiences → Music → Contact → Footer
```

**Rationale for every change:**

**Hero stays first.** The recruiter landed here. The hero must answer "who is this person and should I keep scrolling?" in under 5 seconds. Currently fails — the hero tagline ("passionate about creating projects from end to end") is generic and the layout hierarchy (name → tagline → circular photo) wastes the first impression. Fix: name + role claim + proof-of-shipping signal, full-viewport, no circular photo.

**Projects moves to second position.** This is the highest-signal section for a recruiter evaluating a candidate. The existing order buries projects below About, Experiences, Music, AND Teaching — meaning a recruiter who bounces after 2 sections never sees the work. At Antoni's career stage (post-Risktec, post-SaaS production system, AWS certified), the work speaks louder than the bio. Lead with evidence.

**About moves to third.** After seeing real projects, the recruiter is primed to learn who built them. About functions as context-building after proof, not before. A recruiter who is skeptical after the hero will be converted by projects; the About section then deepens the connection.

**Experiences stays after About.** Standard resume-ordering: projects prove you can build, About explains who you are, Experiences shows trajectory. The three work as a narrative unit.

**Music stays as near-footer personality piece.** Correct decision already made in PROJECT.md. Music after Experiences means a recruiter reading linearly hits Music only after professional context is established. It reads as "interesting person" not "distracted developer."

**Teaching section: fold into Experiences.** Teaching is a legitimate experience entry (Piano Teacher at Sherwood Music School). It does not need a dedicated section. A standalone Teaching section disrupts narrative pacing, and the existing Teaching component has a missing anchor ID bug anyway. Consolidate it as an Experiences entry.

**Contact at the bottom.** Natural destination for a motivated recruiter. A mid-page CTA (e.g., a subtle "Get in touch" button in the hero) should also exist to capture early-momentum visitors.

### Final Section Order with IDs

```
<NavBar />                       (fixed top)
<LandingPage id="hero" />        (full-viewport hero)
<Projects id="projects" />       (lead with evidence)
<AboutMe id="about" />           (context after proof)
<Experiences id="experiences" /> (trajectory)
<Music id="music" />             (personality)
<ContactMe id="contact" />       (CTA destination)
<Footer />
```

Teaching: merge as an Experiences entry in Contentful, remove Teaching.jsx from the section layout.

---

## Component Boundaries

No architectural changes to the component tree are needed. The existing flat component structure in `src/components/` is appropriate. What changes is:

| Component | Current Issue | What to Fix |
|-----------|--------------|-------------|
| `LandingPage.jsx` | Generic tagline, circular photo, blurred-background-over-portrait pattern | Replace with full-viewport dark layout, typographic hierarchy, strong role statement |
| `ProjectCard.jsx` | Leads with thumbnail image, name is secondary, no impact signal in visible state | Reorder: project name → impact line → tech tags → image (or image as full bleed with name overlay) |
| `Experiences.jsx` | Card-per-entry layout, minimal visual weight | Timeline or stacked layout with role, company, dates, 1-2 bullet impact statements |
| `ContactMe.jsx` | Has a duplicate nested container bug (right column never renders) | Fix layout, simplify to form + direct email link side by side |
| `NavBar.jsx` | Desktop-only (mobile hidden on `md:block`), no hamburger | Add mobile hamburger with drawer or full-screen overlay |
| `Music.jsx` | Renders 9 photos from the general pictures array — mixed with professional photos | Use dedicated music photos only; limit to 3-4; add Spotify link badge |

---

## Dark Cinematic Theme — Layout Decisions

**Confidence: MEDIUM** (pattern analysis from Vercel/Linear design language, not direct source access)

### Color Architecture

The current palette (`mint`, `deep-teal`, `light-gray`, `dark-text`, `off-white`) is a light-mode palette. A dark cinematic theme requires a complete token replacement in `tailwind.config.js`.

Recommended token structure:
- `bg-base`: near-black (e.g., `#0a0a0f` or `#09090b` — the Vercel/Linear near-black)
- `bg-surface`: slightly elevated surface (e.g., `#111117`)
- `bg-elevated`: card/component backgrounds (e.g., `#1a1a24`)
- `text-primary`: near-white (`#fafafa`)
- `text-secondary`: muted (`#a1a1aa`)
- `text-muted`: very muted (`#52525b`)
- `accent`: one strong accent, not teal — consider white (`#ffffff`) for primary CTAs or a single warm/cool highlight
- `border`: subtle (`#27272a` or `rgba(255,255,255,0.08)`)

**No gradients as decoration.** Gradients in cinematic dark UI are used for glows (radial, positioned behind content) not as background fills.

### Typography Scale

A cinematic feel requires dramatic typographic contrast between headings and body text. Current sizes are conservative.

Recommended Tailwind scale usage:
- Hero name: `text-7xl` or `text-8xl`, `font-bold` or `font-black`, tracking `-0.02em` (tight)
- Hero tagline: `text-xl` or `text-2xl`, `font-normal`, `text-secondary`
- Section headings: `text-4xl` to `text-5xl`, `font-bold`
- Card titles: `text-xl` to `text-2xl`, `font-semibold`
- Body / descriptions: `text-base` or `text-lg`, `font-normal`, `text-secondary`, `leading-relaxed`
- Labels / tags: `text-xs` or `text-sm`, `font-medium`, `uppercase`, `tracking-wider`

Font choice matters: Inter (already loaded) is correct — it is the Vercel/Linear/Stripe choice for exactly this aesthetic. Do not change.

### Spacing

Dark cinematic sites use generous vertical spacing to let content breathe and feel premium. Cramped sections feel low-budget. Recommendation:

- Section vertical padding: `py-24` to `py-32` minimum (current `py-16` and `py-20` are too tight for the dark aesthetic)
- Max content width: `max-w-6xl mx-auto` — current `container` is fine
- Horizontal gutter: `px-6` to `px-8` (current `px-4` is acceptable but tight)
- Card internal padding: `p-6` to `p-8`

### Section Rhythm

Alternate visual weight between sections to create rhythm without alternating background colors (which would break the dark aesthetic):

```
Hero         — full-viewport, maximum visual weight
Projects     — dark surface with subtle card elevation
About        — contained, two-column, left-heavy text
Experiences  — timeline or stacked, slightly lighter surface
Music        — distinct "chapter" treatment: darker overlay, left-aligned content
Contact      — contained, clean form, strong CTA heading
```

---

## Animation Architecture

**Confidence: HIGH** (based on established scroll-animation UX principles)

### Core Rule

Animate entrance, not everything. Motion should reveal — not perform. A recruiter who sees every element bobbing and fading will feel fatigued. The standard for this aesthetic is: elements enter once, cleanly, then sit still.

### What to Animate (scroll-triggered reveals)

| Element | Animation | Why |
|---------|-----------|-----|
| Section headings | Fade up, 40-60px translate, 400ms | Creates the "arriving" feeling as recruiter scrolls in |
| Project cards | Stagger fade-up (150ms delay per card) | Draws the eye across the grid without the grid appearing all at once |
| Experience entries | Stagger fade-up (100ms delay per entry) | Same rationale |
| About text + portrait | Fade left (text) / fade right (portrait), 400ms | Introduces the two-column layout with a sense of motion |
| Hero elements | Fade up on load, not scroll | Hero is already visible; entrance happens on initial render, not scroll |

### What to Leave Static

| Element | Why |
|---------|-----|
| NavBar | Already persistent; animating it on scroll causes flicker |
| Tech stack tags inside cards | Too small to animate meaningfully; just appear with the card |
| Contact form fields | Form fields should never animate; it signals instability |
| Music audio players | Audio player state is user-driven; entrance animation only |
| Footer | Below the fold, low priority, no recruiter is reading it |

### Implementation Pattern

Use Intersection Observer via a lightweight custom hook or a small library. Two options:

**Option A — Custom hook (zero dependency):**
```jsx
// useScrollReveal.js
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

Apply with Tailwind transition classes:
```jsx
const { ref, isVisible } = useScrollReveal();
<div
  ref={ref}
  className={`transition-all duration-500 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
>
```

**Option B — Framer Motion (heavier, more expressive):**
Use `motion.div` with `whileInView` + `viewport={{ once: true }}`. Framer Motion is the standard choice if the project wants spring physics or more complex stagger orchestration. It adds ~30kb gzip to the bundle, which is acceptable for a portfolio.

**Recommendation:** Start with Option A (custom hook). It is zero-dependency, trivially testable, and sufficient for fade-up reveals. Add Framer Motion only if the hero requires more complex orchestration (e.g., letter-by-letter text reveal).

### Hero Animation Sequence

The hero is the one place where a sequenced entrance is appropriate:

```
0ms   — page loads
100ms — role/tagline fades in from below
300ms — name fades in (larger, bolder — arrives after tagline to create surprise)
500ms — CTA button fades in
700ms — subtle scroll indicator or badge appears
```

This is a 700ms total sequence. Nothing longer. No looping animations.

---

## Content Hierarchy Within Key Sections

### Project Card Hierarchy

Current order: image (h-64 thumbnail) → title → description (collapsed) → tech tags → date

**Problem:** The first thing a recruiter sees is a photo. The last thing they see is the tech. The date is irrelevant.

Recommended order:
1. **Project name** — large, high contrast, immediate
2. **One-line impact statement** — not a description, a claim. "Production billing SaaS with active paying clients." "ML recommendation engine, team of 4, shipped to real users." This is what a recruiter reads before deciding to dig in.
3. **Tech stack tags** — visible without expanding; recruiter is scanning for known stack
4. **Thumbnail image** — visual proof, positioned after text so text anchors meaning
5. **"View Project" / "View Case Study"** link — clear CTA
6. Remove: date field. Portfolio projects don't need dates (it reveals age and implies the project is done rather than relevant).

Card layout on desktop: two-column inside the card — left: text content, right: image. Or: full-bleed image with text overlay (dark gradient over bottom third, white text). The current image-top layout is acceptable but does not lead with signal.

**For Music School SaaS (lead project):** Consider a featured card that spans full-width or takes up 2 columns, with a more detailed layout. This is the strongest project and should not compete equally with others in a uniform grid.

### Hero Content Hierarchy

Current: "Hi, I'm [name]" → generic tagline → circular photo

Recommended:
1. **Name** — `text-7xl`, bold, primary text color
2. **Role claim** — 1 line, strong and specific: "Full-Stack Engineer · Ships Production Software" — not "passionate about creating projects"
3. **Proof badge or stats** — 1-2 inline items: "AWS Certified · Risktec · Freelance SaaS" — makes the claim credible before they scroll
4. **CTA button** — "See my work" → scrolls to Projects. Prominent, single action.
5. **Photo** — Optional. If kept, use a confident editorial-style portrait (rectangular, not circular). Not blurred background. Photo should be secondary to the text claim.

The current blurred background photo pattern (backgrounds[1] blurred as hero BG) can stay if the image is strong — but the semi-transparent overlay must be dark enough that text is fully legible (currently `bg-dark-text/65`, which is reasonable).

### About Section Hierarchy

Two-column layout is correct. Left (2/3 width): bio text. Right (1/3): portrait. Keep this.

Bio text should open with the career claim in the first sentence, not biography. Recruiters scan the first sentence. "I'm a full-stack engineer based in Toronto..." works. "I love coding..." does not.

---

## CTA Placement Strategy

Three CTA surfaces, each targeting a different recruiter behavior:

| Surface | Location | Format | Targets |
|---------|----------|--------|---------|
| Primary CTA | Hero section | "See my work" button → scrolls to #projects | Recruiter who just arrived |
| Secondary CTA | Projects section header or after project grid | "Let's talk about what I can build for you" → link to #contact | Recruiter who just saw the work and is interested |
| Terminal CTA | Contact section | Full contact form + direct email link | Recruiter ready to act |

The NavBar's "Contact Me" link serves as a persistent escape hatch.

**Do not** put a contact form or email link in the hero — it implies desperation. The hero should drive deeper, not out.

**Do** make the Contact section's email address visible as plain text in addition to the form. Some recruiters prefer to copy an email address rather than fill a form.

---

## Mobile Strategy

**Recommendation: Desktop-first layout, mobile-responsive polish.**

**Rationale:** This portfolio is explicitly described as "handed to recruiters" via a direct URL. Recruiters reviewing candidates at a desk (LinkedIn DM, email, ATS) click the link on a desktop browser. The primary UX is desktop. However, recruiters who are impressed do forward links to colleagues, and hiring managers may open it on mobile. Mobile must not be broken, but it is the secondary experience.

The current mobile state is broken (NavBar links hidden on mobile, no hamburger menu). This must be fixed, but the fix is polish, not a fundamental rethink.

### Mobile Priority Fixes

1. **NavBar — add hamburger menu.** The mobile navigation is currently fully hidden (`hidden md:block`). A hamburger with a full-screen overlay or slide-in drawer is the standard pattern. Given the anchor-scroll SPA, the nav links close the drawer on tap.

2. **Project cards — single column on mobile.** Current `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` is correct. On mobile the card should show image → title → impact line → tags. The expanded description interaction is acceptable on mobile.

3. **Hero — reduce font sizes on mobile.** `text-7xl` or `text-8xl` hero name must scale down. Use `text-4xl sm:text-6xl lg:text-8xl` responsive sizing. The current `text-6xl` is already too large for narrow viewports.

4. **Experiences — single-column stack on mobile.** Timeline layout can collapse to a simple stacked card list on mobile.

5. **Music — reduce photo grid.** Current `grid-cols-2 sm:grid-cols-3` is fine. On the smallest viewports (< 375px), 2 columns is tight. `grid-cols-1 xs:grid-cols-2 sm:grid-cols-3` with the custom `xs: 480px` breakpoint already in tailwind.config.js is appropriate.

6. **Contact form — single column, no side-by-side.** The two-column intent in ContactMe.jsx is currently broken by the duplicate nested container bug. After fixing the bug, the right column (presumably email/social links) renders. On mobile it must stack vertically.

### Touch Considerations

The HowlerPlayer and WaveSurfer interaction must be tested on touch. Waveform scrubbing is a mouse interaction; on mobile it should degrade to play/pause only.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Scroll-Jacking
**What:** Overriding native scroll behavior for parallax or snapping effects.
**Why bad:** On mobile it is disorienting and breaks momentum. On desktop it fights the recruiter's instinct to skim. The existing `scrollIntoView({ behavior: 'smooth' })` is the correct approach — do not go beyond it.

### Anti-Pattern 2: Auto-Playing Audio
**What:** Starting audio on page load in the Music section.
**Why bad:** Recruiter is often in a shared office. Instant audio destroys credibility. The existing HowlerPlayer correctly requires user interaction to play.

### Anti-Pattern 3: Animating Content That Hasn't Loaded
**What:** Triggering Intersection Observer reveal before Contentful data resolves.
**Why bad:** The Loading state renders `<Loading />` and replaces the whole page. Intersection Observer hooks set up during Loading will fire on elements that don't exist yet. All scroll-reveal hooks must be set up after data is resolved (inside the section components, not in App.jsx).

### Anti-Pattern 4: Multiple Competing Accent Colors
**What:** Using deep-teal, sky-blue, and mint as active accent colors simultaneously.
**Why bad:** Dark cinematic design derives its premium feel from restraint. The current palette has 5+ colors competing. The new design should use 1 accent color (or pure white/near-white) for interactive elements, with all others being shades of the base dark background.

### Anti-Pattern 5: The Teaching Section as Standalone
**What:** Teaching.jsx as a full section between Experiences and Projects.
**Why bad:** A recruiting-facing portfolio should answer "can this person build software?" Piano teaching is real work and admirable, but a standalone section signals that it's a primary role. It is better as one entry in the Experiences list, which frames it accurately: it's a part-time income stream, not a competing professional identity.

---

## Scalability Considerations

This is a single-page portfolio with 8 sections and Contentful managing all content. Scale concerns are minimal and deliberate.

| Concern | Current State | Recommendation |
|---------|--------------|----------------|
| Bundle size | No routing, no state library — lean | Adding Framer Motion (+30kb) is acceptable. Avoid adding more. |
| Animation performance | None currently | Use `will-change: transform` sparingly and only on elements actively animating. Remove after animation completes. |
| Image performance | Images loaded via Contentful CDN URLs | Add Contentful Image API params: `?w=800&fm=webp&q=75` for thumbnails. Already noted in PROJECT.md code quality items. |
| Contentful fetch | Single entry, all data at once | Correct for this scale. Do not paginate or split. |
| Mobile performance | No specific optimization | Lazy-load Music section audio (Howler defers until play). Images already CDN-served. No changes needed. |

---

## Sources

- Direct codebase analysis: `src/App.jsx`, `src/components/*.jsx`, `tailwind.config.js`
- Project specification: `.planning/PROJECT.md`
- Confidence: HIGH for section ordering (based on recruiter behavior analysis), HIGH for animation patterns (Intersection Observer is established browser API), MEDIUM for specific dark color tokens (Vercel/Linear design language analysis from training data, not verified against current design tokens).
