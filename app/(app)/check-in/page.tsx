import { MoonIcon, BrainIcon, StarDoodle, WavyDoodle, DotsDoodle } from "../../components/icons";

const moods = [
  { emoji: "😴", label: "Tired" },
  { emoji: "😕", label: "Meh" },
  { emoji: "😊", label: "Good" },
  { emoji: "😄", label: "Great" },
  { emoji: "🤩", label: "Amazing" },
];

const weekMoods = ["😄", "😊", "😴", "😄", "😊", "🤩", "😊"];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const goals = [
  { text: "Finish Chapter 5 Mathematics review", done: true },
  { text: "Complete Physics practice problems", done: true },
  { text: "Draft English essay outline", done: false },
  { text: "Review Chemistry notes", done: true },
];

const selectedMood = 3;
const selectedEnergy = 2;

export default function CheckInPage() {
  const doneCount = goals.filter((g) => g.done).length;

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      <div className="mb-7">
        <h1 className="font-gaegu text-5xl font-bold text-ink flex items-center gap-3">
          <MoonIcon size={40} color="#333130" />
          Check-in
        </h1>
        <p className="text-ink/50 font-semibold mt-1">A moment to pause and reflect</p>
      </div>

      <div className="grid gap-3">

        <div className="bento-box rounded-[24px] bg-honey p-5 relative overflow-hidden flex items-center gap-4">
          <div className="absolute top-4 right-6 pointer-events-none">
            <StarDoodle color="#333130" size={16} opacity={0.25} />
          </div>
          <div className="w-14 h-14 rounded-[16px] bg-ink flex items-center justify-center flex-shrink-0" style={{ boxShadow: "2px 2px 0px rgba(51,49,48,0.2)" }}>
            <MoonIcon size={28} color="#fff8f0" />
          </div>
          <div>
            <div className="font-gaegu text-2xl font-bold text-ink">Sunday, June 29</div>
            <div className="text-sm font-semibold text-ink/55">How are you feeling today?</div>
          </div>
        </div>

        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden">
          <div className="absolute top-4 right-5 pointer-events-none">
            <WavyDoodle color="#87663e" opacity={0.2} width={55} />
          </div>
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-4">Today&apos;s Mood</h2>
          <div className="flex items-center justify-between gap-2">
            {moods.map(({ emoji, label }, i) => (
              <button
                key={label}
                className={`flex flex-col items-center gap-2 p-3.5 rounded-[16px] flex-1 transition-all ${
                  i === selectedMood
                    ? "bg-honey/40 border-2 border-honey"
                    : "hover:bg-linen border-2 border-transparent"
                }`}
                style={i === selectedMood ? { boxShadow: "2px 2px 0px rgba(51,49,48,0.15)" } : {}}
              >
                <span className="text-3xl">{emoji}</span>
                <span className={`text-xs font-bold ${i === selectedMood ? "text-ink" : "text-ink/45"}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden">
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-4">Energy Level</h2>
          <div className="flex items-center gap-3 mb-4">
            {[
              { label: "Low", value: 1, color: "#ff6445" },
              { label: "Medium", value: 2, color: "#e3a164" },
              { label: "High", value: 3, color: "#e2ab9a" },
            ].map(({ label, value, color }) => (
              <button
                key={label}
                className="flex-1 py-3 rounded-[14px] font-gaegu font-bold text-sm transition-all"
                style={
                  value === selectedEnergy
                    ? { background: color, color: "#333130", boxShadow: "2px 2px 0px #333130" }
                    : { background: `${color}18`, color: "#333130" }
                }
              >
                {label}
              </button>
            ))}
          </div>
          <div className="h-2.5 bg-linen rounded-full overflow-hidden border border-ink/10">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(selectedEnergy / 3) * 100}%`,
                background: "linear-gradient(to right, #ff6445, #e3a164, #e2ab9a)",
              }}
            />
          </div>
        </div>

        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden">
          <div className="absolute top-4 right-5 pointer-events-none">
            <DotsDoodle color="#87663e" opacity={0.2} count={3} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-gaegu text-2xl font-bold text-ink">Yesterday&apos;s Goals</h2>
            <span className="font-gaegu text-lg font-bold text-coral">{doneCount}/{goals.length}</span>
          </div>
          <div className="space-y-2.5">
            {goals.map((g, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-[14px]"
                style={{ background: g.done ? "rgba(255,100,69,0.08)" : "rgba(135,102,62,0.06)" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: g.done ? "#ff6445" : "rgba(135,102,62,0.2)" }}
                >
                  {g.done ? (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-bark/50" />
                  )}
                </div>
                <span className={`text-sm font-semibold ${g.done ? "text-ink" : "text-ink/40 line-through"}`}>
                  {g.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="h-2 bg-linen rounded-full overflow-hidden border border-ink/10">
              <div
                className="h-full rounded-full bg-coral"
                style={{ width: `${(doneCount / goals.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden">
          <div className="absolute top-4 right-5 pointer-events-none">
            <WavyDoodle color="#87663e" opacity={0.2} width={55} />
          </div>
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-2">Today&apos;s Intention</h2>
          <p className="text-sm font-semibold text-ink/45 mb-3">What do you want to accomplish today?</p>
          <textarea
            className="w-full bg-linen rounded-[16px] p-4 text-sm font-semibold text-ink placeholder:text-ink/30 resize-none border-2 border-ink/10 focus:outline-none focus:border-ink/30 transition-colors"
            rows={3}
            placeholder="Write your intention... ✦"
            defaultValue="Nail Chapter 5 calculus today and really understand integration techniques."
          />
        </div>

        <div className="bento-box rounded-[24px] bg-blush p-6 relative overflow-hidden">
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-4">This Week&apos;s Mood</h2>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{weekMoods[i]}</span>
                <span className="text-xs font-bold text-ink/50">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bento-box rounded-[24px] bg-ink p-5 relative overflow-hidden flex items-start gap-4">
          <div className="absolute top-4 right-5 pointer-events-none">
            <StarDoodle color="#fff8f0" size={16} opacity={0.4} />
          </div>
          <div className="w-10 h-10 rounded-full bg-parchment/12 flex items-center justify-center flex-shrink-0">
            <BrainIcon size={18} color="#fff8f0" />
          </div>
          <div>
            <h3 className="font-gaegu text-xl font-bold text-parchment mb-1">AI Insight ✦</h3>
            <p className="text-sm font-semibold text-parchment/65 leading-relaxed">
              You study best on <span className="text-honey font-bold">Saturdays and Sundays</span> — your mood is 😄/🤩 more often on weekends. Today looks great. Energy is medium, mood is great. Go for it!
            </p>
          </div>
        </div>

        <button className="btn-primary bg-coral text-parchment font-gaegu font-bold text-xl py-4 rounded-full flex items-center justify-center gap-2">
          ✦ Complete Check-in
        </button>

      </div>
    </div>
  );
}
