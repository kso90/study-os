import { CalendarIcon, StarDoodle, WavyDoodle, DotsDoodle } from "../../components/icons";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [23, 24, 25, 26, 27, 28, 29];
const todayDate = 29;

const tasks = [
  { id: 1, subject: "Mathematics", title: "Chapter 5 — Calculus Review", time: "9:00 AM", duration: "90 min", color: "#ff6445", priority: "high", done: false },
  { id: 2, subject: "Physics", title: "Quantum Mechanics Intro", time: "11:00 AM", duration: "60 min", color: "#87663e", priority: "medium", done: true },
  { id: 3, subject: "English", title: "Essay Draft — Shakespeare", time: "2:00 PM", duration: "45 min", color: "#e3a164", priority: "medium", done: false },
  { id: 4, subject: "Chemistry", title: "Periodic Table Study", time: "4:00 PM", duration: "30 min", color: "#e2ab9a", priority: "low", done: false },
  { id: 5, subject: "Biology", title: "Cell Division Notes", time: "5:00 PM", duration: "45 min", color: "#87663e", priority: "low", done: false },
];

const priorityBg: Record<string, string> = {
  high: "#ff6445",
  medium: "#e3a164",
  low: "#e2ab9a",
};

export default function PlannerPage() {
  return (
    <div className="animate-fade-up max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="font-gaegu text-5xl font-bold text-ink flex items-center gap-3">
            <CalendarIcon size={40} color="#333130" />
            Planner
          </h1>
          <p className="text-ink/50 font-semibold mt-1">Plan your week, one session at a time</p>
        </div>
        <button className="btn-primary bg-ink text-parchment font-gaegu font-bold text-base px-6 py-2.5 rounded-full flex items-center gap-2">
          + Add Task
        </button>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr", gridAutoRows: "auto" }}>

        {/* Week strip — full width */}
        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden" style={{ gridColumn: "1 / 3" }}>
          <div className="absolute top-4 right-6 pointer-events-none">
            <WavyDoodle color="#87663e" opacity={0.2} width={60} />
          </div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-gaegu text-2xl font-bold text-ink">June 2026</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-linen border border-ink/15 flex items-center justify-center text-ink/60 hover:text-ink transition-colors font-bold">‹</button>
              <span className="text-sm font-semibold text-ink/50 px-1">Week 26</span>
              <button className="w-8 h-8 rounded-full bg-linen border border-ink/15 flex items-center justify-center text-ink/60 hover:text-ink transition-colors font-bold">›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => {
              const date = dates[i];
              const isToday = date === todayDate;
              return (
                <div
                  key={day}
                  className={`flex flex-col items-center gap-1.5 py-3.5 rounded-[18px] cursor-pointer transition-all ${isToday ? "bg-coral text-parchment" : "hover:bg-linen"}`}
                  style={isToday ? { boxShadow: "2px 2px 0px #333130" } : {}}
                >
                  <span className={`text-xs font-bold ${isToday ? "text-parchment/70" : "text-ink/45"}`}>{day}</span>
                  <span className={`font-gaegu text-xl font-bold ${isToday ? "text-parchment" : "text-ink"}`}>{date}</span>
                  {isToday && <div className="w-1.5 h-1.5 rounded-full bg-parchment/60" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Task list — left col */}
        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden" style={{ gridColumn: "1 / 2" }}>
          <div className="absolute top-4 right-4 pointer-events-none">
            <StarDoodle color="#87663e" size={13} opacity={0.28} />
          </div>
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-4">Sunday, June 29</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className={`flex items-center gap-3 p-3.5 rounded-[16px] border border-ink/8 transition-all hover:border-ink/20 ${task.done ? "opacity-55 bg-linen/50" : "bg-linen/30"}`}>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: task.color, background: task.done ? task.color : "transparent" }}>
                  {task.done && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${task.color}20`, color: task.color }}>{task.subject}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${priorityBg[task.priority]}20`, color: priorityBg[task.priority] }}>{task.priority}</span>
                  </div>
                  <p className={`font-semibold text-sm truncate ${task.done ? "line-through text-ink/35" : "text-ink"}`}>{task.title}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-bold text-ink/55">{task.time}</div>
                  <div className="text-xs text-ink/35 font-medium">{task.duration}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-[16px] border-2 border-dashed border-ink/20 py-3 text-sm font-bold text-ink/35 hover:border-ink/40 hover:text-ink/60 transition-colors flex items-center justify-center gap-2">
            + Add task for today
          </button>
        </div>

        {/* Stats — right col */}
        <div className="flex flex-col gap-3" style={{ gridColumn: "2 / 3" }}>
          {[
            { label: "Tasks Today", value: "5", bg: "bg-coral", text: "text-parchment", doodle: <StarDoodle color="#fff8f0" size={16} opacity={0.4} /> },
            { label: "Hours Scheduled", value: "4.5h", bg: "bg-honey", text: "text-ink", doodle: <WavyDoodle color="#333130" opacity={0.2} width={50} /> },
            { label: "Subjects", value: "5", bg: "bg-blush", text: "text-ink", doodle: <DotsDoodle color="#333130" opacity={0.2} count={3} /> },
          ].map((s) => (
            <div key={s.label} className={`bento-box rounded-[24px] ${s.bg} p-5 relative overflow-hidden flex-1`}>
              <div className="absolute bottom-3 right-4 pointer-events-none">{s.doodle}</div>
              <div className={`font-gaegu text-5xl font-bold ${s.text} leading-none`}>{s.value}</div>
              <div className={`font-semibold text-sm mt-1 ${s.text} opacity-65`}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
