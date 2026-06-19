# Architecture
*Last mapped: 2026-06-19*

## Pattern

Single-page application (SPA). No client-side routing — all navigation is anchor-scroll via `scrollIntoView`. One Contentful entry drives all data.

## Layers

```
Entry Points
  index.html → src/main.jsx → src/App.jsx

Data Access
  src/contentful.js  — Axios client fetching Contentful CDN REST API

App Shell (App.jsx)
  - Owns all remote state: data, loading, error
  - Resolves all Contentful asset/entry links manually
  - Prop-drills resolved data to every section component

Section Components (src/components/)
  LandingPage, AboutMe, Experiences, Music, Teaching, Projects, ContactMe, Footer, NavBar

Sub-Components
  HowlerPlayer, SkillsDropdown, ProjectCard, Notification, Loading, Error
```

## Data Flow

### Contentful Fetch (on mount)
```
App.useEffect → getContentfulData() → Contentful CDN REST
  → resolves Asset/Entry links inline in contentful.js
  → setData(item) → prop-drill to all sections
```

### Contact Form Submission
```
ContactMe → emailjs.sendForm() → EmailJS API
  → success/error → Notification component
```

### Audio Playback
```
Music → HowlerPlayer (per clip)
  → Howler (playback) + WaveSurfer (waveform visualization)
  → both load same audio file independently per player instance
```

## Entry Points

- `index.html` — single HTML shell, mounts `#root`
- `src/main.jsx` — renders `<App />` into DOM
- `src/App.jsx` — root: fetches data, renders layout

## State Management

No Context, no Redux, no Zustand. All state in `App.jsx` (`data`, `loading`, `error`) or local to components (`name`, `email`, `message` in ContactMe; playback state in HowlerPlayer).

## Abstractions

- `src/contentful.js` — only data layer abstraction; returns a fully-resolved item object
- `NavBar` — anchor links targeting `id` attributes on section wrappers in App
- `Notification` — ephemeral UI state component, shown/hidden via local state in ContactMe
