import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { CheckCircle, AlertTriangle, XCircle, Info, X, WifiOff, RefreshCw } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info'

export interface ToastItem {
  id: string
  variant: ToastVariant
  title: string
  message?: string
  duration?: number
}

// ─── Single Toast ─────────────────────────────────────────────────────────────

const toastConfig: Record<ToastVariant, { icon: ReactNode; bg: string; border: string; titleColor: string; textColor: string }> = {
  success: { icon: <CheckCircle size={16} />, bg: 'bg-white', border: 'border-l-[var(--success)]', titleColor: 'text-[var(--text-primary)]', textColor: 'text-[var(--text-muted)]' },
  warning: { icon: <AlertTriangle size={16} />, bg: 'bg-white', border: 'border-l-[var(--warning)]', titleColor: 'text-[var(--text-primary)]', textColor: 'text-[var(--text-muted)]' },
  danger:  { icon: <XCircle size={16} />,      bg: 'bg-white', border: 'border-l-[var(--danger)]',  titleColor: 'text-[var(--text-primary)]', textColor: 'text-[var(--text-muted)]' },
  info:    { icon: <Info size={16} />,          bg: 'bg-white', border: 'border-l-[var(--info)]',    titleColor: 'text-[var(--text-primary)]', textColor: 'text-[var(--text-muted)]' },
}

const iconColor: Record<ToastVariant, string> = {
  success: 'text-[var(--success)]',
  warning: 'text-[var(--warning)]',
  danger:  'text-[var(--danger)]',
  info:    'text-[var(--info)]',
}

interface ToastProps extends ToastItem {
  onClose: (id: string) => void
}

function ToastCard({ id, variant, title, message, duration = 4000, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose(id), duration)
    return () => clearTimeout(t)
  }, [id, duration, onClose])

  const c = toastConfig[variant]

  return (
    <div className={`flex items-start gap-3 py-3 px-4 rounded-[var(--radius-md)] border border-[var(--border)] border-l-4 ${c.bg} ${c.border} elevation-3 animate-fade-in min-w-[280px] max-w-[360px]`}>
      <span className={`shrink-0 mt-0.5 ${iconColor[variant]}`}>{c.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-semibold leading-tight ${c.titleColor}`}>{title}</p>
        {message && <p className={`text-xs mt-0.5 ${c.textColor}`}>{message}</p>}
      </div>
      <button onClick={() => onClose(id)} className="shrink-0 text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-transparent border-none cursor-pointer p-0 mt-0.5">
        <X size={14} />
      </button>
    </div>
  )
}

// ─── Toast Container ──────────────────────────────────────────────────────────

interface ToastContainerProps {
  toasts: ToastItem[]
  onClose: (id: string) => void
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'
}

const positionClasses: Record<string, string> = {
  'top-right':     'top-4 right-4 items-end',
  'top-center':    'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right':  'bottom-4 right-4 items-end',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
}

export function ToastContainer({ toasts, onClose, position = 'top-right' }: ToastContainerProps) {
  return (
    <div className={`fixed z-[9999] flex flex-col gap-2 ${positionClasses[position]}`}>
      {toasts.map((t) => (
        <ToastCard key={t.id} {...t} onClose={onClose} />
      ))}
    </div>
  )
}

// ─── useToast hook ────────────────────────────────────────────────────────────

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const add = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, add, remove }
}

// ─── Snackbar ─────────────────────────────────────────────────────────────────

interface SnackbarProps {
  open: boolean
  message: string
  action?: { label: string; onClick: () => void }
  onClose: () => void
  duration?: number
}

export function Snackbar({ open, message, action, onClose, duration = 5000 }: SnackbarProps) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [open, duration, onClose])

  if (!open) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] animate-fade-in">
      <div className="flex items-center gap-4 bg-[var(--primary-dark)] text-white py-3 px-5 rounded-[var(--radius-md)] elevation-4 text-[13px] font-medium">
        <span>{message}</span>
        {action && (
          <button onClick={action.onClick} className="text-[var(--primary-mid)] font-bold text-xs uppercase tracking-wider bg-transparent border-none cursor-pointer hover:text-white transition-colors">
            {action.label}
          </button>
        )}
        <button onClick={onClose} className="text-white/50 hover:text-white bg-transparent border-none cursor-pointer p-0">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

// ─── Offline Banner ───────────────────────────────────────────────────────────

interface OfflineBannerProps {
  offline: boolean
  retryCount?: number
  onRetry?: () => void
}

export function OfflineBanner({ offline, retryCount = 0, onRetry }: OfflineBannerProps) {
  if (!offline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] bg-[var(--warning)] text-white py-2 px-4 flex items-center justify-center gap-3 text-[13px] font-semibold animate-fade-in">
      <WifiOff size={15} />
      <span>Sem conexão — as alterações serão sincronizadas quando a conexão for restaurada</span>
      {retryCount > 0 && <span className="opacity-70 text-xs">({retryCount} na fila)</span>}
      {onRetry && (
        <button onClick={onRetry} className="flex items-center gap-1 bg-white/20 hover:bg-white/30 border-none cursor-pointer text-white text-xs font-bold py-1 px-2 rounded-md transition-colors">
          <RefreshCw size={12} /> Tentar agora
        </button>
      )}
    </div>
  )
}
