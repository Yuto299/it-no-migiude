import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ITの右腕とは',
  description: '中小企業・スタートアップのDX推進を支援するITメディア「ITの右腕」のコンセプトと想いをご紹介します。',
}

const PROBLEMS = [
  'ITのことを相談できる人が社内にいない',
  '導入したいツールはあるが、何から始めればいいかわからない',
  'ベンダーの説明が難しくて、正しい判断ができない',
  'DXと言われても、自社に何が必要かイメージできない',
]

const VALUES = [
  {
    title: '現場目線の情報',
    desc: '難しい技術用語を使わず、経営者・現場担当者が「明日から使える」レベルで解説します。',
  },
  {
    title: '中立な立場',
    desc: '特定のツールやベンダーに偏らず、自社に合った選択ができるよう客観的な情報をお届けします。',
  },
  {
    title: '相談できる距離感',
    desc: '記事を読んで疑問が生まれたら、無料相談でそのまま聞いていただけます。読む→相談→解決まで一気通貫です。',
  },
]

export default function ConceptPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">About</p>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#111] mb-4">ITの右腕とは</h1>
      <p className="text-sm text-gray-500 leading-relaxed mb-12">
        中小企業・スタートアップのための、IT活用メディアです。
      </p>

      {/* 課題 */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif text-lg font-bold text-[#111] mb-6">こんなお悩みはありませんか？</h2>
        <ul className="flex flex-col gap-3">
          {PROBLEMS.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#111] shrink-0" />
              {p}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 leading-relaxed mt-6">
          ITやDXへの取り組みを「難しそう」「うちには関係ない」と感じている方は多いです。
          でも、正しい情報と少しのサポートがあれば、中小企業でも十分に活用できます。
          そのための「右腕」になりたい——それがこのメディアの出発点です。
        </p>
      </section>

      {/* 価値観 */}
      <section className="mb-12 pb-12 border-b border-gray-100">
        <h2 className="font-serif text-lg font-bold text-[#111] mb-6">大切にしていること</h2>
        <div className="flex flex-col gap-6">
          {VALUES.map((v) => (
            <div key={v.title}>
              <h3 className="text-sm font-semibold text-[#111] mb-1">{v.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/consultation"
          className="inline-flex items-center justify-center px-6 py-3 font-semibold text-sm bg-[#111] text-white hover:bg-[#333] transition-colors"
        >
          無料相談（30分）を予約する
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          記事を読む
        </Link>
      </section>
    </main>
  )
}
