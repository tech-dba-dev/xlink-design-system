import type { ReactNode } from 'react'
import { FileSearch, Users, Package, BarChart3, Inbox, PlusCircle } from 'lucide-react'
import { Button } from './Button'

// ─── Types ───────────────────────────────────────────────────────────────────

type EmptyContext = 'search' | 'clients' | 'contracts' | 'reports' | 'generic'

interface EmptyStateProps {
  context?: EmptyContext
  title?: string
  description?: string
  action?: { label: string; onClick: () => void; icon?: ReactNode }
  illustration?: ReactNode
  className?: string
}

// ─── Context config ───────────────────────────────────────────────────────────

const contextConfig: Record<EmptyContext, { icon: ReactNode; iconBg: string; iconColor: string; title: string; desc: string }> = {
  search:    { icon: <FileSearch size={28} />,  iconBg: 'bg-[var(--primary-lighter)]', iconColor: 'text-[var(--primary)]',  title: 'Nenhum resultado encontrado',    desc: 'Tente ajustar os filtros ou termos de busca.' },
  clients:   { icon: <Users size={28} />,       iconBg: 'bg-[var(--primary-lighter)]', iconColor: 'text-[var(--primary)]',  title: 'Nenhum cliente cadastrado',      desc: 'Adicione o primeiro cliente para começar.' },
  contracts: { icon: <Package size={28} />,     iconBg: 'bg-[var(--info-bg)]',         iconColor: 'text-[var(--info)]',     title: 'Nenhum contrato encontrado',     desc: 'Crie um novo contrato para este cliente.' },
  reports:   { icon: <BarChart3 size={28} />,   iconBg: 'bg-[var(--success-bg)]',      iconColor: 'text-[var(--success)]',  title: 'Sem dados para exibir',          desc: 'Selecione um período ou ajuste os filtros.' },
  generic:   { icon: <Inbox size={28} />,       iconBg: 'bg-[#F1F5F9]',               iconColor: 'text-[var(--text-muted)]', title: 'Nada por aqui ainda',          desc: 'Este espaço está vazio por enquanto.' },
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export function EmptyState({ context = 'generic', title, description, action, illustration, className = '' }: EmptyStateProps) {
  const cfg = contextConfig[context]

  return (
    <div className={`flex flex-col items-center justify-center py-14 px-6 text-center ${className}`}>
      {illustration ?? (
        <div className={`w-16 h-16 ${cfg.iconBg} rounded-[var(--radius-xl)] flex items-center justify-center mb-5 ${cfg.iconColor}`}>
          {cfg.icon}
        </div>
      )}
      <h3 className="font-title text-[16px] font-bold text-[var(--text-primary)] mb-2">{title ?? cfg.title}</h3>
      <p className="text-[13px] text-[var(--text-muted)] max-w-[320px] leading-relaxed mb-6">{description ?? cfg.desc}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.icon ?? <PlusCircle size={15} />}
          {action.label}
        </Button>
      )}
    </div>
  )
}
