import { TimerIcon, StarDoodle, WavyDoodle, DotsDoodle } from "../../components/icons";

const R = 80;
const CIRC = 2 * Math.PI * R;
const progress = 0.62;

const recentSessions = [
  { subject: "Mathematics", topic: "Calculus Chapter 4", duration: "25 min", color: "#ff6445" },
  { subject: "Physics", topic: "Quantum Mechanics", duration: "25 min", color: "#87663e" },
  { subject: "Chemistry", topic: "Periodic Table", duration: "25 min", color: "#e3a164" },
];

export default function SessionPage() {
  return (
    <div className="animate-fade-up max-w-3xl mx-auto">
      <div className="mb-7">
        <h1 className="font-gaegu text-5xl font-bold text-ink flex items-center gap-3">
          <TimerIcon size={40} color="#333130" />
          Session
        </h1>
        <p className="text-ink/50 font-semibold mt-1">Stay in the zone, one pomodoro at a time</p>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr", gridAutoRows: "auto" }}>

        {/* Timer — full width */}
        <div className="bento-box rounded-[24px] bg-parchment p-8 relative overflow-hidden" style={{ gridColumn: "1 / 3" }}>
          <div className="absolute top-5 right-7 pointer-events-none">
            <StarDoodle color="#87663e" size={20} opacity={0.3} />
          </div>
          <div className="absolute bottom-6 left-8 pointer-events-none">
            <WavyDoodle color="#87663e" opacity={0.18} width={70} />
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {["Pomodoro", "Short Break", "Long Break"].map((t, i) => (
              <button
                key={t}
                className={`px-4 py-1.5 rounded-full font-gaegu font-bold text-sm transition-all ${i === 0 ? "bg-ink text-parchment" : "text-ink/50 hover:text-ink hover:bg-linen"}`}
                style={i === 0 ? { boxShadow: "2px 2px 0px rgba(51,49,48,0.2)" } : {}}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <svg width={R * 2 + 30} height={R * 2 + 30} viewBox={`0 0 ${R * 2 + 30} ${R * 2 + 30}`}>
                <circle cx={R + 15} cy={R + 15} r={R} fill="none" stroke="#e8d6c0" strokeWidth="10" />
                <circle cx={R + 15} cy={R + 15} r={R} fill="none" stroke="#ff6445" strokeWidth="10"
                  strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)}
                  transform={`rotate(-90 ${R + 15} ${R + 15})`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-gaegu text-6xl font-bold text-ink tabular-nums">15:30</span>
                <span className="text-sm font-semibold text-ink/45 mt-1">remaining</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-7">
            <div className="flex items-center gap-2 bg-linen px-5 py-2 rounded-full border border-ink/12">
              <div className="w-2 h-2 rounded-full bg-coral" />
              <span className="font-gaegu font-bold text-sm text-ink">Mathematics — Chapter 5</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5">
            <button className="btn-outline w-11 h-11 rounded-full bg-linen border border-ink/15 flex items-center justify-center text-ink/60 hover:text-ink transition-colors font-bold text-lg">↺</button>
            <button className="btn-primary w-16 h-16 rounded-full bg-coral text-parchment flex items-center justify-center" style={{ boxShadow: "3px 3px 0px #333130" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="4" y="3" width="4.5" height="16" rx="1.5" fill="white" />
                <rect x="13.5" y="3" width="4.5" height="16" rx="1.5" fill="white" />
              </svg>
            </button>
            <button className="btn-outline w-11 h-11 rounded-full bg-linen border border-ink/15 flex items-center justify-center text-ink/60 hover:text-ink transition-colors font-bold text-xl">›</button>
          </div>

          <p className="text-center text-xs font-semibold text-ink/35 mt-5">Session 3 of 4 today — break after this one!</p>
        </div>

        {[
          { value: "3", label: "Sessions Done", bg: "bg-coral", text: "text-parchment", doodle: <StarDoodle color="#fff8f0" size={16} opacity={0.4} /> },
          { value: "75m", label: "Focus Time", bg: "bg-honey", text: "text-ink", doodle: <DotsDoodle color="#333130" opacity={0.2} /> },
          { value: "2", label: "Subjects", bg: "bg-blush", text: "text-ink", doodle: <WavyDoodle color="#333130" opacity={0.2} width={45} /> },
        ].map((s) => (
          <div key={s.label} className={`bento-box rounded-[24px] ${s.bg} p-5 relative overflow-hidden`} style={{ gridColumn: "auto" }}>
            <div className="absolute bottom-3 right-4 pointer-events-none">{s.doodle}</div>
            <div className={`font-gaegu text-5xl font-bold ${s.text} leading-none`}>{s.value}</div>
            <div className={`font-semibold text-sm mt-1.5 ${s.text} opacity-65`}>{s.label}</div>
          </div>
        ))}

        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden" style={{ gridColumn: "1 / 3" }}>
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-4">Today&apos;s Sessions</h2>
          <div className="space-y-3">
            {recentSessions.map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-3.5 rounded-[16px] bg-linen/50 border border-ink/8">
                <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <div className="flex-1">
                  <div className="font-bold text-sm text-ink">{s.subject}</div>
                  <div className="text-xs text-ink/45 font-medium">{s.topic}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-bold text-ink/55 bg-linen px-3 py-1 rounded-full border border-ink/12">{s.duration}</span>
                  <div className="w-5 h-5 rounded-full bg-coral/15 flex items-center justify-center">
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="#ff6445" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
