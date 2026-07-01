# Bubble — Handoff Document

**Date:** 2026-07-01
**Dev server:** `http://localhost:3000` (run `npm run dev` in project root; falls back to 3001+ if 3000 is occupied by a leftover process)
**Stack:** Next.js 16.2.9 · React 19.2.4 · Tailwind CSS v4 · Three.js ^0.185.0

---

## Goal

Build Bubble, a full-featured AI study companion for students — tagline **"your focus, your world."** Designed around a warm, hand-drawn bento aesthetic with ink shadows, Gaegu + Nunito fonts, and a custom warm color palette. The product has an onboarding flow, eight app screens, and a 3D animated landing page.

---

## Current State (as of handoff)

Everything compiles clean (`npx tsc --noEmit` exits 0). The dev server runs. All routes resolve. Git working tree is clean — all changes from this session are already committed (`auto-save` commits through `242174a`).

### Routes

| URL | File | Notes |
|-----|------|-------|
| `/` | `app/page.tsx` | 3D Three.js landing page — NO nav. Hero tagline: "your focus, your world." |
| `/onboarding` | `app/onboarding/page.tsx` | 6-step first-visit survey — NO nav (outside `(app)` group) |
| `/dashboard` | `app/(app)/dashboard/page.tsx` | Main bento grid dashboard |
| `/planner` | `app/(app)/planner/page.tsx` | Week strip + task list |
| `/session` | `app/(app)/session/page.tsx` | Pomodoro UI (static, not wired to SessionContext) |
| `/knowledge-map` | `app/(app)/knowledge-map/page.tsx` | Mastery bars per subject/topic |
| `/focus-shield` | `app/(app)/focus-shield/page.tsx` | Distraction filter + smart YouTube filter |
| `/social` | `app/(app)/social/page.tsx` | Boss battle, live rooms, leaderboard widget |
| `/leaderboard` | `app/(app)/leaderboard/page.tsx` | Ranked user list — rank badge, hours, streak, "View Profile" link |
| `/check-in` | `app/(app)/check-in/page.tsx` | Mood/energy/reflection |
| `/api/leaderboard` | `app/api/leaderboard/route.ts` | App Router Route Handler — returns dummy leaderboard JSON |

**Known gap:** `/profile/[name]` does not exist yet. The "View Profile" button on `/leaderboard` links there and will 404 until built.

### Layout Architecture

```
app/
  layout.tsx              ← Root: fonts + metadata only, no nav
  page.tsx                ← 3D landing page ("use client", Three.js)
  onboarding/
    page.tsx              ← 6-step survey, no nav, saves to localStorage
  lib/
    onboarding.ts          ← Shared OnboardingData type + localStorage helpers
  api/
    leaderboard/route.ts   ← GET handler, dummy leaderboard data
  (app)/
    layout.tsx            ← Wraps: SessionProvider + OnboardingGate + TopNav + FloatingBuddy
    dashboard/page.tsx
    planner/page.tsx
    session/page.tsx
    knowledge-map/page.tsx
    focus-shield/page.tsx
    social/page.tsx
    leaderboard/page.tsx
    check-in/page.tsx
  components/
    TopNav.tsx            ← "use client", sticky, 8 nav items (added Leaderboard)
    FloatingBuddy.tsx      ← "use client", draggable, persists via SessionContext
    OnboardingGate.tsx     ← "use client", redirects to /onboarding if not completed
    cats.tsx               ← SittingCat (FloatingBuddy + onboarding), CheeringCat (social + onboarding finish)
    icons.tsx              ← All SVG icon components, incl. new TrophyIcon
  store/
    SessionContext.tsx     ← React Context + useReducer, SessionProvider
  globals.css              ← Tailwind v4, @theme tokens, animation classes
```

---

## Key Technical Decisions

**Tailwind v4 syntax** — uses `@import "tailwindcss"` and `@theme {}` blocks, NOT `tailwind.config.js`. Color tokens (`ink`, `coral`, `linen`, `parchment`, `honey`, `blush`, `bark`) are defined in `globals.css @theme {}`. Use `text-ink`, `bg-coral` etc. directly, including opacity modifiers like `text-ink/60`.

**Route group `(app)/`** — folder name is ignored in URLs but creates a nested layout scope. Landing page and onboarding sit outside it (no nav). All app pages under `(app)/` get `OnboardingGate` + `TopNav` + `FloatingBuddy`.

**Onboarding gate** — `(app)/layout.tsx` wraps children in `OnboardingGate`, which checks `localStorage["bubble-onboarding"].completed` in a `useEffect` (client-only, avoids SSR hydration mismatch) and `router.replace("/onboarding")` if not set. Renders a blank `bg-linen` div while checking, never a flash of real content. This means **every `(app)` route requires onboarding to be completed in that browser's localStorage** before it will render — expected during manual testing with a fresh browser profile or cleared storage.

**No Zustand** — global session state (Pomodoro timer + tasks) is React Context + useReducer in `app/store/SessionContext.tsx`. `SessionProvider` lives in `(app)/layout.tsx`.

**API routes: App Router only, no `pages/` directory** — `app/api/leaderboard/route.ts` uses the App Router Route Handler convention (`export async function GET()`). **Do not create a `pages/api/*.ts` file for the same path** — confirmed empirically that Next.js hard-errors with a 500 ("App Router and Pages Router both match path... Please remove one of the conflicting routes") if both exist for the same route. If a Pages Router file is ever genuinely required at an identical path, the App Router version must be deleted first.

**Three.js landing page** — full `"use client"`, WebGL scene initialized in `useEffect`. Uses direct DOM label manipulation (not React state) for box label positions to avoid 60fps re-renders. Mouse parallax via `stateRef.current.mouse`, scroll dissolve via `stateRef.current.scroll`.

**`import type { CSSProperties } from "react"`** — all client components use this pattern instead of `React.CSSProperties` (no React default import needed).

**All pages are static except the one Route Handler** — no server actions, no database. Nearly all data is hardcoded; `/api/leaderboard` is the one live (but still dummy-data-backed) endpoint.

---

## Files Changed This Session

| File | What changed |
|------|--------------|
| `package.json`, `package-lock.json` | `"name"` changed from `study-os` to `bubble` |
| `app/layout.tsx` | Metadata `title: "Bubble"`, `description: "your focus, your world."` |
| `app/page.tsx` | Rebranded hero badge/copy; headline replaced with tagline "your focus, your world." |
| `app/components/TopNav.tsx` | Logo text → "Bubble"; added Leaderboard nav item (`TrophyIcon`) |
| `app/components/FloatingBuddy.tsx` | Footer text → "Bubble" |
| `app/(app)/focus-shield/page.tsx` | Chrome extension install card → "Bubble Chrome Extension" |
| `app/components/icons.tsx` | Added `TrophyIcon` |
| `README.md` | Added `# Bubble` header + tagline above the create-next-app boilerplate |
| `handoff.md` | Rebrand references updated; now this rewrite |
| `app/lib/onboarding.ts` | **New** — `OnboardingData` type + `loadOnboardingData`/`saveOnboardingData`/`isOnboardingComplete` |
| `app/components/OnboardingGate.tsx` | **New** — client gate wrapping `(app)` pages |
| `app/onboarding/page.tsx` | **New** — 6-step wizard (grade level, subjects, study style, struggle, hours/day, connect tools) |
| `app/(app)/layout.tsx` | Wrapped children in `OnboardingGate` |
| `app/api/leaderboard/route.ts` | **New** — GET handler returning dummy leaderboard array |
| `app/(app)/leaderboard/page.tsx` | **New** — ranked leaderboard cards, links to `/profile/[name]` |

---

## Failed Attempts / Things That Didn't Work

**`pages/api/leaderboard.ts` alongside `app/api/leaderboard/route.ts`** — creating both (even temporarily, to test) causes Next.js to return a hard 500 on every request to `/api/leaderboard`: *"App Router and Pages Router both match path... Please remove one of the conflicting routes."* This was verified empirically, then reverted. Keep this project App-Router-only for API routes.

**`react-hooks/set-state-in-effect` lint rule** — this stricter lint config flags any `useEffect` that calls `setState` directly, including the established "load from localStorage on mount" pattern already used by `FloatingBuddy.tsx` before this session. `OnboardingGate.tsx` and `onboarding/page.tsx` both trigger the same pre-existing rule by following the same convention. Not a regression — `npm run lint` already failed on `FloatingBuddy.tsx` before any of this session's changes. Left unresolved, consistent with existing code.

**No browser tool in this environment** — verification of interactive flows (onboarding step transitions, chip add/remove, slider drag, leaderboard card hover states) was done via `curl` + SSR output inspection + `tsc`/`eslint`, not a real browser. Curl can't execute the client-side `OnboardingGate` redirect logic (no JS engine), so gated routes correctly show blank SSR output in these checks — this is expected, not a bug. **Manual browser click-through by the user is still recommended** for anything visual/animated.

**Prior session's known issues (still valid, see previous entries below where relevant):** TopNav edit whitespace mismatches, `React.CSSProperties` import errors, Three.js closure null-narrowing, stale `.next` cache after moving files, unicode curly quotes in JSX.

---

## What's Not Yet Done (Next Steps)

### High priority

1. **`/profile/[name]` page** — doesn't exist. `/leaderboard`'s "View Profile" button links there and 404s. Needs a dynamic route page.
2. **Session page ↔ SessionContext** — `app/(app)/session/page.tsx` still has a static timer UI, not wired to `useSession()`.
3. **Leaderboard: wire component to `/api/leaderboard`** — the page currently uses its own inline hardcoded array (per explicit request) rather than fetching from the route that was also built. When ready to connect them, replace the inline array with a `fetch("/api/leaderboard")` call.

### Medium priority

4. **FloatingBuddy subject picker** — subject still hardcoded as `"Mathematics — Chapter 5"` in `SessionContext`.
5. **Planner → SessionContext task sync** — planner and session tasks are still separate hardcoded arrays.
6. **Knowledge Map — click to expand topic** — still a dead link.
7. **Focus Shield — state toggle** — `isActive` still hardcoded `false`.
8. **Check-in — actual form state** — still static.
9. **Onboarding data isn't used anywhere yet** — grade level, subjects, study style, struggle, hours/day, and tool-connection choices are saved to `localStorage["bubble-onboarding"]` but nothing on the dashboard/planner/etc. reads or reflects them yet. Natural next step: personalize the dashboard greeting or planner defaults based on this data.

### Lower priority — polish

10. **Landing page mobile** — Three.js canvas/hero text don't adapt below ~768px.
11. **TopNav active state for `/`** — should be fine since Dashboard link is `/dashboard`, not `/`, but unconfirmed in a real browser.
12. **Onboarding "Connect tools" step** — Google Calendar / Notion "Connect" buttons just flip local boolean state; no real OAuth or integration exists (correctly out of scope for this static prototype, but worth flagging so nobody assumes it's live).

---

## Color Palette Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `linen` | `#e8d6c0` | Page background, light surfaces |
| `parchment` | `#fff8f0` | Card backgrounds, light buttons |
| `ink` | `#333130` | Text, borders, hard shadows |
| `coral` | `#ff6445` | Primary CTA, active states, streak, rank #1 |
| `honey` | `#e3a164` | Secondary accent, AI insight cards, rank #2 |
| `blush` | `#e2ab9a` | Tertiary accent, check-in, soft pills, rank #3 |
| `bark` | `#87663e` | Dark accent, deadline card, subtext |

---

## Animation Classes (globals.css)

| Class | Effect |
|-------|--------|
| `.animate-fade-up` | Page entry / onboarding step transition — 180ms fade + slide up |
| `.cat-float-1` … `.cat-float-5` | Vertical bob at different speeds (3–4s) |
| `.buddy-expand` | FloatingBuddy panel open — scale + fade in |
| `.buddy-pulse` | Pulsing ring on FloatingBuddy during focus |
| `.buddy-celebrate` | Bounce animation on phase complete |
| `.bento-box` | Hard ink shadow + hover lift |
| `.btn-primary` | Button with hard shadow + press/hover states |
| `.btn-outline` | Outlined button variant |
