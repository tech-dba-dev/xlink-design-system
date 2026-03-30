import { useState, type ReactNode } from 'react'
import { Bell, Check, CheckCheck, X, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

export type NotifVariant = 'info' | 'success' | 'warning' | 'danger'

export interface Notification {
  id: string
  variant: NotifVariant
  title: string
  message?: string
  time: string
  read: boolean
  href?: string
}

// ─── NotificationBadge ────────────────────────────────────────────────────────

interface NotificationBadgeProps {
  count: number
  max?: number
  className?: string
}

export function NotificationBadge({ count, max = 99, className = '' }: NotificationBadgeProps) {
  if (count === 0) return null
  const label = count > max ? `${max}+` : String(count)
  return (
    <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--danger)] text-white text-[10px] font-bold leading-none ${className}`}>
      {label}
    </span>
  )
}

// ─── NotificationIcon ─────────────────────────────────────────────────────────

const variantIcon: Record<NotifVariant, ReactNode> = {
  info:    <Info size={14} className="text-[var(--info)]" />,
  success: <CheckCircle size={14} className="text-[var(--success)]" />,
  warning: <AlertTriangle size={14} className="text-[var(--warning)]" />,
  danger:  <XCircle size={14} className="text-[var(--danger)]" />,
}

const variantBg: Record<NotifVariant, string> = {
  info:    'bg-[var(--info-bg)]',
  success: 'bg-[var(--success-bg)]',
  warning: 'bg-[var(--warning-bg)]',
  danger:  'bg-[var(--danger-bg)]',
}

// ─── NotificationItem ─────────────────────────────────────────────────────────

interface NotificationItemProps {
  notification: Notification
  onMarkRead: (id: string) => void
  onDismiss: (id: string) => void
}

function NotificationItem({ notification: n, onMarkRead, onDismiss }: NotificationItemProps) {
  return (
    <div className={`flex items-start gap-3 py-3 px-4 transition-colors hover:bg-[var(--surface)] ${!n.read ? 'bg-[var(--primary-lighter)]' : ''}`}>
      <div className={`w-7 h-7 ${variantBg[n.variant]} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
        {variantIcon[n.variant]}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] leading-tight ${n.read ? 'text-[var(--text-secondary)]' : 'font-semibold text-[var(--text-primary)]'}`}>{n.title}</p>
        {n.message && <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">{n.message}</p>}
        <p className="text-[11px] text-[var(--text-muted)] mt-1">{n.time}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {!n.read && (
          <button onClick={() => onMarkRead(n.id)} title="Marcar como lida" className="p-1 text-[var(--text-muted)] hover:text-[var(--primary)] bg-transparent border-none cursor-pointer rounded">
            <Check size={13} />
          </button>
        )}
        <button onClick={() => onDismiss(n.id)} title="Remover" className="p-1 text-[var(--text-muted)] hover:text-[var(--danger)] bg-transparent border-none cursor-pointer rounded">
          <X size={13} />
        </button>
      </div>
    </div>
  )
}

// ─── NotificationPanel ────────────────────────────────────────────────────────

interface NotificationPanelProps {
  notifications: Notification[]
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
  onDismiss: (id: string) => void
  className?: string
}

export function NotificationPanel({ notifications, onMarkRead, onMarkAllRead, onDismiss, className = '' }: NotificationPanelProps) {
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className={`bg-white rounded-[var(--radius-xl)] elevation-3 overflow-hidden w-[360px] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between py-3.5 px-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-[var(--text-primary)]" />
          <span className="font-title text-[14px] font-bold text-[var(--text-primary)]">Notificações</span>
          {unread > 0 && <NotificationBadge count={unread} />}
        </div>
        {unread > 0 && (
          <button onClick={onMarkAllRead} className="flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] bg-transparent border-none cursor-pointer hover:underline">
            <CheckCheck size={13} /> Marcar todas
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto divide-y divide-[var(--border)]">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-[13px] text-[var(--text-muted)]">Nenhuma notificação</div>
        ) : (
          notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onMarkRead={onMarkRead} onDismiss={onDismiss} />
          ))
        )}
      </div>
    </div>
  )
}

// ─── NotificationBell (trigger) ───────────────────────────────────────────────

interface NotificationBellProps {
  notifications: Notification[]
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
  onDismiss: (id: string) => void
}

export function NotificationBell({ notifications, onMarkRead, onMarkAllRead, onDismiss }: NotificationBellProps) {
  const [open, setOpen] = useState(false)
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--primary-lighter)] hover:text-[var(--primary)] bg-transparent border-none cursor-pointer transition-colors"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--danger)] rounded-full" />
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-50 animate-fade-in">
            <NotificationPanel
              notifications={notifications}
              onMarkRead={onMarkRead}
              onMarkAllRead={onMarkAllRead}
              onDismiss={onDismiss}
            />
          </div>
        </>
      )}
    </div>
  )
}

// ─── useNotifications hook ────────────────────────────────────────────────────

export function useNotifications(initial: Notification[] = []) {
  const [notifications, setNotifications] = useState<Notification[]>(initial)

  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id))

  const add = (n: Omit<Notification, 'id' | 'read'>) =>
    setNotifications((prev) => [{ ...n, id: Math.random().toString(36).slice(2), read: false }, ...prev])

  return { notifications, markRead, markAllRead, dismiss, add }
}
