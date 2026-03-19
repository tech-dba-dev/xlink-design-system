import type { ReactNode } from 'react'
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react'

type AlertVariant = 'success' | 'warning' | 'danger' | 'info'

interface AlertProps {
  variant: AlertVariant
  title: string
  children: ReactNode
  className?: string
}

const config: Record<AlertVariant, { bg: string; border: string; titleColor: string; textColor: string; icon: ReactNode }> = {
  success: {
    bg: 'bg-[var(--success-bg)]',
    border: 'border-[#A7F3D0]',
    titleColor: 'text-[#065F46]',
    textColor: 'text-[#047857]',
    icon: <CheckCircle size={18} className="text-[var(--success)]" />,
  },
  warning: {
    bg: 'bg-[var(--warning-bg)]',
    border: 'border-[#FDE68A]',
    titleColor: 'text-[#92400E]',
    textColor: 'text-[#A16207]',
    icon: <AlertTriangle size={18} className="text-[var(--warning)]" />,
  },
  danger: {
    bg: 'bg-[var(--danger-bg)]',
    border: 'border-[#FECACA]',
    titleColor: 'text-[#991B1B]',
    textColor: 'text-[#DC2626]',
    icon: <XCircle size={18} className="text-[var(--danger)]" />,
  },
  info: {
    bg: 'bg-[var(--primary-lighter)]',
    border: 'border-[var(--primary-light)]',
    titleColor: 'text-[var(--primary-dark)]',
    textColor: 'text-[var(--primary)]',
    icon: <Info size={18} className="text-[var(--primary)]" />,
  },
}

export function Alert({ variant, title, children, className = '' }: AlertProps) {
  const c = config[variant]

  return (
    <div className={`flex items-start gap-3 py-3.5 px-[18px] rounded-[var(--radius-lg)] border ${c.bg} ${c.border} ${className}`}>
      <span className="shrink-0 mt-px">{c.icon}</span>
      <div>
        <span className={`text-[13px] font-semibold ${c.titleColor}`}>{title}</span>
        <br />
        <span className={`text-xs ${c.textColor}`}>{children}</span>
      </div>
    </div>
  )
}
