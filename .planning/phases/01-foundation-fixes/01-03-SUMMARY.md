---
phase: 01-foundation-fixes
plan: "03"
subsystem: songscope-deploy
tags: [netlify, render, postgres, django, nextjs, demo-mode, spotify, openai, contentful]
dependency_graph:
  requires: []
  provides: [songscope-live-demo, songscope-card, demo-mode-pattern]
  affects:
    - "songscope repo (separate): backend + frontend"
    - "Contentful: project entry n3uOcC5mxAge26UBfvomI (SongScope) + personalWebsite.projects"
tech_stack:
  added: ["@netlify/plugin-nextjs", "gunicorn", "whitenoise", "dj-database-url", "psycopg2-binary"]
  patterns: [demo-mode-auth-bypass, render-django-postgres, netlify-nextjs, cma-rest-entry-create]
key_files:
  created:
    - "songscope/backend/apps/core/management/commands/seed_demo.py"
    - "songscope/backend/.python-version"
    - "songscope/frontend/netlify.toml"
    - "songscope/frontend/app/components/DemoBanner.tsx"
    - "songscope/.github/workflows/keep-warm.yml"
  modified:
    - "songscope/backend/config/auth.py (DemoModeAuthentication + DemoUserMiddleware)"
    - "songscope/backend/config/settings.py (DEMO_MODE, Postgres, WhiteNoise, CORS)"
    - "songscope/backend/apps/core/views.py (demo branches, feedback-trend, add-to-liked guard)"
    - "songscope/backend/apps/core/models.py (token fields -> TextField)"
    - "songscope/backend/apps/recommendations/hybrid_recommendation_engine.py (demo prefer_genre boost)"
    - "songscope/frontend/app/profile/page.tsx, app/page.tsx, LikeTrendChart, DailyGem"
decisions:
  - "Demo Mode (single seeded Spotify account, no per-user login) chosen over Spotify Extended Quota and allowlist"
  - "Backend on Render (free web service + Postgres); frontend on Netlify (songscope-demo.netlify.app)"
  - "Python pinned 3.12.8 (.python-version): psycopg2 has no 3.14 wheels"
  - "SpotifyToken access/refresh -> TextField: Postgres enforces CharField(255), Spotify access tokens exceed it (SQLite didn't)"
  - "seed_demo runs in the Start Command (free tier has no Shell/SSH); idempotent"
  - "Taste trend in demo = cumulative like-rate over feedback events (date-based can't move in a session)"
  - "Demo-only 3x post-score boost for prefer_genre candidates (LOCKED scoring formula untouched)"
  - "SongScope card published with no thumbnail (optional follow-up)"
metrics:
  completed_date: "2026-06-20"
  tasks_completed: 6
  tasks_total: 6
---

# Phase 1 Plan 3: SongScope Demo-Mode Deploy Summary

Deployed the two-tier SongScope app (Next.js + Django/DRF/Postgres) with a single-account Demo Mode so recruiters use it with no Spotify login, and added the card beside Gist AI.

## What Was Built

- **Demo Mode (no login):** `DemoModeAuthentication` (DRF) + `DemoUserMiddleware` (plain views) resolve every request to a seeded demo user when `DEMO_MODE=True`. Sidesteps cross-domain session cookies entirely. `seed_demo` management command creates the demo user + Spotify token from env (runs in Render Start Command since free tier has no Shell).
- **Live URLs:** frontend https://songscope-demo.netlify.app (Netlify), backend https://songscope.onrender.com (Render + managed Postgres).
- **Demo UX:** honest DemoBanner (single shared account vs production per-user tailoring), "Open the live demo" landing CTA, "Welcome to the SongScope demo" greeting, resilient SSR (no cold-start 502), prominent "Generate new gem" loop, feedback-driven taste-evolution chart.
- **add-to-liked** guarded no-op in demo (never mutates the real Spotify library).
- **AI feedback tested:** OpenAI interpretation accurate; added demo-only prefer_genre 3x boost so "rockier" visibly surfaces rock (The Strokes, Polaris) instead of obscure ambient.
- **Card:** Contentful `project` entry `n3uOcC5mxAge26UBfvomI` published, linked beside Gist AI in `personalWebsite.projects`.

## Deploy Issues Resolved (in order)
1. psycopg2 import fail — Render used Python 3.14; pinned 3.12.8 via `.python-version`
2. `ModuleNotFoundError: numpy` — stale requirements.txt; rebuilt with all real imports
3. 500 on every API — Postgres rejected access_token > CharField(255); widened to TextField (migration 0009)
4. Seeding — free tier has no Shell; moved `seed_demo` into Start Command
5. Top artists 404 — plain `@login_required` views 302'd; added DemoUserMiddleware
6. Cold-start 502 — resilient SSR + keep-warm GitHub Action (14-min ping)

## Known Limitations (honest, documented)
- **Genre steering is partial:** Spotify audio-features API restricted (Nov 2024) → many candidate tracks lack genre data → can't be boosted/penalized → slip through on novelty. AI interpretation itself is accurate.
- **Cold start ~30-50s** on free Render after idle (keep-warm mitigates during the day).
- **Shared demo state** across all visitors (by design).
- **SongScope card has no thumbnail** yet (optional follow-up).
- **Free Postgres expires 2026-07-20** (Render free DB lifespan); seed re-runs on boot if recreated.

## Verification
- Backend live: get-user-name 200, daily-gem 200, top-artists 200, add-to-liked guarded
- Frontend live: profile renders no-login, banner correct, trend feedback-driven
- prefer_genre boost confirmed on prod (Polaris/metalcore surfaced after "rockier")
- Card published beside Gist AI (projects: [Gist AI, SongScope])
