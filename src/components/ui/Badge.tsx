import Link from 'next/link'

type Props = {
  label: string
  variant?: 'category' | 'tag'
  href?: string
}

export default function Badge({ label, variant = 'category', href }: Props) {
  const baseClass =
    variant === 'category'
      ? 'inline-block px-2 py-0.5 rounded text-xs font-medium bg-brand-green-light text-brand-green'
      : 'inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600'

  if (href) {
    return (
      <Link href={href} className={`${baseClass} hover:opacity-80 transition-opacity`}>
        {label}
      </Link>
    )
  }

  return <span className={baseClass}>{label}</span>
}
