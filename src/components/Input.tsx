import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helper?: string
  error?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export function Input({ label, helper, error, iconLeft, iconRight, className = '', ...props }: InputProps) {
  const baseClasses = `w-full py-2.5 px-3.5 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-input)] bg-white text-sm font-[DM_Sans,sans-serif] text-[var(--text-primary)] transition-all duration-150 outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(29,99,237,0.1)] box-border`
  const errorClasses = error ? 'border-[var(--danger)]! shadow-[0_0_0_3px_rgba(239,68,68,0.08)]!' : ''

  return (
    <div>
      {label && (
        <label className={`block text-[13px] font-semibold mb-1.5 ${error ? 'text-[var(--danger)]' : 'text-[var(--text-primary)]'}`}>
          {label}
        </label>
      )}
      <div className="relative w-full">
        {iconLeft && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none flex">
            {iconLeft}
          </span>
        )}
        <input
          className={`${baseClasses} ${errorClasses} ${iconLeft ? 'pl-[38px]' : ''} ${className}`}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none flex">
            {iconRight}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-[var(--danger)] mt-1">{error}</p>}
      {helper && !error && <p className="text-xs text-[var(--text-muted)] mt-1">{helper}</p>}
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string; disabled?: boolean }[]
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div>
      {label && <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-1.5">{label}</label>}
      <select
        className={`w-full py-2.5 px-3.5 pr-[38px] rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-input)] bg-white text-sm font-[DM_Sans,sans-serif] text-[var(--text-primary)] transition-all duration-150 outline-none appearance-none cursor-pointer focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(29,99,237,0.1)] bg-no-repeat bg-[right_12px_center] bg-[length:16px] ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div>
      {label && <label className="block text-[13px] font-semibold text-[var(--text-primary)] mb-1.5">{label}</label>}
      <textarea
        className={`w-full py-2.5 px-3.5 rounded-[var(--radius-md)] border-[1.5px] border-[var(--border-input)] bg-white text-sm font-[DM_Sans,sans-serif] text-[var(--text-primary)] transition-all duration-150 outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(29,99,237,0.1)] resize-y box-border ${className}`}
        {...props}
      />
    </div>
  )
}
