import { useState, type ReactNode } from 'react'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { XLinkLogo } from './XLinkLogo'

interface SidebarItem {
  icon: ReactNode
  label: string
  active?: boolean
  href?: string
}

interface SidebarProps {
  items: SidebarItem[]
  defaultCollapsed?: boolean
  className?: string
}

export function Sidebar({ items, defaultCollapsed = false, className = '' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <div
      className={`relative bg-[var(--primary-darkest)] rounded-xl py-4 overflow-visible transition-all duration-300 flex flex-col ${collapsed ? 'w-[60px]' : 'w-60'} ${className}`}
    >
      {/* Toggle button — floats on the right edge */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-5 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-[var(--primary-dark)] border-2 border-[var(--surface)] cursor-pointer text-white/60 hover:text-white hover:bg-[var(--primary)] transition-colors"
        title={collapsed ? 'Expandir menu' : 'Recolher menu'}
      >
        {collapsed ? <ChevronsRight size={13} /> : <ChevronsLeft size={13} />}
      </button>

      {/* Header — logo always visible */}
      <div className={`px-3 pb-3 border-b border-white/[0.06] mb-2 flex items-center ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
        <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center shrink-0">
          <XLinkLogo size={16} color="white" />
        </div>
        {!collapsed && (
          <span className="text-[13px] font-bold text-white font-title whitespace-nowrap">xLink</span>
        )}
      </div>

      {/* Items */}
      <div className="flex flex-col gap-px px-2 flex-1">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href || '#'}
            title={collapsed ? item.label : undefined}
            className={`flex items-center rounded-lg no-underline transition-colors ${
              collapsed ? 'justify-center py-2.5 px-0' : 'gap-2.5 py-2.5 px-3'
            } ${
              item.active
                ? 'text-white bg-[rgba(29,99,237,0.25)] font-semibold'
                : 'text-white/50 hover:text-white/70 hover:bg-white/[0.05]'
            } ${collapsed ? '' : 'text-[13px]'}`}
          >
            <span className={`shrink-0 ${item.active ? 'opacity-70' : 'opacity-40'}`}>{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </a>
        ))}
      </div>
    </div>
  )
}
