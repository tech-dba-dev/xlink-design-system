import type { ReactNode } from 'react'

// ─── StateBadge (semantic chips) ─────────────────────────────────────────────

type StateBadgeColor = 'green' | 'yellow' | 'red' | 'blue' | 'indigo' | 'orange' | 'pink' | 'gray'

interface StateBadgeProps {
  color: StateBadgeColor
  children: ReactNode
  dot?: boolean
  size?: 'sm' | 'md'
  className?: string
}

const colorMap: Record<StateBadgeColor, { bg: string; text: string; dot: string }> = {
  green:  { bg: 'bg-[#ECFDF5]', text: 'text-[#059669]', dot: 'bg-[#10B981]' },
  yellow: { bg: 'bg-[#FFFBEB]', text: 'text-[#D97706]', dot: 'bg-[#F59E0B]' },
  red:    { bg: 'bg-[#FEF2F2]', text: 'text-[#DC2626]', dot: 'bg-[#EF4444]' },
  blue:   { bg: 'bg-[#EFF6FF]', text: 'text-[#2563EB]', dot: 'bg-[#3B82F6]' },
  indigo: { bg: 'bg-[#EEF2FF]', text: 'text-[#4338CA]', dot: 'bg-[#6366F1]' },
  orange: { bg: 'bg-[#FFF7ED]', text: 'text-[#C2410C]', dot: 'bg-[#F97316]' },
  pink:   { bg: 'bg-[#FDF2F8]', text: 'text-[#BE185D]', dot: 'bg-[#EC4899]' },
  gray:   { bg: 'bg-[#F1F5F9]', text: 'text-[#475569]', dot: 'bg-[#94A3B8]' },
}

const sizeMap = {
  sm: 'text-[10px] py-[2px] px-2',
  md: 'text-[11px] py-[3px] px-2.5',
}

export function StateBadge({ color, children, dot = true, size = 'md', className = '' }: StateBadgeProps) {
  const c = colorMap[color]
  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full leading-[1.4] tracking-[0.01em] ${c.bg} ${c.text} ${sizeMap[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${c.dot}`} />}
      {children}
    </span>
  )
}
