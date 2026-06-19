# Structure
*Last mapped: 2026-06-19*

## Directory Layout

```
personal-website/
├── public/                    # Static assets served as-is
├── contentful/                # CMS media staging (not imported by app)
├── src/
│   ├── main.jsx               # Entry point — mounts App
│   ├── App.jsx                # Root shell — data fetch + layout
│   ├── contentful.js          # Data access — Axios + link resolution
│   ├── index.css              # Global styles + Tailwind directives
│   ├── assets/
│   │   └── react.svg
│   └── components/            # All UI components (flat — no subdirs)
│       ├── NavBar.jsx
│       ├── LandingPage.jsx
│       ├── AboutMe.jsx
│       ├── Experiences.jsx
│       ├── Music.jsx
│       ├── HowlerPlayer.jsx   # Audio player sub-component
│       ├── Teaching.jsx
│       ├── Projects.jsx
│       ├── ProjectCard.jsx    # Project card sub-component
│       ├── ContactMe.jsx
│       ├── Footer.jsx
│       ├── SkillsDropdown.jsx # NavBar sub-component
│       ├── Notification.jsx   # Toast notification sub-component
│       ├── Loading.jsx        # Loading state
│       └── Error.jsx          # Error state
├── .env                       # VITE_CONTENTFUL_SPACE_ID, VITE_CONTENTFUL_ACCESS_TOKEN,
│                              #   VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_TEMPLATE_ID,
│                              #   VITE_EMAILJS_SERVICE_ID
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

## Key Locations

| What | Where |
|------|-------|
| Data fetch | `src/contentful.js` |
| Root layout | `src/App.jsx` |
| Global styles | `src/index.css` |
| Tailwind tokens | `tailwind.config.js` |
| Env vars | `.env` (Vite `VITE_` prefix) |
| Static assets | `public/` |
| CMS media staging | `contentful/` |

## Naming Conventions

- Components: PascalCase (`NavBar.jsx`, `HowlerPlayer.jsx`)
- Utilities: camelCase (`contentful.js`)
- CSS classes: Tailwind utilities + custom tokens (e.g. `text-deep-teal`, `bg-light-gray`)
- Section IDs: kebab-case (`id="about"`, `id="music"`, `id="projects"`, `id="contact"`)

## Adding New Content

- **New section:** Add component to `src/components/`, import in `App.jsx`, wrap in `<div id="section-name">`, add NavBar anchor
- **New utility:** Add to `src/` root alongside `contentful.js`
- **New sub-component:** Add to `src/components/` (no subdirectory needed at current scale)
