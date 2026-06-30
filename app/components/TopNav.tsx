"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarIcon, TimerIcon, BrainIcon, ShieldIcon, MoonIcon, UsersIcon } from "./icons";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { href: "/planner", label: "Planner", icon: CalendarIcon },
  { href: "/session", label: "Session", icon: TimerIcon },
  { href: "/knowledge-map", label: "Knowledge", icon: BrainIcon },
  { href: "/focus-shield", label: "Focus", icon: ShieldIcon },
  { href: "/social", label: "Social", icon: UsersIcon },
  { href: "/check-in", label: "Check-in", icon: MoonIcon },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-30 border-b border-ink/10"
      style={{ background: "rgba(232, 214, 192, 0.92)", backdropFilter: "blur(8px)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <span className="font-gaegu text-2xl font-bold text-ink tracking-wide flex-shrink-0">
          Study OS
        </span>

        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-gaegu font-bold text-sm whitespace-nowrap transition-all duration-250 ${
                  isActive
                    ? "bg-ink text-parchment"
                    : "text-ink/60 hover:text-ink hover:bg-ink/10"
                }`}
                style={isActive ? { boxShadow: "2px 2px 0px rgba(51,49,48,0.25)" } : {}}
              >
                <Icon size={15} color={isActive ? "#fff8f0" : "#333130"} strokeWidth={2} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
