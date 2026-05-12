'use client'

import { useEffect, useState } from 'react'
import type { TocHeading } from '@/lib/article-html'

type Props = {
  headings: TocHeading[]
  variant?: 'mobile' | 'sidebar'
}

export default function TableOfContents({ headings, variant = 'mobile' }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

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
        rootMargin: '-100px 0px -70% 0px',
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

  if (variant === 'sidebar') {
    return (
      <aside>
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
          <p className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.18em] mb-3 pb-3 border-b-2 border-gray-900">
            目次
          </p>
          <nav>
            <TocList headings={headings} activeId={activeId} />
          </nav>
        </div>
      </aside>
    )
  }

  return (
    <details className="toc-details mb-8 rounded-lg border border-gray-200 bg-gray-50">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-gray-700 flex items-center justify-between">
        <span>目次</span>
        <span className="toc-arrow text-gray-400" aria-hidden>
          ▾
        </span>
      </summary>
      <nav className="px-4 pb-4">
        <TocList headings={headings} activeId={activeId} />
      </nav>
    </details>
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
    <ul className="text-[13.5px] leading-snug space-y-0.5">
      {headings.map((h) => {
        const isActive = h.id === activeId
        const isH3 = h.level === 3
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={[
                'relative block py-1.5 transition-colors',
                isH3 ? 'pl-6 text-[12.5px]' : 'pl-3 font-semibold text-[13.5px]',
                isActive
                  ? 'text-brand-green-dark'
                  : isH3
                  ? 'text-gray-600 hover:text-gray-900'
                  : 'text-gray-900 hover:text-brand-green-dark',
              ].join(' ')}
            >
              {isActive && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-sm bg-brand-green"
                />
              )}
              {h.text}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
