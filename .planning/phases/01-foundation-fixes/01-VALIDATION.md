---
phase: 1
slug: foundation-fixes
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-19
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no test framework configured in this project |
| **Config file** | None |
| **Quick run command** | `npm run lint` (ESLint on changed files) |
| **Full suite command** | Manual visual QA against Phase 1 success criteria |
| **Estimated runtime** | Manual QA ~10 minutes per wave |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Manual visual QA against wave acceptance criteria
- **Before `/gsd:verify-work`:** All 5 Phase 1 success criteria from ROADMAP.md verified
- **Max feedback latency:** Manual check per task

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| hamburger-menu | 01 | 1 | BUG-01 | — | N/A | Manual (visual + tap on phone) | — | — | ⬜ pending |
| contact-right-col | 01 | 1 | BUG-02 | — | N/A | Manual (visual) | — | — | ⬜ pending |
| og-seo-tags | 01 | 1 | BUG-03, PERF-03 | — | N/A | Semi-automated | `curl URL \| grep -i 'title\|description\|og:'` | ✅ index.html | ⬜ pending |
| code-hygiene | 01 | 1 | BUG-05, BUG-06, BUG-07, BUG-08 | — | N/A | Automated scan | `grep -rn 'console.log' src/` → zero results | ✅ App.jsx, ContactMe.jsx, Footer.jsx | ⬜ pending |
| gist-ai-deploy | 02 | 2 | BUG-04 | — | Env vars not committed to git | Manual (end-to-end) | — | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

No Wave 0 test infrastructure needed — no test framework in this project. All validation is manual visual QA or bash scans.

---

## Manual QA Checklist (Phase Gate)

Before marking Phase 1 complete, verify all 5 ROADMAP.md success criteria:

- [ ] **SC-1**: Open site on phone → working hamburger menu → can navigate to any section
- [ ] **SC-2**: Paste URL in Slack/LinkedIn DM → correct title + description unfurl (no OG image required for Phase 1)
- [ ] **SC-3**: Click Gist AI "live link" → working deployed app on Netlify
- [ ] **SC-4**: ContactMe section shows form (left column) + contact info (right column) fully rendered
- [ ] **SC-5**: Browser DevTools console → zero log output on page load and navigation
