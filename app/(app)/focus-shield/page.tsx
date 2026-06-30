import { ShieldIcon, StarDoodle, WavyDoodle, DotsDoodle } from "../../components/icons";

const sites = [
  { name: "YouTube",    icon: "📺", category: "Video",         mode: "smart" },
  { name: "Instagram",  icon: "📸", category: "Social",        mode: "smart" },
  { name: "Twitter / X",icon: "🐦", category: "Social",        mode: "blocked" },
  { name: "Reddit",     icon: "🤖", category: "Social",        mode: "blocked" },
  { name: "Netflix",    icon: "🎬", category: "Entertainment", mode: "blocked" },
  { name: "TikTok",     icon: "🎵", category: "Entertainment", mode: "blocked" },
];

const focusModes = [
  { name: "Deep Work",    desc: "Full silence. All distractions blocked.",   duration: "90 min", color: "#ff6445", active: true },
  { name: "Study Sprint", desc: "Intense 25-min pomodoro blocks.",           duration: "25 min", color: "#e3a164", active: false },
  { name: "Light Focus",  desc: "Soft filtering — social media only.",       duration: "45 min", color: "#e2ab9a", active: false },
];

const allowedChannels = [
  { name: "Khan Academy",        tag: "Education" },
  { name: "CrashCourse",         tag: "Education" },
  { name: "Kurzgesagt",          tag: "Science" },
  { name: "Veritasium",          tag: "Science" },
  { name: "3Blue1Brown",         tag: "Math" },
  { name: "MIT OpenCourseWare",  tag: "University" },
];

const filteredContent = [
  { name: "YouTube Shorts",            reason: "Short-form entertainment" },
  { name: "Trending / Viral videos",   reason: "Off-topic distractions" },
  { name: "Gaming channels",           reason: "Entertainment" },
  { name: "Music videos / playlists",  reason: "Entertainment" },
  { name: "Sidebar recommendations",   reason: "Algorithm rabbit holes" },
];

const MODES = ["Full", "Smart", "Block"] as const;
type Mode = typeof MODES[number];

const modeColors: Record<Mode, { bg: string; text: string }> = {
  Full:  { bg: "#e8d6c0", text: "#333130" },
  Smart: { bg: "#e3a164", text: "#fff8f0" },
  Block: { bg: "#ff6445", text: "#fff8f0" },
};

function siteMode(m: string): Mode {
  if (m === "smart") return "Smart";
  if (m === "blocked") return "Block";
  return "Full";
}

const isActive = false;

export default function FocusShieldPage() {
  return (
    <div className="animate-fade-up max-w-3xl mx-auto">

      <div className="bento-box rounded-[24px] bg-coral p-5 mb-3 flex items-center justify-between gap-4">
        <div>
          <div className="font-gaegu text-xl font-bold text-parchment mb-0.5">
            📦 Install the Study OS Chrome Extension
          </div>
          <p className="text-parchment/70 text-sm font-semibold">
            Enables Smart Filtering on YouTube, Instagram, and more — without blocking the whole site.
          </p>
        </div>
        <button
          className="btn-primary flex-shrink-0 bg-parchment text-ink font-gaegu font-bold text-sm px-5 py-2.5 rounded-full whitespace-nowrap"
          style={{ boxShadow: "2px 2px 0px rgba(51,49,48,0.25)" }}
        >
          Install Extension ↗
        </button>
      </div>

      <div className="mb-7">
        <h1 className="font-gaegu text-5xl font-bold text-ink flex items-center gap-3">
          <ShieldIcon size={40} color="#333130" />
          Focus Shield
        </h1>
        <p className="text-ink/50 font-semibold mt-1">Filter distractions — keep what you need</p>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>

        <div
          className="bento-box rounded-[24px] p-8 relative overflow-hidden text-center"
          style={{
            gridColumn: "1 / 3",
            background: isActive ? "#ff6445" : "#fff8f0",
          }}
        >
          <div className="absolute top-5 right-7 pointer-events-none">
            <StarDoodle color={isActive ? "#fff8f0" : "#87663e"} size={20} opacity={0.4} />
          </div>
          <div className="absolute bottom-6 left-8 pointer-events-none">
            <WavyDoodle color={isActive ? "#fff8f0" : "#87663e"} opacity={0.2} width={70} />
          </div>

          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: isActive ? "rgba(255,248,240,0.2)" : "#e8d6c0",
              boxShadow: isActive ? "3px 3px 0px rgba(51,49,48,0.15)" : "3px 3px 0px #333130",
            }}
          >
            <ShieldIcon size={48} color={isActive ? "#fff8f0" : "#333130"} strokeWidth={1.5} />
          </div>

          <h2 className={`font-gaegu text-3xl font-bold mb-2 ${isActive ? "text-parchment" : "text-ink"}`}>
            {isActive ? "Shield Active" : "Shield is Off"}
          </h2>
          <p className={`font-semibold mb-6 text-sm ${isActive ? "text-parchment/65" : "text-ink/50"}`}>
            {isActive
              ? "Smart filters are running — distractions are being filtered."
              : "Activate the shield to start smart-filtering distractions."}
          </p>

          <button
            className="btn-primary font-gaegu font-bold text-base px-10 py-3 rounded-full inline-flex items-center gap-2"
            style={{
              background: isActive ? "#fff8f0" : "#333130",
              color: isActive ? "#333130" : "#fff8f0",
              boxShadow: isActive ? "2px 2px 0px rgba(51,49,48,0.2)" : "3px 3px 0px rgba(255,248,240,0.15)",
            }}
          >
            <ShieldIcon size={18} color={isActive ? "#333130" : "#fff8f0"} />
            {isActive ? "Deactivate Shield" : "Activate Focus Shield"}
          </button>
        </div>

        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden" style={{ gridColumn: "1 / 2" }}>
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-4">Focus Modes</h2>
          <div className="space-y-3">
            {focusModes.map((mode) => (
              <button
                key={mode.name}
                className={`w-full flex items-start gap-3 p-4 rounded-[16px] border-2 transition-all text-left ${
                  mode.active ? "border-ink bg-linen/60" : "border-ink/12 hover:border-ink/30"
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: mode.color }} />
                <div className="flex-1">
                  <div className="font-gaegu font-bold text-base text-ink">{mode.name}</div>
                  <div className="text-xs text-ink/50 font-semibold leading-relaxed">{mode.desc}</div>
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5"
                  style={{ background: `${mode.color}20`, color: mode.color }}
                >
                  {mode.duration}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden" style={{ gridColumn: "2 / 3" }}>
          <div className="absolute top-4 right-5 pointer-events-none">
            <DotsDoodle color="#87663e" opacity={0.2} count={3} />
          </div>
          <h2 className="font-gaegu text-2xl font-bold text-ink mb-1">Distraction Filter</h2>
          <p className="text-xs text-ink/45 font-semibold mb-4 leading-relaxed">
            We don&apos;t block sites — we filter distracting content so you can still use what you need.
          </p>
          <div className="space-y-2.5">
            {sites.map((site) => {
              const current = siteMode(site.mode);
              return (
                <div key={site.name} className="flex items-center gap-3 p-3 rounded-[14px] bg-linen/50 border border-ink/8">
                  <span className="text-lg flex-shrink-0">{site.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-ink truncate">{site.name}</div>
                    <div className="text-xs text-ink/40">{site.category}</div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {MODES.map((m) => (
                      <button
                        key={m}
                        className="text-[10px] font-bold px-2 py-1 rounded-full transition-all"
                        style={
                          m === current
                            ? { background: modeColors[m].bg, color: modeColors[m].text, boxShadow: "1px 1px 0px #333130" }
                            : { background: "transparent", color: "rgba(51,49,48,0.35)", border: "1px solid rgba(51,49,48,0.15)" }
                        }
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <button className="mt-3 w-full rounded-[14px] border-2 border-dashed border-ink/20 py-2 text-xs font-bold text-ink/35 hover:border-ink/40 hover:text-ink/60 transition-colors">
            + Add a site
          </button>
        </div>

        <div
          className="bento-box rounded-[24px] bg-parchment p-6 relative overflow-hidden"
          style={{ gridColumn: "1 / 3" }}
        >
          <div className="absolute top-4 right-6 pointer-events-none">
            <WavyDoodle color="#87663e" opacity={0.2} width={60} />
          </div>

          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-gaegu text-2xl font-bold text-ink">Smart Content Filter</h2>
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-honey/30 text-bark border border-bark/20">
              <span className="w-1.5 h-1.5 rounded-full bg-honey inline-block" />
              Smart Filter Active
            </span>
          </div>
          <p className="text-sm text-ink/50 font-semibold mb-5 leading-relaxed max-w-lg">
            Keeps YouTube fully accessible during study sessions. Hides Shorts, entertainment recommendations,
            and sidebar videos — while keeping educational channels visible.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: "✓", title: "Educational channels", desc: "Khan Academy, CrashCourse, lecture content — always visible" },
              { icon: "↯", title: "Gentle overlay",       desc: 'Non-educational videos show a gentle "Are you sure?" prompt with Study / Skip.' },
              { icon: "✕", title: "Hidden by default",    desc: "YouTube Shorts, trending, sidebar recommendations" },
            ].map(f => (
              <div key={f.title} className="p-3.5 rounded-[16px] bg-linen/60 border border-ink/8">
                <div className="font-gaegu text-lg font-bold text-ink mb-0.5">{f.icon} {f.title}</div>
                <p className="text-xs text-ink/45 font-semibold leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-honey" />
                <span className="font-gaegu font-bold text-base text-ink">Always Allowed</span>
              </div>
              <div className="space-y-2">
                {allowedChannels.map(ch => (
                  <div key={ch.name} className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-honey/10 border border-honey/25">
                    <span className="text-honey font-bold text-sm">✓</span>
                    <span className="text-sm font-semibold text-ink flex-1">{ch.name}</span>
                    <span className="text-[10px] font-bold text-bark/60 bg-honey/20 px-2 py-0.5 rounded-full">{ch.tag}</span>
                    <button className="text-ink/25 hover:text-ink/60 transition-colors text-xs font-bold">×</button>
                  </div>
                ))}
                <button className="w-full rounded-[12px] border border-dashed border-bark/30 py-2 text-xs font-bold text-ink/35 hover:text-ink/60 hover:border-bark/50 transition-colors">
                  + Add channel
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-coral" />
                <span className="font-gaegu font-bold text-base text-ink">Filtered Out</span>
              </div>
              <div className="space-y-2">
                {filteredContent.map(f => (
                  <div key={f.name} className="flex items-center gap-2.5 p-2.5 rounded-[12px] bg-coral/8 border border-coral/20">
                    <span className="text-coral font-bold text-sm">✕</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-ink truncate">{f.name}</div>
                      <div className="text-[10px] text-ink/40">{f.reason}</div>
                    </div>
                    <button className="text-ink/25 hover:text-ink/60 transition-colors text-xs font-bold">×</button>
                  </div>
                ))}
                <button className="w-full rounded-[12px] border border-dashed border-coral/30 py-2 text-xs font-bold text-ink/35 hover:text-ink/60 hover:border-coral/50 transition-colors">
                  + Add filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {[
          { value: "24", label: "Filtered Today", bg: "bg-coral" },
          { value: "38m", label: "Time Saved",    bg: "bg-honey" },
          { value: "87%", label: "Focus Score",   bg: "bg-blush" },
        ].map((s) => (
          <div
            key={s.label}
            className={`bento-box rounded-[24px] ${s.bg} p-5 relative overflow-hidden`}
          >
            <div className={`font-gaegu text-5xl font-bold ${s.bg === "bg-coral" ? "text-parchment" : "text-ink"} leading-none`}>
              {s.value}
            </div>
            <div className={`font-semibold text-sm mt-1 ${s.bg === "bg-coral" ? "text-parchment/65" : "text-ink/55"}`}>
              {s.label}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
