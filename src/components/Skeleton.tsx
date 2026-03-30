import type { CSSProperties } from 'react'

// ─── Base Skeleton ────────────────────────────────────────────────────────────

interface SkeletonProps {
  width?: string | number
  height?: string | number
  rounded?: string
  className?: string
  style?: CSSProperties
}

export function Skeleton({ width, height, rounded = 'rounded-md', className = '', style }: SkeletonProps) {
  return (
    <div
      className={`bg-[#E2E8F0] animate-pulse ${rounded} ${className}`}
      style={{ width, height, ...style }}
    />
  )
}

// ─── Shimmer wrapper ──────────────────────────────────────────────────────────

export function Shimmer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </div>
  )
}

// ─── KPI Card Skeleton ────────────────────────────────────────────────────────

export function KpiCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-4 elevation-1 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <Skeleton width={36} height={36} rounded="rounded-[10px]" />
        <Skeleton width={40} height={16} />
      </div>
      <Skeleton width="60%" height={28} className="mb-2" />
      <Skeleton width="80%" height={12} />
    </div>
  )
}

// ─── Table Row Skeleton ───────────────────────────────────────────────────────

export function TableRowSkeleton({ cols = 5, rows = 4 }: { cols?: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-[#F1F5F9]">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="py-3 px-4">
              <Skeleton height={14} width={j === 0 ? '80%' : j === cols - 1 ? '40%' : '60%'} />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

// ─── List Item Skeleton ───────────────────────────────────────────────────────

export function ListItemSkeleton({ rows = 3, className = '' }: { rows?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton width={40} height={40} rounded="rounded-[10px]" />
          <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton height={13} width="55%" />
            <Skeleton height={11} width="35%" />
          </div>
          <Skeleton width={60} height={20} rounded="rounded-full" />
        </div>
      ))}
    </div>
  )
}

// ─── Card Skeleton (mobile) ───────────────────────────────────────────────────

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-4 elevation-1 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <Skeleton width={44} height={44} rounded="rounded-[var(--radius-md)]" />
        <div className="flex-1 flex flex-col gap-1.5">
          <Skeleton height={14} width="60%" />
          <Skeleton height={11} width="40%" />
        </div>
      </div>
      <Skeleton height={11} width="100%" className="mb-1.5" />
      <Skeleton height={11} width="80%" className="mb-4" />
      <div className="flex gap-2">
        <Skeleton height={32} width={80} rounded="rounded-[var(--radius-md)]" />
        <Skeleton height={32} width={80} rounded="rounded-[var(--radius-md)]" />
      </div>
    </div>
  )
}
