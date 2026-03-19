import type { ReactNode } from 'react'

type BadgeVariant = 'active' | 'suspended' | 'closed' | 'config' | 'invited' | 'blocked' | 'neutral'

interface BadgeProps {
  variant: BadgeVariant
  children: ReactNode
  showDot?: boolean
  pulseDot?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  active:    { bg: 'bg-[var(--success-bg)]', text: 'text-[#059669]', dot: 'bg-[#10B981]' },
  suspended: { bg: 'bg-[var(--warning-bg)]', text: 'text-[#D97706]', dot: 'bg-[#F59E0B]' },
  closed:    { bg: 'bg-[var(--danger-bg)]',  text: 'text-[#DC2626]', dot: 'bg-[#EF4444]' },
  config:    { bg: 'bg-[var(--info-bg)]',    text: 'text-[#4F46E5]', dot: 'bg-[#6366F1]' },
  invited:   { bg: 'bg-[#F0F9FF]',           text: 'text-[#0369A1]', dot: 'bg-[#0EA5E9]' },
  blocked:   { bg: 'bg-[#FFF1F2]',           text: 'text-[#BE123C]', dot: 'bg-[#E11D48]' },
  neutral:   { bg: 'bg-[#F1F5F9]',           text: 'text-[#475569]', dot: 'bg-[#94A3B8]' },
}

export function Badge({ variant, children, showDot = true, pulseDot = false, className = '' }: BadgeProps) {
  const styles = variantStyles[variant]

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold py-[3px] px-2.5 rounded-full leading-[1.4] tracking-[0.01em] ${styles.bg} ${styles.text} ${className}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${styles.dot} ${pulseDot ? 'pulse-dot' : ''}`} />
      )}
      {children}
    </span>
  )
}

interface TagProps {
  children: ReactNode
  color?: 'primary' | 'green' | 'orange' | 'indigo' | 'pink'
  className?: string
}

const tagColors: Record<string, string> = {
  primary: 'bg-[var(--primary-lighter)] text-[var(--primary)]',
  green:   'bg-[#ECFDF5] text-[#059669]',
  orange:  'bg-[#FFF7ED] text-[#C2410C]',
  indigo:  'bg-[#EEF2FF] text-[#4338CA]',
  pink:    'bg-[#FDF2F8] text-[#BE185D]',
}

export function Tag({ children, color = 'primary', className = '' }: TagProps) {
  return (
    <span className={`text-[11px] font-semibold py-1 px-3 rounded-full ${tagColors[color]} ${className}`}>
      {children}
    </span>
  )
}
