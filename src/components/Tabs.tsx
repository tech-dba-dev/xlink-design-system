interface Tab {
  label: string
  active?: boolean
}

interface TabsProps {
  tabs: Tab[]
  onTabClick?: (index: number) => void
  className?: string
}

export function Tabs({ tabs, onTabClick, className = '' }: TabsProps) {
  return (
    <div className={`flex gap-0 border-b border-[var(--border)] ${className}`}>
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onTabClick?.(i)}
          className={`py-2 px-4 text-[13px] font-semibold border-b-2 cursor-pointer transition-all bg-transparent border-x-0 border-t-0 ${
            tab.active
              ? 'text-[var(--primary)] border-b-[var(--primary)]'
              : 'text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-primary)]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

interface BreadcrumbItem {
  label: string
  active?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <div className={`text-[13px] text-[var(--text-muted)] flex items-center gap-1.5 ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
          <span className={item.active ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--primary)] font-semibold'}>
            {item.label}
          </span>
        </span>
      ))}
    </div>
  )
}
