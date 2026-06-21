---
phase: 01-foundation-fixes
plan: "02"
subsystem: gistai-deploy
tags: [netlify, nextjs, deploy, gemini, firebase-auth, contentful]
dependency_graph:
  requires: []
  provides: [gistai-live-deploy, working-gistai-card-link, accurate-gistai-description]
  affects:
    - /Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI/netlify.toml
    - /Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI/src/lib/ai/stream.ts
    - "Contentful: project entry 38BNsImyxunYKuC2cZut71 (Gist AI)"
tech_stack:
  added: ["@netlify/plugin-nextjs"]
  patterns: [netlify-nextjs-deploy, cma-rest-entry-update]
key_files:
  created:
    - /Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI/netlify.toml
  modified:
    - /Users/antonilueddeke/Desktop/Projects/interview-prep/Old/gistAI/src/lib/ai/stream.ts
decisions:
  - "New Netlify site gistai-app.netlify.app created (NOT old capstone gist-antonilueddeke); per A4/Open Question 2"
  - "Gemini model gemini-2.0-flash -> gemini-2.5-flash: 2.0-flash free-tier quota retired (limit:0), not a billing issue"
  - "Firebase authorized domains: added gistai-app.netlify.app for Google Sign-in"
  - "Gist AI Contentful description rewritten to match deployed app (4 models, streaming, Firebase library); user's draft was stale (Perplexity/bullet-points/local-storage)"
metrics:
  completed_date: "2026-06-20"
  tasks_completed: 3
  tasks_total: 3
---

# Phase 1 Plan 2: Gist AI Netlify Deploy Summary

Deployed the current Gist AI Next.js app to a new Netlify site, fixed the Gemini Flash model, restored Google Sign-in, and pointed the personal-website Gist AI project card at the working live URL with an accurate description.

## What Was Built

### Task 1: netlify.toml + new Netlify site
- Created `netlify.toml` at gistAI repo root: `command = "npm run build"`, `publish = ".next"`, plugin `@netlify/plugin-nextjs`
- Created NEW Netlify site `gistai-app` (id `2a9fc24e-50a8-4907-b1b9-16e5e4a6f524`) → `https://gistai-app.netlify.app`
- 13 env vars set via Netlify dashboard (user, blocking checkpoint)

### Task 2: Build + deploy
- `netlify deploy --build --prod` succeeded; app loads and streams
- **Bug found during verify:** Gemini Flash returned blank cards. Function logs showed `AI_RetryError` / quota `limit: 0` on `gemini-2.0-flash` (free-tier allocation retired by Google)
- **Fix:** changed model ID to `gemini-2.5-flash` in `src/lib/ai/stream.ts` (commit ace0bad), redeployed → all 4 models stream
- **Bug found:** Google Sign-in failed — new Netlify domain not authorized. Fixed by adding `gistai-app.netlify.app` to Firebase Console → Authentication → Settings → Authorized domains

### Task 3: Contentful Gist AI card
- URL field already `https://gistai-app.netlify.app` ✓
- Description rewritten via CMA REST API (entry `38BNsImyxunYKuC2cZut71`, v29→30, published) to match the real app: side-by-side LLM comparison (GPT-4o mini, Claude Haiku, Gemini Flash, Groq Llama), streaming, speed metrics, Firebase library with Google sign-in

## Verification (all user-confirmed live)
- Gemini Flash streams end-to-end ✓
- Google Sign-in works ✓
- Comparison cards work ✓
- Card live link opens working app ✓

## Known follow-ups (not this plan)
- Stream-error swallowing: server returns 200 then `streamText` errors async → blank card instead of error state. User chose model-ID-only fix; error-UI hardening deferred.
- My Frontend Lib + Wild Oasis still present in Contentful — STATE decision says hard-remove (Phase 2 scope).

## Commits (gistAI repo)
| Commit | Description |
|--------|-------------|
| (netlify.toml add) | Next.js Netlify config |
| ace0bad | fix(stream): switch Gemini model to gemini-2.5-flash |
