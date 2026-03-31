import Link from 'next/link'

type Props = {
  currentPage: number
  totalPages: number
  buildHref: (page: number) => string
}

export default function Pagination({ currentPage, totalPages, buildHref }: Props) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav aria-label="ページネーション" className="flex items-center justify-center gap-1 mt-12">
      <Link
        href={hasPrev ? buildHref(currentPage - 1) : '#'}
        aria-disabled={!hasPrev}
        className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm transition-colors ${
          hasPrev
            ? 'text-gray-600 hover:bg-gray-100'
            : 'text-gray-300 pointer-events-none'
        }`}
        aria-label="前のページ"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-brand-green text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={hasNext ? buildHref(currentPage + 1) : '#'}
        aria-disabled={!hasNext}
        className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm transition-colors ${
          hasNext
            ? 'text-gray-600 hover:bg-gray-100'
            : 'text-gray-300 pointer-events-none'
        }`}
        aria-label="次のページ"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </nav>
  )
}
