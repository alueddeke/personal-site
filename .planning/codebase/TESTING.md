# Testing
*Last mapped: 2026-06-19*

## Status

**No tests exist.** Zero test files in the entire codebase. No test runner configured.

## Current Coverage

| Area | Coverage |
|------|----------|
| Unit tests | 0% |
| Component tests | 0% |
| Integration tests | 0% |
| E2E tests | 0% |

## Test Infrastructure

None installed. `package.json` has no test script, no test framework, no test runner.

## What Would Need Testing

If tests are added, highest-value targets:

| Target | Type | Why |
|--------|------|-----|
| `src/contentful.js` — link resolution logic | Unit | Complex manual asset/entry resolution; fragile if Contentful response shape changes |
| `ContactMe` — email validation | Unit | Regex-based validation used for UX state |
| `HowlerPlayer` — playback state | Component | Complex Howler + WaveSurfer lifecycle |
| Data fetch → render flow | Integration | Only real verification that prop-drill wiring is correct |

## Recommended Stack (if adding tests)

- **Vitest** — native Vite integration, no config overhead
- **React Testing Library** — component tests
- **MSW (Mock Service Worker)** — mock Contentful/EmailJS HTTP calls

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom msw
```

Add to `vite.config.js`:
```js
test: { environment: 'jsdom', setupFiles: './src/test/setup.js' }
```

## Manual Testing Checklist (current practice)

Since no automated tests exist, verification is manual:
- [ ] Contentful data loads and renders all sections
- [ ] Contact form submits and shows notification
- [ ] Audio players play/pause correctly
- [ ] NavBar anchor links scroll to correct sections
- [ ] Responsive layout works on mobile (md breakpoint)
