# Technology Stack

**Analysis Date:** 2026-06-19

## Languages

**Primary:**
- JavaScript (JSX) - All application code in `src/`

**Secondary:**
- CSS - Global styles via `src/index.css` (Tailwind directives only)
- HTML - Entry point `index.html`

## Runtime

**Environment:**
- Node.js v21.7.1

**Package Manager:**
- npm 10.5.0
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- React 18.3.1 - UI framework, SPA with hooks-based components

**Build/Dev:**
- Vite 5.3.4 - Build tool and dev server, config at `vite.config.js`
- `@vitejs/plugin-react` 4.3.1 - Babel-based JSX transform for Vite

**Styling:**
- Tailwind CSS 3.4.6 - Utility-first CSS, config at `tailwind.config.js`
- PostCSS 8.4.39 - CSS processing pipeline, config at `postcss.config.js`
- Autoprefixer 10.4.19 - Vendor prefix injection via PostCSS

**Testing:**
- Not detected

## Key Dependencies

**Critical:**
- `contentful` 10.12.10 - CMS SDK (installed but unused; app uses raw `axios` against Contentful REST API instead — see `src/contentful.js`)
- `axios` 1.7.2 - HTTP client for Contentful CDN API calls (`src/contentful.js`)
- `@emailjs/browser` 4.4.1 - Client-side email sending without a backend (`src/components/ContactMe.jsx`)

**Media / Audio:**
- `howler` 2.2.4 - Web audio playback (`src/components/HowlerPlayer.jsx`)
- `wavesurfer.js` 7.8.2 - Audio waveform visualization (`src/components/HowlerPlayer.jsx`)

**Content Rendering:**
- `react-markdown` 9.0.1 - Renders Contentful rich-text/markdown strings (`src/components/ProjectCard.jsx`)

**Environment:**
- `dotenv` 16.4.5 - Listed as runtime dependency, but Vite handles env vars via `import.meta.env`; actual usage is redundant in this setup

## Configuration

**Environment:**
- Configured via `.env` file (present, never read)
- Vite exposes vars prefixed with `VITE_` to the client via `import.meta.env`
- Required vars: `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_ACCESS_TOKEN`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_SERVICE_ID`

**Build:**
- `vite.config.js` — minimal config: React plugin, `process.env` shimmed to `{}`
- `tailwind.config.js` — custom color palette (mint, deep-teal, sky-blue scale, light-gray, dark-text, off-white), custom fonts (Inter, Roboto, Poppins), custom `xs` breakpoint at 480px
- `postcss.config.js` — tailwindcss + autoprefixer plugins

**Fonts:**
- Google Fonts CDN loaded in `index.html`: Inter (400/600/700), Roboto (400/700), Poppins (400/600/700)

## Platform Requirements

**Development:**
- Node.js >= 18 (v21.7.1 in use)
- `npm run dev` starts Vite dev server

**Production:**
- Static site — `npm run build` outputs to `dist/`
- No server-side runtime required
- `npm run preview` serves the production build locally

---

*Stack analysis: 2026-06-19*
