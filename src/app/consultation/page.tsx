import type { Metadata } from 'next'
import Link from 'next/link'
import CalendlyEmbed from './CalendlyEmbed'

export const metadata: Metadata = {
  title: '無料相談（30分）',
  description: 'ITやDXについて気軽にご相談ください。30分・完全無料・オンライン対応の無料相談を受け付けています。',
}

const TOPICS = [
  'Webサイトを作りたい・リニューアルしたい',
  'DXの進め方がわからない',
  'どのツールを選べばいいか迷っている',
  '社内の業務を効率化したい',
  'コスト削減につながるIT活用を知りたい',
  'ベンダーとのやり取りで困っている',
  '何から始めればいいか整理したい',
]

export default function ConsultationPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ''

  return (
    <main>
      {/* ヒーロー */}
      <section className="bg-gray-50 border-b border-gray-100 py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Free Consultation</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight mb-4">
            無料相談
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Web制作・業務効率化・DX推進など、ITに関することならなんでもOKです。<br />
            「こんなこと聞いていいの？」という内容ほど、ぜひお問い合わせください。
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* メタ情報 */}
        <div className="flex gap-10 mb-10 pb-10 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">時間</p>
            <p className="text-sm font-semibold text-[#1a1a1a]">30分</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">費用</p>
            <p className="text-sm font-semibold text-[#1a1a1a]">完全無料</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">形式</p>
            <p className="text-sm font-semibold text-[#1a1a1a]">オンライン</p>
          </div>
        </div>

        {/* こんな相談ができます */}
        <div className="mb-10 pb-10 border-b border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">こんな相談ができます</p>
          <ul className="flex flex-col">
            {TOPICS.map((topic, i) => (
              <li
                key={topic}
                className={`flex items-center justify-between py-3.5 text-sm text-[#1a1a1a] font-medium ${i !== TOPICS.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                {topic}
                <span className="text-brand-green text-xs ml-4 shrink-0">→</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-400">上記以外でも、具体的でなくても問題ありません。</p>
        </div>

        {/* Calendly */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">日程を選択してください</p>
          <div className="border border-gray-100 overflow-hidden">
            <CalendlyEmbed url={calendlyUrl} />
          </div>
          <p className="mt-4 text-sm text-gray-500">
            日程が合わない場合は
            <Link href="/contact" className="text-brand-green hover:underline underline-offset-2 ml-1">
              お問い合わせフォーム
            </Link>
            からご連絡ください。
          </p>
        </div>
      </div>
    </main>
  )
}
