# Contentful Live Inventory — Phase 2 Pre-Write Snapshot

> Captured at execution time via CMA GET (space `0mufjfcbiiue`, env `master`).
> CMA token read from `.claude/settings.local.json` (gitignored) at runtime only — **never written here**.
> Versions drift after every write — downstream plans MUST re-GET before each PUT (optimistic locking).

**Captured:** 2026-06-21 (Plan 02-01 Task 1)

---

## Core entry + content type

| Resource | id | sys.version (at capture) | Notes |
|----------|-----|--------------------------|-------|
| `personalWebsite` entry | `SwkTyCP83ZyvNudvSKXo9` | 111 | The single site entry; displayField `name` |
| `personalWebsite` content type | `personalWebsite` | 38 | Confirms A4: id is literally `personalWebsite` |

**Default locale:** `en-US` (only locale in space) — confirms A3. All CMA writes use `"en-US"` keys.

**Content type fields (before Task 2):**
`name, bio, skills, contact, pictures, backgrounds, projects, avatar, audioClips, musicBio, teachingBio, experiences`

→ No `heroTagline` and no `epArtwork` field yet. Task 2 adds both (D-08, MUSC-01) and re-activates the content type.

---

## experiences link array (current)

| Order | entry id | title | company |
|-------|----------|-------|---------|
| 1 | `3dbE0bfeHY4ADP3DAlR1oe` | Team Lead & Full-Stack Developer | SongScope |
| 2 | `5rWJCOyAw2bZoRzf6oLVak` | Front-End Developer | Risktec Systems (Startup) |
| 3 | `5vKAHk8QuzIEcvRpjXN954` | Shopify Hackathon Winner | Presented by BrainStation |

⚠ **Deviation from plan assumption (Open Question #1):** The plan (02-02) assumed it would *add* "Freelance Software Engineer", "Risktec Software Engineer", and a "Piano Teacher" role, folding retired `teachingBio` content into Experiences. Live state instead has three *different* existing roles, and there is **no** existing teaching/piano experience entry (the teaching content lives only in the separate `teachingBio` field). Downstream 02-02 must reconcile: decide per-role whether to **create new**, **update an existing** entry (e.g. the existing Risktec/Front-End entry vs. a new "Risktec Software Engineer"), or **reorder**. Surface at the D-18 approval gate.

---

## projects link array (current)

| Order | entry id | title | sys.version |
|-------|----------|-------|-------------|
| 1 | `38BNsImyxunYKuC2cZut71` | Gist AI | 31 |
| 2 | `n3uOcC5mxAge26UBfvomI` | SongScope | 4 |

- **SongScope entry EXISTS** (`n3uOcC5mxAge26UBfvomI`, v4) → confirms A2: CONT-06 is a **PUT/update**, not a POST.
- **Gist AI entry** (`38BNsImyxunYKuC2cZut71`, v31) → CONT-04 is a PUT/update.
- **Wild Oasis and My Frontend Lib do NOT exist** in the space (only `project` entries are the two above) → confirms A1. **CONT-07 deletion in 02-03 is a no-op** (skip path); only re-verify the `projects` array carries no stale links (it does not).

---

## Plan 02-02 writes (experiences) — DONE

| Entry | id | action | published version |
|-------|-----|--------|-------------------|
| Freelance Software Engineer | `0ZrRS2gcRVz3cWLkungv7` | created | v2 |
| Risktec Software Engineer | `5rWJCOyAw2bZoRzf6oLVak` | **updated in place** (was Front-End Developer; decision A) | v34 |
| Piano Teacher | `1jqO1ej5HvaYy9mEDbEnSq` | created | v2 |

`personalWebsite` re-published **v113** with experiences (newest-first): Freelance → Team Lead/SongScope → Risktec → Shopify Hackathon → Piano Teacher. No notResolvable errors.

---

## Fields relevant to downstream plans

- **skills (current value):** `['React', 'NextJS', 'Typescript', 'Redux', 'CSS', 'SCSS', 'Tailwind CSS', 'Python', 'Django', 'MySQL', 'Data Structures', 'KnexJS', 'REST API', 'GraphQL', 'Agile Development', 'Content Management Systems']` — 02-04 merges in the D-11 additions.
- **musicBio:** present (non-empty) → 02-04 PUTs the EP "Why We're Living" copy.
- **teachingBio:** present (non-empty) → source for any Piano Teacher experience copy; field itself is left in the model (D-17 deferred).

---

## CMA write path (established for all downstream plans — D-01/D-02/D-03)

- **Base:** `https://api.contentful.com/spaces/0mufjfcbiiue/environments/master`
- **Auth:** `Authorization: Bearer <CMA token>` — extracted at runtime from the permitted curl allow-string in `.claude/settings.local.json` (gitignored). Never echoed, never written to any tracked file (D-02).
- **Read-modify-write:** GET resource → read `sys.version` → PUT full body with `X-Contentful-Version: <version>`. Contentful does **not** merge partial bodies (RESEARCH Pattern 1).
- **Publish (D-03):** entries → PUT `/entries/{id}/published`; content types → PUT `/content_types/{id}/activated`; assets → PUT `/assets/{id}/published`.
- **Rate limit:** `sleep 1` between calls (Pitfall 5, 7 req/s cap).
- **Asset upload:** binary → `https://upload.contentful.com/spaces/0mufjfcbiiue/uploads` (different host), then create asset → process en-US → poll for `file.url` → publish (RESEARCH Pattern 5).

---

## Content type version log (append on each activation)

| When | CT version after change | Change |
|------|-------------------------|--------|
| Pre-write (Task 1 capture) | 38 | baseline — no heroTagline/epArtwork |
| Task 2 (draft PUT) | 39 | added `heroTagline` (Symbol) + `epArtwork` (Link/Asset) to fields |
| Task 2 (activated) | 40 | content type re-activated; both fields live on CDN |

### ⚠ Endpoint correction (carry into all downstream plans)

02-RESEARCH.md Pattern 4 states content types activate via `PUT /content_types/{id}/activated`.
**That endpoint 404s — it does not exist.** The real CMA endpoint is `PUT /content_types/{id}/published`
(the Contentful UI labels it "Activate", but the REST path is `/published`; deactivate = `DELETE .../published`).
Entries also publish via `/entries/{id}/published`, so downstream plans are unaffected for entries — but any
future content-type change must use `/published`, not `/activated`.
