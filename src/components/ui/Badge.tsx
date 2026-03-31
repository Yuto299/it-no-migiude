import Link from 'next/link'

type Props = {
  label: string
  slug?: string
  variant?: 'category' | 'tag'
  href?: string
}

const CATEGORY_COLORS: { bg: string; text: string }[] = [
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-teal-100', text: 'text-teal-700' },
  { bg: 'bg-violet-100', text: 'text-violet-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  { bg: 'bg-cyan-100', text: 'text-cyan-700' },
]

function hashSlug(slug: string): number {
  return slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export default function Badge({ label, slug, variant = 'category', href }: Props) {
  if (variant === 'category') {
    const color = CATEGORY_COLORS[hashSlug(slug ?? label) % CATEGORY_COLORS.length]
    const baseClass = `inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${color.bg} ${color.text}`

    if (href) {
      return (
        <Link href={href} className={`${baseClass} hover:opacity-80 transition-opacity`}>
          {label}
        </Link>
      )
    }
    return <span className={baseClass}>{label}</span>
  }

  const tagClass = 'inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600'

  if (href) {
    return (
      <Link href={href} className={`${tagClass} hover:text-[#111] transition-colors`}>
        {label}
      </Link>
    )
  }

  return <span className={tagClass}>{label}</span>
}
