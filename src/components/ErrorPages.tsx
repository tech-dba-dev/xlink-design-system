import { ShieldOff, FileQuestion, ServerCrash, RefreshCw, ArrowLeft, Home } from 'lucide-react'
import { Button } from './Button'

// ─── Types ───────────────────────────────────────────────────────────────────

type ErrorCode = 403 | 404 | 500

interface ErrorPageProps {
  code?: ErrorCode
  title?: string
  description?: string
  onBack?: () => void
  onHome?: () => void
  onRetry?: () => void
  className?: string
}

// ─── Config ───────────────────────────────────────────────────────────────────

const errorConfig: Record<ErrorCode, { icon: React.ReactNode; defaultTitle: string; defaultDesc: string; iconBg: string; iconColor: string }> = {
  403: {
    icon: <ShieldOff size={32} />,
    defaultTitle: 'Acesso Negado',
    defaultDesc: 'Você não tem permissão para acessar este recurso. Contacte o administrador se acredita que isso é um erro.',
    iconBg: 'bg-[var(--danger-bg)]',
    iconColor: 'text-[var(--danger)]',
  },
  404: {
    icon: <FileQuestion size={32} />,
    defaultTitle: 'Página Não Encontrada',
    defaultDesc: 'O recurso que você está procurando não existe ou foi movido. Verifique o endereço ou volte ao início.',
    iconBg: 'bg-[var(--warning-bg)]',
    iconColor: 'text-[var(--warning)]',
  },
  500: {
    icon: <ServerCrash size={32} />,
    defaultTitle: 'Erro Interno do Servidor',
    defaultDesc: 'Algo correu mal do nosso lado. A equipa técnica foi notificada. Tente novamente em alguns instantes.',
    iconBg: 'bg-[var(--info-bg)]',
    iconColor: 'text-[var(--info)]',
  },
}

// ─── ErrorPage ────────────────────────────────────────────────────────────────

export function ErrorPage({ code = 404, title, description, onBack, onHome, onRetry, className = '' }: ErrorPageProps) {
  const cfg = errorConfig[code]

  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] py-16 px-6 text-center ${className}`}>
      <div className={`w-20 h-20 ${cfg.iconBg} rounded-[var(--radius-2xl)] flex items-center justify-center mb-6 ${cfg.iconColor}`}>
        {cfg.icon}
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Erro {code}</span>
      <h2 className="font-title text-2xl font-bold text-[var(--text-primary)] mb-3">{title ?? cfg.defaultTitle}</h2>
      <p className="text-[14px] text-[var(--text-muted)] max-w-[420px] leading-relaxed mb-8">{description ?? cfg.defaultDesc}</p>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft size={15} /> Voltar
          </Button>
        )}
        {onHome && (
          <Button variant="secondary" onClick={onHome}>
            <Home size={15} /> Início
          </Button>
        )}
        {onRetry && (
          <Button onClick={onRetry}>
            <RefreshCw size={15} /> Tentar Novamente
          </Button>
        )}
      </div>
    </div>
  )
}
