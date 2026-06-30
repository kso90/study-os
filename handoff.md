# Study OS — Handoff Document

**Date:** 2026-06-29  
**Dev server:** `http://localhost:3001` (run `npm run dev` in project root)  
**Stack:** Next.js 16.2.9 · React 19.2.4 · Tailwind CSS v4 · Three.js ^0.185.0

---

## Goal

Build a full-featured AI study OS for students. Designed around a warm, hand-drawn bento aesthetic with ink shadows, Gaegu + Nunito fonts, and a custom warm color palette. The product has seven screens plus a 3D animated landing page.

---

## Current State (as of handoff)

Everything compiles clean (`npx tsc --noEmit` exits 0). The dev server runs. All routes resolve.

### Routes

| URL | File | Notes |
|-----|------|-------|
| `/` | `app/page.tsx` | 3D Three.js landing page — NO nav |
| `/dashboard` | `app/(app)/dashboard/page.tsx` | Main bento grid dashboard |
| `/planner` | `app/(app)/planner/page.tsx` | Week strip + task list |
| `/session` | `app/(app)/session/page.tsx` | Pomodoro UI (static, not wired to SessionContext) |
| `/knowledge-map` | `app/(app)/knowledge-map/page.tsx` | Mastery bars per subject/topic |
| `/focus-shield` | `app/(app)/focus-shield/page.tsx` | Distraction filter + smart YouTube filter |
| `/social` | `app/(app)/social/page.tsx` | Boss battle, live rooms, leaderboard |
| `/check-in` | `app/(app)/check-in/page.tsx` | Mood/energy/reflection |

### Layout Architecture

```
app/
  layout.tsx              ← Root: fonts only, no nav
  page.tsx                ← 3D landing page ("use client", Three.js)
  (app)/
    layout.tsx            ← Wraps: SessionProvider + TopNav + FloatingBuddy
    dashboard/page.tsx
    planner/page.tsx
    session/page.tsx
    knowledge-map/page.tsx
    focus-shield/page.tsx
    social/page.tsx
    check-in/page.tsx
  components/
    TopNav.tsx            ← "use client", sticky, 7 nav items
    FloatingBuddy.tsx     ← "use client", draggable, persists via SessionContext
    cats.tsx              ← SittingCat (FloatingBuddy), CheeringCat (social page)
    icons.tsx             ← All SVG icon components
  store/
    SessionContext.tsx    ← React Context + useReducer, SessionProvider
  globals.css             ← Tailwind v4, @theme tokens, animation classes
```

---

## Key Technical Decisions

**Tailwind v4 syntax** — uses `@import "tailwindcss"` and `@theme {}` blocks, NOT `tailwind.config.js`. Color tokens (`ink`, `coral`, `linen`, `parchment`, `honey`, `blush`, `bark`) are defined in `globals.css @theme {}`. Use `text-ink`, `bg-coral` etc. directly.

**Route group `(app)/`** — folder name is ignored in URLs but creates a nested layout scope. Landing page at `app/page.tsx` gets only the root layout (fonts, no nav). All app pages under `(app)/` get TopNav + FloatingBuddy.

**No Zustand** — global session state (Pomodoro timer + tasks) is React Context + useReducer in `app/store/SessionContext.tsx`. `SessionProvider` lives in `(app)/layout.tsx`.

**Three.js landing page** — full `"use client"`, WebGL scene initialized in `useEffect`. Uses direct DOM label manipulation (not React state) for box label positions to avoid 60fps re-renders. Mouse parallax via `stateRef.current.mouse`, scroll dissolve via `stateRef.current.scroll`.

**`import type { CSSProperties } from "react"`** — all client components use this pattern instead of `React.CSSProperties` (no React default import needed).

**All pages are static** — no server actions, no API routes, no database. All data is hardcoded. The app is a high-fidelity prototype/mockup.

---

## Files Changed (this session)

| File | What changed |
|------|-------------|
| `app/layout.tsx` | Stripped to fonts-only root layout (removed TopNav, SessionProvider, FloatingBuddy) |
| `app/page.tsx` | Full rewrite — now the 3D Three.js landing page |
| `app/(app)/layout.tsx` | Created — wraps all app pages with TopNav + SessionProvider + FloatingBuddy |
| `app/(app)/dashboard/page.tsx` | Created — moved from old `app/page.tsx`, fixed import paths |
| `app/(app)/planner/page.tsx` | Created — moved from `app/planner/page.tsx`, fixed import paths |
| `app/(app)/session/page.tsx` | Created — moved, fixed import paths |
| `app/(app)/knowledge-map/page.tsx` | Created — moved, fixed import paths |
| `app/(app)/focus-shield/page.tsx` | Created — moved, fixed import paths |
| `app/(app)/social/page.tsx` | Created — moved, fixed import paths |
| `app/(app)/check-in/page.tsx` | Created — moved, fixed import paths |
| `app/components/TopNav.tsx` | Changed Dashboard `href` from `"/"` to `"/dashboard"` |
| `app/components/FloatingBuddy.tsx` | Built from scratch — draggable widget, localStorage position, celebration animation |
| `app/components/cats.tsx` | Two SVG cat components: SittingCat, CheeringCat |
| `app/components/icons.tsx` | Added UsersIcon for /social nav item |
| `app/store/SessionContext.tsx` | Created — global Pomodoro + task state |
| `app/globals.css` | Added catFloat, buddyExpand, buddyPulse, buddyCelebrate keyframes + classes |

**Deleted:**  
`app/planner/page.tsx`, `app/session/page.tsx`, `app/knowledge-map/page.tsx`, `app/focus-shield/page.tsx`, `app/check-in/page.tsx`, `app/social/page.tsx` (all moved to `(app)/`)

---

## Failed Attempts / Things That Didn't Work

**TopNav edit whitespace mismatch** — early edits to TopNav.tsx failed because the `old_string` had extra alignment spaces. Fix: always re-read a file before editing to get exact whitespace.

**`React.CSSProperties` in client components** — using `React.CSSProperties` without importing React caused TS errors. Fix: `import type { CSSProperties } from "react"` and use `CSSProperties` directly.

**TS "container is possibly null" in Three.js closures** — TypeScript can't narrow a `null` check across closure boundaries. Fix: capture `const c = container` after the null guard, use `c` inside event handlers and the animation loop.

**Stale `.next/types/validator.ts` errors** — after moving page files, old `.next` cache still referenced deleted paths. Fix: `Remove-Item .next -Recurse -Force` to clear build cache before type-checking.

**Unicode curly quotes in JSX strings** — smart quotes (`"` `"`) inside double-quoted JS strings cause TypeScript parse errors. Fix: use single-quoted outer delimiters or `&ldquo;`/`&rdquo;` HTML entities.

**npm install confirmation** — tool calls that require user approval will be paused; user must explicitly confirm. Can't assume yes.

---

## What's Not Yet Done (Next Steps)

### High priority — wiring up interactivity

1. **Session page ↔ SessionContext** — `app/(app)/session/page.tsx` has a static timer UI. Wire it to `useSession()` so the play/pause/skip/reset buttons actually control the global Pomodoro timer. The context is already set up; just connect the dispatch calls.

2. **FloatingBuddy subject picker** — currently the subject is hardcoded as `"Mathematics — Chapter 5"` in `SessionContext`. Add a way to change it (input field in the expanded buddy panel, or a subject selector modal).

3. **Planner → SessionContext task sync** — planner tasks and session tasks are separate hardcoded arrays. Ideally they share the same task list from `SessionContext`.

### Medium priority — features

4. **Knowledge Map — click to expand topic** — cards currently show a "View details →" link but clicking does nothing. Add an expandable panel or modal with topic-level drill-down.

5. **Focus Shield — state toggle** — `isActive` is hardcoded `false`. Wire the "Activate Focus Shield" button to a `useState` or add it to a global shield context.

6. **Check-in — actual form state** — mood, energy, and textarea are static. Convert to `useState` so selections persist within the session and the submit button does something (even just a toast).

7. **Social — real-time room count** — the live room counts are hardcoded. Placeholder for a WebSocket or polling implementation.

### Lower priority — polish

8. **Landing page mobile** — the Three.js canvas and hero text don't adapt below ~768px. Add a `@media` check to fall back to a static hero on mobile (Three.js can be expensive on low-end phones).

9. **TopNav active state for `/`** — the landing page has no nav, but if user navigates back to `/` from an app page, the Dashboard link (now `/dashboard`) will be active correctly. Confirm this works in browser.

10. **Fonts on landing page** — the 3D landing page uses `var(--font-gaegu)` and `var(--font-nunito)` via inline styles. These are set as CSS variables by Next.js font system in the root `<html>` tag. Should work, but worth verifying in a fresh browser tab (no cached styles).

11. **Add `/` back-link on landing** — no "back to landing" link exists from the app. Could add a small Study OS logo link in TopNav that goes to `/`.

---

## Color Palette Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `linen` | `#e8d6c0` | Page background, light surfaces |
| `parchment` | `#fff8f0` | Card backgrounds, light buttons |
| `ink` | `#333130` | Text, borders, hard shadows |
| `coral` | `#ff6445` | Primary CTA, active states, streak |
| `honey` | `#e3a164` | Secondary accent, AI insight cards |
| `blush` | `#e2ab9a` | Tertiary accent, check-in, soft pills |
| `bark` | `#87663e` | Dark accent, deadline card, subtext |

---

## Animation Classes (globals.css)

| Class | Effect |
|-------|--------|
| `.animate-fade-up` | Page entry — 180ms fade + slide up |
| `.cat-float-1` … `.cat-float-5` | Vertical bob at different speeds (3–4s) |
| `.buddy-expand` | FloatingBuddy panel open — scale + fade in |
| `.buddy-pulse` | Pulsing ring on FloatingBuddy during focus |
| `.buddy-celebrate` | Bounce animation on phase complete |
| `.bento-box` | Hard ink shadow + hover lift |
| `.btn-primary` | Button with hard shadow + press/hover states |
| `.btn-outline` | Outlined button variant |
