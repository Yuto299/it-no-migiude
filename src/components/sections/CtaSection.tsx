import Link from 'next/link'

const POINTS = [
  { icon: '🕐', label: '無料30分' },
  { icon: '💻', label: 'オンライン対応' },
  { icon: '✅', label: '完全無料' },
]

export default function CtaSection() {
  return (
    <section className="bg-brand-green py-16 md:py-20 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-black translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <p className="text-brand-green-light text-sm font-medium mb-3 tracking-wider uppercase">
          Free Consultation
        </p>
        <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
          まず話してみませんか
        </h2>
        <p className="text-white/75 text-base md:text-lg mb-8 leading-relaxed">
          DXの進め方、ツール選定、コスト削減——
          <br className="hidden sm:block" />
          具体的な相談を30分で整理します。
        </p>

        {/* 安心3点 */}
        <div className="flex justify-center gap-6 sm:gap-10 mb-10">
          {POINTS.map((point) => (
            <div key={point.label} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{point.icon}</span>
              <span className="text-sm font-semibold text-white">{point.label}</span>
            </div>
          ))}
        </div>

        <Link
          href="/consultation"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold text-brand-green bg-white hover:bg-brand-green-light transition-colors shadow-lg"
        >
          無料相談を予約する
        </Link>

        <p className="mt-4 text-xs text-white/50">
          お問い合わせは
          <Link href="/contact" className="underline underline-offset-2 hover:text-white/80 transition-colors ml-1">
            こちら
          </Link>
          からも受け付けています
        </p>
      </div>
    </section>
  )
}
