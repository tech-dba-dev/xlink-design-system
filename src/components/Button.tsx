import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg' | 'pill' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--primary)] text-white hover:bg-[#1554CC] hover:shadow-[0_4px_16px_rgba(29,99,237,0.3)] hover:-translate-y-px',
  secondary: 'bg-[var(--primary-lighter)] text-[var(--primary)] hover:bg-[var(--primary-light)]',
  outline: 'border-[1.5px] border-[var(--border)] text-[var(--text-primary)] bg-white hover:border-[var(--primary)] hover:text-[var(--primary)]',
  ghost: 'text-[var(--text-secondary)] bg-transparent hover:bg-[var(--primary-lighter)] hover:text-[var(--primary)]',
  danger: 'bg-[var(--danger)] text-white hover:bg-[#DC2626] hover:shadow-[0_4px_16px_rgba(239,68,68,0.3)]',
  success: 'bg-[var(--success)] text-white hover:bg-[#059669]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-xs rounded-[var(--radius-sm)]',
  md: 'px-5 py-3 rounded-[var(--radius-md)]',
  lg: 'px-7 py-3.5 rounded-[var(--radius-md)]',
  pill: 'px-6 py-3 rounded-full',
  icon: 'w-11 h-11 p-0 rounded-[var(--radius-md)]',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold text-sm leading-none transition-all duration-200 cursor-pointer border-none font-[DM_Sans,sans-serif] whitespace-nowrap min-h-[44px] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
