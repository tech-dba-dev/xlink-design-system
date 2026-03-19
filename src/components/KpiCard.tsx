import type { ReactNode } from 'react'

interface KpiCardProps {
  icon: ReactNode
  iconBg?: string
  value: string | number
  label: string
  trend?: { value: string; positive: boolean }
  className?: string
}

export function KpiCard({ icon, iconBg = 'bg-[var(--primary-lighter)]', value, label, trend, className = '' }: KpiCardProps) {
  return (
    <div className={`bg-white rounded-xl p-4 elevation-1 card-hover ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 ${iconBg} rounded-[10px] flex items-center justify-center`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${trend.positive ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
            {trend.value}
          </span>
        )}
      </div>
      <div className="font-title text-[28px] font-bold text-[var(--text-primary)] leading-none">{value}</div>
      <div className="text-[11px] text-[var(--text-muted)] mt-1">{label}</div>
    </div>
  )
}
