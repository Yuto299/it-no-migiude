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
      ? 'inline-flex items-center justify-center px-6 py-3 font-semibold text-sm bg-[#111] text-white hover:bg-[#333] transition-colors disabled:opacity-40'
      : 'inline-flex items-center justify-center px-6 py-3 font-semibold text-sm border border-[#111] text-[#111] hover:bg-gray-50 transition-colors disabled:opacity-40'

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClass} ${className}`}>
      {children}
    </button>
  )
}
