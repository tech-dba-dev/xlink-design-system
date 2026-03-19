interface XLinkLogoProps {
  size?: number
  color?: string
  className?: string
}

export function XLinkLogo({ size = 24, color = 'currentColor', className = '' }: XLinkLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      {/* X strokes */}
      <line x1="6" y1="6" x2="26" y2="26" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="26" y1="6" x2="6" y2="26" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Connection nodes */}
      <circle cx="6" cy="6" r="3" fill={color} />
      <circle cx="26" cy="6" r="3" fill={color} />
      <circle cx="6" cy="26" r="3" fill={color} />
      <circle cx="26" cy="26" r="3" fill={color} />
      {/* Center node */}
      <circle cx="16" cy="16" r="3.5" fill={color} />
    </svg>
  )
}
