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
        <div className="sticky top-24">
          <p className="text-[11px] font-semibold text-gray-500 tracking-[0.2em] mb-5">
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
    <ul className="relative border-l border-gray-200">
      {headings.map((h) => {
        const isActive = h.id === activeId
        const isH3 = h.level === 3
        return (
          <li key={h.id} className="relative">
            <a
              href={`#${h.id}`}
              className={[
                'block leading-snug transition-colors',
                isH3
                  ? 'py-1.5 pl-8 pr-1 text-[12px] text-gray-500 hover:text-gray-800'
                  : 'py-2 pl-5 pr-1 text-[13px] font-medium text-gray-800 hover:text-brand-green-dark',
                isActive ? 'text-brand-green-dark' : '',
                isActive && !isH3 ? 'font-semibold' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {h.text}
            </a>
            {isActive && (
              <span
                aria-hidden
                className="absolute -left-px top-1.5 bottom-1.5 w-[2px] rounded-full bg-brand-green"
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}
