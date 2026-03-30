import Link from 'next/link'

type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: Props) {
  const baseClass =
    variant === 'primary'
      ? 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm bg-brand-green text-white hover:bg-brand-green-dark transition-colors disabled:opacity-50'
      : 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-light transition-colors disabled:opacity-50'

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className}`}
    >
      {children}
    </button>
  )
}
