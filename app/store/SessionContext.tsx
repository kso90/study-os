"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

export interface SessionTask {
  id: number;
  text: string;
  done: boolean;
}

export interface SessionState {
  running: boolean;
  subject: string;
  phase: "focus" | "break";
  secondsLeft: number;
  focusSecs: number;
  breakSecs: number;
  sessionCount: number;
  tasks: SessionTask[];
}

export type SessionAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "TICK" }
  | { type: "SKIP" }
  | { type: "RESET" }
  | { type: "TOGGLE_TASK"; id: number }
  | { type: "END" };

const FOCUS = 25 * 60;
const BREAK = 5 * 60;

const INIT: SessionState = {
  running: false,
  subject: "Mathematics — Chapter 5",
  phase: "focus",
  secondsLeft: FOCUS,
  focusSecs: FOCUS,
  breakSecs: BREAK,
  sessionCount: 3,
  tasks: [
    { id: 1, text: "Chapter 5 — Calculus Review", done: false },
    { id: 2, text: "Quantum Mechanics Intro", done: true },
    { id: 3, text: "Essay Draft — Shakespeare", done: false },
    { id: 4, text: "Periodic Table Study", done: false },
  ],
};

function reducer(s: SessionState, a: SessionAction): SessionState {
  switch (a.type) {
    case "START":  return { ...s, running: true };
    case "PAUSE":  return { ...s, running: false };
    case "RESET":  return { ...s, running: false, secondsLeft: s.phase === "focus" ? s.focusSecs : s.breakSecs };
    case "END":    return { ...INIT };
    case "TOGGLE_TASK":
      return { ...s, tasks: s.tasks.map(t => t.id === a.id ? { ...t, done: !t.done } : t) };
    case "SKIP": {
      const next = s.phase === "focus" ? "break" : "focus";
      return {
        ...s, phase: next,
        secondsLeft: next === "focus" ? s.focusSecs : s.breakSecs,
        running: false,
        sessionCount: s.phase === "focus" ? s.sessionCount + 1 : s.sessionCount,
      };
    }
    case "TICK": {
      if (s.secondsLeft <= 1) {
        const next = s.phase === "focus" ? "break" : "focus";
        return {
          ...s, phase: next,
          secondsLeft: next === "focus" ? s.focusSecs : s.breakSecs,
          sessionCount: s.phase === "focus" ? s.sessionCount + 1 : s.sessionCount,
        };
      }
      return { ...s, secondsLeft: s.secondsLeft - 1 };
    }
  }
}

interface Ctx { session: SessionState; dispatch: React.Dispatch<SessionAction>; }
const SessionCtx = createContext<Ctx | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, dispatch] = useReducer(reducer, INIT);

  useEffect(() => {
    if (!session.running) return;
    const id = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(id);
  }, [session.running]);

  return <SessionCtx.Provider value={{ session, dispatch }}>{children}</SessionCtx.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionCtx);
  if (!ctx) throw new Error("useSession outside SessionProvider");
  return ctx;
}
