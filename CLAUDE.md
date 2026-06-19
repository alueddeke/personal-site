<!-- GSD:project-start source:PROJECT.md -->
## Project

**Personal Website — Antoni Lueddeke**

A recruiter-facing personal portfolio for Antoni Lueddeke, a full-stack software engineer in Toronto. The site showcases professional work history, flagship projects, technical skills, and an active music career, all within a single-page React application backed by Contentful CMS and deployed on Netlify. The site is undergoing a full content refresh and design overhaul to reflect significant career growth since the original build and to make a strong first impression on recruiters being handed the URL directly.

**Core Value:** A recruiter who clicks the link should immediately understand Antoni ships real production software — and within minutes, should want to reach out.

### Constraints

- **Stack**: React + Vite + Tailwind + Contentful + Netlify — no migrations, stay on current stack
- **Content management**: All dynamic content must go through Contentful (text, images, projects, music); no hardcoding in JSX
- **Deployment**: Netlify for both main site and Gist AI
- **SongScope context**: Full project detail blocked on incoming context file; use placeholder card for now
- **Timeline**: Recruiter handoff is imminent — prioritize visible impact over deep refactoring
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- JavaScript (JSX) - All application code in `src/`
- CSS - Global styles via `src/index.css` (Tailwind directives only)
- HTML - Entry point `index.html`
## Runtime
- Node.js v21.7.1
- npm 10.5.0
- Lockfile: `package-lock.json` (present)
## Frameworks
- React 18.3.1 - UI framework, SPA with hooks-based components
- Vite 5.3.4 - Build tool and dev server, config at `vite.config.js`
- `@vitejs/plugin-react` 4.3.1 - Babel-based JSX transform for Vite
- Tailwind CSS 3.4.6 - Utility-first CSS, config at `tailwind.config.js`
- PostCSS 8.4.39 - CSS processing pipeline, config at `postcss.config.js`
- Autoprefixer 10.4.19 - Vendor prefix injection via PostCSS
- Not detected
## Key Dependencies
- `contentful` 10.12.10 - CMS SDK (installed but unused; app uses raw `axios` against Contentful REST API instead — see `src/contentful.js`)
- `axios` 1.7.2 - HTTP client for Contentful CDN API calls (`src/contentful.js`)
- `@emailjs/browser` 4.4.1 - Client-side email sending without a backend (`src/components/ContactMe.jsx`)
- `howler` 2.2.4 - Web audio playback (`src/components/HowlerPlayer.jsx`)
- `wavesurfer.js` 7.8.2 - Audio waveform visualization (`src/components/HowlerPlayer.jsx`)
- `react-markdown` 9.0.1 - Renders Contentful rich-text/markdown strings (`src/components/ProjectCard.jsx`)
- `dotenv` 16.4.5 - Listed as runtime dependency, but Vite handles env vars via `import.meta.env`; actual usage is redundant in this setup
## Configuration
- Configured via `.env` file (present, never read)
- Vite exposes vars prefixed with `VITE_` to the client via `import.meta.env`
- Required vars: `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_ACCESS_TOKEN`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_SERVICE_ID`
- `vite.config.js` — minimal config: React plugin, `process.env` shimmed to `{}`
- `tailwind.config.js` — custom color palette (mint, deep-teal, sky-blue scale, light-gray, dark-text, off-white), custom fonts (Inter, Roboto, Poppins), custom `xs` breakpoint at 480px
- `postcss.config.js` — tailwindcss + autoprefixer plugins
- Google Fonts CDN loaded in `index.html`: Inter (400/600/700), Roboto (400/700), Poppins (400/600/700)
## Platform Requirements
- Node.js >= 18 (v21.7.1 in use)
- `npm run dev` starts Vite dev server
- Static site — `npm run build` outputs to `dist/`
- No server-side runtime required
- `npm run preview` serves the production build locally
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Code Style
- **Language:** JSX (React 18, no TypeScript)
- **Formatter:** Not configured (no Prettier config found)
- **Linter:** ESLint with `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **Import style:** Named imports for React hooks; default imports for components and libraries
## Naming
| Thing | Convention | Example |
|-------|-----------|---------|
| Components | PascalCase | `HowlerPlayer.jsx` |
| Utilities | camelCase | `contentful.js` |
| Props | camelCase | `backgroundImage`, `audioClips` |
| State vars | camelCase | `isEmailValid`, `notification` |
| Event handlers | `handle` prefix | `handleSubmit`, `closeNotification` |
| CSS classes | Tailwind utilities + custom tokens | `text-deep-teal`, `bg-light-gray` |
| Env vars | `VITE_` prefix + SCREAMING_SNAKE | `VITE_CONTENTFUL_SPACE_ID` |
## Component Pattern
## Styling
- **Framework:** Tailwind CSS v3 with custom tokens in `tailwind.config.js`
- **Custom tokens:** `bg-light-gray`, `text-dark-text`, `text-deep-teal`, `bg-deep-teal`
- **No CSS modules** — all styles via Tailwind class strings
- **Responsive:** `md:` prefix used for breakpoints (e.g. `hidden md:block`, `md:flex-row`)
- **Inline styles:** Used only for dynamic values from Contentful (background images)
## Error Handling
- Data fetch: try/catch in `contentful.js`, re-throws; caught in `App.jsx` useEffect → `setError()`
- Form submit: `.then()/.catch()` promise chain in `ContactMe.jsx`
- Missing data: optional chaining (`backgrounds?.[0]`) used throughout
- Error display: dedicated `<Error />` and `<Loading />` components rendered from `App.jsx`
## Data Access Pattern
## Asset References
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern
## Layers
```
```
## Data Flow
### Contentful Fetch (on mount)
```
```
### Contact Form Submission
```
```
### Audio Playback
```
```
## Entry Points
- `index.html` — single HTML shell, mounts `#root`
- `src/main.jsx` — renders `<App />` into DOM
- `src/App.jsx` — root: fetches data, renders layout
## State Management
## Abstractions
- `src/contentful.js` — only data layer abstraction; returns a fully-resolved item object
- `NavBar` — anchor links targeting `id` attributes on section wrappers in App
- `Notification` — ephemeral UI state component, shown/hidden via local state in ContactMe
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
