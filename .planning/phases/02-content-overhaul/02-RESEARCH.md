# Phase 2: Content Overhaul — Research

**Researched:** 2026-06-20
**Domain:** Contentful Management API (CMA) write path; ReactMarkdown render upgrade; content model conformance
**Confidence:** HIGH (CMA REST mechanics verified against official docs; code patterns verified in codebase)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**D-01:** Content is written programmatically via the Contentful Management API (CMA). CMA token already exists as a permitted `curl` command in `.claude/settings.local.json` (space `0mufjfcbiiue`, env `master`, `https://api.contentful.com`).
**D-02:** CMA token MUST NOT be committed or copied into `.env`/source. Read from `.claude/settings.local.json` at execution time only.
**D-03:** Every CMA write must publish the entry/asset — the live site reads published content via CDN only.
**D-04:** Executor uploads all new images via the CMA (create upload → process → publish asset → link to entry).
**D-05:** New images needed: fresh Gist AI screenshot, EP "Why We're Living" artwork, Music School SaaS thumbnail, SongScope thumbnail. Asset-upload tasks block if the file is missing — do not invent placeholders silently.
**D-06:** Bullets stored as markdown `- ` lines inside existing `Experience.description` (Text) field — no schema change.
**D-07:** Add ReactMarkdown rendering to `Experiences.jsx` (reuse the pattern from `ProjectCard.jsx`). This is the minimal render code change Phase 2 owns.
**D-08:** Move hero tagline into a new Contentful field on `personalWebsite` (`heroTagline`, type Symbol). Read it as a prop in `LandingPage.jsx`.
**D-09:** Proof-led tagline direction: *"Full-stack engineer who ships production software — live SaaS billing systems, AI/ML products, and mobile apps. AWS certified, based in Toronto."*
**D-10:** Update `skills` array values only; keep rendering in existing `SkillsDropdown`.
**D-11:** Add: AWS Cloud Practitioner, React Native / Expo, AI/ML stack (OpenAI API, XGBoost, recommendation systems), Docker, Docker Compose, GitHub Actions CI/CD, DigitalOcean, Nginx, SSL.
**D-12:** SongScope is no longer blocked — write a real, outcome-first card.
**D-13:** SongScope card content: ML hybrid recommender (cosine similarity, Gaussian novelty scoring, Thompson sampling, online SGD taste vector, Jaccard diversity); OpenAI NL feedback; Spotify OAuth; Django + Next.js.
**D-14:** Include working live demo link `https://songscope-demo.netlify.app` with "demo mode — single seeded account" note.
**D-15:** Final project set: Music School SaaS (lead), SongScope, Gist AI. Gist AI: new description, technologies = React, Express, OAuth, Firebase/Firestore, fresh screenshot, live link `https://gistai-app.netlify.app`.
**D-16:** Hard-remove Wild Oasis and My Frontend Lib: delete entries via CMA AND remove from `personalWebsite.projects` link array.
**D-17:** Create a Piano Teacher Experience entry; remove `<Teaching />` from `src/App.jsx`. Leave `Teaching.jsx` file in place; just stop rendering it.
**D-18:** Draft → approve → push. All copy goes into `CONTENT-DRAFT.md` in the phase dir first. Antoni reviews and approves before any CMA write.

### Claude's Discretion

- Exact field id/name for the new hero field (`heroTagline` vs `headline`) — Claude's choice, document it.
- Whether the "Hi, I'm {name}" greeting line stays or is absorbed into the new tagline.
- Exact markdown structure of experience bullets (number, ordering).
- Exact `technologies` tag wording per project.

### Deferred Ideas (OUT OF SCOPE)

- Dark cinematic palette, section reorder, ProjectCard name→impact→tags→image hierarchy, stack-tag rendering — Phase 3.
- Scroll/entrance animations — Phase 4.
- Contentful Image API (webp/size) + named asset lookup — Phase 5.
- Dedicated on-page Skills section — Phase 3 layout.
- `teachingBio` field hard-removal from the content model — optional later.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Hero copy rewritten — specific role claim with proof of shipping | CMA: add `heroTagline` Symbol field to `personalWebsite` content type; update `LandingPage.jsx` to receive and render it as a prop |
| CONT-02 | Freelance Software Engineer role added to Experiences (Aug 2025–Present) with bullets | CMA: POST new `experience` entry with markdown `- ` bullets in `description` field; link into `personalWebsite.experiences` array |
| CONT-03 | Risktec Software Engineer role added to Experiences (Sep 2024–Aug 2025) with bullets | Same CMA pattern as CONT-02 |
| CONT-04 | Gist AI project updated — new description, stack tags, fresh screenshot, working live link | CMA: PUT to existing `project` entry; upload new thumbnail asset via CMA |
| CONT-05 | Music School SaaS added as lead project card | CMA: POST new `project` entry with outcome-first description; upload thumbnail asset |
| CONT-06 | SongScope real card (not placeholder) | CMA: PUT to existing SongScope `project` entry; update description, technologies, demo URL |
| CONT-07 | Wild Oasis and My Frontend Lib removed from Contentful and site | CMA: unpublish + DELETE both `project` entries; PUT `personalWebsite.projects` array without those two links |
| CONT-08 | Skills updated with AWS, React Native, AI/ML, Docker/CI/CD tooling | CMA: PUT `personalWebsite` entry with new `skills` array value |
| DSGN-05 | Teaching section retired; Piano Teacher folds into Experiences | CMA: POST Piano Teacher `experience` entry; `src/App.jsx`: remove `<Teaching />` from JSX layout |
| MUSC-01 | Music section updated with EP "Why We're Living" and Spotify link | CMA: PUT `personalWebsite.musicBio` field; upload EP artwork asset; link into entry |
| MUSC-02 | Existing performance photos kept | No CMA change required — `pictures` array untouched |

</phase_requirements>

---

## Summary

Phase 2 is a content-replacement phase. Roughly 90% of its effort is Contentful Management API (CMA) write operations — every change to the live site must flow through a CMA curl call and be published. The remaining 10% is minimal code edits: adding ReactMarkdown to `Experiences.jsx`, wiring a new `heroTagline` prop through `App.jsx` → `LandingPage.jsx`, and removing `<Teaching />` from the layout.

The linchpin unknown was the CMA write path — this repo has only ever read from Contentful via the CDN. That path is now fully documented below with exact REST recipes. The key mechanics are: (1) every PUT requires `X-Contentful-Version` populated from the current resource's `sys.version`; (2) content types use `/activated`, entries use `/published`; (3) asset upload goes to `upload.contentful.com` (different hostname from the management API); (4) the full entry body must always be sent on PUT — Contentful does not merge partial updates; (5) removing a project from the site means both deleting the entry AND removing it from the `personalWebsite.projects` link array.

**Primary recommendation:** Follow the wave structure: Wave 0 writes the CONTENT-DRAFT.md and awaits Antoni's approval. Wave 1 does content type schema change (heroTagline field). Wave 2 makes all CMA entry/asset writes. Wave 3 makes the three JSX code changes. This order ensures CMA writes precede code changes so the CDN data is already live when the code lands.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Content storage (text, images, links) | Contentful CMS | — | Single source of truth; all content managed via CMA |
| Content delivery to browser | Contentful CDN (`cdn.contentful.com`) | — | CDN serves only published content; code reads this at page load |
| Hero tagline | Contentful CMS field | React (LandingPage.jsx prop) | Currently hardcoded in JSX — Phase 2 moves it to CMS per project rules |
| Experience bullets rendering | React (Experiences.jsx) | Contentful CMS (description field) | CMS stores markdown; React renders via ReactMarkdown |
| Project card rendering | React (ProjectCard.jsx) | Contentful CMS | Already correct; same pattern extended to experiences |
| Teaching section removal | React (App.jsx) | Contentful CMS | DOM-level: remove JSX tag; data stays in CMS but stops rendering |
| Image/asset delivery | Contentful asset CDN (`images.ctfassets.net`) | — | Assets served from Contentful CDN after upload + publish |
| Skills display | React (SkillsDropdown.jsx) | Contentful CMS | Values updated in CMS; component unchanged (D-10) |

---

## Standard Stack

### Core (no new installs — all already present)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `react-markdown` | 9.0.1 | Render markdown `- ` bullets in Experiences.jsx | Already installed, used in ProjectCard.jsx — reuse the same pattern |
| `axios` | 1.7.2 | CDN read path (unchanged) | Already the data layer; no changes here |
| Contentful CMA REST | — | All CMA writes via `curl` (no SDK) | CMA token only lives in `.claude/settings.local.json`; curl is already permitted there |

**No new npm installs required for Phase 2.** `react-markdown` 9.0.1 is already a dependency and already used in `ProjectCard.jsx`. The CMA work is all curl commands, not Node.js code.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Raw curl CMA calls | `contentful-management` npm SDK | SDK adds a dependency and requires the CMA token to be in Node code at runtime; curl keeps the token out of any build artifact and works from Bash directly |
| Markdown bullets in `description` | A new Array field for bullets | Schema change is out of scope (D-06); markdown in Text field achieves the same render without a content model migration |

**Installation:** No new packages needed.

---

## Package Legitimacy Audit

> This phase installs no new external packages. All libraries used (react-markdown, axios) are already installed and verified in production.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| react-markdown | npm | 10+ yrs | ~5M/wk | github.com/remarkjs/react-markdown | [OK] | Approved — already installed |
| axios | npm | 12+ yrs | ~50M/wk | github.com/axios/axios | [OK] | Approved — already installed |
| howler | npm | 10+ yrs | ~1M/wk | github.com/goldfire/howler.js | [OK] | Approved — already installed |
| wavesurfer.js | npm | 10+ yrs | ~600K/wk | github.com/katspaugh/wavesurfer.js | [OK] | Approved — already installed |

**Packages removed due to [SLOP]:** none
**Packages flagged [SUS]:** none

---

## Architecture Patterns

### System Architecture Diagram

```
Browser (page load)
        |
        v
cdn.contentful.com/spaces/0mufjfcbiiue/entries
  ?content_type=personalWebsite&include=10
        |
        | JSON response: item + includes.Asset + includes.Entry
        v
src/contentful.js (getContentfulData)
  resolves links: experiences, projects, assets, audioClips
        |
        v
src/App.jsx
  passes resolved data as props to all section components
        |
        +---> LandingPage.jsx (name, profileImage, backgrounds, heroTagline [NEW])
        +---> Experiences.jsx (experiences[] — now ReactMarkdown rendered)
        +---> Projects.jsx (projects[] — Music School SaaS, SongScope, Gist AI only)
        +---> Music.jsx (musicBio, pictures, audioClips)
        +---> Teaching [REMOVED from layout — DSGN-05]
        +---> ContactMe.jsx
        
CMA write path (executor only, never browser):
  curl -> api.contentful.com (entries, content types)
  curl -> upload.contentful.com (binary file upload)
         |
         v (after publish)
  cdn.contentful.com serves updated published content
```

### Recommended Project Structure

No new directories needed. All changes touch existing files:

```
src/
├── App.jsx                    # Remove <Teaching />; pass heroTagline to LandingPage
├── components/
│   ├── LandingPage.jsx        # Accept heroTagline prop; replace hardcoded string
│   └── Experiences.jsx        # Add ReactMarkdown render for description field
contentful/
├── thumbnails/                # Drop new image files here before executor runs
│   ├── MusicSchool_Thumbnail.png     [NEEDED]
│   ├── SongScope_Thumbnail.png       [NEEDED]
│   └── GistAI_Thumbnail_New.png      [NEEDED]
└── ep-artwork/
    └── why-we-are-living.jpg         [NEEDED]
.planning/phases/02-content-overhaul/
└── CONTENT-DRAFT.md           # All copy drafts; approval checkpoint before CMA writes
```

### Pattern 1: CMA Read-Modify-Write (the universal update pattern)

**What:** GET the current resource to capture `sys.version`, modify in memory, PUT the full body with `X-Contentful-Version` header.
**When to use:** Every CMA PUT — entries, content types, assets, link arrays.

```bash
# Source: https://www.contentful.com/developers/docs/references/content-management-api/
# Step 1: GET current version
ENTRY=$(curl -s "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/entries/ENTRY_ID" \
  -H "Authorization: Bearer $CMA_TOKEN")
VERSION=$(echo "$ENTRY" | python3 -m json.tool | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['sys']['version'])")

# Step 2: PUT with full body and version
curl -X PUT "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/entries/ENTRY_ID" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "Content-Type: application/vnd.contentful.management.v1+json" \
  -H "X-Contentful-Version: $VERSION" \
  -d '{"fields": { ... full fields body ... }}'
```

**CRITICAL:** Contentful does NOT merge partial updates. Always include ALL existing fields in the PUT body or they will be erased. [VERIFIED: contentful.com/developers/docs]

### Pattern 2: Create + Publish a New Entry

```bash
# Source: https://www.contentful.com/developers/docs/references/content-management-api/

# Step 1: Create (draft) — POST returns the new entry with its ID
NEW_ENTRY=$(curl -s -X POST \
  "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/entries" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "Content-Type: application/vnd.contentful.management.v1+json" \
  -H "X-Contentful-Content-Type: experience" \
  -d '{
    "fields": {
      "title":       {"en-US": "Freelance Software Engineer"},
      "company":     {"en-US": "Self-Employed"},
      "description": {"en-US": "- Built a multi-tenant SaaS billing system...\n- Implemented Stripe Connect..."},
      "startDate":   {"en-US": "2025-08-01"},
      "isOngoing":   {"en-US": true}
    }
  }')

NEW_ENTRY_ID=$(echo "$NEW_ENTRY" | python3 -c "import sys,json; print(json.load(sys.stdin)['sys']['id'])")
VERSION=$(echo "$NEW_ENTRY" | python3 -c "import sys,json; print(json.load(sys.stdin)['sys']['version'])")

# Step 2: Publish
curl -X PUT \
  "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/entries/$NEW_ENTRY_ID/published" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "Content-Type: application/vnd.contentful.management.v1+json" \
  -H "X-Contentful-Version: $VERSION"
```

### Pattern 3: Delete an Entry (Unlink → Unpublish → Delete)

Order matters. Deleting before unlinking leaves a broken link reference in the `personalWebsite` entry that shows as an error in CDN responses. [VERIFIED: contentful.com/developers/docs/concepts/links]

```bash
# Source: https://www.contentful.com/developers/docs/references/content-management-api/

# Step 1: Remove the link from personalWebsite.projects FIRST
# (GET personalWebsite entry, filter out the target ID from projects array, PUT the result)

# Step 2: Unpublish the entry
ENTRY=$(curl -s "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/entries/ENTRY_ID" \
  -H "Authorization: Bearer $CMA_TOKEN")
VERSION=$(echo "$ENTRY" | python3 -c "import sys,json; print(json.load(sys.stdin)['sys']['version'])")

curl -X DELETE \
  "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/entries/ENTRY_ID/published" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "X-Contentful-Version: $VERSION"

# Step 3: Delete the entry (version no longer required for DELETE)
curl -X DELETE \
  "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/entries/ENTRY_ID" \
  -H "Authorization: Bearer $CMA_TOKEN"
```

### Pattern 4: Add a Field to a Content Type

Content types use `/activated` (not `/published`) for the activation step. [VERIFIED: contentful.com/developers/docs]

```bash
# Source: https://www.contentful.com/developers/docs/references/content-management-api/

# Step 1: GET current content type to see all existing fields + version
CT=$(curl -s "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/content_types/personalWebsite" \
  -H "Authorization: Bearer $CMA_TOKEN")
CT_VERSION=$(echo "$CT" | python3 -c "import sys,json; print(json.load(sys.stdin)['sys']['version'])")

# Step 2: PUT with ALL existing fields PLUS the new field
# (Must include all existing field definitions — not just the new one)
curl -X PUT \
  "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/content_types/personalWebsite" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "Content-Type: application/vnd.contentful.management.v1+json" \
  -H "X-Contentful-Version: $CT_VERSION" \
  -d '{
    "name": "Personal Website",
    "displayField": "name",
    "fields": [
      ... all existing fields ...,
      {
        "id": "heroTagline",
        "name": "Hero Tagline",
        "type": "Symbol",
        "required": false,
        "localized": false
      }
    ]
  }'

# Step 3: Activate the content type (uses /activated, not /published)
NEW_CT_VERSION=$((CT_VERSION + 1))
curl -X PUT \
  "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/content_types/personalWebsite/activated" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "Content-Type: application/vnd.contentful.management.v1+json" \
  -H "X-Contentful-Version: $NEW_CT_VERSION"
```

**If you skip activation:** The new field exists in the model but CDN consumers cannot see entries that use it, and validations on it are not enforced. The hero tagline will never appear on the live site. [VERIFIED: contentful.com/developers/docs]

### Pattern 5: Asset Upload Lifecycle (5 steps)

Two distinct hostnames are involved. The binary upload goes to `upload.contentful.com`. Everything else goes to `api.contentful.com`. [VERIFIED: contentful.com/developers/docs + github.com/ivo-toby/contentful-skill]

```bash
# Source: https://www.contentful.com/developers/docs/references/content-management-api/
#         https://github.com/ivo-toby/contentful-skill/blob/main/references/content-management/assets.md

# Step 1: Upload binary to upload.contentful.com (NOTE: different hostname)
UPLOAD=$(curl -s -X POST \
  "https://upload.contentful.com/spaces/0mufjfcbiiue/uploads" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "Content-Type: application/octet-stream" \
  --data-binary @contentful/thumbnails/MusicSchool_Thumbnail.png)

UPLOAD_ID=$(echo "$UPLOAD" | python3 -c "import sys,json; print(json.load(sys.stdin)['sys']['id'])")

# Step 2: Create the asset record, referencing the upload via uploadFrom link
ASSET=$(curl -s -X POST \
  "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/assets" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "Content-Type: application/vnd.contentful.management.v1+json" \
  -d "{
    \"fields\": {
      \"title\": {\"en-US\": \"Music School SaaS Thumbnail\"},
      \"file\": {
        \"en-US\": {
          \"contentType\": \"image/png\",
          \"fileName\": \"MusicSchool_Thumbnail.png\",
          \"uploadFrom\": {
            \"sys\": {
              \"type\": \"Link\",
              \"linkType\": \"Upload\",
              \"id\": \"$UPLOAD_ID\"
            }
          }
        }
      }
    }
  }")

ASSET_ID=$(echo "$ASSET" | python3 -c "import sys,json; print(json.load(sys.stdin)['sys']['id'])")
ASSET_VERSION=$(echo "$ASSET" | python3 -c "import sys,json; print(json.load(sys.stdin)['sys']['version'])")

# Step 3: Trigger processing for the en-US locale
curl -X PUT \
  "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/assets/$ASSET_ID/files/en-US/process" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "X-Contentful-Version: $ASSET_VERSION"

# Step 4: Poll until processed (url field appears in response)
# Poll: GET asset, check fields.file.en-US.url exists
# Typically takes 2-10 seconds. Poll every 2 seconds, max 30 seconds.
for i in $(seq 1 15); do
  ASSET_DATA=$(curl -s "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/assets/$ASSET_ID" \
    -H "Authorization: Bearer $CMA_TOKEN")
  URL=$(echo "$ASSET_DATA" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('fields',{}).get('file',{}).get('en-US',{}).get('url',''))" 2>/dev/null)
  if [ -n "$URL" ]; then echo "Asset processed: $URL"; break; fi
  sleep 2
done

FINAL_VERSION=$(echo "$ASSET_DATA" | python3 -c "import sys,json; print(json.load(sys.stdin)['sys']['version'])")

# Step 5: Publish the asset
curl -X PUT \
  "https://api.contentful.com/spaces/0mufjfcbiiue/environments/master/assets/$ASSET_ID/published" \
  -H "Authorization: Bearer $CMA_TOKEN" \
  -H "X-Contentful-Version: $FINAL_VERSION"
```

### Pattern 6: ReactMarkdown in Experiences.jsx

Mirror the existing `ProjectCard.jsx` `customRenderer` pattern exactly. No new dependencies. [VERIFIED: codebase grep of src/components/ProjectCard.jsx]

```jsx
// Source: src/components/ProjectCard.jsx (existing pattern)
import ReactMarkdown from "react-markdown";

// Add to Experiences.jsx inside the sortedExperiences.map():
const customRenderer = {
  a: ({ node, ...props }) => (
    <a
      {...props}
      className="text-sky-400 hover:text-sky-600 transition-colors duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside mt-2 space-y-1" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li className="text-gray-700" {...props} />
  ),
};

// Replace the existing <p> plain-text render:
// BEFORE: <p className="mt-4 text-gray-700">{experience.fields.description}</p>
// AFTER:
{experience.fields.description && (
  <div className="mt-4">
    <ReactMarkdown components={customRenderer}>
      {experience.fields.description}
    </ReactMarkdown>
  </div>
)}
```

The `components` prop (not `renderers` — that was the pre-v6 API) maps HTML tag names to React functions. In react-markdown v9, `- item` markdown renders as `ul > li` elements. Custom `ul` and `li` handlers control the Tailwind styling. [VERIFIED: npm registry react-markdown@9.0.1, singlehanded.dev/blog]

### Pattern 7: heroTagline wiring through App.jsx → LandingPage.jsx

```jsx
// src/App.jsx — add heroTagline to LandingPage props
<LandingPage
  name={data.fields.name}
  profileImage={data.fields.profileImage}
  backgrounds={data.fields.backgrounds}
  heroTagline={data.fields.heroTagline}  // NEW — reads new Contentful field
/>

// src/components/LandingPage.jsx — accept prop, replace hardcoded line
function LandingPage({ name, profileImage, backgrounds, heroTagline }) {
  // ...existing code...
  <p className="text-xl mb-8 text-center text-off-white">
    {heroTagline || "Full-stack engineer who ships production software."}
  </p>
  // Fallback prevents blank hero if field is missing during deploy window
}
```

### Anti-Patterns to Avoid

- **Partial PUT body:** Never PUT an entry or content type with only the changed fields. Contentful replaces the full resource — omitted fields are deleted. Always GET first, mutate in memory, PUT the complete body.
- **Publish before process (assets):** Publishing an asset before the processing step completes will succeed but the CDN URL will be absent — the image will be a broken reference in all entries that link to it. Always poll for the URL field before publishing.
- **Delete before unlink:** Deleting an entry that is still referenced in `personalWebsite.projects` will leave an unresolvable link. The CDN response will include an `errors` array with `notResolvable` entries — the CDN resolver in `contentful.js` (`entries.find(...)`) returns `undefined`, causing the component to crash on `project.fields`.
- **Activate vs publish confusion:** Content type changes require PUT to `/activated`. Entry changes require PUT to `/published`. Using `/published` on a content type silently fails on older API versions; using `/activated` on an entry also silently fails.
- **Wrong upload hostname:** The binary file upload goes to `upload.contentful.com` (not `api.contentful.com`). Using the wrong hostname returns a 404 with no useful error message.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown bullet rendering | Custom string parser, `split('\n')`, regex | `react-markdown` (already installed) | Handles nested lists, escaped chars, links in bullets — edge cases in hand-rolled parsers are endless |
| Asset URL construction | String-interpolate Contentful CDN path | Let Contentful processing populate `fields.file.url` | Processing determines the final URL; guessing the path produces broken links |
| Optimistic lock version tracking | Maintain version in a separate variable across calls | Always re-GET before updating | A GET between operations ensures you have the authoritative current version — in-memory tracking drifts if any other write (manual CMS edit, another curl) happens between calls |

**Key insight:** The CMA's optimistic-locking model (version header) is designed to prevent silent data loss. Embrace it — always GET then PUT rather than caching versions.

---

## Runtime State Inventory

> This phase modifies live Contentful CMS content. The following inventory covers CMS state relevant to removals and renames.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data (Contentful entries) | Wild Oasis `project` entry; My Frontend Lib `project` entry — both currently published and linked in `personalWebsite.projects` | Unlink from `personalWebsite.projects` array → unpublish → delete both entries |
| Stored data (Contentful entry fields) | `personalWebsite` entry has no `heroTagline` field yet | Add field to content type first (activate), then set value on the entry |
| Stored data (personalWebsite link arrays) | `personalWebsite.experiences` currently has existing experience entries; `personalWebsite.projects` has Wild Oasis + My Frontend Lib links | PUT full updated arrays (remove deleted, add new) |
| Live service config (Contentful content model) | `personalWebsite` content type does not have `heroTagline` field | CMA PUT to add field + PUT to `/activated` |
| OS-registered state | None — no task scheduler, pm2, or launchd involvement | None |
| Secrets/env vars | CMA token lives in `.claude/settings.local.json` only; not in `.env`; not in any source file | Read at execution time only; never commit |
| Build artifacts | No stale build artifacts affected by content changes (static build fetches content at page load, not build time) | None — `npm run build` re-fetches at each deploy |

**Important re: `teachingBio`:** The `teachingBio` field in `personalWebsite` is left in the content model (D-17 deferred). The only change is removing `<Teaching />` from `src/App.jsx` — no data migration or field deletion.

---

## Common Pitfalls

### Pitfall 1: Version Mismatch (409 Conflict)

**What goes wrong:** CMA returns HTTP 409 Conflict with body `{"message": "Version mismatch"}`.
**Why it happens:** A concurrent edit (manual Contentful web UI, another curl session) incremented `sys.version` between your GET and your PUT.
**How to avoid:** Always GET immediately before the PUT in the same script block. If you get a 409, re-GET to capture the new version and retry the PUT with the updated body.
**Warning signs:** 409 status code; message body contains "version" or "conflict".

### Pitfall 2: Broken Links After Deletion (CDN returns errors array)

**What goes wrong:** After deleting Wild Oasis/My Frontend Lib entries, the CDN response includes an `errors` array with `notResolvable` items. `contentful.js` line 67 runs `entries.find((entry) => entry.sys.id === projectLink.sys.id)` which returns `undefined`. `ProjectCard.jsx` then does `project.fields.title` → TypeError crash.
**Why it happens:** The link reference in `personalWebsite.projects` still points to the deleted entry ID.
**How to avoid:** Remove the deleted entry's link from `personalWebsite.projects` BEFORE deleting the entry. Order: unlink → unpublish → delete.
**Warning signs:** CDN response body has `"errors": [{"sys": {"id": "notResolvable"}}]`.

### Pitfall 3: Asset Not Processed Before Publish

**What goes wrong:** Image appears in Contentful web UI but `fields.file.url` is absent in CDN response. `resolveAsset()` returns the asset object but `asset.fields.file.url` is undefined. The `<img src={undefined}>` renders as a broken image.
**Why it happens:** Published an asset before Contentful finished processing the upload (generating the CDN URL and image dimensions).
**How to avoid:** Poll `GET /assets/{id}` until `fields.file['en-US'].url` is populated (a non-empty string). Only then PUT to `/published`.
**Warning signs:** No `url` key in `fields.file['en-US']`; `details.size` may be present but `url` absent.

### Pitfall 4: Content Type Activated But Entry Not Re-Published

**What goes wrong:** New `heroTagline` field exists in the content type (activated), `heroTagline` value is set on the `personalWebsite` entry, but the field doesn't appear in CDN responses.
**Why it happens:** The `personalWebsite` entry was last published before the field was added. The CDN serves the last-published snapshot, which predates the new field.
**How to avoid:** After adding and activating the `heroTagline` field on the content type AND setting the value on the entry, publish the entry again so the CDN snapshot includes the new field value.
**Warning signs:** CMA GET of the entry shows `heroTagline` in `fields`, but CDN GET does not.

### Pitfall 5: Rate Limiting (429 Too Many Requests)

**What goes wrong:** CMA returns HTTP 429. Subsequent retries in rapid succession continue to fail.
**Why it happens:** Default CMA rate limit is 7 requests/second. Asset upload workflow (5 steps) + link-array update + entry publish can easily exceed this in a tight loop.
**How to avoid:** Add `sleep 1` between CMA calls in the executor scripts. If a 429 is received, check the `X-Contentful-RateLimit-Reset` header (value is seconds until reset, typically 1) and sleep that long before retrying.
**Warning signs:** HTTP 429; `X-Contentful-RateLimit-Reset: 1` in response headers.

### Pitfall 6: Missing Image Files at Asset-Upload Task Time

**What goes wrong:** Asset upload task runs before Antoni drops the required image files into `contentful/`. The `--data-binary @contentful/thumbnails/MusicSchool_Thumbnail.png` curl command fails with "No such file or directory".
**Why it happens:** D-05 makes asset upload tasks dependent on human delivery of image files.
**How to avoid:** The plan must include an explicit `checkpoint:human-verify` gate before each asset upload task, listing exactly which file must exist at which path. Do not proceed past the checkpoint until verified.
**Warning signs:** curl exits with code 26 ("Read error"); task fails immediately without HTTP response.

---

## SongScope Card Synthesis

Sourced from: `HANDOFF_DEPLOY.md §7`, `CURRENT_STATE.md`, `CONCEPTS.md`, `INTERVIEW_PREP_SONGSCOPE.md`. [VERIFIED: codebase reads]

**Outcome-first one-liner (card headline):**
> "Led the full-stack build of a music-discovery engine that learns your taste from Spotify history and explains every recommendation — live in demo mode."

**Card description (Contentful `description` field, markdown):**

```
SongScope recommends a personalized "Daily Gem" track from a user's Spotify listening history and explains why it was picked. The backend runs a hybrid ML engine: cosine similarity scores genre fit, a Gaussian novelty curve avoids both mainstream and obscure tracks, and a Thompson Sampling multi-armed bandit decides which of four candidate-generation sources to trust per user. A closed feedback loop (like/dislike) updates each user's taste vector via online SGD, and free-text feedback is interpreted by OpenAI gpt-4o-mini into structured taste signals.

- Django 5.1 + DRF backend; Next.js 14 frontend (TypeScript, Recharts, shadcn/ui)
- Spotify OAuth; PostgreSQL on Render; Netlify frontend
- Demo mode: single seeded Spotify account — production tailors per-user

[Live demo](https://songscope-demo.netlify.app) — demo connected to one Spotify account / one person's listening history; production tailors per-user.
```

**`technologies` array:** `Django`, `Next.js 14`, `TypeScript`, `PostgreSQL`, `Spotify API`, `OpenAI`, `Python`, `Recharts`, `React`

**`projectUrl`:** `https://songscope-demo.netlify.app`

---

## Link Shape Conformance

The existing `src/contentful.js` resolver expects:

1. **In the CDN response top-level `items[0].fields.*`:** Array fields (`experiences`, `projects`, `audioClips`, `pictures`, `backgrounds`) contain link stub objects:
   ```json
   {"sys": {"type": "Link", "linkType": "Entry", "id": "abc123"}}
   ```
   These are resolved by matching `entry.sys.id === link.sys.id` from `response.data.includes.Entry`.

2. **Asset links** (`thumbnail`, `avatar`, `audioFile`, `backgrounds[n]`, `pictures[n]`) are the same shape with `"linkType": "Asset"`, resolved from `response.data.includes.Asset`.

3. **When writing new entries via CMA:** Set field values in the locale-keyed format:
   ```json
   {"en-US": {"sys": {"type": "Link", "linkType": "Entry", "id": "target-entry-id"}}}
   ```
   The CMA stores the locale-keyed link; the CDN delivers the unwrapped link stub in `items[0].fields.*`.

4. **Default locale is `en-US`** — confirmed by existing CMA curl in `settings.local.json` which returns all fields under `en-US` keys. All new entries must use `"en-US"` as the locale key. [VERIFIED: existing CMA call in settings.local.json, CDN response structure in contentful.js]

5. **`include: 10`** in `getContentfulData()` means the CDN response resolves up to 10 levels of linked entries/assets in `response.data.includes`. New entries linked from `personalWebsite` will be resolvable without any code change to `contentful.js`.

---

## Code Examples

### Verified: How contentful.js resolves projects (line 66-73)

```javascript
// Source: src/contentful.js:66-73 (verified via Read tool)
if (item.fields.projects) {
  item.fields.projects = item.fields.projects.map((projectLink) => {
    const project = entries.find(
      (entry) => entry.sys.id === projectLink.sys.id
    );
    if (project && project.fields.thumbnail) {
      project.fields.thumbnail = resolveAsset(project.fields.thumbnail);
    }
    return project;
  });
}
```

New `project` entries added to `personalWebsite.projects` link array will be resolved by this existing code with zero changes — as long as they are published and the `include: 10` depth covers them.

### Verified: How App.jsx passes data to Teaching (to be removed)

```jsx
// Source: src/App.jsx:66-69 (verified via Read tool)
<Teaching
  pictures={data.fields.pictures}
  bio={data.fields.teachingBio}
/>
```

Phase 2 removes these 4 lines. The `import Teaching from "./components/Teaching"` import on line 8 should also be removed to avoid ESLint warnings (unused import), even though the file itself is kept.

### Verified: Existing skills field rendering target

```jsx
// Source: src/App.jsx:42 (verified via Read tool)
<NavBar avatar={data.fields.avatar} skills={data.fields.skills} />
```

`data.fields.skills` is passed directly to `NavBar` → `SkillsDropdown`. Updating the `skills` array in Contentful and re-publishing `personalWebsite` is all that is needed for CONT-08 — no component changes.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `renderers` prop in react-markdown | `components` prop | react-markdown v6 (2021) | Old syntax still appears in tutorials — must use `components`, not `renderers` |
| POST to `/spaces/{id}/uploads` | POST to `upload.contentful.com/spaces/{id}/uploads` | Contentful upload API (2017+) | Wrong hostname is the #1 asset upload error; management API hostname does not handle binary uploads |
| Content type "publish" | Content type "activate" (`/activated`) | Contentful terminology | Entries are "published"; content types are "activated" — wrong endpoint returns 404 or 405 |

**Deprecated/outdated:**
- `renderers` prop in react-markdown: replaced by `components` in v6. Using `renderers` in v9 silently does nothing.
- Direct URL construction for Contentful assets: asset URL comes from `fields.file.url` after processing; do not construct it manually.

---

## Open Questions

1. **Which existing experience entries are currently in `personalWebsite.experiences`?**
   - What we know: The CDN fetch returns `item.fields.experiences` as a resolved array. There is at least one existing entry (possibly "Piano Teacher" / teaching bio content).
   - What's unclear: The exact entry IDs and how many experience entries already exist. The executor must GET `personalWebsite` to inspect the current state before writing.
   - Recommendation: First task in Wave 2 should be a GET of the `personalWebsite` entry and all linked experiences to produce an inventory.

2. **What are the entry IDs for Wild Oasis and My Frontend Lib `project` entries?**
   - What we know: They have been deleted from Contentful per STATE.md: "Contentful projects: [Gist AI, SongScope]; Wild Oasis + My Frontend Lib deleted".
   - What's unclear: STATE.md says they were deleted in Plan 03. If true, CONT-07 may already be partially or fully complete. The executor must verify via CDN or CMA GET before attempting deletion.
   - Recommendation: Wave 1 verification step should confirm current Contentful project set before writing.

3. **SongScope `project` entry: does it already exist in Contentful from Plan 03?**
   - What we know: STATE.md says "SongScope... carded beside Gist AI" and ROADMAP.md says it was a placeholder card published in Plan 03.
   - What's unclear: The entry ID and which fields are already populated.
   - Recommendation: GET the existing SongScope entry to see current field values; CONT-06 is an update (PUT), not a create (POST).

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `curl` | CMA write operations | ✓ | (macOS built-in) | None needed |
| `python3` (json.tool + one-liners) | Parsing CMA JSON responses in bash | ✓ | 3.11 (Anaconda) | `jq` if installed; or manual copy from curl output |
| Node.js | Vite dev server, build | ✓ | v21.7.1 | — |
| npm | Package management | ✓ | 10.5.0 | — |
| Contentful CMA token | All CMA writes | ✓ (in .claude/settings.local.json) | — | No fallback — required |
| Image files for new thumbnails | Asset upload tasks (D-05) | Partially (GistAI_Thumbnail.png, WildOasis_Thumbnail.png exist; others missing) | — | Block — cannot proceed without files |

**Missing dependencies with no fallback:**
- `contentful/thumbnails/MusicSchool_Thumbnail.png` — blocks Music School SaaS asset upload task
- `contentful/thumbnails/SongScope_Thumbnail.png` — blocks SongScope thumbnail update task
- `contentful/thumbnails/GistAI_Thumbnail_New.png` — blocks Gist AI screenshot update (existing `GistAI_Thumbnail.png` is the old one; D-04/CONT-04 requires a fresh screenshot)
- EP artwork image for "Why We're Living" — blocks MUSC-01 asset upload task

**Missing dependencies with fallback:**
- None

---

## Validation Architecture

### How to verify each Phase 2 success criterion

**SC-1: Hero has proof-led copy, no generic language**

```bash
# Verify heroTagline field exists and is published in the CDN response
curl -s "https://cdn.contentful.com/spaces/0mufjfcbiiue/environments/master/entries?content_type=personalWebsite&limit=1" \
  -H "Authorization: Bearer $CDN_TOKEN" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['items'][0]['fields'].get('heroTagline','MISSING'))"
# Expected: the proof-led tagline string; fail if MISSING or contains "passionate"
```

Render check: `npm run dev`, navigate to hero — confirm the `<p>` tag content matches the approved tagline and does not contain "passionate about creating".

**SC-2: Experiences section lists Freelance and Risktec with bullets**

```bash
# CDN: confirm both experience entries are in the includes.Entry and linked from personalWebsite.experiences
curl -s "https://cdn.contentful.com/spaces/0mufjfcbiiue/environments/master/entries?content_type=personalWebsite&limit=1&include=5" \
  -H "Authorization: Bearer $CDN_TOKEN" \
  | python3 -c "
import sys,json
d=json.load(sys.stdin)
exps=d['items'][0]['fields']['experiences']
entries=d['includes']['Entry']
for link in exps:
  e=next((x for x in entries if x['sys']['id']==link['sys']['id']),None)
  if e: print(e['fields'].get('title','?'), '|', e['fields'].get('company','?'))
"
# Expected output includes: Freelance Software Engineer | Self-Employed
#                            Risktec Software Engineer  | Risktec Solutions
```

Render check: `Experiences.jsx` now renders `ReactMarkdown` — confirm bullets appear as `<ul><li>` elements in browser DevTools, not as raw `- ` text.

**SC-3: Projects section shows only Music School SaaS, SongScope, Gist AI**

```bash
# CDN: confirm exactly 3 projects linked
curl -s "https://cdn.contentful.com/spaces/0mufjfcbiiue/environments/master/entries?content_type=personalWebsite&limit=1&include=5" \
  -H "Authorization: Bearer $CDN_TOKEN" \
  | python3 -c "
import sys,json
d=json.load(sys.stdin)
projects=d['items'][0]['fields']['projects']
entries=d['includes']['Entry']
for link in projects:
  e=next((x for x in entries if x['sys']['id']==link['sys']['id']),None)
  if e: print(e['fields'].get('title','?'))
"
# Expected: 3 lines — no Wild Oasis, no My Frontend Lib
# Wild Oasis / My Frontend Lib absent = PASS

# Also verify no "notResolvable" errors in CDN response
# (broken links from incomplete deletion)
```

**SC-4: Skills include AWS, React Native, AI/ML, Docker tooling**

```bash
curl -s "https://cdn.contentful.com/spaces/0mufjfcbiiue/environments/master/entries?content_type=personalWebsite&limit=1" \
  -H "Authorization: Bearer $CDN_TOKEN" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['items'][0]['fields']['skills'])"
# Expected: list containing 'AWS Cloud Practitioner', 'React Native', 'Docker', etc.
```

**SC-5: Music section shows EP; Teaching section absent**

```bash
# Verify musicBio updated
curl -s "https://cdn.contentful.com/spaces/0mufjfcbiiue/environments/master/entries?content_type=personalWebsite&limit=1" \
  -H "Authorization: Bearer $CDN_TOKEN" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['items'][0]['fields'].get('musicBio','MISSING'))"
# Expected: contains "Why We're Living" and Spotify album URL
```

DOM check: inspect rendered HTML — confirm no element with `id="teaching"` or `<Teaching />` content in page source. Check `src/App.jsx` does not import or render `<Teaching />`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None configured — no jest.config.*, vitest.config.*, or test files detected |
| Config file | none |
| Quick run command | `npm run dev` + manual browser inspection |
| Full suite command | N/A |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | heroTagline field in CDN response | smoke | `curl cdn + python3 grep` (see above) | ❌ Wave 0: write verify script |
| CONT-02 | Freelance experience in CDN | smoke | `curl cdn + python3 grep` | ❌ Wave 0: write verify script |
| CONT-03 | Risktec experience in CDN | smoke | `curl cdn + python3 grep` | ❌ Wave 0: write verify script |
| CONT-04 | Gist AI entry updated | smoke | `curl cdn + python3 grep` | ❌ Wave 0: write verify script |
| CONT-05 | Music School SaaS in CDN projects | smoke | `curl cdn + python3 grep` | ❌ Wave 0: write verify script |
| CONT-06 | SongScope real card in CDN | smoke | `curl cdn + python3 grep` | ❌ Wave 0: write verify script |
| CONT-07 | Wild Oasis / Frontend Lib absent | smoke | `curl cdn + python3 grep (count=3)` | ❌ Wave 0: write verify script |
| CONT-08 | Skills array updated | smoke | `curl cdn + python3 print` | ❌ Wave 0: write verify script |
| DSGN-05 | Teaching absent from DOM | manual | Browser DevTools / page source grep | ❌ Wave 0 |
| MUSC-01 | musicBio has EP info | smoke | `curl cdn + python3 grep` | ❌ Wave 0: write verify script |
| MUSC-02 | Performance photos unchanged | manual | Browser visual inspection | n/a |

### Sampling Rate

- **Per task commit:** `curl` verification of the specific CMA/CDN change just made
- **Per wave merge:** Full CDN verification script covering all requirements changed in that wave
- **Phase gate:** All 5 success criteria verified before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `.planning/phases/02-content-overhaul/verify-cdn.sh` — parameterized verification script running all CDN checks above
- [ ] `CONTENT-DRAFT.md` — all copy drafted and awaiting approval (D-18 checkpoint)

---

## Security Domain

> `security_enforcement` not explicitly set to `false` in config.json — treated as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No user login in this site |
| V3 Session Management | No | No sessions |
| V4 Access Control | Partial | CMA token must never reach browser (D-02); CDN token is read-only and intentionally client-visible |
| V5 Input Validation | No | No user input processed by this phase |
| V6 Cryptography | No | No crypto operations |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| CMA token exposure via commit | Information Disclosure | D-02: token in `.claude/settings.local.json` only (untracked); never in `.env`, source, or commit |
| CMA token exposure via build artifact | Information Disclosure | CMA writes are curl-only at execution time; token is never in any JS bundle |
| Unresolvable link crash (broken reference after delete) | Denial of Service (availability) | Always unlink before deleting; verify CDN response has no `errors` array |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Wild Oasis and My Frontend Lib project entries are already deleted in Contentful (per STATE.md "Contentful projects: [Gist AI, SongScope]; Wild Oasis + My Frontend Lib deleted") | Open Questions #2 | If they still exist, CONT-07 requires deletion steps that were assumed already complete — low risk because the executor verifies before writing |
| A2 | SongScope `project` entry already exists in Contentful from Plan 03 (placeholder card) | Open Questions #3 | If it does not exist, CONT-06 is a create (POST) not an update (PUT) — low risk, executor verifies |
| A3 | Default locale in this Contentful space is `en-US` | Link Shape Conformance | If it is a different locale code, all CMA writes with `"en-US"` keys will fail or create non-default-locale content — executor should confirm via the content type GET which has locale info |
| A4 | The `personalWebsite` content type id is literally `personalWebsite` (not a slug like `personal-website`) | CMA Pattern 4 | If wrong, the GET returns 404 — executor verifies with the content types list call that is already permitted in settings.local.json |

---

## Sources

### Primary (HIGH confidence)

- [Contentful CMA Reference](https://www.contentful.com/developers/docs/references/content-management-api/) — entry CRUD, content type activation, publish/unpublish, rate limits, X-Contentful-Version header, link shape
- [Contentful Links Concepts](https://www.contentful.com/developers/docs/concepts/links/) — link shape `sys.type/linkType/id`, unresolvable link error shape, include behavior
- [github.com/ivo-toby/contentful-skill](https://github.com/ivo-toby/contentful-skill/blob/main/references/content-management/assets.md) — asset upload lifecycle with `uploadFrom` link shape; upload.contentful.com hostname
- `src/contentful.js`, `src/components/ProjectCard.jsx`, `src/components/Experiences.jsx`, `src/App.jsx`, `src/components/LandingPage.jsx` — verified via direct Read; codebase state confirmed
- `.planning/phases/02-content-overhaul/02-CONTEXT.md` — all decisions D-01 through D-18 locked

### Secondary (MEDIUM confidence)

- [singlehanded.dev — react-markdown components prop](https://www.singlehanded.dev/blog/understanding-the-components-prop-in-react-markdown) — `ul`/`li`/`a`/`p` component key names and function signatures; cross-verified with react-markdown GitHub README
- [cloudapp.dev — Contentful REST management](https://www.cloudapp.dev/contentful-headless-cms-managing-content-via-rest) — endpoint structure, version header requirement

### Tertiary (LOW confidence)

- None — all material claims verified via official docs or codebase inspection

---

## Metadata

**Confidence breakdown:**

- CMA write path (REST recipes, headers, hostnames): HIGH — verified against official Contentful docs
- Link shape conformance: HIGH — verified against `src/contentful.js` resolver code and official links documentation
- ReactMarkdown pattern: HIGH — verified against installed version (9.0.1) and existing `ProjectCard.jsx` pattern
- Content type `heroTagline` field mechanics: HIGH — verified against official CMA reference
- Asset upload lifecycle: HIGH — verified against official docs and github.com/ivo-toby/contentful-skill reference
- SongScope card content: HIGH — synthesized from `HANDOFF_DEPLOY.md §7` and `CURRENT_STATE.md`
- Existing Contentful state (which entries exist): MEDIUM — inferred from STATE.md and ROADMAP.md; executor must verify before writing

**Research date:** 2026-06-20
**Valid until:** 2026-07-20 (Contentful CMA is stable; react-markdown API stable at v9)
