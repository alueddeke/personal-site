# Phase 2: Content Overhaul - Pattern Map

**Mapped:** 2026-06-20
**Files analyzed:** 4 source files (3 modified, 1 read-only reference)
**Analogs found:** 3 / 3 (all modified files have close analogs within the same codebase)

---

## Important: Phase Character

Roughly 90% of Phase 2's work is **Contentful Management API curl commands**, not application code. The three JSX edits are small and surgical. The planner should structure plans accordingly — CMA write tasks dominate; JSX tasks are each a handful of lines.

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/components/Experiences.jsx` | component | request-response (CDN → render) | `src/components/ProjectCard.jsx` | exact — same library (`react-markdown`), same `components` prop pattern, same Tailwind styling conventions |
| `src/components/LandingPage.jsx` | component | request-response (prop → render) | itself (line 3 signature) — plus how `App.jsx` wires all other section props | role-match — prop-threading pattern is identical to every other section component |
| `src/App.jsx` | root / orchestrator | request-response (Contentful → props) | itself — the existing `Teaching` block on lines 8, 66-69 is the exact code to remove | self-analog |
| `src/contentful.js` | data layer utility | request-response (CDN fetch + link resolution) | read-only reference — no modification; new entries must conform to its resolver shape | reference only |

---

## Pattern Assignments

### `src/components/Experiences.jsx` (component, request-response)

**Analog:** `src/components/ProjectCard.jsx`

**Current state** (lines 1, 44-46 of `Experiences.jsx`) — the plain-text render to replace:
```jsx
// src/components/Experiences.jsx:1
import React from "react";

// src/components/Experiences.jsx:44-46  ← REPLACE THIS BLOCK
{experience.fields.description && (
  <p className="mt-4 text-gray-700">
    {experience.fields.description}
  </p>
)}
```

**Import pattern to add** (from `ProjectCard.jsx` line 2):
```jsx
// src/components/ProjectCard.jsx:2
import ReactMarkdown from "react-markdown";
```

**Core ReactMarkdown pattern** (from `ProjectCard.jsx` lines 15-27 and 53-55):
```jsx
// src/components/ProjectCard.jsx:15-27 — customRenderer definition
const customRenderer = {
  a: ({ node, ...props }) => (
    <a
      {...props}
      className="text-sky-400 hover:text-sky-600 transition-colors duration-300"
      onClick={(e) => e.stopPropagation()}
      target="_blank"
      rel="noopener noreferrer"
    >
      here
    </a>
  ),
};

// src/components/ProjectCard.jsx:53-55 — usage
<ReactMarkdown components={customRenderer}>
  {project.fields.description}
</ReactMarkdown>
```

**Replacement block for `Experiences.jsx`** (adapt the above; add `ul` and `li` renderers for bullet lists since experience descriptions use `- ` markdown bullets, which ProjectCard does not currently need):
```jsx
// Place inside the sortedExperiences.map() callback, before the return/JSX
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

// Replace lines 44-46 with:
{experience.fields.description && (
  <div className="mt-4">
    <ReactMarkdown components={customRenderer}>
      {experience.fields.description}
    </ReactMarkdown>
  </div>
)}
```

**Key constraint:** Use `components` prop (not `renderers` — that was the pre-v6 API). react-markdown 9.0.1 silently ignores `renderers`.

---

### `src/components/LandingPage.jsx` (component, request-response)

**Analog:** `src/App.jsx` prop-threading pattern for all other section components; `LandingPage.jsx` itself

**Current function signature** (`LandingPage.jsx` line 3):
```jsx
// src/components/LandingPage.jsx:3
function LandingPage({ name, profileImage, backgrounds }) {
```

**Current hardcoded tagline** (`LandingPage.jsx` lines 30-33) — the line to replace:
```jsx
// src/components/LandingPage.jsx:30-33
<p className="text-xl mb-8 text-center text-off-white">
  I am a full stack Web Developer passionate about creating projects
  from end to end.
</p>
```

**How App.jsx passes props to other section components** (analog pattern from `App.jsx` lines 44-48, 56-65):
```jsx
// src/App.jsx:44-48 — LandingPage current call site (to be updated)
<LandingPage
  name={data.fields.name}
  profileImage={data.fields.profileImage}
  backgrounds={data.fields.backgrounds}
/>

// src/App.jsx:56-58 — Experiences pattern (same shape, different props)
<Experiences experiences={data.fields.experiences} />
```

**Target state for `App.jsx` call site** (add `heroTagline` prop):
```jsx
// src/App.jsx — updated LandingPage call site
<LandingPage
  name={data.fields.name}
  profileImage={data.fields.profileImage}
  backgrounds={data.fields.backgrounds}
  heroTagline={data.fields.heroTagline}
/>
```

**Target state for `LandingPage.jsx`** (updated signature + prop render with fallback):
```jsx
// src/components/LandingPage.jsx — updated signature (line 3)
function LandingPage({ name, profileImage, backgrounds, heroTagline }) {

// src/components/LandingPage.jsx — updated tagline render (lines 30-33)
<p className="text-xl mb-8 text-center text-off-white">
  {heroTagline || "Full-stack engineer who ships production software."}
</p>
```

The fallback string prevents a blank hero during the deploy window between JSX merge and Contentful publish. Optional chaining is the project's standard guard for missing Contentful fields (see `backgrounds?.[0]` pattern on `App.jsx` lines 73, 79).

---

### `src/App.jsx` — Teaching removal (orchestrator, request-response)

**Analog:** self — the Teaching block is the exact code to remove

**Lines to remove** (from `App.jsx`):
```jsx
// src/App.jsx:8 — import to remove
import Teaching from "./components/Teaching";

// src/App.jsx:66-69 — JSX block to remove
<Teaching
  pictures={data.fields.pictures}
  bio={data.fields.teachingBio}
/>
```

**Post-removal state of the relevant section of `App.jsx`** (lines 58-76 currently):
```jsx
// After removal, this region becomes:
<div id="music">
  <Music
    bio={data.fields.musicBio}
    pictures={data.fields.pictures}
    backgroundImage={data.fields.backgrounds?.[10]}
    audioClips={data.fields.audioClips}
  />
</div>
{/* Teaching block gone */}
<div id="projects">
  <Projects
    projects={data.fields.projects}
    backgroundImage={data.fields.backgrounds?.[0]}
  />
</div>
```

The `Teaching.jsx` file itself stays on disk (D-17). Only the import and JSX tag are removed. ESLint will warn about the unused import if only one is removed — both must be removed together.

---

### `src/contentful.js` — Read-only reference (data utility, request-response)

**No modifications.** This file is referenced to ensure CMA-written entries conform to the resolver's expected link shape.

**Link resolution pattern** (lines 66-76) — new `project` entries must be published and linked in `personalWebsite.projects` to be picked up here:
```javascript
// src/contentful.js:66-76
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

**Experience resolution pattern** (lines 42-50) — new `experience` entries must be linked in `personalWebsite.experiences`:
```javascript
// src/contentful.js:42-50
if (item.fields.experiences) {
  item.fields.experiences = item.fields.experiences.map(
    (experienceLink) => {
      return entries.find(
        (entry) => entry.sys.id === experienceLink.sys.id
      );
    }
  );
}
```

**Asset resolution helper** (lines 29-30):
```javascript
// src/contentful.js:29-30
const resolveAsset = (assetLink) =>
  assets.find((asset) => asset.sys.id === assetLink.sys.id);
```

**Conformance rule for CMA writes:** Any new entry linked from `personalWebsite` must be (1) published and (2) appear in the `includes.Entry` or `includes.Asset` array of the CDN response (guaranteed by `include: 10` on line 19). The resolver does not throw on a missing entry — it returns `undefined` — so a broken link causes a silent crash in the component on `entry.fields.*`. Always unlink before deleting (see RESEARCH.md Pitfall 2).

---

## Shared Patterns

### Tailwind class conventions for new JSX
**Source:** entire codebase — `Experiences.jsx` and `ProjectCard.jsx` both demonstrate
**Apply to:** any new Tailwind classes added to `Experiences.jsx`

```jsx
// Color tokens from tailwind.config.js custom palette — use these:
"text-gray-700"        // body text inside cards
"text-gray-600"        // secondary text
"text-gray-500"        // tertiary / dates
"text-sky-400"         // link color (used in ProjectCard.jsx:19)
"hover:text-sky-600"   // link hover (used in ProjectCard.jsx:20)
"bg-light-gray"        // card background (Experiences.jsx:31)
"text-dark-text"       // root page text (App.jsx:41)
"text-off-white"       // hero text on dark background (LandingPage.jsx:28, 31)
"text-deep-teal"       // accent (NavBar)

// Bullet list pattern matching existing project description render:
"list-disc list-inside mt-2 space-y-1"   // ul
```

### Optional-chaining guard for missing Contentful fields
**Source:** `src/App.jsx` lines 63, 73, 79
**Apply to:** any new prop read from `data.fields.*`

```jsx
// src/App.jsx:63,73,79 — pattern
backgroundImage={data.fields.backgrounds?.[10]}
backgroundImage={data.fields.backgrounds?.[0]}
backgroundImage={data.fields.backgrounds?.[2]}

// For a scalar field that may not exist yet (e.g. heroTagline):
{heroTagline || "fallback string"}
```

### Prop destructuring (no TypeScript)
**Source:** `src/components/LandingPage.jsx:3`, `src/components/Experiences.jsx:9`
**Apply to:** any signature change

```jsx
// All components use flat destructured props — no prop types, no TS
function LandingPage({ name, profileImage, backgrounds }) { ... }
const Experiences = ({ experiences }) => { ... }
```

---

## CMA Write Patterns (executor-only, not application code)

These are not JSX patterns but the primary work product of Phase 2. They live in RESEARCH.md and are summarized here for the planner's reference.

| Pattern | Source in RESEARCH.md | Key Rule |
|---------|----------------------|----------|
| Read-Modify-Write (all PUTs) | Pattern 1 | Always GET first to capture `sys.version`; always PUT the full body |
| Create + Publish new entry | Pattern 2 | POST → capture ID + version → PUT `/{id}/published` |
| Delete (unlink → unpublish → delete) | Pattern 3 | Order matters — unlink from `personalWebsite` array before deleting entry |
| Add field to content type | Pattern 4 | PUT to content type with ALL existing fields + new field → PUT to `/activated` (not `/published`) |
| Asset upload lifecycle (5 steps) | Pattern 5 | Binary goes to `upload.contentful.com`; poll for `fields.file.url` before publishing |

---

## No Analog Found

All modified files have close analogs. No files in this phase lack a pattern reference.

The CMA curl work has no codebase analog (the repo has never written to Contentful), but RESEARCH.md Pattern 1–5 provide complete, verified recipes.

---

## Metadata

**Analog search scope:** `src/components/`, `src/`, `src/contentful.js`
**Files read:** `ProjectCard.jsx`, `Experiences.jsx`, `LandingPage.jsx`, `App.jsx`, `contentful.js`
**Pattern extraction date:** 2026-06-20
