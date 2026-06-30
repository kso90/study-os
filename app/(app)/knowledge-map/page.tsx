import { BrainIcon, StarDoodle, WavyDoodle, DotsDoodle, ArrowDoodle } from "../../components/icons";

const subjects = [
  {
    name: "Mathematics", emoji: "📐", color: "#ff6445", mastery: 72,
    topics: [
      { name: "Calculus", pct: 85 }, { name: "Linear Algebra", pct: 60 },
      { name: "Statistics", pct: 78 }, { name: "Number Theory", pct: 45 },
    ],
  },
  {
    name: "Physics", emoji: "⚛️", color: "#87663e", mastery: 58,
    topics: [
      { name: "Mechanics", pct: 75 }, { name: "Quantum", pct: 40 },
      { name: "Electromagnetism", pct: 65 }, { name: "Thermodynamics", pct: 50 },
    ],
  },
  {
    name: "Chemistry", emoji: "🧪", color: "#e3a164", mastery: 64,
    topics: [
      { name: "Organic", pct: 70 }, { name: "Periodic Table", pct: 90 },
      { name: "Reactions", pct: 55 }, { name: "Bonding", pct: 40 },
    ],
  },
  {
    name: "English", emoji: "📖", color: "#e2ab9a", mastery: 81,
    topics: [
      { name: "Essay Writing", pct: 80 }, { name: "Shakespeare", pct: 70 },
      { name: "Grammar", pct: 95 }, { name: "Poetry", pct: 65 },
    ],
  },
  {
    name: "Biology", emoji: "🌱", color: "#ff6445", mastery: 49,
    topics: [
      { name: "Cell Biology", pct: 60 }, { name: "Genetics", pct: 45 },
      { name: "Evolution", pct: 40 }, { name: "Ecology", pct: 55 },
    ],
  },
  {
    name: "History", emoji: "🏛️", color: "#87663e", mastery: 67,
    topics: [
      { name: "WW2", pct: 85 }, { name: "Ancient Rome", pct: 60 },
      { name: "Industrial Rev.", pct: 70 }, { name: "Cold War", pct: 55 },
    ],
  },
];

const overall = Math.round(subjects.reduce((s, x) => s + x.mastery, 0) / subjects.length);

const bgColors = ["bg-parchment", "bg-linen", "bg-parchment", "bg-linen", "bg-parchment", "bg-linen"];

export default function KnowledgeMapPage() {
  return (
    <div className="animate-fade-up max-w-5xl mx-auto">
      <div className="mb-7">
        <h1 className="font-gaegu text-5xl font-bold text-ink flex items-center gap-3">
          <BrainIcon size={40} color="#333130" />
          Knowledge Map
        </h1>
        <p className="text-ink/50 font-semibold mt-1">Track mastery across all subjects</p>
      </div>

      <div className="bento-box rounded-[24px] bg-ink p-6 relative overflow-hidden mb-3">
        <div className="absolute top-5 right-7 pointer-events-none">
          <StarDoodle color="#fff8f0" size={18} opacity={0.4} />
        </div>
        <div className="absolute bottom-5 right-1/3 pointer-events-none">
          <WavyDoodle color="#fff8f0" opacity={0.12} width={80} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-gaegu text-2xl font-bold text-parchment">Overall Mastery</h2>
            <p className="text-parchment/50 text-sm font-semibold">
              {subjects.length} subjects · {subjects.reduce((s, x) => s + x.topics.length, 0)} topics tracked
            </p>
          </div>
          <div className="font-gaegu text-6xl font-bold text-parchment leading-none">
            {overall}<span className="text-3xl text-parchment/40">%</span>
          </div>
        </div>
        <div className="h-3 bg-parchment/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${overall}%`, background: "linear-gradient(to right, #ff6445, #e3a164)" }}
          />
        </div>
      </div>

      <div className="bento-box rounded-[24px] bg-honey p-5 relative overflow-hidden mb-3 flex items-start gap-4">
        <div className="absolute top-3 right-5 pointer-events-none">
          <ArrowDoodle color="#333130" opacity={0.18} />
        </div>
        <div className="w-10 h-10 rounded-full bg-ink/10 flex items-center justify-center flex-shrink-0">
          <BrainIcon size={18} color="#333130" />
        </div>
        <div>
          <h3 className="font-gaegu text-lg font-bold text-ink mb-0.5">AI Suggestion ✦</h3>
          <p className="text-sm font-semibold text-ink/70 leading-relaxed">
            Your weakest area is <span className="font-bold text-ink">Biology — Genetics (45%)</span>.
            A 45-min review session this week could push it past 55%.
          </p>
          <button className="mt-2.5 btn-primary bg-ink text-parchment font-gaegu font-bold text-sm px-4 py-1.5 rounded-full">
            Add to Planner →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {subjects.map((s, idx) => (
          <div key={s.name} className={`bento-box rounded-[24px] ${bgColors[idx]} p-5 relative overflow-hidden group cursor-pointer`}>
            <div className="absolute top-3 right-4 pointer-events-none">
              <DotsDoodle color="#333130" opacity={0.15} count={2} />
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{s.emoji}</span>
                <h3 className="font-gaegu text-lg font-bold text-ink">{s.name}</h3>
              </div>
              <span className="font-gaegu text-xl font-bold" style={{ color: s.color }}>
                {s.mastery}%
              </span>
            </div>

            <div className="h-2.5 bg-linen rounded-full overflow-hidden border border-ink/8 mb-4">
              <div className="h-full rounded-full" style={{ width: `${s.mastery}%`, background: s.color }} />
            </div>

            <div className="space-y-2">
              {s.topics.map((t) => (
                <div key={t.name} className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-ink/50 w-24 truncate flex-shrink-0">{t.name}</span>
                  <div className="flex-1 h-1.5 bg-linen rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${t.pct}%`, background: s.color, opacity: 0.6 }} />
                  </div>
                  <span className="text-xs font-bold text-ink/45 w-8 text-right">{t.pct}%</span>
                </div>
              ))}
            </div>

            <div className="mt-3 text-xs font-bold text-ink/30 group-hover:text-ink/60 transition-colors">
              View details →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
