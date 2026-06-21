---
phase: 02-content-overhaul
plan: 01
subsystem: contentful-cms
tags: [contentful, cma, content-type, verification, approval-gate]
requires: []
provides: [contentful-inventory, cdn-verify-harness, heroTagline-field, epArtwork-field, approved-content-draft]
affects: [personalWebsite-content-type]
tech-stack:
  added: []
  patterns: [cma-read-modify-write, cdn-assertion-harness]
key-files:
  created:
    - .planning/phases/02-content-overhaul/CONTENTFUL-INVENTORY.md
    - .planning/phases/02-content-overhaul/verify-cdn.sh
    - .planning/phases/02-content-overhaul/CONTENT-DRAFT.md
  modified: []
key-decisions:
  - "Content-type activation endpoint is /published, NOT /activated (research doc error; /activated 404s)"
  - "Wild Oasis + My Frontend Lib already deleted — CONT-07 is a no-op"
  - "Risktec: update existing 'Front-End Developer/Risktec Systems' entry in place (no duplicate)"
  - "Keep existing Team Lead/SongScope and Shopify Hackathon experiences"
  - "Experience order newest-first; component sorts by startDate so order is automatic"
  - "4 required images missing — defer asset uploads, push text-only functional draft first"
requirements-completed: [CONT-01]
duration: ~25 min
completed: 2026-06-21
---

# Phase 2 Plan 01: Content Overhaul Safety Scaffolding Summary

Established the CMA write path and approval gate for the entire content overhaul: captured live
Contentful state, built a 5-criterion CDN verification harness, added + activated the `heroTagline`
and `epArtwork` content-type fields, drafted all copy, and obtained Antoni's explicit approval.

**Tasks:** 4 (3 auto + 1 blocking-human gate). **Files:** 3 created.

## What was built

- **CONTENTFUL-INVENTORY.md** — live snapshot: `personalWebsite` entry `SwkTyCP83ZyvNudvSKXo9` v111,
  content type v38→v40, locale `en-US`, experiences/projects link arrays, SongScope
  (`n3uOcC5mxAge26UBfvomI` v4) + Gist AI (`38BNsImyxunYKuC2cZut71` v31) ids. Confirmed A1–A4.
- **verify-cdn.sh** — parameterized read-only CDN harness asserting all 5 phase success criteria
  (SC-1..SC-5). Currently 0/5 (expected — content not written). Re-run after each downstream plan.
- **heroTagline (Symbol) + epArtwork (Asset link)** fields added to the `personalWebsite` content
  type via single full-body PUT, then activated (`/published`, v40). All 12 prior fields intact.
- **CONTENT-DRAFT.md** — all 9 copy sections, approved by Antoni.

## Approval decisions (D-18 gate — granted)

- A: **update existing Risktec entry in place** (title→Software Engineer, keep company wording)
- B: **keep** existing Team Lead/SongScope + Shopify Hackathon experiences
- C: **newest-first** ordering (automatic via component startDate sort)
- Antoni will do an editing pass after a functional draft is live; prioritize speed.

## Deviations from Plan

**[Rule 1 - Research error] Content-type activation endpoint** — Found during Task 2. 02-RESEARCH
Pattern 4 said `PUT /content_types/{id}/activated`; that path 404s ("resource could not be found").
Correct CMA endpoint is `PUT /content_types/{id}/published`. Fixed; CT activated to v40. Documented
in CONTENTFUL-INVENTORY.md for downstream plans.

**[Rule 2 - Live state ≠ assumptions]** Existing experiences differ from plan (Team Lead/SongScope,
Front-End/Risktec, Shopify Hackathon — no Piano Teacher entry). Wild Oasis/Frontend Lib already gone.
Surfaced at approval gate; resolved via decisions A/B/C above.

**Total deviations:** 2 (1 endpoint fix, 1 state reconciliation). **Impact:** downstream plans use
`/published` for any CT change, update-in-place Risktec, treat CONT-07 deletion as no-op.

## Issues Encountered

4 required image files missing (MusicSchool/SongScope/GistAI-New thumbnails, EP artwork). Per "functional
draft ASAP" directive, downstream plans push text content and defer these asset uploads (cards render
without thumbnails; Gist AI keeps existing thumbnail). Asset uploads to be completed when files land.

## Self-Check: PASSED

- verify-cdn.sh runs all 5 SC against CDN without crashing (0/5, expected pre-write) ✓
- heroTagline + epArtwork present and activated on CDN content type ✓
- CONTENT-DRAFT.md has all 9 sections; no CMA token in any tracked file ✓
- CONTENTFUL-INVENTORY.md records all live IDs/versions/locale ✓

Ready for 02-02 (experiences).
