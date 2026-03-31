'use client'

import Link from 'next/link'

type Props = {
  url: string
}

export default function CalendlyEmbed({ url }: Props) {
  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 px-6 text-center">
        <svg className="w-10 h-10 text-gray-300" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9h18M8 4v5M16 4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-sm text-gray-400">
          カレンダーを準備中です。
          <br />
          <Link href="/contact" className="text-gray-700 hover:underline underline-offset-2">
            お問い合わせフォーム
          </Link>
          からご連絡ください。
        </p>
      </div>
    )
  }

  return (
    <iframe
      src={url}
      width="100%"
      height="700"
      frameBorder="0"
      title="無料相談の予約カレンダー"
      className="block"
    />
  )
}
