# Phase 2 — Content Draft (APPROVAL GATE · D-18)

> **Approve by replying `approved`, or edit any section inline first.**
> Nothing below is live yet. After approval, plans 02-02 → 02-05 push this exact copy to
> Contentful **production** via the CMA and publish it. CMA writes are irreversible-ish
> (re-editable but live to recruiters immediately), so review every section.

---

## ⚠ Read first — live state differs from the original plan assumptions

Task 1 captured the real Contentful state (see CONTENTFUL-INVENTORY.md). Three things differ from
what the plan assumed — each needs a quick call from you:

1. **Existing experiences are not what the plan expected.** Live `experiences` currently are:
   - `Team Lead & Full-Stack Developer` — SongScope
   - `Front-End Developer` — Risktec Systems (Startup)
   - `Shopify Hackathon Winner` — Presented by BrainStation

   The plan wanted to *add* **Freelance SWE**, **Risktec Software Engineer**, and **Piano Teacher**.
   → **Question A:** For Risktec, do you want a **new** "Risktec Software Engineer" entry, or should I
     **update the existing** "Front-End Developer / Risktec Systems" entry in place? (I recommend updating
     the existing one — avoids a duplicate Risktec.)
   → **Question B:** Keep the existing "Team Lead / SongScope" and "Shopify Hackathon Winner" experiences,
     or retire either? (Default: keep both.)
   → **Question C:** Final ordering of the experience list (newest first is typical).

2. **Wild Oasis and My Frontend Lib are already deleted** — they don't exist in the space. CONT-07's
   deletion step is a no-op; 02-03 will just confirm the `projects` array is clean. ✅ nothing to decide.

3. **There is no existing Piano Teacher experience.** The teaching content lives only in the `teachingBio`
   field. Section 4 below drafts a Piano Teacher experience from that. Confirm the copy.

---

## 1. Hero tagline (`heroTagline` — new Symbol field)

**Value to set on `personalWebsite.heroTagline`:**

> Full-stack engineer who ships production software — live SaaS billing systems, AI/ML products, and mobile apps. AWS certified, based in Toronto.

**Greeting line (Claude's discretion, D-08):** Recommend **keeping** the existing "Hi, I'm Antoni" greeting
as the H1, with this tagline rendered directly beneath it (greeting = identity, tagline = proof). The old
hardcoded line ("…passionate about creating projects from end to end") is removed from `LandingPage.jsx`
and replaced by this field (02-05).

---

## 2. Experience — Freelance Software Engineer

- **title:** Freelance Software Engineer
- **company:** Self-Employed
- **startDate:** 2025-08-01
- **endDate:** _(none)_
- **isOngoing:** true
- **description (markdown bullets, D-06):**

```
- Built and shipped a production SaaS billing system for a live music-school client — Stripe Connect payments, automated invoicing, and a rate-locking pattern that freezes a student's price at sign-up while letting list prices change.
- Containerized the full stack with Docker and Docker Compose; deployed to DigitalOcean behind Nginx with SSL and a zero-downtime release flow.
- Delivered features end-to-end across multiple freelance engagements (Music School SaaS, TalentVibe, consulting) — backend APIs, database design, and React/React Native front ends.
- Owned the work solo: requirements, architecture, deployment, and client communication.
```

---

## 3. Experience — Risktec Software Engineer

> Pending **Question A** above: new entry vs. update the existing "Front-End Developer / Risktec Systems".
> Copy is the same either way.

- **title:** Risktec Software Engineer  _(or keep "Front-End Developer" if updating in place — your call)_
- **company:** Risktec Solutions  _(inventory shows existing company as "Risktec Systems (Startup)" — confirm preferred wording)_
- **startDate:** 2024-09-01
- **endDate:** 2025-08-01
- **isOngoing:** false
- **description (markdown bullets, D-06):**

```
- Built a portfolio-management system used internally to track and report on client risk engagements.
- Rebuilt the shared component library, standardizing UI patterns and cutting duplicate front-end code.
- Translated Figma designs into production React components with close designer handoff.
- Worked in an Agile team — sprint planning, code review, and iterative delivery.
```

---

## 4. Experience — Piano Teacher (folds retired `teachingBio`, DSGN-05)

- **title:** Piano Teacher
- **company:** Self-Employed  _(or studio/school name — confirm)_
- **startDate:** _(confirm — e.g. 2018-09-01)_
- **endDate:** _(confirm, or isOngoing if still teaching)_
- **isOngoing:** _(confirm)_
- **description (markdown bullets — drafted from existing `teachingBio`; edit freely):**

```
- Taught piano to students across a range of ages and skill levels, building lesson plans tailored to each learner.
- Developed patience, clear communication, and the ability to break complex ideas into simple steps — skills I carry into engineering and mentoring.
```

> Note: I drafted these bullets generically because I did not paste your live `teachingBio` verbatim into
> this doc. If you want the exact existing teaching copy reused, say so and I'll pull it from the field.

---

## 5. Project — Music School SaaS  (LEAD card, CONT-05)

- **title:** Music School SaaS
- **projectUrl:** _(confirm live client URL, or omit if private)_
- **technologies:** `React`, `Node.js`, `Express`, `Stripe Connect`, `PostgreSQL`, `Docker`, `DigitalOcean`, `Nginx`
- **thumbnail:** `contentful/thumbnails/MusicSchool_Thumbnail.png` _(must exist before 02-03 upload)_
- **description (markdown, outcome-first):**

```
A production SaaS platform running for a live music-school client — not a demo. Handles real Stripe Connect billing, automated invoicing, scheduling, and a rate-locking system that guarantees each student's enrollment price even as list prices change.

I own the whole stack: React front end, Node/Express API, PostgreSQL data model, and a Dockerized deployment on DigitalOcean behind Nginx with SSL and zero-downtime releases.

- Real paying client, real billing — money moves through it
- Full-stack ownership from schema to deploy
- Built for reliability: containerized, SSL, zero-downtime updates
```

---

## 6. Project — Gist AI  (UPDATE existing entry `38BNsImyxunYKuC2cZut71`, CONT-04)

- **title:** Gist AI
- **projectUrl:** `https://gistai-app.netlify.app`
- **technologies:** `React`, `Express`, `OAuth`, `Firebase`, `Firestore`
- **thumbnail:** `contentful/thumbnails/GistAI_Thumbnail_New.png` _(fresh screenshot, must exist before 02-03 upload)_
- **description (markdown):**

```
Gist AI turns long content into fast, readable summaries. A React front end with Google OAuth sign-in, an Express backend, and Firebase/Firestore for auth and storage — deployed live on Netlify.

- OAuth login and per-user history backed by Firestore
- Express API orchestrating the summarization flow
- Live and usable: https://gistai-app.netlify.app
```

---

## 7. Project — SongScope  (UPDATE existing entry `n3uOcC5mxAge26UBfvomI`, CONT-06)

_Verbatim from 02-RESEARCH.md SongScope Card Synthesis._

- **title:** SongScope
- **projectUrl:** `https://songscope-demo.netlify.app`
- **technologies:** `Django`, `Next.js 14`, `TypeScript`, `PostgreSQL`, `Spotify API`, `OpenAI`, `Python`, `Recharts`, `React`
- **thumbnail:** `contentful/thumbnails/SongScope_Thumbnail.png` _(must exist before 02-03 upload)_
- **headline / one-liner:**

> Led the full-stack build of a music-discovery engine that learns your taste from Spotify history and explains every recommendation — live in demo mode.

- **description (markdown):**

```
SongScope recommends a personalized "Daily Gem" track from a user's Spotify listening history and explains why it was picked. The backend runs a hybrid ML engine: cosine similarity scores genre fit, a Gaussian novelty curve avoids both mainstream and obscure tracks, and a Thompson Sampling multi-armed bandit decides which of four candidate-generation sources to trust per user. A closed feedback loop (like/dislike) updates each user's taste vector via online SGD, and free-text feedback is interpreted by OpenAI gpt-4o-mini into structured taste signals.

- Django 5.1 + DRF backend; Next.js 14 frontend (TypeScript, Recharts, shadcn/ui)
- Spotify OAuth; PostgreSQL on Render; Netlify frontend
- Demo mode: single seeded Spotify account — production tailors per-user

[Live demo](https://songscope-demo.netlify.app) — demo connected to one Spotify account / one person's listening history; production tailors per-user.
```

---

## 8. Skills (`personalWebsite.skills` array, CONT-08 / D-11)

**Final array (existing values kept + D-11 additions, deduped):**

```
React, React Native / Expo, Next.js, TypeScript, Redux, Tailwind CSS, CSS, SCSS,
Node.js, Express, Python, Django, REST API, GraphQL, KnexJS,
PostgreSQL, MySQL,
AWS Cloud Practitioner, Docker, Docker Compose, GitHub Actions CI/CD, DigitalOcean, Nginx, SSL,
OpenAI API, XGBoost, Recommendation Systems,
Data Structures, Agile Development, Content Management Systems
```

> Order is grouped (frontend → backend → data → cloud/devops → AI/ML → fundamentals). The nav dropdown
> renders the array as-is (D-10, no component change). Reorder or trim inline if you prefer.

---

## 9. Music — EP "Why We're Living" (`musicBio`, MUSC-01)

- **musicBio (new value):**

```
"Why We're Living" — my latest EP. Stream it on Spotify: https://open.spotify.com/album/28d3TgbRj5Y0a7URbWWdgc
```

> Confirm whether you want a longer blurb (a sentence or two about the EP) above the link, or keep it tight.

- **EP artwork:** uploaded to the new `epArtwork` asset field (02-04) from
  `contentful/ep-artwork/why-we-are-living.jpg` _(must exist before 02-04 upload)_.
- **Performance photos (MUSC-02):** the existing `pictures` array is left **unchanged**.

---

## Required image files (drop into repo before downstream upload tasks)

| File | Used by | Plan |
|------|---------|------|
| `contentful/thumbnails/MusicSchool_Thumbnail.png` | Music School SaaS card | 02-03 |
| `contentful/thumbnails/GistAI_Thumbnail_New.png` | Gist AI fresh screenshot | 02-03 |
| `contentful/thumbnails/SongScope_Thumbnail.png` | SongScope card | 02-03 |
| `contentful/ep-artwork/why-we-are-living.jpg` | EP artwork (`epArtwork`) | 02-04 |

Asset-upload tasks **block** if the file is missing (D-05) — no silent placeholders.

---

### ✅ To authorize the live push: reply `approved` (and answer Questions A–C above), or edit any section first.
