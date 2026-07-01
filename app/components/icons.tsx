interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function HomeIcon({ size = 24, color = "#333130", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 3.5 11.5 C 5.5 9.5 8.5 6.5 12 4 C 15.5 6.5 18.5 9.5 20.5 11.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 5.5 10 L 5 21 L 19 21 L 18.5 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 10 21 L 10 15.5 C 10 14.5 10.8 14 12 14 C 13.2 14 14 14.5 14 15.5 L 14 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6.5" y="13" width="3" height="2.5" rx="0.5" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

export function CalendarIcon({ size = 24, color = "#333130", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="16" rx="2.5" stroke={color} strokeWidth={strokeWidth} />
      <path d="M 8.5 3 L 8.5 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 15.5 3 L 15.5 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 4 10 L 20 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="8.5" cy="14.5" r="1.2" fill={color} />
      <circle cx="12" cy="14.5" r="1.2" fill={color} />
      <circle cx="15.5" cy="14.5" r="1.2" fill={color} />
      <circle cx="8.5" cy="18.5" r="1.2" fill={color} />
      <circle cx="12" cy="18.5" r="1.2" fill={color} />
    </svg>
  );
}

export function TimerIcon({ size = 24, color = "#333130", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13.5" r="8.5" stroke={color} strokeWidth={strokeWidth} />
      <path d="M 12 13.5 L 12 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 12 13.5 L 15.5 15.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="12" cy="13.5" r="1.2" fill={color} />
      <path d="M 10.5 5.2 L 11.5 3.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 13.5 5.2 L 12.5 3.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 11.5 3.5 L 12.5 3.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function BrainIcon({ size = 24, color = "#333130", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="4.5" r="2.2" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="5" cy="18" r="2.2" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="19" cy="18" r="2.2" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="12" cy="12.5" r="1.8" stroke={color} strokeWidth={strokeWidth} />
      <path d="M 10.2 6.1 L 6.2 16.2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 13.8 6.1 L 17.8 16.2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 12 6.7 L 12 10.7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 6.8 17.1 L 10.3 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 17.2 17.1 L 13.7 13.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function ShieldIcon({ size = 24, color = "#333130", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 12 3 C 12 3 19.5 6 20 7 L 20 13 C 20 17.5 16 21.5 12 22.5 C 8 21.5 4 17.5 4 13 L 4 7 C 4.5 6 12 3 12 3 Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 8.5 12.5 L 11 15 L 15.5 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MoonIcon({ size = 24, color = "#333130", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 20 13 C 18 19 12 23 7 21 C 2.5 19 1 14 3 9.5 C 5 5 11 2.5 16 4.5 C 12 6.5 9.5 10.5 10.5 14 C 11.5 17.5 15.5 20 20 13 Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 19.5 6 L 20.2 4.2 L 21 6 L 22.8 6.5 L 21 7 L 20.2 8.8 L 19.5 7 L 17.7 6.5 Z" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="3.5" r="0.8" fill={color} />
    </svg>
  );
}

export function UsersIcon({ size = 24, color = "#333130", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7.5" r="3.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 2 21 C 2 16 16 16 16 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="7.5" r="2.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16 21 C 16.5 18 19.5 17 22 18.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrophyIcon({ size = 24, color = "#333130", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 7 4 L 17 4 L 17 10 C 17 14 14.5 16.5 12 16.5 C 9.5 16.5 7 14 7 10 Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 7 5.5 L 4 5.5 C 4 8.5 5.5 10.5 7.5 11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 17 5.5 L 20 5.5 C 20 8.5 18.5 10.5 16.5 11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 12 16.5 L 12 19.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 8.5 21 L 15.5 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 9.5 19.5 L 8.5 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 14.5 19.5 L 15.5 21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Decorative doodles ─── */

export function StarDoodle({ size = 14, color = "#333130", opacity = 0.35 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ opacity }}>
      <path d="M 8 1.5 L 9 6 L 13 7.5 L 9 9 L 8 13.5 L 7 9 L 3 7.5 L 7 6 Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WavyDoodle({ width = 40, color = "#333130", opacity = 0.25 }: { width?: number; color?: string; opacity?: number }) {
  const w = width;
  const d = `M 0 5 Q ${w * 0.125} 1 ${w * 0.25} 5 Q ${w * 0.375} 9 ${w * 0.5} 5 Q ${w * 0.625} 1 ${w * 0.75} 5 Q ${w * 0.875} 9 ${w} 5`;
  return (
    <svg width={w} height={10} viewBox={`0 0 ${w} 10`} fill="none" style={{ opacity }}>
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function DotsDoodle({ color = "#333130", opacity = 0.3, count = 3 }: { color?: string; opacity?: number; count?: number }) {
  const total = count * 10;
  return (
    <svg width={total} height={8} viewBox={`0 0 ${total} 8`} fill="none" style={{ opacity }}>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={i * 10 + 4} cy="4" r="1.8" fill={color} />
      ))}
    </svg>
  );
}

export function ArrowDoodle({ color = "#333130", opacity = 0.3 }: { color?: string; opacity?: number }) {
  return (
    <svg width="30" height="16" viewBox="0 0 30 16" fill="none" style={{ opacity }}>
      <path d="M 2 8 C 6 6 13 5 20 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 17 5 L 21.5 8 L 17 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
