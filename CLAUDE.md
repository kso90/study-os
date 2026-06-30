# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server (Turbopack, usually :3000 or :3001 if port taken)
npm run build     # production build
npm run lint      # ESLint
npx tsc --noEmit  # type-check without building
```

Git requires the PATH to include `C:\Users\tonys\AppData\Local\Programs\Git\cmd` — prefix any git commands with `$env:PATH = "C:\Users\tonys\AppData\Local\Programs\Git\cmd;$env:PATH"` if git is not found.

After moving or deleting page files, clear stale build cache before type-checking: `Remove-Item .next -Recurse -Force`.

## Architecture

### Route Layout Split

The app uses a Next.js App Router **route group** to give the landing page a different layout from all other pages:

- `app/layout.tsx` — root layout, fonts only (`Gaegu` + `Nunito`), no nav
- `app/page.tsx` — 3D Three.js landing page (`"use client"`)
- `app/(app)/layout.tsx` — wraps every app page with `SessionProvider` + `TopNav` + `FloatingBuddy`
- `app/(app)/[page]/page.tsx` — the seven app pages (dashboard, planner, session, knowledge-map, focus-shield, social, check-in)

The `(app)` folder name is ignored in URLs — `/dashboard` resolves to `app/(app)/dashboard/page.tsx`.

### Global State

`app/store/SessionContext.tsx` holds a global Pomodoro timer + task list via React Context + `useReducer`. No external state library. `SessionProvider` lives in `(app)/layout.tsx` so state persists across page navigations. Access with `useSession()`.

### Styling

Tailwind CSS v4 — uses `@import "tailwindcss"` and `@theme {}` in `app/globals.css`. There is **no** `tailwind.config.js`. Custom color tokens (`ink`, `coral`, `linen`, `parchment`, `honey`, `blush`, `bark`) are defined in `@theme {}` and used directly as `text-ink`, `bg-coral`, etc.

Custom CSS classes in `globals.css`: `.bento-box` (hard ink shadow + hover lift), `.btn-primary`, `.btn-outline`, `.animate-fade-up`, `.cat-float-1`…`.cat-float-5`, `.buddy-expand`, `.buddy-pulse`, `.buddy-celebrate`.

### Client Component Conventions

- All components using browser APIs or hooks are `"use client"`.
- Use `import type { CSSProperties } from "react"` — do not use `React.CSSProperties` (avoids needing a React default import).
- SVG icons and cat illustrations live in `app/components/icons.tsx` and `app/components/cats.tsx` as plain function components.

### Three.js Landing Page

`app/page.tsx` initializes a WebGL scene inside `useEffect`. Box label positions are updated via direct DOM manipulation on label `div` elements (not React state) to avoid re-renders at 60fps. Mouse parallax and scroll dissolve are tracked via `stateRef.current` (not `useState`) for the same reason. TypeScript null-narrowing across closures: capture `const c = container` after the null guard, use `c` inside event handlers and the animation loop.

### All Pages Are Static

No API routes, server actions, or database. All data is hardcoded. The app is a high-fidelity UI prototype.
