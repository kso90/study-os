import { UsersIcon, StarDoodle, WavyDoodle, DotsDoodle } from "../../components/icons";
import { CheeringCat } from "../../components/cats";

const friends = [
  { name: "Sarah K", initials: "SK", color: "#ff6445", answered: true,  hp: 22 },
  { name: "Alex T",  initials: "AT", color: "#87663e", answered: true,  hp: 18 },
  { name: "You",     initials: "ME", color: "#e3a164", answered: false, hp: 15 },
  { name: "Mike R",  initials: "MR", color: "#e2ab9a", answered: false, hp: 12 },
];

const bossHp = 45;

const rooms = [
  { subject: "Mathematics",  emoji: "📐", online: 3, color: "#ff6445" },
  { subject: "Physics",      emoji: "⚛️",  online: 1, color: "#87663e" },
  { subject: "English",      emoji: "📖",  online: 2, color: "#e3a164" },
  { subject: "Chemistry",    emoji: "🧪",  online: 4, color: "#e2ab9a" },
  { subject: "History",      emoji: "🏛️",  online: 0, color: "#87663e" },
  { subject: "Biology",      emoji: "🌱",  online: 1, color: "#ff6445" },
];

const leaderboard = [
  { rank: 1, name: "Sarah K",  hours: "18.5h", change: +3, medal: "🥇" },
  { rank: 2, name: "You",      hours: "14.2h", change: +1, medal: "🥈" },
  { rank: 3, name: "Alex T",   hours: "12.8h", change: -2, medal: "🥉" },
  { rank: 4, name: "Mike R",   hours: "11.3h", change: 0,  medal: null },
  { rank: 5, name: "Emma L",   hours:  "9.6h", change: -1, medal: null },
];

function BossMonster() {
  const s = "#333130";
  const sw = 2.2;
  const lc = "round" as const;
  const lj = "round" as const;
  return (
    <svg width={100} height={120} viewBox="0 0 100 120" fill="none">
      <path d="M 14 55 C 13 20 87 20 86 55 C 87 90 70 106 50 108 C 30 106 13 90 14 55 Z" stroke={s} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj} />
      <path d="M 28 28 L 22 6 L 40 22" stroke={s} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj} />
      <path d="M 60 22 L 78 6 L 72 28" stroke={s} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj} />
      <path d="M 14 48 L 2 42" stroke={s} strokeWidth="2" strokeLinecap={lc} />
      <path d="M 14 60 L 1 60" stroke={s} strokeWidth="2" strokeLinecap={lc} />
      <path d="M 14 72 L 2 78" stroke={s} strokeWidth="2" strokeLinecap={lc} />
      <path d="M 86 48 L 98 42" stroke={s} strokeWidth="2" strokeLinecap={lc} />
      <path d="M 86 60 L 99 60" stroke={s} strokeWidth="2" strokeLinecap={lc} />
      <path d="M 86 72 L 98 78" stroke={s} strokeWidth="2" strokeLinecap={lc} />
      <path d="M 26 44 L 44 49" stroke={s} strokeWidth="3" strokeLinecap={lc} />
      <path d="M 56 49 L 74 44" stroke={s} strokeWidth="3" strokeLinecap={lc} />
      <circle cx="35" cy="55" r="6" fill={s} />
      <circle cx="65" cy="55" r="6" fill={s} />
      <circle cx="33" cy="53" r="2.2" fill="white" />
      <circle cx="63" cy="53" r="2.2" fill="white" />
      <path d="M 30 76 Q 50 70 70 76" stroke={s} strokeWidth="2" strokeLinecap={lc} />
      <path d="M 38 74 L 36 82 L 44 74" stroke={s} strokeWidth="1.8" strokeLinecap={lc} strokeLinejoin={lj} />
      <path d="M 56 74 L 56 83 L 64 74" stroke={s} strokeWidth="1.8" strokeLinecap={lc} strokeLinejoin={lj} />
      <path d="M 16 72 C 6 66 2 80 8 86" stroke={s} strokeWidth="3" strokeLinecap={lc} />
      <path d="M 84 72 C 94 66 98 80 92 86" stroke={s} strokeWidth="3" strokeLinecap={lc} />
      <ellipse cx="36" cy="108" rx="12" ry="5.5" stroke={s} strokeWidth="2" />
      <ellipse cx="64" cy="108" rx="12" ry="5.5" stroke={s} strokeWidth="2" />
    </svg>
  );
}

export default function SocialPage() {
  return (
    <div className="animate-fade-up max-w-5xl mx-auto relative">
      <CheeringCat
        className="cat-float-1 absolute top-0 right-0 pointer-events-none opacity-75"
      />

      <div className="mb-7">
        <h1 className="font-gaegu text-5xl font-bold text-ink flex items-center gap-3">
          <UsersIcon size={40} color="#333130" />
          Social
        </h1>
        <p className="text-ink/50 font-semibold mt-1">Study together, fight bosses, stay accountable</p>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>

        <div
          className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden"
          style={{ gridColumn: "1 / 3" }}
        >
          <div className="absolute top-4 right-6 pointer-events-none">
            <StarDoodle color="#333130" size={16} opacity={0.2} />
          </div>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <BossMonster />
              <span className="font-gaegu text-sm font-bold text-ink/50">Level 7 Boss</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-coral/15 text-coral">ACTIVE BATTLE</span>
              </div>
              <h2 className="font-gaegu text-2xl font-bold text-ink mb-1">AP Bio — Cell Respiration Boss</h2>
              <p className="text-sm text-ink/45 font-semibold mb-4">Answer questions correctly to deal damage!</p>

              <div className="mb-5">
                <div className="flex justify-between text-xs font-bold text-ink/50 mb-1.5">
                  <span>Boss HP</span>
                  <span className="text-coral">{bossHp}% remaining</span>
                </div>
                <div className="h-4 bg-linen rounded-full overflow-hidden border border-ink/10">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${bossHp}%`,
                      background: "linear-gradient(to right, #ff6445, #e3a164)",
                    }}
                  />
                </div>
                <p className="text-xs text-ink/35 font-semibold mt-1.5">⚔ Keep going — 2 more correct answers to defeat it!</p>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-5">
                {friends.map(f => (
                  <div key={f.name} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-gaegu font-bold text-sm text-parchment border-2"
                      style={{ background: f.color, borderColor: f.answered ? "#333130" : "transparent" }}
                    >
                      {f.initials}
                    </div>
                    <span className="text-xs font-bold text-ink/55 text-center leading-tight">{f.name}</span>
                    <span className="text-xs">{f.answered ? "✓" : "…"}</span>
                  </div>
                ))}
              </div>

              <button className="btn-primary bg-coral text-parchment font-gaegu font-bold text-base px-7 py-2.5 rounded-full">
                ⚔ Answer a Question to Attack!
              </button>
            </div>
          </div>
        </div>

        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden" style={{ gridColumn: "1 / 2" }}>
          <div className="absolute top-4 right-5 pointer-events-none">
            <WavyDoodle color="#87663e" opacity={0.2} width={50} />
          </div>
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-4">Live Study Rooms</h2>
          <div className="grid grid-cols-2 gap-2">
            {rooms.map(r => (
              <div key={r.subject} className="p-3.5 rounded-[16px] bg-linen/60 border border-ink/10 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{r.emoji}</span>
                  <span className="font-gaegu font-bold text-sm text-ink leading-tight">{r.subject}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink/45 font-semibold">
                    {r.online === 0 ? "Empty" : `${r.online} online`}
                  </span>
                  <button
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: r.color, color: "#fff8f0", boxShadow: "1px 1px 0px #333130" }}
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full rounded-[16px] border-2 border-dashed border-ink/20 py-2.5 text-sm font-bold text-ink/40 hover:border-ink/40 hover:text-ink/70 transition-colors">
            + Create a Room
          </button>
        </div>

        <div className="bento-box rounded-[24px] bg-honey p-6 relative overflow-hidden" style={{ gridColumn: "2 / 3" }}>
          <div className="absolute top-4 right-5 pointer-events-none">
            <DotsDoodle color="#333130" opacity={0.2} count={3} />
          </div>
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-1">Accountability Pair</h2>
          <p className="text-sm text-ink/50 font-semibold mb-4">Your matched study buddy</p>

          <div className="flex items-center justify-center gap-3 mb-5 p-4 rounded-[16px] bg-ink/8">
            <div className="font-gaegu text-5xl font-bold text-ink">6</div>
            <div>
              <div className="font-gaegu text-lg font-bold text-ink">day shared streak</div>
              <div className="text-xs text-ink/50 font-semibold">both checked in today ✦</div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { name: "You", streak: 7, checked: true, bg: "#ff6445" },
              { name: "Jake M.", streak: 5, checked: true, bg: "#87663e" },
            ].map(p => (
              <div key={p.name} className="flex items-center gap-3 p-3.5 rounded-[16px] bg-parchment border border-ink/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-gaegu font-bold text-sm text-parchment flex-shrink-0"
                  style={{ background: p.bg, boxShadow: "2px 2px 0px #333130" }}
                >
                  {p.name.split(" ")[0][0]}
                </div>
                <div className="flex-1">
                  <div className="font-gaegu font-bold text-base text-ink">{p.name}</div>
                  <div className="text-xs text-ink/50 font-semibold">{p.streak} day streak</div>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: p.checked ? "#ff6445" : "#e8d6c0", boxShadow: p.checked ? "1px 1px 0px #333130" : "none" }}
                >
                  {p.checked ? (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M 1 4 L 4 7 L 9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span className="text-ink/30 text-sm font-bold">–</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full text-center text-xs font-bold text-ink/40 hover:text-ink/70 transition-colors">
            Send a nudge 👋
          </button>
        </div>

        <div
          className="bento-box rounded-[24px] bg-ink p-6 relative overflow-hidden"
          style={{ gridColumn: "1 / 3" }}
        >
          <div className="absolute top-5 right-8 pointer-events-none">
            <StarDoodle color="#fff8f0" size={16} opacity={0.4} />
          </div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-gaegu text-2xl font-bold text-parchment">Streak Leaderboard</h2>
              <p className="text-parchment/45 text-xs font-semibold mt-0.5">Ranked by study hours — resets Monday ✦</p>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-parchment/10 text-parchment/60">This Week</span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map(l => {
              const isYou = l.name === "You";
              return (
                <div
                  key={l.rank}
                  className="flex items-center gap-3 p-3.5 rounded-[16px]"
                  style={{ background: isYou ? "rgba(255,100,69,0.2)" : "rgba(255,248,240,0.06)" }}
                >
                  <span className="text-xl w-7 text-center flex-shrink-0">{l.medal ?? l.rank}</span>
                  <span className={`font-gaegu font-bold text-base flex-1 ${isYou ? "text-honey" : "text-parchment"}`}>
                    {l.name}
                  </span>
                  <span className="font-gaegu font-bold text-parchment text-base">{l.hours}</span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full min-w-[46px] text-center"
                    style={{
                      background: l.change > 0 ? "rgba(99,216,99,0.15)" : l.change < 0 ? "rgba(255,100,69,0.15)" : "rgba(255,248,240,0.08)",
                      color: l.change > 0 ? "#7ddf7d" : l.change < 0 ? "#ff6445" : "rgba(255,248,240,0.35)",
                    }}
                  >
                    {l.change > 0 ? `+${l.change}` : l.change === 0 ? "—" : l.change}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
