---
phase: 2
slug: content-overhaul
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-06-20
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — content phase verified via Contentful CDN API assertions (curl/axios) + ESLint/build |
| **Config file** | none — no unit-test runner in repo |
| **Quick run command** | `npx eslint src --max-warnings=0` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~20 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx eslint src --max-warnings=0`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full build must be green; CDN assertions for the wave's content must pass
- **Max feedback latency:** ~20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | CONT-01 | — | N/A | cdn-assert | `curl -s "https://cdn.contentful.com/spaces/0mufjfcbiiue/environments/master/entries?content_type=personalWebsite&access_token=$VITE_CONTENTFUL_ACCESS_TOKEN" \| grep heroTagline` | ✅ via 02-01 | ⬜ pending |
| 02-02-01 | 02 | 2 | CONT-02,CONT-03 | — | N/A | cdn-assert | curl experience entries → assert Freelance + Risktec present | ✅ via 02-01 | ⬜ pending |
| 02-03-01 | 03 | 2 | CONT-04,CONT-05,CONT-06,CONT-07 | — | N/A | cdn-assert | curl entries → assert Music School SaaS / SongScope / Gist AI present, Wild Oasis + My Frontend Lib absent | ✅ via 02-01 | ⬜ pending |
| 02-04-01 | 04 | 2 | CONT-08,MUSC-01,MUSC-02 | — | N/A | cdn-assert | curl personalWebsite → assert skills array + EP musicBio updated | ✅ via 02-01 | ⬜ pending |
| 02-05-01 | 05 | 3 | CONT-01,CONT-07,DSGN-05 | — | N/A | build+render | `npm run build` passes; ReactMarkdown bullets render; no `<Teaching />` in App.jsx | ✅ via 02-01 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Note: Task IDs above are indicative — final IDs come from the planner. The verification approach is what matters: CDN-API presence/absence assertions for content tasks; build + render checks for code tasks.*

---

## Wave 0 Requirements

- [ ] No test framework install needed — this phase has no unit-testable business logic
- [ ] Verification harness = Contentful CDN API queries (curl with read-only `VITE_CONTENTFUL_ACCESS_TOKEN`) + `npm run build` + ESLint

*Existing infrastructure (ESLint + Vite build) covers all code-side phase requirements. Content-side requirements verify via the CDN API.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Copy quality / tone of hero, experience bullets, project cards, EP blurb | CONT-01..08, MUSC-01 | Subjective editorial judgment; gated by D-18 draft→approve→push | Antoni reviews CONTENT-DRAFT.md and approves before any CMA write |
| Rendered site shows correct content end-to-end | All | Requires live CDN + browser render | `npm run dev`, visually confirm hero, experiences (with bullets), 3 project cards, no Teaching, EP music section |
| Image assets visually correct (Gist screenshot, EP art, SaaS/SongScope thumbnails) | CONT-04..07, MUSC-01 | Visual asset correctness | Confirm uploaded assets render in cards after publish |

---

## Validation Sign-Off

- [x] All tasks have an automated CDN-assert/build verify or a Wave 0 dependency
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (none — harness is the verify-cdn.sh script created in Plan 02-01 Task 1 + `npm run build`)
- [x] No watch-mode flags
- [x] Feedback latency < 20s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-06-20
