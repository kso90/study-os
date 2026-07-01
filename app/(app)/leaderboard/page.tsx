import type { Metadata } from "next";
import Link from "next/link";
import { TrophyIcon } from "../../components/icons";

export const metadata: Metadata = {
  title: "Leaderboard | Bubble",
};

interface LeaderboardUser {
  id: number;
  name: string;
  hours: number;
  streak: number;
}

const leaderboard: LeaderboardUser[] = [
  { id: 1, name: "Sarah", hours: 42, streak: 7 },
  { id: 2, name: "Mike", hours: 35, streak: 4 },
  { id: 3, name: "Lisa", hours: 29, streak: 5 },
];

const RANK_STYLES = [
  { bg: "#ff6445", fg: "#fff8f0" },
  { bg: "#e3a164", fg: "#fff8f0" },
  { bg: "#e2ab9a", fg: "#333130" },
];

export default function LeaderboardPage() {
  const ranked = [...leaderboard].sort((a, b) => b.hours - a.hours);

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-1">
        <TrophyIcon size={28} color="#333130" />
        <h1 className="font-gaegu text-3xl font-bold text-ink">Leaderboard</h1>
      </div>
      <p className="font-nunito text-sm font-semibold text-ink/60 mb-6">
        See how you stack up against other focused students this week.
      </p>

      <div className="flex flex-col gap-3">
        {ranked.map((user, i) => {
          const rankStyle = RANK_STYLES[i] ?? { bg: "#fff8f0", fg: "#333130" };
          const rank = i + 1;
          return (
            <div key={user.id} className="bento-box rounded-[20px] bg-parchment p-4 flex items-center gap-4">
              <div
                className="font-gaegu font-bold flex-shrink-0 flex items-center justify-center rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  background: rankStyle.bg,
                  color: rankStyle.fg,
                  border: "2px solid #333130",
                  fontSize: 16,
                }}
              >
                {rank}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-gaegu font-bold text-lg text-ink truncate">{user.name}</div>
                <div className="font-nunito text-xs font-semibold text-ink/55 flex items-center gap-3 mt-0.5">
                  <span>⏱ {user.hours} hrs focused</span>
                  <span>🔥 {user.streak}-day streak</span>
                </div>
              </div>

              <Link
                href={`/profile/${encodeURIComponent(user.name.toLowerCase())}`}
                className="btn-outline font-gaegu font-bold text-sm px-4 py-2 rounded-full flex-shrink-0"
                style={{ border: "2px solid #333130", background: "#fff8f0", color: "#333130" }}
              >
                View Profile
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
