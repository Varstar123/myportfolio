type LogoProps = {
  className?: string;
  /** Namespaces the gradient ids so multiple logos on one page don't collide. */
  idSuffix?: string;
};

/**
 * Premium "VN" monogram mark — a dark gradient tile with a hairline gradient
 * border, an inner glow, and the letters drawn as gradient strokes.
 * Mirrors the favicon at src/app/icon.svg.
 */
export default function Logo({ className, idSuffix = "a" }: LogoProps) {
  const tile = `vn-tile-${idSuffix}`;
  const stroke = `vn-stroke-${idSuffix}`;
  const border = `vn-border-${idSuffix}`;
  const glow = `vn-glow-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      role="img"
      aria-label="VN monogram"
    >
      <defs>
        <linearGradient id={tile} x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16162a" />
          <stop offset="1" stopColor="#07070f" />
        </linearGradient>
        <linearGradient id={stroke} x1="12" y1="18" x2="52" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a5b4fc" />
          <stop offset="0.5" stopColor="#a855f7" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id={border} x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" stopOpacity="0.85" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="2" y="2" width="60" height="60" rx="16" fill={`url(#${tile})`} />
      <circle cx="32" cy="33" r="23" fill={`url(#${glow})`} />
      <rect
        x="2.75"
        y="2.75"
        width="58.5"
        height="58.5"
        rx="15.25"
        fill="none"
        stroke={`url(#${border})`}
        strokeWidth="1.5"
      />

      <path
        d="M14 17 L32 50 L50 17 L40.5 17 L32 38 L23.5 17 Z"
        fill={`url(#${stroke})`}
        stroke={`url(#${stroke})`}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
