/**
 * Motrac + Linde Material Handling logo
 * Recreated in SVG from brand assets
 */
export default function MotracLogo({ className = '', width = 280, height = 80 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left panel — gray */}
      <rect x="0" y="0" width="140" height="80" fill="#BEBEBE" />

      {/* Right panel — Linde red */}
      <rect x="140" y="0" width="140" height="80" fill="#C8102E" />

      {/* "Linde Material Handling" small text */}
      <text
        x="213"
        y="18"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="8"
        fill="white"
        letterSpacing="0.3"
      >
        Linde Material Handling
      </text>

      {/* Linde script logo — simplified */}
      <text
        x="210"
        y="58"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="32"
        fontStyle="italic"
        fontWeight="bold"
        fill="white"
        letterSpacing="-1"
      >
        Linde
      </text>

      {/* motrac text — left panel */}
      <text
        x="70"
        y="46"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="#2a2a2a"
        letterSpacing="2"
      >
        motrac
      </text>

      {/* underline under motrac */}
      <rect x="14" y="51" width="112" height="2.5" fill="#2a2a2a" rx="1" />
    </svg>
  )
}
