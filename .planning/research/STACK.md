# Technology Stack — Animation & Dark Cinematic UI Additions

**Project:** Personal Portfolio — Dark Cinematic Aesthetic
**Researched:** 2026-06-19
**Confidence note:** WebSearch, WebFetch, and Bash were all denied during research. All findings below are from training data (cutoff August 2025). Versions should be verified against npm before pinning.

---

## Recommended Additions to Existing Stack

The existing stack (React 18 + Vite 5 + Tailwind 3 + Contentful + Netlify) is solid. These are additive-only recommendations. Nothing is removed or migrated.

---

## 1. Scroll-Triggered Entrance Animations

### Decision: Framer Motion

**Recommended:** `framer-motion` ^11.x
**Install:** `npm install framer-motion`

**Why Framer Motion over every alternative:**

Framer Motion is the de facto standard for declarative animation in React. It integrates with React's component model — animations are props, not imperative calls. For a portfolio that is already component-based and has no animation library, Framer Motion means zero architectural change: wrap an element, add `initial`, `animate`, and `whileInView` props, and it works.

The `whileInView` prop handles scroll-triggered entrance animations in 4 lines of JSX with no external scroll listener, no IntersectionObserver boilerplate, and no cleanup logic. This is the most important feature for this project's "section reveals as you scroll" requirement.

```jsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <ExperienceCard ... />
</motion.div>
```

The `viewport={{ once: true }}` flag ensures the animation plays once on entry and does not reverse on scroll-out — correct behavior for a portfolio reveal (not a game).

**`AnimatePresence`** handles mount/unmount transitions (e.g., the SkillsDropdown opening/closing, the Notification component appearing) without any additional work.

**`useInView` hook** from Framer Motion wraps IntersectionObserver imperatively for cases where you need to trigger non-visual side effects (e.g., starting an audio visualization) when a section enters the viewport.

**Bundle size:** Framer Motion 11 is ~45–55 KB gzipped (full import). Using the `m` lightweight alias or selective imports from `framer-motion/client` can reduce this to ~20–30 KB gzipped for a simple reveal-only use case. For a portfolio with 8 sections and moderate animation needs, the full package is acceptable.
MEDIUM confidence — size figures are from training data. Verify with `bundlephobia.com/package/framer-motion` before finalizing.

---

### Why not the alternatives:

**GSAP + ScrollTrigger:**
- MEDIUM confidence on the following.
- GSAP is the professional standard for complex timeline animations (landing pages with sequenced text reveals, parallax, pinning). It has unmatched performance via its custom animation engine.
- For this project it is overkill. GSAP requires imperative DOM refs (`useRef` + `useEffect` + cleanup), which works against React's declarative model. ScrollTrigger setup requires `gsap.registerPlugin(ScrollTrigger)` globally, and React's render cycle can conflict with GSAP timelines unless using the `useGSAP` hook from `@gsap/react`.
- Bundle cost: GSAP core ~27 KB gzipped + ScrollTrigger ~18 KB gzipped = ~45 KB before any other GSAP plugins. Comparable to Framer Motion but with significantly more integration complexity for React.
- Use GSAP only if the project needs pinned scroll sections, text scramble effects, or timeline-sequenced hero animations. This project does not.

**CSS-only (Tailwind animate utilities):**
- Tailwind ships `animate-fade-in`, `animate-slide-in-from-*` utilities in v3 (via `@tailwindcss/animate` plugin or the built-in `animation` utilities). These are zero-bundle-cost and perfectly viable for simple entrance animations.
- The catch: triggering a CSS animation on scroll requires either (a) Intersection Observer in a `useEffect`, or (b) adding/removing a class on scroll. This is exactly what animation libraries abstract. Writing this pattern across 8 sections without a library means 8 `useRef + useEffect + IntersectionObserver` setups — boilerplate that becomes a maintenance burden.
- CSS-only is the right choice if you want a single hero element to fade in on load (no JS needed). It is not the right choice for systematic scroll-triggered section reveals across a multi-section SPA.
- **Use CSS-only for:** initial page-load animations on the hero section (CSS `@keyframes` triggered immediately, no observer needed). Do not use it as the scroll-reveal strategy.

**AOS (Animate on Scroll):**
- AOS works by adding `data-aos` attributes to elements and running a global scroll listener. It is framework-agnostic but has no React integration — it relies on `AOS.init()` in a `useEffect` and re-initializing after React renders is a known footgun.
- AOS was popular circa 2019–2021. In a React project in 2025 it creates a mismatch: AOS mutates DOM classes, React manages the DOM. Avoid.

**Intersection Observer (raw API):**
- The right primitive — Framer Motion's `whileInView` uses it internally. Writing it yourself costs development time and produces the same result. Use it only if you are explicitly avoiding adding any npm dependency.

---

## 2. Dark Cinematic CSS Design

### Color Palette

No library needed. This is Tailwind configuration.

**Recommended palette approach — edit `tailwind.config.js`:**

Replace the current mint/teal/sky-blue palette with a near-black base + neutral midtones + a single accent color.

```js
// tailwind.config.js — colors.extend
colors: {
  // Base surfaces
  'surface-base':    '#09090b',  // zinc-950 equivalent — page background
  'surface-raised':  '#111113',  // card, panel backgrounds
  'surface-overlay': '#18181b',  // hover states, subtle distinction

  // Text
  'text-primary':    '#fafafa',  // headings, important copy
  'text-secondary':  '#a1a1aa',  // body copy, descriptions (zinc-400)
  'text-muted':      '#52525b',  // timestamps, metadata (zinc-600)

  // Accent — single color, used sparingly
  'accent':          '#e2e8f0',  // cold white — works on dark bg for borders/highlights
  // OR: 'accent': '#6366f1'   // indigo if you want a colored accent
  // OR: 'accent': '#f97316'   // amber if you want warmth

  // Border
  'border-subtle':   '#27272a',  // zinc-800 — dividers, card borders
  'border-default':  '#3f3f46',  // zinc-700 — interactive element borders
}
```

**Palette rationale:**

The Vercel/Linear aesthetic that the brief references uses near-black (not pure black `#000`) with zinc/slate neutral family rather than warm grays. Pure `#000000` backgrounds look flat; `#09090b` (zinc-950) has just enough color to read as intentional. The zinc scale is cooler than gray and warmer than slate — sits in the cinematic middle.

For the accent: a single, disciplined accent color is what separates cinematic from garish. The brief says "developer-as-craftsperson" — a cold white/silver accent (`#e2e8f0`) is safe and sophisticated. If you want the site to feel more distinctive, indigo (`#6366f1`) is the 2024-2025 default for developer tools (it is literally the default Tailwind ring color). Pick one and use it exclusively for interactive highlights, active states, and CTA buttons.

**Confidence: MEDIUM** — color theory is stable, but visual preference cannot be verified without rendering. These hex values are the starting point for iteration.

---

### Typography for Dark UIs

Keep the existing Google Fonts (`Inter`, `Roboto`, `Poppins`). The font family is not the problem. The issue is font weight, sizing, and letter-spacing configuration.

**Recommended changes (Tailwind config + component conventions):**

```js
// tailwind.config.js — extend fontSize
fontSize: {
  'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
  'headline': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '600' }],
  'subheading': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '500' }],
}
```

**Typography rules for dark cinematic UIs:**

1. **Tighter tracking on large text.** Headlines on dark backgrounds read better with slight negative letter-spacing (`-0.02em` for display, `-0.01em` for headlines). The current Inter at default tracking will look loose.
2. **High contrast body text.** `text-primary` at `#fafafa` on `#09090b` is ~19:1 contrast ratio — good. Do not drop body text below `#a1a1aa` (zinc-400) or it gets unreadable.
3. **Weight contrast, not color contrast.** Dark UIs get hierarchy from weight differences (400 vs 700) rather than color shifts. A `font-bold text-primary` heading over `font-normal text-secondary` body reads clearly without needing a color accent.
4. **Inter is correct.** Inter was designed for screen UIs with a large range of weights. Poppins works for display type (rounder, friendly). Roboto is the odd one out — you can drop it without visual loss.

**No additional font library needed.** Confidence: HIGH — this is established dark UI design convention (Vercel, Linear, GitHub's dark mode all follow this pattern).

---

## 3. Page-Load and Section Transitions

### Page-load (hero entrance):

Use **CSS keyframe animations via Tailwind** — zero bundle cost, loads before JS hydrates.

Add to `index.css` or `tailwind.config.js`:

```css
/* index.css — after Tailwind directives */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

Then extend Tailwind:

```js
// tailwind.config.js
animation: {
  'fade-up':   'fadeUp 0.7s ease-out forwards',
  'fade-in':   'fadeIn 0.5s ease-out forwards',
  'fade-up-delay': 'fadeUp 0.7s ease-out 0.15s forwards',
}
```

Usage in `LandingPage.jsx`:

```jsx
<h1 className="animate-fade-up opacity-0">Antoni Lueddeke</h1>
<p className="animate-fade-up-delay opacity-0">Full-Stack Engineer</p>
```

The `opacity-0` initial state prevents FOUC (flash of visible content before animation starts). The CSS animation fires immediately when the DOM is ready — no JS observer needed.

**For section-to-section transitions:** there are no page transitions in this SPA (it's anchor-scroll, not a router). The "transition" between sections is the entrance animation of the section coming into view, handled by Framer Motion's `whileInView` above.

### Framer Motion's `AnimatePresence` for UI state transitions:

Two existing components will benefit immediately:

1. **SkillsDropdown** — animate height/opacity on expand/collapse
2. **Notification** — animate in from bottom on form success/error, then fade out

```jsx
// Pattern for Notification
<AnimatePresence>
  {visible && (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
    >
      <Notification ... />
    </motion.div>
  )}
</AnimatePresence>
```

---

## 4. Tailwind Plugins and Utilities for Animation

### `tailwindcss-animate`

**Recommended:** `tailwindcss-animate` (the shadcn/ui ecosystem plugin)
**Install:** `npm install -D tailwindcss-animate`

```js
// tailwind.config.js
plugins: [require('tailwindcss-animate')]
```

This adds a large set of pre-built animation utilities:
- `animate-in`, `animate-out`
- `fade-in-*`, `fade-out-*`, `slide-in-from-top`, `slide-in-from-bottom`, `zoom-in-*`, `zoom-out-*`
- Duration and delay modifiers: `duration-300`, `delay-150`

**Why this over manual `@keyframes`:** For one-off CSS animations (hero elements, loading states), these utilities match Tailwind's utility-first workflow. They compose cleanly:

```jsx
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
```

**Why not instead of Framer Motion:** These utilities cannot be triggered on scroll — they fire on mount. They complement Framer Motion; they do not replace it for scroll-triggered reveals.

**Confidence: HIGH** — `tailwindcss-animate` is the plugin that ships with shadcn/ui, which is the dominant React component ecosystem in 2024-2025. It is actively maintained.

### What NOT to add:

- **`@tailwindcss/typography`** — useful for markdown content but the project already renders markdown via `react-markdown`. Add if body text rendering becomes a priority, but not for animation.
- **`tw-animate-css`** — an older, less maintained alternative to `tailwindcss-animate`. Skip it.
- **Tailwind v4 migration** — Tailwind v4 changed its configuration format substantially (no more `tailwind.config.js`, CSS-first config). Do NOT migrate now. The project is on Tailwind 3.4.6 and all existing component classes will break on v4 without a deliberate migration pass. Stay on v3.

---

## 5. Performance Considerations

### Bundle Size Impact

| Addition | Gzipped Size | Impact |
|----------|-------------|--------|
| `framer-motion` ^11 (full) | ~45–55 KB | Moderate — acceptable for a portfolio |
| `framer-motion` (selective import) | ~20–30 KB | Good — import only `motion`, `AnimatePresence`, `useInView` |
| `tailwindcss-animate` | 0 KB runtime | None — dev dependency, purged in build |
| CSS keyframes in `index.css` | <1 KB | Negligible |

**Confidence: MEDIUM** on Framer Motion bundle sizes — these are training-data estimates. Verify at bundlephobia.com before shipping if bundle budget is a concern.

**Recommendation:** Use selective imports from Framer Motion to minimize bundle contribution:

```js
import { motion, AnimatePresence, useInView } from 'framer-motion'
// NOT: import * as framer from 'framer-motion'
```

Vite's tree-shaking will handle the rest. The full Framer Motion 11 package is tree-shakeable; unused features (drag, 3D transforms, layout animations) are not included if not imported.

### Cumulative Layout Shift (CLS)

Scroll-triggered animations that move elements (`y: 32 → 0`) can cause CLS if the element's initial position is not properly reserved in the DOM layout.

**Prevention:**

- Use `opacity: 0` as the initial animation state when possible — opacity animations cause zero layout shift.
- When using `y` transforms (translateY), wrap animated elements in a container with explicit `min-height` or `height` so the layout space is reserved before the animation runs.
- The `viewport={{ once: true, margin: "-80px" }}` pattern triggers animations slightly before the element fully enters the viewport, reducing the user seeing elements "jump in" from below the fold.

**`will-change: transform` caution:** Framer Motion adds this automatically to animated elements. On low-powered devices (mobile), too many simultaneous `will-change` promoted layers can increase GPU memory pressure. For this project (8 sections with staggered reveals), this is not a concern — it would only matter at hundreds of animated elements simultaneously.

### Paint Timing / First Contentful Paint (FCP)

- Google Fonts (3 families, 3 weights each) are the current biggest FCP risk — already in the project. No change needed for the animation additions.
- Framer Motion is a runtime dependency but does not block rendering. Section content renders immediately; animations are layered on top. The `initial={{ opacity: 0 }}` state means animated elements are invisible until JS loads — this is acceptable for below-the-fold content but problematic for the hero section.
- **Hero strategy:** Use CSS animations (no JS dependency) for the LandingPage hero. Use Framer Motion's `whileInView` only for content that starts below the fold.

### `prefers-reduced-motion` (Accessibility)

This is not optional — it must be implemented. Users who have enabled reduced motion in their OS have medically-grounded reasons (vestibular disorders, motion sickness).

Framer Motion respects `prefers-reduced-motion` automatically when you use the `useReducedMotion` hook:

```jsx
// Global animation wrapper pattern
import { useReducedMotion } from 'framer-motion'

function AnimatedSection({ children, ...motionProps }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      {...motionProps}
      initial={reduce ? false : motionProps.initial}
      animate={reduce ? motionProps.animate : motionProps.animate}
    >
      {children}
    </motion.div>
  )
}
```

Alternatively, Framer Motion 11 provides a global `MotionConfig` component:

```jsx
// In App.jsx
import { MotionConfig } from 'framer-motion'

<MotionConfig reducedMotion="user">
  {/* all motion.* elements inside respect prefers-reduced-motion */}
</MotionConfig>
```

The `reducedMotion="user"` setting is the recommended approach — it reads the OS setting automatically and disables all transform/opacity transitions for affected users while keeping layout intact.

---

## Final Recommended Stack Additions

| Package | Version | Role | Install as |
|---------|---------|------|-----------|
| `framer-motion` | ^11.x | Scroll-triggered reveals, AnimatePresence, `whileInView` | dependency |
| `tailwindcss-animate` | ^1.0.7 | CSS animation utilities for mount transitions, hero | devDependency |

**Total additions: 2 packages.**

Everything else (dark palette, typography, CSS keyframes, color tokens) is configuration changes to existing files — no new dependencies required.

---

## Integration Path with Existing React + Tailwind Setup

### Step 1 — Install packages

```bash
npm install framer-motion
npm install -D tailwindcss-animate
```

### Step 2 — Update `tailwind.config.js`

- Replace `colors` with dark cinematic palette (zinc-based, as described above)
- Add `tailwindcss-animate` to `plugins` array
- Add custom `animation` keyframes for hero CSS animations
- Add custom `fontSize` entries for display/headline/subheading

### Step 3 — Update `index.css`

- Add `@keyframes fadeUp` and `@keyframes fadeIn` after Tailwind directives

### Step 4 — Wrap `App.jsx` with `MotionConfig`

```jsx
import { MotionConfig } from 'framer-motion'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      {/* existing layout */}
    </MotionConfig>
  )
}
```

### Step 5 — Apply animations per section

Each section component (Experiences, Projects, AboutMe, etc.) wraps its main container in `motion.div` with `whileInView`. Create a shared `<RevealSection>` wrapper component to avoid repeating props:

```jsx
// src/components/RevealSection.jsx
import { motion } from 'framer-motion'

export default function RevealSection({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
```

This keeps animation logic in one place. All 8 section components get the same entrance behavior by wrapping their JSX in `<RevealSection>` — no changes to data flow or prop-drilling structure.

### Step 6 — LandingPage hero (CSS, not Framer Motion)

`LandingPage.jsx` uses Tailwind `animate-fade-up` CSS animations on name/tagline/CTA. No Framer Motion needed here — CSS fires before JS hydrates, making the hero appear faster.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Scroll animation | Framer Motion | GSAP + ScrollTrigger | Overkill for declarative React; imperative API; same bundle cost with higher integration complexity |
| Scroll animation | Framer Motion | AOS | No React model; DOM class mutation conflicts with React; dated (pre-2022 pattern) |
| Scroll animation | Framer Motion | Raw IntersectionObserver | Works but requires boilerplate in every section; no gains over Framer Motion |
| CSS utilities | tailwindcss-animate | Manual @keyframes only | Plugin provides more utility coverage; zero runtime cost either way |
| Tailwind version | Stay on v3 | Migrate to v4 | Config format breaking change; all existing classes need audit; no animation upside |
| Dark palette base | zinc scale | slate scale | Zinc is cooler and less blue than slate; more cinematic; slate reads "GitHub" |
| Dark palette base | zinc scale | gray scale | Gray is too warm/neutral; loses the cinematic cold feel |

---

## Sources

- Training data (cutoff August 2025) — Framer Motion v11 API, bundle characteristics, `whileInView`, `MotionConfig`
- Training data — GSAP 3.x + ScrollTrigger architecture
- Training data — `tailwindcss-animate` plugin API (ships with shadcn/ui ecosystem)
- Training data — Tailwind CSS v3 animation utilities and `tailwind.config.js` format
- Training data — Web performance: CLS, `will-change`, `prefers-reduced-motion`
- Training data — Dark UI design conventions (Vercel, Linear, GitHub dark mode color patterns)

**Verify before pinning versions:** bundlephobia.com for bundle sizes, npmjs.com for current version numbers of framer-motion and tailwindcss-animate.
