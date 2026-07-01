"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties } from "react";
import { useSession } from "../store/SessionContext";
import { SittingCat } from "./cats";

function fmt(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

/* Inline pause icon */
function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1.5" y="1" width="3.5" height="10" rx="1" fill="#333130" />
      <rect x="7" y="1" width="3.5" height="10" rx="1" fill="#333130" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M 2.5 1.5 L 11 6 L 2.5 10.5 Z" fill="#333130" />
    </svg>
  );
}
function ResetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M 12 7 C 12 9.8 9.8 12 7 12 C 4.2 12 2 9.8 2 7 C 2 4.2 4.2 2 7 2 C 9 2 10.8 3 11.8 4.5" stroke="#333130" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 11 1.5 L 12.2 4.5 L 9 4.2" stroke="#333130" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SkipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M 2 2 L 8.5 7 L 2 12 Z" fill="#333130" />
      <rect x="9.5" y="2" width="3" height="10" rx="1" fill="#333130" />
    </svg>
  );
}

type Pos = { x: number; y: number };

const CTL: CSSProperties = {
  width: 32, height: 32, borderRadius: "50%",
  border: "1.5px solid #333130", background: "#fff8f0",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", padding: 0,
};

export default function FloatingBuddy() {
  const { session, dispatch } = useSession();
  const { running, phase, secondsLeft, subject, tasks, sessionCount } = session;

  const [expanded, setExpanded] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const [dragOffset, setDragOffset] = useState<Pos>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const hasDraggedRef = useRef(false);
  const startClientRef = useRef<Pos>({ x: 0, y: 0 });
  const prevCountRef = useRef(sessionCount);

  /* Load saved position */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("buddy-pos");
      if (saved) setPos(JSON.parse(saved));
    } catch {}
  }, []);

  /* Detect phase completion → celebrate */
  useEffect(() => {
    if (sessionCount > prevCountRef.current) {
      setCelebrating(true);
      const t = setTimeout(() => setCelebrating(false), 800);
      prevCountRef.current = sessionCount;
      return () => clearTimeout(t);
    }
    prevCountRef.current = sessionCount;
  }, [sessionCount]);

  /* Global drag listeners */
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      const dx = Math.abs(e.clientX - startClientRef.current.x);
      const dy = Math.abs(e.clientY - startClientRef.current.y);
      if (dx > 4 || dy > 4) hasDraggedRef.current = true;

      const el = containerRef.current;
      if (!el) return;
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - el.offsetWidth));
      const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - el.offsetHeight));
      setPos({ x: newX, y: newY });
    };
    const onUp = () => {
      setIsDragging(false);
      try {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) localStorage.setItem("buddy-pos", JSON.stringify({ x: rect.left, y: rect.top }));
      } catch {}
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [isDragging, dragOffset]);

  /* Click outside to collapse */
  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setExpanded(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [expanded]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    startClientRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (!hasDraggedRef.current) setExpanded(v => !v);
  }, []);

  const posStyle: CSSProperties = pos
    ? { left: pos.x, top: pos.y, bottom: "auto", right: "auto" }
    : { right: 24, bottom: 24 };

  const timeStr = fmt(secondsLeft);

  /* ── EXPANDED ─────────────────────────────────────────────── */
  if (expanded) {
    return (
      <div
        ref={containerRef}
        style={{ position: "fixed", zIndex: 9999, width: 280, ...posStyle }}
      >
        <div
          className="buddy-expand"
          style={{
            background: "#fff8f0",
            border: "2px solid #333130",
            borderRadius: 20,
            boxShadow: "4px 4px 0px #333130",
            overflow: "hidden",
          }}
        >
          {/* Drag handle */}
          <div
            onMouseDown={onMouseDown}
            style={{
              padding: "10px 16px 0",
              cursor: "grab",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <SittingCat style={{ width: 54, height: 54, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "var(--font-gaegu, cursive)",
                fontWeight: 700,
                fontSize: 13,
                color: "#333130",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {subject}
              </div>
              <div style={{
                display: "inline-block",
                background: phase === "focus" ? "#ff6445" : "#e3a164",
                color: "#fff8f0",
                borderRadius: 100,
                padding: "1px 8px",
                fontSize: 10,
                fontWeight: 700,
                fontFamily: "var(--font-gaegu, cursive)",
                marginTop: 3,
              }}>
                {phase === "focus" ? "Focus" : "Break"}
              </div>
              <div style={{
                fontFamily: "var(--font-gaegu, cursive)",
                fontWeight: 700,
                fontSize: 30,
                color: "#333130",
                lineHeight: 1.05,
                marginTop: 2,
              }}>
                {timeStr}
              </div>
            </div>
            {/* Close */}
            <button
              onClick={() => setExpanded(false)}
              style={{ position: "absolute", top: 10, right: 12, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#333130", opacity: 0.35, lineHeight: 1 }}
            >
              ×
            </button>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "10px 0 12px" }}>
            <button style={CTL} onClick={() => dispatch({ type: running ? "PAUSE" : "START" })}>
              {running ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button style={CTL} onClick={() => dispatch({ type: "RESET" })}><ResetIcon /></button>
            <button style={CTL} onClick={() => dispatch({ type: "SKIP" })}><SkipIcon /></button>
          </div>

          {/* Wobbly divider */}
          <div style={{ padding: "0 14px" }}>
            <svg width="100%" height="8" viewBox="0 0 252 8" preserveAspectRatio="none">
              <path d="M 0 4 Q 31 0 63 4 Q 95 8 126 4 Q 158 0 190 4 Q 221 8 252 4"
                stroke="#333130" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.25" />
            </svg>
          </div>

          {/* Task list */}
          <div style={{ padding: "8px 16px 10px", maxHeight: 140, overflowY: "auto" }}>
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                <button
                  onClick={() => dispatch({ type: "TOGGLE_TASK", id: task.id })}
                  style={{
                    width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                    border: `1.5px solid ${task.done ? "#ff6445" : "#87663e"}`,
                    background: task.done ? "#ff6445" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", padding: 0,
                  }}
                >
                  {task.done && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M 1 3.5 L 3.5 6 L 8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span style={{
                  fontSize: 12,
                  fontFamily: "var(--font-nunito, Nunito, sans-serif)",
                  fontWeight: 600,
                  color: "#333130",
                  opacity: task.done ? 0.4 : 1,
                  textDecoration: task.done ? "line-through" : "none",
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding: "6px 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(51,49,48,0.08)" }}>
            <span style={{ fontSize: 10, fontFamily: "var(--font-nunito, Nunito)", color: "#333130", opacity: 0.3, fontWeight: 600 }}>
              Bubble
            </span>
            <button
              onClick={() => { dispatch({ type: "END" }); setExpanded(false); }}
              style={{ fontSize: 11, fontFamily: "var(--font-nunito, Nunito)", fontWeight: 700, color: "#ff6445", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              End session
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── COLLAPSED ────────────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        zIndex: 9999,
        ...posStyle,
        width: 56,
        height: 56,
        cursor: isDragging ? "grabbing" : "pointer",
        userSelect: "none",
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {/* Pulse ring — active focus only */}
      {running && phase === "focus" && (
        <div
          className="buddy-pulse"
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            border: "2px solid #ff6445",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Cat bubble */}
      <div
        className={`cat-float-1 ${celebrating ? "buddy-celebrate" : ""}`}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#fff8f0",
          border: "2px solid #333130",
          boxShadow: "2px 2px 0px #333130",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <SittingCat style={{ width: 44, height: 44 }} />
      </div>

      {/* Timer / zzz badge */}
      {running ? (
        <div style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#fff8f0",
          border: "1.5px solid #ff6445",
          borderRadius: 100,
          padding: "0 5px",
          fontSize: 10,
          fontFamily: "var(--font-gaegu, cursive)",
          fontWeight: 700,
          color: "#ff6445",
          whiteSpace: "nowrap",
          lineHeight: "16px",
          pointerEvents: "none",
        }}>
          {timeStr}
        </div>
      ) : (
        <div style={{
          position: "absolute",
          top: -14,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 13,
          fontFamily: "var(--font-gaegu, cursive)",
          color: "#87663e",
          opacity: 0.65,
          pointerEvents: "none",
        }}>
          zzz
        </div>
      )}

      {/* Celebration pop */}
      {celebrating && (
        <div style={{
          position: "absolute",
          bottom: 64,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#ff6445",
          color: "#fff8f0",
          borderRadius: 100,
          padding: "3px 10px",
          fontSize: 11,
          fontFamily: "var(--font-gaegu, cursive)",
          fontWeight: 700,
          whiteSpace: "nowrap",
          boxShadow: "2px 2px 0px #333130",
          pointerEvents: "none",
        }}>
          {phase === "break" ? "Break time! ☀" : "Back to work!"}
        </div>
      )}
    </div>
  );
}
