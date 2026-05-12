'use client'

import { useEffect, useState } from 'react'
import type { TocHeading } from '@/lib/article-html'

type Props = {
  headings: TocHeading[]
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      },
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <>
      {/* Mobile: collapsible at top */}
      <details
        className="lg:hidden mb-8 rounded-lg border border-gray-200 bg-gray-50"
        open={mobileOpen}
        onToggle={(e) => setMobileOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-gray-700 flex items-center justify-between">
          <span>目次</span>
          <span
            className="text-gray-400 transition-transform"
            style={{ transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0)' }}
            aria-hidden
          >
            ▾
          </span>
        </summary>
        <nav className="px-4 pb-4">
          <TocList headings={headings} activeId={activeId} />
        </nav>
      </details>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            目次
          </p>
          <nav>
            <TocList headings={headings} activeId={activeId} />
          </nav>
        </div>
      </aside>
    </>
  )
}

function TocList({
  headings,
  activeId,
}: {
  headings: TocHeading[]
  activeId: string | null
}) {
  return (
    <ul className="space-y-1.5 text-sm">
      {headings.map((h) => {
        const isActive = h.id === activeId
        return (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              className={[
                'block py-1 border-l-2 pl-3 transition-colors',
                isActive
                  ? 'border-brand-green text-brand-green-dark font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300',
              ].join(' ')}
            >
              {h.text}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
