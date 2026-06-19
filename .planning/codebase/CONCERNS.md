# Concerns
*Last mapped: 2026-06-19*

## Tech Debt

### Unused dependencies (installed but not used)
- `contentful` SDK — app uses raw Axios instead; SDK never imported (`src/contentful.js`)
- `dotenv` — Vite handles env natively via `import.meta.env`; this package does nothing in a Vite project

### Magic number array indices
Fragile asset selection — breaks silently if Contentful asset order changes:
- `src/App.jsx:63` — `backgrounds?.[10]`
- `src/App.jsx:74` — `backgrounds?.[0]`
- `src/App.jsx:79` — `backgrounds?.[2]`
- `src/components/AboutMe.jsx` — `pictures[9]`, `pictures[10]` (or similar hardcoded indices)
- `src/components/LandingPage.jsx` — index-based picture selection
- `src/components/Teaching.jsx` — index-based picture selection

**Fix:** Use named Contentful fields or slug-based asset lookup instead of positional array access.

### Hardcoded placeholder in production
- `src/components/ContactMe.jsx:142` — `<input type="hidden" name="to_name" value="Your Name" />`

### Debug logging in production
- `src/App.jsx:24` — `console.log(result)` in data fetch
- `src/components/ContactMe.jsx` — `console.log` in both email send success and failure handlers

### Footer year hardcoded
- `src/components/Footer.jsx` — hardcodes "2024"; needs dynamic `new Date().getFullYear()`

### Tailwind token inconsistency
- `src/components/Loading.jsx` — uses `text-[#19747E]` (raw hex) instead of `text-deep-teal` design token

## Known Bugs

### No mobile navigation
- `src/components/NavBar.jsx:69` — all nav links wrapped in `hidden md:block`; no hamburger menu for mobile
- **Impact:** Site is not navigable on mobile screens

### Teaching section missing anchor ID
- `src/App.jsx:67-71` — `<Teaching />` is not wrapped in a `<div id="teaching">` unlike all other sections
- **Impact:** Teaching cannot be linked from NavBar

### Duplicate nested container in ContactMe
- `src/components/ContactMe.jsx:77-79` — `container mx-auto px-4 flex flex-col md:flex-row` div nested inside identical div
- **Impact:** Contact info column (right side) is never rendered; layout is incomplete

### Rich text truncation in AboutMe
- `src/components/AboutMe.jsx` — only renders `paragraph.content[0].value` (raw string)
- **Impact:** Bold, italic, links, and multi-paragraph content in Contentful bio are silently dropped

## Security

### No CAPTCHA or rate limiting on contact form
- `src/components/ContactMe.jsx` — EmailJS form has no bot protection
- **Impact:** Form can be spammed; EmailJS quota consumed

### `react/jsx-no-target-blank` ESLint rule disabled
- `.eslintrc.cjs` — disabling this rule allows `target="_blank"` without `rel="noopener noreferrer"`
- **Impact:** Potential tab-napping vulnerability on external links

### API credentials in `.env`
- Contentful and EmailJS keys in `.env` — standard for Vite, but both are exposed in client bundle at build time (Contentful CDN-only key, acceptable; EmailJS public key, acceptable)

## Performance

### Dual audio library redundancy
- `src/components/HowlerPlayer.jsx` — Howler and WaveSurfer both independently fetch and decode the same audio file per player instance
- **Impact:** 2× network requests and memory per track

### No Contentful Image API optimization
- All `image.fields.file.url` references serve full-resolution images with no size/format params
- **Fix:** Append `?w=800&fm=webp` or similar to Contentful CDN URLs

### Blocking single-fetch strategy
- All data fetched in one request before any content renders; no skeleton loading per section
- **Impact:** Perceived load time scales with CMS response time

### Polling interval too coarse
- `src/components/HowlerPlayer.jsx` — 1-second playback progress polling causes jumpy waveform scrubber

## Missing Features

- No SEO metadata (`<title>`, `<meta description>`, Open Graph)
- No mobile navigation
- No client-side routing / deep links to sections
- No image lazy loading
- Zero test coverage
