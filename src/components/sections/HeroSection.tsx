import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-[#f8f8f6] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Playfair Display 英字アクセント */}
          <p className="font-display italic text-brand-green text-base md:text-lg tracking-wide mb-6 md:mb-8">
            IT &times; DX Media
          </p>

          {/* メインヘッドライン — Shippori Mincho */}
          <h1 className="font-serif font-extrabold text-[#1a1a1a] leading-[1.2] mb-6 md:mb-8 text-balance">
            <span className="block text-4xl md:text-6xl lg:text-7xl">
              現場で使える
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl">
              DX・IT活用の
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl">
              ヒントが見つかる
            </span>
          </h1>

          {/* グリーンの短い区切り線 */}
          <div className="w-12 h-[3px] bg-brand-green mb-6 md:mb-8" />

          {/* サブコピー */}
          <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-10 md:mb-12">
            難しい言葉なし。明日から使える情報だけ。
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-sm bg-brand-green text-white hover:bg-brand-green-dark transition-colors"
            >
              無料相談（30分）を予約する
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-sm text-[#1a1a1a] border border-gray-300 hover:border-brand-green hover:text-brand-green transition-colors"
            >
              記事を読む
              <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* 安心ポイント */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-xs text-gray-400">
            {['完全無料', 'オンライン対応', '秘密厳守'].map((point) => (
              <span key={point} className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-brand-green shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
