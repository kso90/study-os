"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import {
  OnboardingData,
  GradeLevel,
  StudyStyle,
  Struggle,
  defaultOnboardingData,
  loadOnboardingData,
  saveOnboardingData,
} from "../lib/onboarding";
import { SittingCat, CheeringCat } from "../components/cats";
import { StarDoodle } from "../components/icons";

const TOTAL_STEPS = 6;

const GRADE_OPTIONS: { value: GradeLevel; emoji: string; label: string }[] = [
  { value: "Middle School", emoji: "🎒", label: "Middle School" },
  { value: "High School", emoji: "📚", label: "High School" },
  { value: "College", emoji: "🎓", label: "College" },
  { value: "Other", emoji: "✦", label: "Other" },
];

const SUGGESTED_SUBJECTS = ["Math", "Science", "English", "History", "Language", "Art"];

const STUDY_STYLE_OPTIONS: { value: StudyStyle; emoji: string; label: string; sub: string }[] = [
  { value: "Visual", emoji: "👀", label: "Visual", sub: "Diagrams, colors, mind maps" },
  { value: "Reading", emoji: "📖", label: "Reading", sub: "Notes, textbooks, articles" },
  { value: "Practice problems", emoji: "✏️", label: "Practice problems", sub: "Drills, past papers, repetition" },
  { value: "Mixed", emoji: "🔀", label: "Mixed", sub: "A bit of everything" },
];

const STRUGGLE_OPTIONS: { value: Struggle; emoji: string; label: string }[] = [
  { value: "Distraction", emoji: "📱", label: "Distraction" },
  { value: "Procrastination", emoji: "⏳", label: "Procrastination" },
  { value: "Memory", emoji: "🧠", label: "Memory" },
  { value: "Time management", emoji: "⏰", label: "Time management" },
];

function hoursBlurb(h: number) {
  if (h <= 1) return "Every little bit counts.";
  if (h <= 2) return "Nice and steady.";
  if (h <= 4) return "Solid, focused effort.";
  return "Study machine mode.";
}

/* ── Reusable single-select option card ─────────────────────── */
function OptionCard({
  emoji,
  label,
  sub,
  selected,
  onClick,
}: {
  emoji: string;
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        textAlign: "left",
        padding: "14px 16px",
        borderRadius: 16,
        border: "2px solid #333130",
        background: selected ? "#ff6445" : "#fff8f0",
        color: selected ? "#fff8f0" : "#333130",
        boxShadow: selected ? "3px 3px 0px #333130" : "2px 2px 0px rgba(51,49,48,0.2)",
        cursor: "pointer",
        transition: "transform 120ms ease, box-shadow 120ms ease",
        marginBottom: 10,
      }}
    >
      <span style={{ fontSize: 22, lineHeight: 1 }}>{emoji}</span>
      <span style={{ flex: 1 }}>
        <span className="font-gaegu" style={{ display: "block", fontWeight: 700, fontSize: 16 }}>
          {label}
        </span>
        {sub && (
          <span className="font-nunito" style={{ display: "block", fontSize: 12, fontWeight: 600, opacity: 0.75, marginTop: 2 }}>
            {sub}
          </span>
        )}
      </span>
      {selected && <span style={{ fontWeight: 900 }}>✓</span>}
    </button>
  );
}

const heading: CSSProperties = { fontWeight: 700, fontSize: 24, color: "#333130", marginBottom: 6 };
const subheading: CSSProperties = { fontSize: 14, fontWeight: 600, color: "rgba(51,49,48,0.6)", marginBottom: 22 };

/* ── Step 1 ───────────────────────────────────────────────────── */
function StepGrade({ data, setData }: { data: OnboardingData; setData: (fn: (d: OnboardingData) => OnboardingData) => void }) {
  return (
    <div>
      <h2 className="font-gaegu" style={heading}>What&apos;s your grade or school level?</h2>
      <p className="font-nunito" style={subheading}>This helps us tailor your dashboard and workload.</p>
      {GRADE_OPTIONS.map((opt) => (
        <OptionCard
          key={opt.value}
          emoji={opt.emoji}
          label={opt.label}
          selected={data.gradeLevel === opt.value}
          onClick={() => setData((d) => ({ ...d, gradeLevel: opt.value }))}
        />
      ))}
    </div>
  );
}

/* ── Step 2 ───────────────────────────────────────────────────── */
function StepSubjects({
  data,
  subjectInput,
  setSubjectInput,
  addSubject,
  removeSubject,
}: {
  data: OnboardingData;
  subjectInput: string;
  setSubjectInput: (v: string) => void;
  addSubject: (v: string) => void;
  removeSubject: (v: string) => void;
}) {
  return (
    <div>
      <h2 className="font-gaegu" style={heading}>What are you mainly studying?</h2>
      <p className="font-nunito" style={subheading}>Add your subjects — you can always change these later.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSubject(subjectInput);
        }}
        style={{ display: "flex", gap: 8, marginBottom: 14 }}
      >
        <input
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          placeholder="e.g. Biology"
          className="font-nunito"
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 999,
            border: "2px solid #333130",
            background: "#fff8f0",
            fontSize: 14,
            fontWeight: 600,
            outline: "none",
          }}
        />
        <button
          type="submit"
          className="btn-primary font-gaegu"
          style={{
            padding: "10px 20px",
            borderRadius: 999,
            border: "2px solid #333130",
            background: "#ff6445",
            color: "#fff8f0",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {data.subjects.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {data.subjects.map((s) => (
            <span
              key={s}
              className="font-nunito"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 8px 6px 14px",
                borderRadius: 999,
                background: "#e3a164",
                border: "2px solid #333130",
                fontWeight: 700,
                fontSize: 13,
                color: "#333130",
              }}
            >
              {s}
              <button
                type="button"
                onClick={() => removeSubject(s)}
                aria-label={`Remove ${s}`}
                style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 900, lineHeight: 1, padding: 0, color: "#333130" }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <p className="font-nunito" style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, marginBottom: 8 }}>
        QUICK ADD
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SUGGESTED_SUBJECTS.filter((s) => !data.subjects.includes(s)).map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => addSubject(s)}
            className="font-nunito"
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              border: "2px dashed rgba(51,49,48,0.35)",
              background: "transparent",
              fontWeight: 700,
              fontSize: 13,
              color: "rgba(51,49,48,0.6)",
              cursor: "pointer",
            }}
          >
            + {s}
          </button>
        ))}
      </div>

      {data.subjects.length === 0 && (
        <p className="font-nunito" style={{ fontSize: 12, fontWeight: 600, color: "#ff6445", marginTop: 14 }}>
          Add at least one subject to continue.
        </p>
      )}
    </div>
  );
}

/* ── Step 3 ───────────────────────────────────────────────────── */
function StepStudyStyle({ data, setData }: { data: OnboardingData; setData: (fn: (d: OnboardingData) => OnboardingData) => void }) {
  return (
    <div>
      <h2 className="font-gaegu" style={heading}>How do you study best?</h2>
      <p className="font-nunito" style={subheading}>We&apos;ll shape your Focus Sessions around this.</p>
      {STUDY_STYLE_OPTIONS.map((opt) => (
        <OptionCard
          key={opt.value}
          emoji={opt.emoji}
          label={opt.label}
          sub={opt.sub}
          selected={data.studyStyle === opt.value}
          onClick={() => setData((d) => ({ ...d, studyStyle: opt.value }))}
        />
      ))}
    </div>
  );
}

/* ── Step 4 ───────────────────────────────────────────────────── */
function StepStruggle({ data, setData }: { data: OnboardingData; setData: (fn: (d: OnboardingData) => OnboardingData) => void }) {
  return (
    <div>
      <h2 className="font-gaegu" style={heading}>What&apos;s your biggest struggle?</h2>
      <p className="font-nunito" style={subheading}>Be honest — this is what Focus Shield will target first.</p>
      {STRUGGLE_OPTIONS.map((opt) => (
        <OptionCard
          key={opt.value}
          emoji={opt.emoji}
          label={opt.label}
          selected={data.struggle === opt.value}
          onClick={() => setData((d) => ({ ...d, struggle: opt.value }))}
        />
      ))}
    </div>
  );
}

/* ── Step 5 ───────────────────────────────────────────────────── */
function StepHours({ data, setData }: { data: OnboardingData; setData: (fn: (d: OnboardingData) => OnboardingData) => void }) {
  return (
    <div>
      <h2 className="font-gaegu" style={heading}>How many hours can you study per day?</h2>
      <p className="font-nunito" style={subheading}>We&apos;ll pace your planner to match — no burnout.</p>

      <div className="font-gaegu" style={{ textAlign: "center", color: "#333130", marginBottom: 6 }}>
        <span style={{ fontSize: 52, fontWeight: 700 }}>{data.hoursPerDay}</span>
        <span style={{ fontSize: 18, fontWeight: 700, opacity: 0.6 }}> hrs/day</span>
      </div>

      <input
        type="range"
        min={0.5}
        max={8}
        step={0.5}
        value={data.hoursPerDay}
        onChange={(e) => setData((d) => ({ ...d, hoursPerDay: parseFloat(e.target.value) }))}
        style={{ width: "100%", accentColor: "#ff6445" }}
      />
      <div className="font-nunito" style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, opacity: 0.45 }}>
        <span>30 min</span>
        <span>8+ hrs</span>
      </div>

      <p className="font-nunito" style={{ textAlign: "center", marginTop: 18, fontWeight: 700, color: "#87663e" }}>
        {hoursBlurb(data.hoursPerDay)}
      </p>
    </div>
  );
}

/* ── Step 6 ───────────────────────────────────────────────────── */
function ToolRow({
  emoji,
  name,
  description,
  connected,
  onToggle,
}: {
  emoji: string;
  name: string;
  description: string;
  connected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 16,
        border: "2px solid #333130",
        background: "#fff8f0",
        marginBottom: 12,
      }}
    >
      <span style={{ fontSize: 26 }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div className="font-gaegu" style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
        <div className="font-nunito" style={{ fontSize: 12.5, fontWeight: 600, opacity: 0.65 }}>{description}</div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={connected ? "" : "btn-primary"}
        style={{
          fontFamily: "var(--font-gaegu, cursive)",
          fontWeight: 700,
          fontSize: 13,
          padding: "8px 16px",
          borderRadius: 999,
          border: "2px solid #333130",
          background: connected ? "#e8d6c0" : "#ff6445",
          color: connected ? "#333130" : "#fff8f0",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {connected ? "Connected ✓" : "Connect"}
      </button>
    </div>
  );
}

function StepTools({
  data,
  toggleTool,
  onSkip,
}: {
  data: OnboardingData;
  toggleTool: (tool: keyof OnboardingData["tools"]) => void;
  onSkip: () => void;
}) {
  return (
    <div>
      <h2 className="font-gaegu" style={heading}>Connect your tools</h2>
      <p className="font-nunito" style={subheading}>Optional — link these now or add them later from Settings.</p>

      <ToolRow
        emoji="📅"
        name="Google Calendar"
        description="Sync deadlines and study blocks automatically."
        connected={data.tools.googleCalendar}
        onToggle={() => toggleTool("googleCalendar")}
      />
      <ToolRow
        emoji="🗒️"
        name="Notion"
        description="Import your notes and reading lists."
        connected={data.tools.notion}
        onToggle={() => toggleTool("notion")}
      />

      <button
        type="button"
        onClick={onSkip}
        className="font-nunito"
        style={{
          display: "block",
          margin: "10px auto 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 700,
          color: "rgba(51,49,48,0.55)",
          textDecoration: "underline",
        }}
      >
        Skip for now, I&apos;ll connect later →
      </button>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);
  const [subjectInput, setSubjectInput] = useState("");

  useEffect(() => {
    const existing = loadOnboardingData();
    if (!existing.completed) setData(existing);
  }, []);

  function addSubject(raw: string) {
    const value = raw.trim();
    if (!value) return;
    setData((d) => (d.subjects.includes(value) ? d : { ...d, subjects: [...d.subjects, value] }));
    setSubjectInput("");
  }

  function removeSubject(subject: string) {
    setData((d) => ({ ...d, subjects: d.subjects.filter((s) => s !== subject) }));
  }

  function toggleTool(tool: keyof OnboardingData["tools"]) {
    setData((d) => ({ ...d, tools: { ...d.tools, [tool]: !d.tools[tool] } }));
  }

  function finish() {
    saveOnboardingData({ ...data, completed: true, completedAt: new Date().toISOString() });
    router.replace("/dashboard");
  }

  function goNext() {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else finish();
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  const canContinue =
    (step === 1 && !!data.gradeLevel) ||
    (step === 2 && data.subjects.length > 0) ||
    (step === 3 && !!data.studyStyle) ||
    (step === 4 && !!data.struggle) ||
    step === 5 ||
    step === 6;

  return (
    <div style={{ minHeight: "100vh", background: "#e8d6c0", position: "relative", overflow: "hidden" }}>
      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 6, background: "rgba(51,49,48,0.1)", zIndex: 20 }}>
        <div
          style={{
            height: "100%",
            width: `${(step / TOTAL_STEPS) * 100}%`,
            background: "#ff6445",
            transition: "width 320ms ease",
          }}
        />
      </div>

      {/* Decorative doodles */}
      <div style={{ position: "absolute", top: 44, left: 44, opacity: 0.5 }}>
        <StarDoodle size={22} />
      </div>
      <div style={{ position: "absolute", bottom: 64, right: 64, opacity: 0.5 }}>
        <StarDoodle size={16} />
      </div>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 16px 32px",
        }}
      >
        <div
          className="font-nunito"
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(51,49,48,0.45)",
            marginBottom: 12,
          }}
        >
          Step {step} of {TOTAL_STEPS}
        </div>

        <div
          key={step}
          className="bento-box animate-fade-up"
          style={{
            background: "#fff8f0",
            borderRadius: 28,
            padding: "36px 32px",
            width: "100%",
            maxWidth: 480,
          }}
        >
          {step === 1 && <StepGrade data={data} setData={setData} />}
          {step === 2 && (
            <StepSubjects
              data={data}
              subjectInput={subjectInput}
              setSubjectInput={setSubjectInput}
              addSubject={addSubject}
              removeSubject={removeSubject}
            />
          )}
          {step === 3 && <StepStudyStyle data={data} setData={setData} />}
          {step === 4 && <StepStruggle data={data} setData={setData} />}
          {step === 5 && <StepHours data={data} setData={setData} />}
          {step === 6 && <StepTools data={data} toggleTool={toggleTool} onSkip={finish} />}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 30 }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="btn-outline font-gaegu"
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "2px solid #333130",
                  background: "#fff8f0",
                  color: "#333130",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              className="btn-primary font-gaegu"
              style={{
                padding: "10px 26px",
                borderRadius: 999,
                border: "2px solid #333130",
                background: "#ff6445",
                color: "#fff8f0",
                fontWeight: 700,
                fontSize: 14,
                opacity: canContinue ? 1 : 0.4,
                cursor: canContinue ? "pointer" : "not-allowed",
              }}
            >
              {step === TOTAL_STEPS ? "Enter Bubble →" : "Continue"}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 26 }}>
          {step === TOTAL_STEPS ? <CheeringCat /> : <SittingCat />}
        </div>
      </div>
    </div>
  );
}
