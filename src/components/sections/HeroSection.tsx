import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-[#185FA5] overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-green translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl">
          {/* ラベル */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-6 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            DX・IT活用メディア
          </div>

          {/* メインコピー */}
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-4 text-balance">
            現場で使えるDX・IT活用の
            <br className="hidden sm:block" />
            ヒントが見つかる
          </h1>

          {/* サブコピー */}
          <p className="text-base md:text-lg text-white/75 mb-10 leading-relaxed">
            難しい言葉なし。明日から使える情報だけ。
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-sm bg-brand-green text-white hover:bg-brand-green-dark transition-colors shadow-lg shadow-brand-green/30"
            >
              無料相談（30分）を予約する
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-colors"
            >
              記事を読む
              <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* 安心ポイント */}
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-8">
            {['完全無料', 'オンライン対応', '秘密厳守'].map((point) => (
              <span key={point} className="flex items-center gap-1.5 text-xs text-white/60">
                <svg className="w-3.5 h-3.5 text-brand-green" viewBox="0 0 16 16" fill="none" aria-hidden>
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
