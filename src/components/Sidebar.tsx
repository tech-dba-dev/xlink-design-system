import type { ReactNode } from 'react'

interface SidebarItem {
  icon: ReactNode
  label: string
  active?: boolean
  href?: string
}

interface SidebarProps {
  items: SidebarItem[]
  className?: string
}

export function Sidebar({ items, className = '' }: SidebarProps) {
  return (
    <div className={`w-60 bg-[var(--primary-darkest)] rounded-2xl py-4 overflow-hidden ${className}`}>
      <div className="px-4 pb-4 border-b border-white/[0.06] mb-2 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="text-[13px] font-bold text-white font-title">CPS Platform</span>
      </div>
      <div className="flex flex-col gap-px px-2">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href || '#'}
            className={`flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-[13px] no-underline transition-colors ${
              item.active
                ? 'text-white bg-[rgba(29,99,237,0.25)] font-semibold'
                : 'text-white/50 hover:text-white/70 hover:bg-white/[0.05]'
            }`}
          >
            <span className={item.active ? 'opacity-70' : 'opacity-40'}>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}
