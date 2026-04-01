import { useState, useRef, type InputHTMLAttributes, type ReactNode, type ChangeEvent } from 'react'
import { Eye, EyeOff, Calendar, Upload, X, Check } from 'lucide-react'

// ─── PasswordInput ────────────────────────────────────────────────────────────

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

export function PasswordInput({ label, error, className = '', ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false)
  const base = `w-full py-2.5 px-3.5 pr-10 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-input)] bg-white text-sm text-[var(--text-primary)] transition-all outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(27,152,224,0.12)] box-border`

  return (
    <div>
      {label && <label className={`block text-[13px] font-semibold mb-1.5 ${error ? 'text-[var(--danger)]' : 'text-[var(--text-primary)]'}`}>{label}</label>}
      <div className="relative">
        <input type={show ? 'text' : 'password'} className={`${base} ${error ? 'border-[var(--danger)]!' : ''} ${className}`} {...props} />
        <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-transparent border-none cursor-pointer p-0">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-xs text-[var(--danger)] mt-1">{error}</p>}
    </div>
  )
}

// ─── DatePicker ───────────────────────────────────────────────────────────────

interface DatePickerProps {
  label?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  min?: string
  max?: string
  className?: string
}

export function DatePicker({ label, value, onChange, error, min, max, className = '' }: DatePickerProps) {
  const base = `w-full py-2.5 px-3.5 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-input)] bg-white text-sm text-[var(--text-primary)] transition-all outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(27,152,224,0.12)] box-border`

  return (
    <div>
      {label && <label className={`block text-[13px] font-semibold mb-1.5 ${error ? 'text-[var(--danger)]' : 'text-[var(--text-primary)]'}`}>{label}</label>}
      <div className="relative">
        <input
          type="date"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange?.(e.target.value)}
          className={`${base} ${error ? 'border-[var(--danger)]!' : ''} ${className}`}
        />
        <Calendar size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
      </div>
      {error && <p className="text-xs text-[var(--danger)] mt-1">{error}</p>}
    </div>
  )
}

// ─── FileUpload ───────────────────────────────────────────────────────────────

interface FileUploadProps {
  label?: string
  accept?: string
  multiple?: boolean
  error?: string
  onChange?: (files: FileList | null) => void
  className?: string
}

export function FileUpload({ label, accept, multiple, error, onChange, className = '' }: FileUploadProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fl = e.target.files
    if (fl) {
      setFiles(Array.from(fl))
      onChange?.(fl)
    }
  }

  const removeFile = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i))
  }

  return (
    <div className={className}>
      {label && <label className={`block text-[13px] font-semibold mb-1.5 ${error ? 'text-[var(--danger)]' : 'text-[var(--text-primary)]'}`}>{label}</label>}
      <div
        onClick={() => ref.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault(); setDragging(false)
          const fl = e.dataTransfer.files
          setFiles(Array.from(fl)); onChange?.(fl)
        }}
        className={`border-2 border-dashed rounded-[var(--radius-md)] p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors ${
          dragging ? 'border-[var(--primary)] bg-[var(--primary-lighter)]' : error ? 'border-[var(--danger)] bg-[var(--danger-bg)]' : 'border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-lighter)]'
        }`}
      >
        <Upload size={20} className={dragging ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'} />
        <p className="text-[13px] text-[var(--text-muted)] text-center">
          <span className="font-semibold text-[var(--primary)]">Clique para selecionar</span> ou arraste aqui
        </p>
        {accept && <p className="text-[11px] text-[var(--text-muted)]">{accept}</p>}
        <input ref={ref} type="file" accept={accept} multiple={multiple} onChange={handleChange} className="hidden" />
      </div>
      {files.length > 0 && (
        <ul className="mt-2 flex flex-col gap-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)] bg-[var(--surface)] rounded-[var(--radius-sm)] py-1.5 px-3">
              <Check size={12} className="text-[var(--success)] shrink-0" />
              <span className="flex-1 truncate">{f.name}</span>
              <span className="text-[var(--text-muted)] shrink-0">{(f.size / 1024).toFixed(0)} KB</span>
              <button onClick={(e) => { e.stopPropagation(); removeFile(i) }} className="text-[var(--text-muted)] hover:text-[var(--danger)] bg-transparent border-none cursor-pointer p-0">
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-xs text-[var(--danger)] mt-1">{error}</p>}
    </div>
  )
}

// ─── MaskedInput ──────────────────────────────────────────────────────────────

type MaskType = 'phone' | 'cpf' | 'cnpj' | 'cep' | 'date' | 'currency'

const masks: Record<MaskType, (v: string) => string> = {
  phone:    (v) => v.replace(/\D/g, '').replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3'),
  cpf:      (v) => v.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4'),
  cnpj:     (v) => v.replace(/\D/g, '').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5'),
  cep:      (v) => v.replace(/\D/g, '').replace(/^(\d{5})(\d{3}).*/, '$1-$2'),
  date:     (v) => v.replace(/\D/g, '').replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3'),
  currency: (v) => {
    const n = v.replace(/\D/g, '')
    return (Number(n) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  },
}

interface MaskedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  mask: MaskType
  error?: string
  onChange?: (raw: string, masked: string) => void
  iconLeft?: ReactNode
}

export function MaskedInput({ label, mask, error, onChange, iconLeft, className = '', ...props }: MaskedInputProps) {
  const [display, setDisplay] = useState('')
  const base = `w-full py-2.5 px-3.5 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-input)] bg-white text-sm text-[var(--text-primary)] transition-all outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(27,152,224,0.12)] box-border`

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const masked = masks[mask](raw)
    setDisplay(masked)
    onChange?.(raw.replace(/\D/g, ''), masked)
  }

  return (
    <div>
      {label && <label className={`block text-[13px] font-semibold mb-1.5 ${error ? 'text-[var(--danger)]' : 'text-[var(--text-primary)]'}`}>{label}</label>}
      <div className="relative">
        {iconLeft && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none flex">{iconLeft}</span>}
        <input
          value={display}
          onChange={handleChange}
          className={`${base} ${error ? 'border-[var(--danger)]!' : ''} ${iconLeft ? 'pl-[38px]' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-[var(--danger)] mt-1">{error}</p>}
    </div>
  )
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

interface CheckboxProps {
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  error?: string
  disabled?: boolean
  className?: string
}

export function Checkbox({ label, checked = false, onChange, error, disabled, className = '' }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-2.5 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div
        onClick={() => !disabled && onChange?.(!checked)}
        className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center transition-all shrink-0 ${
          checked ? 'bg-[var(--primary)] border-[var(--primary)]' : error ? 'border-[var(--danger)]' : 'border-[var(--border-input)] bg-white'
        }`}
      >
        {checked && <Check size={11} className="text-white" strokeWidth={3} />}
      </div>
      <span className={`text-[13px] ${error ? 'text-[var(--danger)]' : 'text-[var(--text-primary)]'}`}>{label}</span>
    </label>
  )
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

interface RadioOption { value: string; label: string; description?: string }

interface RadioGroupProps {
  label?: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  error?: string
  className?: string
}

export function RadioGroup({ label, options, value, onChange, error, className = '' }: RadioGroupProps) {
  return (
    <div className={className}>
      {label && <label className={`block text-[13px] font-semibold mb-2 ${error ? 'text-[var(--danger)]' : 'text-[var(--text-primary)]'}`}>{label}</label>}
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-start gap-2.5 cursor-pointer">
            <div
              onClick={() => onChange?.(opt.value)}
              className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                value === opt.value ? 'border-[var(--primary)]' : 'border-[var(--border-input)]'
              }`}
            >
              {value === opt.value && <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />}
            </div>
            <div>
              <span className="text-[13px] font-medium text-[var(--text-primary)]">{opt.label}</span>
              {opt.description && <p className="text-xs text-[var(--text-muted)] mt-0.5">{opt.description}</p>}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-[var(--danger)] mt-1">{error}</p>}
    </div>
  )
}
