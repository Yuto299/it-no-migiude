'use client'

import { useEffect, useState } from 'react'
import type { TocHeading } from '@/lib/article-html'

type Props = {
  headings: TocHeading[]
  variant?: 'mobile' | 'sidebar'
}

export default function TableOfContents({ headings, variant = 'mobile' }: Props) {
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

  if (variant === 'sidebar') {
    return (
      <aside>
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.15em] mb-4 pb-2 border-b border-gray-100">
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
    <details
      className="mb-8 rounded-lg border border-gray-200 bg-gray-50"
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
    <ul className="text-[13px] leading-snug">
      {headings.map((h) => {
        const isActive = h.id === activeId
        const isH3 = h.level === 3
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={[
                'block py-1.5 transition-colors',
                isH3 ? 'pl-5 text-[12.5px]' : 'pl-0 font-medium',
                isActive
                  ? 'text-brand-green-dark'
                  : isH3
                  ? 'text-gray-500 hover:text-gray-900'
                  : 'text-gray-700 hover:text-gray-900',
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
