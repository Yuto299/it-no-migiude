import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '運営者紹介',
  description: '運営者のプロフィール・スキル・実績。',
}

const SKILLS = ['FastAPI', 'Next.js', 'SAP', 'Python', 'kintone', 'DX支援']

const CAREER = [
  { period: '2015〜2020年', desc: '大手SIerにてSAP導入・業務改善プロジェクトに従事。製造業・流通業のERP刷新を多数担当。' },
  { period: '2020〜2022年', desc: '独立。中小企業向けkintone導入・業務フロー設計を専門に支援。50社以上の導入実績。' },
  { period: '2022年〜現在', desc: 'FastAPI・Next.jsを活用したシステム開発にも領域を拡大。DX支援の川上から川下まで一気通貫で対応。' },
]

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <p className="text-xs font-medium text-brand-green uppercase tracking-wider mb-2">About</p>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10">運営者紹介</h1>

      {/* プロフィール */}
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-10 pb-10 border-b border-gray-100">
        <div
          className="w-24 h-24 rounded-full bg-brand-blue-light border-4 border-brand-blue/10 flex items-center justify-center shrink-0"
          aria-label="運営者アバター"
        >
          <span className="text-4xl" role="img" aria-label="人物アイコン">👤</span>
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1a1a1a]">運営者名</h2>
          <p className="text-sm text-gray-500 mt-0.5 mb-4">ITコンサルタント / DX支援スペシャリスト</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            中小企業・スタートアップのDX推進を専門とするITコンサルタント。
            SAPやkintoneを活用した業務改善から、FastAPI・Next.jsによるシステム開発まで幅広く支援しています。
            「難しいITを、使えるITに」をモットーに、現場に寄り添った支援を行っています。
          </p>
        </div>
      </div>

      {/* スキルタグ */}
      <div className="mb-10 pb-10 border-b border-gray-100">
        <h3 className="font-semibold text-sm text-[#1a1a1a] mb-4">スキル・専門領域</h3>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span key={skill} className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 経歴 */}
      <div className="mb-12">
        <h3 className="font-semibold text-sm text-[#1a1a1a] mb-6">経歴・実績</h3>
        <ol className="flex flex-col gap-6">
          {CAREER.map((item) => (
            <li key={item.period} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-green mt-1 shrink-0" />
                <div className="w-px flex-1 bg-gray-200 mt-1" />
              </div>
              <div className="pb-2">
                <p className="text-xs font-semibold text-brand-green mb-1">{item.period}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* 末尾CTA */}
      <div className="rounded-2xl bg-brand-green-light border border-brand-green/20 p-6 md:p-8 text-center">
        <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">
          まずは話してみませんか
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          30分の無料相談で、あなたの課題を整理します。
          <br className="hidden sm:block" />
          ITやDXのことなら何でもお気軽にどうぞ。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm bg-brand-green text-white hover:bg-brand-green-dark transition-colors"
          >
            無料相談（30分）を予約する
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm border border-brand-green text-brand-green hover:bg-brand-green/5 transition-colors"
          >
            お問い合わせフォームへ
          </Link>
        </div>
      </div>
    </main>
  )
}
