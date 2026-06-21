#!/usr/bin/env bash
# verify-cdn.sh — Phase 2 content-overhaul CDN assertion harness.
# Asserts each of the 5 phase success criteria against the LIVE published CDN.
# Read-only: uses VITE_CONTENTFUL_ACCESS_TOKEN (the CDN delivery token) from .env.
# NEVER uses or prints the CMA token. Safe to run any time; FAILs are expected
# until the downstream plans (02-02..02-05) have written + published content.
#
# Usage:  bash .planning/phases/02-content-overhaul/verify-cdn.sh
# Exit:   0 if all 5 SC pass, 1 if any fail.

set -uo pipefail

SPACE="0mufjfcbiiue"
ENV="master"
CDN="https://cdn.contentful.com/spaces/${SPACE}/environments/${ENV}"

# --- Load read-only CDN token from .env (VITE_CONTENTFUL_ACCESS_TOKEN) ---
ENV_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)/.env"
if [ ! -f "$ENV_FILE" ]; then echo "FATAL: .env not found at $ENV_FILE"; exit 1; fi
CDN_TOKEN="$(grep -E '^VITE_CONTENTFUL_ACCESS_TOKEN=' "$ENV_FILE" | head -1 | cut -d= -f2- | tr -d '"'"'"' \r')"
if [ -z "${CDN_TOKEN:-}" ]; then echo "FATAL: VITE_CONTENTFUL_ACCESS_TOKEN missing from .env"; exit 1; fi

PASS=0; FAIL=0
ok()   { echo "PASS  $1"; PASS=$((PASS+1)); }
bad()  { echo "FAIL  $1"; FAIL=$((FAIL+1)); }

# Fetch the personalWebsite entry with linked entries resolved (include=5).
RESP="$(curl -s "${CDN}/entries?content_type=personalWebsite&limit=1&include=5&access_token=${CDN_TOKEN}")"
sleep 1

# Guard: did we get a usable response?
echo "$RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); sys.exit(0 if d.get('items') else 1)" 2>/dev/null \
  || { echo "FATAL: CDN returned no personalWebsite item (token wrong, or entry unpublished)"; echo "$RESP" | head -c 400; exit 1; }

echo "=== Phase 2 CDN Success-Criteria Checks ==="

# --- SC-1: Hero has proof-led copy, no generic 'passionate' language ---
RESP="$RESP" python3 <<'PY' && ok "SC-1 heroTagline present + proof-led (no 'passionate')" || bad "SC-1 heroTagline missing/empty or contains 'passionate'"
import os,json
d=json.loads(os.environ["RESP"]); f=d["items"][0]["fields"]
ht=f.get("heroTagline","")
import sys
sys.exit(0 if (ht and "passionate" not in ht.lower()) else 1)
PY

# --- SC-2: Experiences include Freelance + Risktec ---
RESP="$RESP" python3 <<'PY' && ok "SC-2 Freelance + Risktec experiences present" || bad "SC-2 Freelance and/or Risktec experience missing"
import os,json,sys
d=json.loads(os.environ["RESP"]); f=d["items"][0]["fields"]
ents={e["sys"]["id"]:e for e in d.get("includes",{}).get("Entry",[])}
titles=[ents.get(l["sys"]["id"],{}).get("fields",{}).get("title","") for l in f.get("experiences",[])]
blob=" | ".join(titles).lower()
sys.exit(0 if ("freelance" in blob and "risktec" in blob) else 1)
PY

# --- SC-3: Projects = exactly Music School SaaS / SongScope / Gist AI; no Wild Oasis / Frontend Lib; no broken links ---
RESP="$RESP" python3 <<'PY' && ok "SC-3 exactly 3 projects (MusicSchool/SongScope/GistAI), no removed cards, no broken links" || bad "SC-3 wrong project set or unresolved link"
import os,json,sys
d=json.loads(os.environ["RESP"]); f=d["items"][0]["fields"]
if d.get("errors"): sys.exit(1)  # notResolvable broken links
ents={e["sys"]["id"]:e for e in d.get("includes",{}).get("Entry",[])}
titles=[ents.get(l["sys"]["id"],{}).get("fields",{}).get("title","") for l in f.get("projects",[])]
blob=" | ".join(titles).lower()
banned=("wild oasis" in blob) or ("frontend lib" in blob) or ("front-end lib" in blob)
want=("music school" in blob) and ("songscope" in blob) and ("gist ai" in blob)
sys.exit(0 if (want and not banned and len(titles)==3) else 1)
PY

# --- SC-4: Skills include AWS / React Native / Docker ---
RESP="$RESP" python3 <<'PY' && ok "SC-4 skills include AWS + React Native + Docker" || bad "SC-4 skills missing AWS/React Native/Docker"
import os,json,sys
d=json.loads(os.environ["RESP"]); f=d["items"][0]["fields"]
blob=" | ".join(f.get("skills",[])).lower()
sys.exit(0 if ("aws" in blob and "react native" in blob and "docker" in blob) else 1)
PY

# --- SC-5: Music section shows EP 'Why We're Living' + Spotify album URL ---
RESP="$RESP" python3 <<'PY' && ok "SC-5 musicBio has EP 'Why We're Living' + Spotify album URL" || bad "SC-5 musicBio missing EP title or Spotify URL"
import os,json,sys
d=json.loads(os.environ["RESP"]); f=d["items"][0]["fields"]
mb=f.get("musicBio","").lower()
sys.exit(0 if ("why we're living" in mb and "open.spotify.com/album" in mb) else 1)
PY

echo "=== Result: ${PASS} passed, ${FAIL} failed ==="
[ "$FAIL" -eq 0 ]
