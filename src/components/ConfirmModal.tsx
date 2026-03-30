import { useState } from 'react'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'
import { Textarea } from './Input'

// ─── ConfirmModal ─────────────────────────────────────────────────────────────

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (justification?: string) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  requireJustification?: boolean
  justificationLabel?: string
  justificationPlaceholder?: string
  loading?: boolean
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false,
  requireJustification = false,
  justificationLabel = 'Justificativa',
  justificationPlaceholder = 'Descreva o motivo desta ação...',
  loading = false,
}: ConfirmModalProps) {
  const [justification, setJustification] = useState('')
  const canConfirm = !requireJustification || justification.trim().length >= 10

  const handleConfirm = () => {
    if (!canConfirm) return
    onConfirm(requireJustification ? justification : undefined)
  }

  const handleClose = () => {
    setJustification('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex flex-col gap-5">
        {/* Icon + Title */}
        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 ${destructive ? 'bg-[var(--danger-bg)]' : 'bg-[var(--warning-bg)]'}`}>
            {destructive
              ? <Trash2 size={20} className="text-[var(--danger)]" />
              : <AlertTriangle size={20} className="text-[var(--warning)]" />
            }
          </div>
          <div>
            <h3 className="font-title text-[16px] font-bold text-[var(--text-primary)] leading-tight">{title}</h3>
            {description && <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-relaxed">{description}</p>}
          </div>
        </div>

        {/* Justification */}
        {requireJustification && (
          <div>
            <Textarea
              label={justificationLabel}
              rows={3}
              placeholder={justificationPlaceholder}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            />
            {justification.length > 0 && justification.trim().length < 10 && (
              <p className="text-xs text-[var(--danger)] mt-1">Mínimo de 10 caracteres.</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <Button variant="ghost" onClick={handleClose} disabled={loading}>{cancelLabel}</Button>
          <Button
            variant={destructive ? 'danger' : 'primary'}
            onClick={handleConfirm}
            disabled={!canConfirm || loading}
          >
            {loading ? 'Aguarde...' : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
