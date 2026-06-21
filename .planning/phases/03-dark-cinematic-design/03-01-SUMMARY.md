---
phase: 03-dark-cinematic-design
plan: 01
subsystem: react-frontend
tags: [design, dark-theme, tailwind, monochrome]
requires: [content-overhaul-complete]
provides: [dark-cinematic-theme, section-reorder, projectcard-redesign, navbar-scroll]
affects: [all-components]
tech-stack: {added: [], patterns: [zinc-monochrome-system]}
key-files:
  created: []
  modified:
    - src/App.jsx
    - src/components/NavBar.jsx
    - src/components/ProjectCard.jsx
    - src/components/Projects.jsx
    - src/components/AboutMe.jsx
    - src/components/Experiences.jsx
    - src/components/Music.jsx
    - src/components/ContactMe.jsx
    - src/components/SkillsDropdown.jsx
    - src/components/Footer.jsx
    - src/components/Loading.jsx
    - src/components/Error.jsx
    - src/components/HowlerPlayer.jsx
    - src/components/LandingPage.jsx
    - src/components/Teaching.jsx
key-decisions:
  - "Monochrome accent (cold white) per Antoni — zinc-950 base, white text, zinc grays, no chromatic accent"
  - "Used Tailwind built-in zinc scale directly; custom mint/teal/sky tokens left defined but unused"
  - "ProjectCard impact line = first sentence of description (no separate impact field)"
  - "CTA buttons inverted (bg-white text-zinc-950) for monochrome pop"
requirements-completed: [DSGN-01, DSGN-02, DSGN-04]
duration: ~12 min
completed: 2026-06-21
---

# Phase 3 Plan 01: Dark Cinematic Design Summary

Reskinned the entire SPA to a monochrome dark cinematic system (zinc-950 base, white text, zinc
accents), reordered sections, restructured ProjectCard, and made the NavBar transparent→dark-blur on
scroll. 15 files touched; build green, eslint clean.

## What was built

- **Palette** — every component moved off mint/teal/sky to zinc-950/white/zinc. CTA buttons inverted to white-on-dark.
- **Section order** (App.jsx) — Hero → Projects → About → Experiences → Music → Contact.
- **ProjectCard** — name → one-line impact (first sentence) → stack tags → image → expandable description; date removed; dark card with zinc border + hover lift.
- **NavBar** — transparent at top, `bg-zinc-950/80 backdrop-blur-md` + border on scroll; white links; dark mobile menu.
- **Forms/dropdowns/players** — ContactMe form, SkillsDropdown, HowlerPlayer (incl. waveform colors), Footer, Loading/Error all darkened.

## Deviations from Plan

None — executed as planned. ProjectCard "impact" derived from description's first sentence since the
content model has no dedicated impact field.

## Self-Check: PASSED

- SC-1 dark zinc-950 base, palette replaced across all components (grep: 0 old tokens) ✓
- SC-2 scroll order Hero→Projects→About→Experiences→Music→Contact ✓
- SC-3 ProjectCard name→impact→tags→image, no date ✓
- SC-4 NavBar transparent→dark blur on scroll ✓
- eslint clean, build green ✓

Ready for Phase 4 (scroll animations).
