import Link from 'next/link'

const SKILLS = ['FastAPI', 'Next.js', 'SAP', 'Python', 'kintone', 'DX支援']

export default function AboutSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* アバター */}
            <div className="shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-blue-light border-4 border-brand-blue/10 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
            </div>

            {/* プロフィール */}
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <p className="text-xs font-medium text-brand-green uppercase tracking-wider mb-1">運営者紹介</p>
                <h2 className="font-serif text-2xl font-bold text-[#1a1a1a]">運営者名</h2>
                <p className="text-sm text-gray-500 mt-0.5">ITコンサルタント / DX支援スペシャリスト</p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                中小企業・スタートアップのDX推進を専門とするITコンサルタント。
                SAPやkintoneを活用した業務改善から、FastAPI・Next.jsによるシステム開発まで幅広く支援しています。
                「難しいITを、使えるITに」をモットーに、現場に寄り添ったDX推進を行っています。
              </p>

              {/* スキルタグ */}
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:text-brand-green-dark transition-colors mt-1 self-start"
              >
                詳しいプロフィールを見る
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
