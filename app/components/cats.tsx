import type { CSSProperties } from "react";

const BLUSH = "#e2ab9a";

interface CatProps {
  className?: string;
  style?: CSSProperties;
}

/* Sitting cat — 140×140, ink stroke */
export function SittingCat({ className, style }: CatProps) {
  const s = "#333130";
  const sw = 2.5;
  const lc = "round" as const;
  const lj = "round" as const;
  return (
    <svg width={140} height={140} viewBox="0 0 140 140" fill="none" className={className} style={style}>
      <path d="M 38 50 C 38 18 102 18 102 50 C 102 82 38 82 38 50 Z" stroke={s} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj} />
      <path d="M 44 30 L 50 8 L 65 28" stroke={s} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj} />
      <path d="M 75 28 L 90 8 L 96 30" stroke={s} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj} />
      <path d="M 50 27 L 54 14 L 63 26" stroke={s} strokeWidth={1.2} strokeLinecap={lc} strokeLinejoin={lj} opacity="0.4" />
      <path d="M 77 26 L 86 14 L 90 27" stroke={s} strokeWidth={1.2} strokeLinecap={lc} strokeLinejoin={lj} opacity="0.4" />
      <ellipse cx="47" cy="60" rx="13" ry="7.5" fill={BLUSH} opacity="0.6" />
      <ellipse cx="93" cy="60" rx="13" ry="7.5" fill={BLUSH} opacity="0.6" />
      <circle cx="58" cy="46" r="5.5" fill={s} />
      <circle cx="82" cy="46" r="5.5" fill={s} />
      <circle cx="56" cy="44" r="2" fill="white" />
      <circle cx="80" cy="44" r="2" fill="white" />
      <path d="M 68 58 L 70 62 L 72 58 Z" fill={s} />
      <path d="M 63 65 Q 70 72 77 65" stroke={s} strokeWidth="2" strokeLinecap={lc} />
      <path d="M 22 54 L 52 58" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 24 63 L 52 63" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 88 58 L 118 54" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 88 63 L 118 63" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 48 95 C 44 84 96 84 92 95 L 90 122 C 88 132 52 132 50 122 Z" stroke={s} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj} />
      <ellipse cx="57" cy="130" rx="10" ry="5.5" stroke={s} strokeWidth="2" />
      <ellipse cx="83" cy="130" rx="10" ry="5.5" stroke={s} strokeWidth="2" />
      <path d="M 50 110 C 28 116 16 134 28 136 C 40 138 52 128 48 118" stroke={s} strokeWidth={sw} strokeLinecap={lc} />
    </svg>
  );
}

/* Cheering cat — 120×160, coral stroke, arms raised with pom poms */
export function CheeringCat({ className, style }: CatProps) {
  const s = "#ff6445";
  const sw = 2.5;
  const lc = "round" as const;
  const lj = "round" as const;
  return (
    <svg width={120} height={160} viewBox="0 0 120 160" fill="none" className={className} style={style}>
      {/* Head */}
      <ellipse cx="60" cy="56" rx="40" ry="38" stroke={s} strokeWidth={sw} strokeLinecap={lc} />
      {/* Ears */}
      <path d="M 24 38 L 20 10 L 44 32" stroke={s} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj} />
      <path d="M 76 32 L 100 10 L 96 38" stroke={s} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj} />
      {/* Blush */}
      <ellipse cx="29" cy="64" rx="13" ry="7" fill={BLUSH} opacity="0.6" />
      <ellipse cx="91" cy="64" rx="13" ry="7" fill={BLUSH} opacity="0.6" />
      {/* Happy closed eyes — U shapes */}
      <path d="M 44 50 Q 50 44 56 50" stroke={s} strokeWidth="2.5" strokeLinecap={lc} />
      <path d="M 64 50 Q 70 44 76 50" stroke={s} strokeWidth="2.5" strokeLinecap={lc} />
      {/* Nose */}
      <circle cx="60" cy="63" r="2.5" fill={s} />
      {/* Big smile */}
      <path d="M 45 73 Q 60 87 75 73" stroke={s} strokeWidth="2.5" strokeLinecap={lc} />
      {/* Body */}
      <ellipse cx="60" cy="118" rx="26" ry="24" stroke={s} strokeWidth={sw} />
      {/* Left arm raised */}
      <path d="M 36 105 C 24 92 12 78 6 66" stroke={s} strokeWidth="3.5" strokeLinecap={lc} />
      {/* Left pom pom */}
      <circle cx="6" cy="56" r="13" stroke={s} strokeWidth="2" />
      <path d="M 6 44 L 6 40" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 15 47 L 18 44" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M -3 47 L -6 44" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 18 56 L 22 56" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M -6 56 L -10 56" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      {/* Right arm raised */}
      <path d="M 84 105 C 96 92 108 78 114 66" stroke={s} strokeWidth="3.5" strokeLinecap={lc} />
      {/* Right pom pom */}
      <circle cx="114" cy="56" r="13" stroke={s} strokeWidth="2" />
      <path d="M 114 44 L 114 40" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 123 47 L 126 44" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 105 47 L 102 44" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 126 56 L 130 56" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      <path d="M 102 56 L 98 56" stroke={s} strokeWidth="1.5" strokeLinecap={lc} opacity="0.6" />
      {/* Feet */}
      <ellipse cx="48" cy="140" rx="10" ry="5" stroke={s} strokeWidth="2" />
      <ellipse cx="72" cy="140" rx="10" ry="5" stroke={s} strokeWidth="2" />
    </svg>
  );
}
