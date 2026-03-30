import { useState, useRef, useEffect, type ChangeEvent } from 'react'
import { Camera, RotateCcw, Check, Pen, Trash2, Upload } from 'lucide-react'
import { Button } from './Button'
import { Textarea } from './Input'

// ─── PhotoCapture ─────────────────────────────────────────────────────────────

interface PhotoCaptureProps {
  onCapture?: (dataUrl: string) => void
  className?: string
}

export function PhotoCapture({ onCapture, className = '' }: PhotoCaptureProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target?.result as string
      setPreview(url)
      onCapture?.(url)
    }
    reader.readAsDataURL(file)
  }

  const reset = () => {
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {preview ? (
        <div className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]">
          <img src={preview} alt="Captura" className="w-full object-cover max-h-[240px]" />
          <button
            onClick={reset}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[var(--danger)] hover:bg-white border-none cursor-pointer elevation-2"
          >
            <RotateCcw size={14} />
          </button>
          <div className="absolute bottom-2 left-2 bg-[var(--success)] text-white text-[11px] font-bold py-1 px-2.5 rounded-full flex items-center gap-1">
            <Check size={11} /> Foto capturada
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-[var(--border)] rounded-[var(--radius-lg)] p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary-lighter)] transition-colors"
        >
          <div className="w-12 h-12 bg-[var(--primary-lighter)] rounded-[var(--radius-lg)] flex items-center justify-center">
            <Camera size={22} className="text-[var(--primary)]" />
          </div>
          <div className="text-center">
            <p className="text-[13px] font-semibold text-[var(--text-primary)]">Tirar foto ou selecionar</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">JPG, PNG até 10MB</p>
          </div>
          <input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden" />
        </div>
      )}
    </div>
  )
}

// ─── SignatureCanvas ──────────────────────────────────────────────────────────

interface SignatureCanvasProps {
  onSave?: (dataUrl: string) => void
  className?: string
}

export function SignatureCanvas({ onSave, className = '' }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [saved, setSaved] = useState(false)

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawing.current = true
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    setHasSignature(true)
    setSaved(false)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#0F172A'
    const pos = getPos(e, canvas)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDraw = () => { drawing.current = false }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
    setSaved(false)
  }

  const save = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    onSave?.(canvas.toDataURL())
    setSaved(true)
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="relative border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden bg-white">
        <div className="absolute top-2 left-3 text-[11px] text-[var(--text-muted)] font-medium flex items-center gap-1 pointer-events-none">
          <Pen size={11} /> Assine aqui
        </div>
        <canvas
          ref={canvasRef}
          width={480}
          height={160}
          className="w-full touch-none cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[60%] border-b border-dashed border-[var(--border)]" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={clear} disabled={!hasSignature}>
          <Trash2 size={13} /> Limpar
        </Button>
        <Button size="sm" onClick={save} disabled={!hasSignature || saved}>
          {saved ? <><Check size={13} /> Salvo</> : <><Upload size={13} /> Salvar Assinatura</>}
        </Button>
      </div>
    </div>
  )
}

// ─── PODCapture (full) ────────────────────────────────────────────────────────

interface PODCaptureProps {
  onSubmit?: (data: { photo?: string; signature?: string; notes: string }) => void
  className?: string
}

export function PODCapture({ onSubmit, className = '' }: PODCaptureProps) {
  const [photo, setPhoto] = useState<string>()
  const [signature, setSignature] = useState<string>()
  const [notes, setNotes] = useState('')

  const canSubmit = photo || signature

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div>
        <p className="text-[13px] font-semibold text-[var(--text-primary)] mb-2">Foto de Entrega</p>
        <PhotoCapture onCapture={setPhoto} />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[var(--text-primary)] mb-2">Assinatura do Destinatário</p>
        <SignatureCanvas onSave={setSignature} />
      </div>
      <Textarea label="Observações" rows={2} placeholder="Observações sobre a entrega..." value={notes} onChange={(e) => setNotes(e.target.value)} />
      <Button onClick={() => onSubmit?.({ photo, signature, notes })} disabled={!canSubmit}>
        <Check size={15} /> Confirmar Entrega (POD)
      </Button>
    </div>
  )
}
