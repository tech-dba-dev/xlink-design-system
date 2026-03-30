import type { ReactNode } from 'react'

// ─── Bottom Tabs (mobile) ─────────────────────────────────────────────────────

export interface BottomTabItem {
  id: string
  icon: ReactNode
  label: string
  badge?: number
}

interface BottomTabsProps {
  items: BottomTabItem[]
  activeId: string
  onChange: (id: string) => void
  className?: string
}

export function BottomTabs({ items, activeId, onChange, className = '' }: BottomTabsProps) {
  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--border)] flex items-stretch safe-area-inset-bottom ${className}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-1 bg-transparent border-none cursor-pointer transition-colors relative ${
              active ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            <span className="relative">
              {item.icon}
              {item.badge != null && item.badge > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] px-0.5 bg-[var(--danger)] text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </span>
            <span className={`text-[10px] font-semibold leading-none ${active ? 'text-[var(--primary)]' : ''}`}>{item.label}</span>
            {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[var(--primary)] rounded-full" />}
          </button>
        )
      })}
    </nav>
  )
}

// ─── Drawer (mobile) ─────────────────────────────────────────────────────────

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  side?: 'left' | 'right'
}

export function Drawer({ open, onClose, children, title, side = 'left' }: DrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[rgba(15,23,42,0.5)] backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`fixed top-0 bottom-0 z-50 w-[280px] bg-white elevation-4 flex flex-col transition-transform duration-300 ${
          side === 'left' ? 'left-0' : 'right-0'
        } ${open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
      >
        {title && (
          <div className="flex items-center justify-between py-4 px-5 border-b border-[var(--border)]">
            <span className="font-title text-[15px] font-bold text-[var(--text-primary)]">{title}</span>
            <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-transparent border-none cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  )
}
