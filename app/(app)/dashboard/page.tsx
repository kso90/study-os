import Link from "next/link";
import { BrainIcon, TimerIcon, CalendarIcon, StarDoodle, WavyDoodle, DotsDoodle, ArrowDoodle } from "../../components/icons";

const todayTasks = [
  { subject: "Math", title: "Chapter 5 Review", duration: "90m", color: "#ff6445", done: false },
  { subject: "Physics", title: "Quantum Mechanics", duration: "60m", color: "#87663e", done: true },
  { subject: "English", title: "Essay Draft", duration: "45m", color: "#e3a164", done: false },
];

const subjects = [
  { name: "Math", pct: 72, color: "#ff6445" },
  { name: "Physics", pct: 58, color: "#87663e" },
  { name: "Chemistry", pct: 64, color: "#e3a164" },
  { name: "English", pct: 81, color: "#e2ab9a" },
  { name: "Biology", pct: 49, color: "#87663e" },
];

export default function DashboardPage() {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-gaegu text-5xl font-bold text-ink">Good morning ✦</h1>
        <p className="text-ink/55 font-semibold mt-1 text-base">Sunday, June 29 — let&apos;s make it count</p>
      </div>

      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "minmax(160px, auto)",
        }}
      >
        {/* ① Today's Plan — 2×1 */}
        <div
          className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden"
          style={{ gridColumn: "1 / 3", gridRow: "1 / 2" }}
        >
          <div className="absolute top-4 right-5 pointer-events-none">
            <WavyDoodle color="#87663e" opacity={0.22} width={56} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-gaegu text-2xl font-bold text-ink">Today&apos;s Plan</h2>
            <span className="text-xs font-bold text-ink/40 bg-linen px-3 py-1 rounded-full border border-ink/10">
              3 tasks
            </span>
          </div>
          <div className="space-y-2.5">
            {todayTasks.map((t, i) => (
              <div key={i} className={`flex items-center gap-3 ${t.done ? "opacity-45" : ""}`}>
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: t.color, background: t.done ? t.color : "transparent" }}
                >
                  {t.done && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={`flex-1 text-sm font-semibold ${t.done ? "line-through text-ink/40" : "text-ink"}`}>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full mr-2" style={{ background: `${t.color}22`, color: t.color }}>
                    {t.subject}
                  </span>
                  {t.title}
                </span>
                <span className="text-xs font-semibold text-ink/35 flex-shrink-0">{t.duration}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold text-ink/40 mb-1.5">
              <span>Progress</span><span>1 / 3 done</span>
            </div>
            <div className="h-2 bg-linen rounded-full overflow-hidden border border-ink/10">
              <div className="h-full rounded-full bg-coral" style={{ width: "33%" }} />
            </div>
          </div>
        </div>

        {/* ② Streak — 1×2 tall */}
        <div
          className="bento-box rounded-[24px] bg-coral p-6 relative overflow-hidden flex flex-col"
          style={{ gridColumn: "3 / 4", gridRow: "1 / 3" }}
        >
          <div className="absolute top-4 right-5 pointer-events-none">
            <StarDoodle color="#fff8f0" size={18} opacity={0.45} />
          </div>
          <div className="absolute bottom-10 left-4 pointer-events-none">
            <DotsDoodle color="#fff8f0" opacity={0.3} count={3} />
          </div>
          <h2 className="font-gaegu text-xl font-bold text-parchment/80">streak</h2>
          <div className="flex-1 flex items-center justify-center flex-col">
            <div className="font-gaegu text-[7rem] font-bold text-parchment leading-none tracking-tight">7</div>
            <div className="font-gaegu text-xl text-parchment/75 -mt-2">days in a row!</div>
          </div>
          <p className="text-parchment/60 text-sm font-semibold leading-relaxed">
            One more to hit 8 — don&apos;t break the chain ✦
          </p>
        </div>

        {/* ③ Focus Score — 1×1 */}
        <div
          className="bento-box rounded-[24px] bg-blush p-6 relative overflow-hidden"
          style={{ gridColumn: "1 / 2", gridRow: "2 / 3" }}
        >
          <div className="absolute bottom-4 right-4 pointer-events-none">
            <WavyDoodle color="#333130" opacity={0.18} width={50} />
          </div>
          <h2 className="font-gaegu text-xl font-bold text-ink mb-1">Focus Score</h2>
          <div className="flex items-end gap-1">
            <span className="font-gaegu text-6xl font-bold text-ink leading-none">87</span>
            <span className="font-gaegu text-2xl text-ink/45 mb-2">%</span>
          </div>
          <p className="text-ink/55 text-sm font-semibold mt-1">Great concentration!</p>
          <div className="mt-3 h-2 bg-ink/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-ink/50" style={{ width: "87%" }} />
          </div>
        </div>

        {/* ④ Knowledge Map preview — 1×2 tall */}
        <div
          className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden"
          style={{ gridColumn: "2 / 3", gridRow: "2 / 4" }}
        >
          <div className="absolute top-4 right-5 pointer-events-none">
            <StarDoodle color="#87663e" size={12} opacity={0.3} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-gaegu text-xl font-bold text-ink">Knowledge Map</h2>
            <BrainIcon size={18} color="#87663e" />
          </div>
          <div className="space-y-3.5">
            {subjects.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm font-semibold text-ink mb-1">
                  <span>{s.name}</span>
                  <span className="text-ink/45">{s.pct}%</span>
                </div>
                <div className="h-2 bg-linen rounded-full overflow-hidden border border-ink/8">
                  <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <Link href="/knowledge-map" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-ink/40 hover:text-ink transition-colors">
            View full map →
          </Link>
        </div>

        {/* ⑤ Quick Start — 1×1 */}
        <div
          className="bento-box rounded-[24px] bg-honey p-6 relative overflow-hidden"
          style={{ gridColumn: "1 / 2", gridRow: "3 / 4" }}
        >
          <div className="absolute top-3 right-4 pointer-events-none">
            <ArrowDoodle color="#333130" opacity={0.2} />
          </div>
          <h2 className="font-gaegu text-xl font-bold text-ink mb-4">Quick Start</h2>
          <div className="flex flex-col gap-2.5">
            <Link href="/session" className="btn-primary flex items-center justify-center gap-2 bg-ink text-parchment font-gaegu font-bold text-sm px-4 py-2.5 rounded-full">
              <TimerIcon size={15} color="#fff8f0" />
              Start Session
            </Link>
            <Link href="/planner" className="btn-outline flex items-center justify-center gap-2 bg-parchment text-ink font-gaegu font-bold text-sm px-4 py-2.5 rounded-full border border-ink/20">
              <CalendarIcon size={15} color="#333130" />
              Open Planner
            </Link>
          </div>
        </div>

        {/* ⑥ Deadline — 1×1 */}
        <div
          className="bento-box rounded-[24px] bg-bark p-6 relative overflow-hidden flex flex-col justify-between"
          style={{ gridColumn: "3 / 4", gridRow: "3 / 4" }}
        >
          <div className="absolute bottom-5 right-5 pointer-events-none">
            <DotsDoodle color="#fff8f0" opacity={0.25} count={3} />
          </div>
          <h2 className="font-gaegu text-xl font-bold text-parchment/75">Next Deadline</h2>
          <div>
            <div className="font-gaegu text-5xl font-bold text-parchment leading-none">3</div>
            <div className="font-gaegu text-lg text-parchment/65">days left</div>
          </div>
          <div className="text-sm font-semibold text-parchment/60">English Essay</div>
        </div>

        {/* ⑦ AI Insight — full width */}
        <div
          className="bento-box rounded-[24px] bg-ink p-6 relative overflow-hidden"
          style={{ gridColumn: "1 / 4", gridRow: "4 / 5" }}
        >
          <div className="absolute top-5 right-8 pointer-events-none">
            <StarDoodle color="#fff8f0" size={20} opacity={0.4} />
          </div>
          <div className="absolute bottom-5 left-1/2 pointer-events-none">
            <WavyDoodle color="#fff8f0" opacity={0.1} width={100} />
          </div>
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-parchment/12 flex items-center justify-center flex-shrink-0 mt-0.5">
              <BrainIcon size={20} color="#fff8f0" />
            </div>
            <div>
              <h2 className="font-gaegu text-2xl font-bold text-parchment mb-1.5">AI Study Insight ✦</h2>
              <p className="text-parchment/70 font-semibold text-sm leading-relaxed max-w-3xl">
                Your strongest study day is <span className="text-honey font-bold">Saturday</span> — you complete 2.3× more tasks than average.
                Weakest subject: <span className="text-coral font-bold">Biology (49%)</span>. A focused 30-min review today would push you past 50% mastery.
                You&apos;re on a <span className="text-honey font-bold">7-day streak</span> — your longest yet. Keep going!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
