import Link from 'next/link'

type Props = {
  title: string
  linkLabel?: string
  linkHref?: string
}

export default function SectionTitle({ title, linkLabel, linkHref }: Props) {
  return (
    <div className="flex items-end justify-between mb-8">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-tight">
        {title}
      </h2>
      {linkLabel && linkHref && (
        <Link
          href={linkHref}
          className="text-sm font-medium text-gray-500 hover:text-[#111] transition-colors flex items-center gap-1 shrink-0 pb-1"
        >
          {linkLabel}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  )
}
