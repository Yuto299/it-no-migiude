import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#111] text-gray-400">
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-4">
        {/* メインエリア: ロゴ左・リンク右 */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
          <Link href="/" className="font-serif text-xl font-bold text-white tracking-tight shrink-0">
            IT<span className="font-normal">の右腕</span>
          </Link>

          <div className="flex flex-col gap-2 md:items-end">
            {/* ナビリンク */}
            <nav className="flex flex-wrap gap-x-6 gap-y-1">
              <Link href="/concept" className="text-sm text-gray-400 hover:text-white transition-colors">ITの右腕とは</Link>
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">記事一覧</Link>
              <Link href="/consultation" className="text-sm text-gray-400 hover:text-white transition-colors">無料相談</Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">お問い合わせ</Link>
            </nav>
            {/* 法的リンク */}
            <nav className="flex flex-wrap gap-x-6 gap-y-1">
              <Link href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">プライバシーポリシー</Link>
              <Link href="/tokushoho" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">特定商取引法に基づく表記</Link>
            </nav>
          </div>
        </div>

      </div>

      {/* コピーライト */}
      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <p className="text-xs text-gray-600">© {currentYear} ITの右腕. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
