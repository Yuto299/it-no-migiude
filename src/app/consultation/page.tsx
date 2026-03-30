import type { Metadata } from 'next'
import CalendlyEmbed from './CalendlyEmbed'

export const metadata: Metadata = {
  title: '無料相談（30分）',
  description: 'ITやDXについて気軽にご相談ください。30分・完全無料・オンライン対応の無料相談を受け付けています。',
}

const POINTS = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: '30分',
    desc: '気軽に話せる短さ',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'オンライン対応',
    desc: '全国どこからでも',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: '完全無料',
    desc: '費用は一切かかりません',
  },
]

export default function ConsultationPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ''

  return (
    <main className="bg-[#f8f8f6] min-h-screen py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-10 text-center">
          <p className="text-xs font-medium text-brand-green uppercase tracking-wider mb-2">Free Consultation</p>
          <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-3">無料相談（30分）</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            DXの進め方、ツール選定、コスト削減——
            <br className="hidden sm:block" />
            どんな小さな疑問でも、まずお話しください。
          </p>
        </div>

        {/* 3ポイント */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {POINTS.map((point) => (
            <div
              key={point.label}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-green-light text-brand-green">
                {point.icon}
              </div>
              <span className="font-bold text-sm text-[#1a1a1a]">{point.label}</span>
              <span className="text-xs text-gray-400 leading-snug">{point.desc}</span>
            </div>
          ))}
        </div>

        {/* Calendly埋め込み */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <CalendlyEmbed url={calendlyUrl} />
        </div>

        {/* フォームへの誘導 */}
        <p className="text-center text-xs text-gray-400 mt-6">
          日程が合わない場合は
          <a href="/contact" className="text-brand-green hover:underline underline-offset-2 ml-1">
            お問い合わせフォーム
          </a>
          からご連絡ください。
        </p>
      </div>
    </main>
  )
}
