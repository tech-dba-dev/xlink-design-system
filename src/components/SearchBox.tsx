import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import type { ReactNode } from 'react'

interface SearchResult {
  id: string
  label: string
  description?: string
  icon?: ReactNode
}

interface SearchGroup {
  title: string
  items: SearchResult[]
}

interface SearchBoxProps {
  placeholder?: string
  groups: SearchGroup[]
  onSelect?: (item: SearchResult) => void
  className?: string
}

export function SearchBox({ placeholder = 'Buscar...', groups, onSelect, className = '' }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = groups
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {/* Input */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none flex">
          <Search size={16} />
        </span>
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full py-2.5 pl-[38px] pr-9 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-input)] bg-white text-sm font-[DM_Sans,sans-serif] text-[var(--text-primary)] transition-all duration-150 outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(29,99,237,0.1)] box-border"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] bg-transparent border-none cursor-pointer flex p-0"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (query || filtered.length > 0) && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white rounded-[var(--radius-md)] elevation-3 border border-[var(--border)] overflow-hidden animate-fade-in max-h-[360px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-8 px-4 text-center">
              <p className="text-sm text-[var(--text-muted)]">Nenhum resultado para "<span className="font-semibold text-[var(--text-secondary)]">{query}</span>"</p>
            </div>
          ) : (
            filtered.map((group) => (
              <div key={group.title}>
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--surface)] border-b border-[var(--border)]">
                  {group.title}
                </div>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onSelect?.(item); setQuery(item.label); setOpen(false) }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left bg-transparent border-none cursor-pointer hover:bg-[var(--primary-lighter)] transition-colors"
                  >
                    {item.icon && (
                      <span className="w-8 h-8 rounded-lg bg-[var(--primary-lighter)] flex items-center justify-center text-[var(--primary)] shrink-0">
                        {item.icon}
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[var(--text-primary)] truncate">{item.label}</div>
                      {item.description && (
                        <div className="text-[11px] text-[var(--text-muted)] truncate">{item.description}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
          {filtered.length > 0 && (
            <div className="px-3 py-2 border-t border-[var(--border)] bg-[var(--surface)]">
              <span className="text-[11px] text-[var(--text-muted)]">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-[var(--border)] text-[10px] font-mono">↵</kbd> para selecionar &middot; <kbd className="px-1.5 py-0.5 rounded bg-white border border-[var(--border)] text-[10px] font-mono">esc</kbd> para fechar
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
