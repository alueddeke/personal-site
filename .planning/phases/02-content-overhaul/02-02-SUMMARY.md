---
phase: 02-content-overhaul
plan: 02
subsystem: contentful-cms
tags: [contentful, cma, experiences]
requires: [contentful-inventory, approved-content-draft]
provides: [freelance-experience, risktec-experience, piano-teacher-experience]
affects: [personalWebsite-entry]
tech-stack: {added: [], patterns: [cma-create-publish, cma-read-modify-write]}
key-files:
  created: []
  modified: [.planning/phases/02-content-overhaul/CONTENTFUL-INVENTORY.md]
key-decisions:
  - "Risktec updated in place (existing entry 5rWJCOyAw2bZoRzf6oLVak) per approval decision A — not a new POST"
  - "Experiences ordered newest-first via link array + component startDate sort"
requirements-completed: [CONT-02, CONT-03, DSGN-05]
duration: ~8 min
completed: 2026-06-21
---

# Phase 2 Plan 02: Experiences Summary

Pushed the experience vertical slice live via CMA: created Freelance Software Engineer and Piano
Teacher entries, updated the existing Risktec entry in place, and linked all into
`personalWebsite.experiences` (re-published v113).

**Tasks:** 3. **CMA writes:** 2 creates + 1 update + 1 link/publish, all published.

## What was built (live on CDN)

- **Freelance Software Engineer** `0ZrRS2gcRVz3cWLkungv7` v2 — Self-Employed, 2025-08 → present, markdown bullets.
- **Risktec Software Engineer** `5rWJCOyAw2bZoRzf6oLVak` v34 — updated existing entry (was "Front-End Developer"), 2024-09 → 2025-08, markdown bullets.
- **Piano Teacher** `1jqO1ej5HvaYy9mEDbEnSq` v2 — folds teaching content; 2018-09 → 2023-06.
- `personalWebsite` v113 — experiences resolve newest-first, no notResolvable errors.

## Deviations from Plan

**[Rule 2 - Approved decision A]** Plan Task 1 said POST a new Risktec entry; approval directed
updating the existing Risktec entry in place to avoid a duplicate. Updated `5rWJCOyAw2bZoRzf6oLVak`
(title, dates, description); it was already linked, so Task 3 only linked Freelance + Piano.

**Total deviations:** 1 (approved). **Impact:** no duplicate Risktec; experiences count = prior 3 + 2 new = 5.

## Issues Encountered

None. Markdown bullets render after Plan 05 adds ReactMarkdown to Experiences.jsx (currently plain text).

## Self-Check: PASSED

- CDN experience entries include Freelance + Risktec + Piano ✓
- personalWebsite.experiences resolves all 5, no errors ✓
- Bullets stored as markdown `- ` lines ✓
- Inventory updated with ids/versions ✓

Ready for 02-03 (projects).
