import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* サイト説明 */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                IT<span className="text-brand-green">の右腕</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              中小企業・スタートアップのDX推進を支援するITメディア。
              現場で使えるIT活用のヒントをお届けします。
            </p>
          </div>

          {/* コンテンツリンク */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">コンテンツ</h3>
            <nav aria-label="コンテンツナビゲーション" className="flex flex-col gap-2">
              <Link href="/articles" className="text-sm text-gray-400 hover:text-brand-green transition-colors">
                記事一覧
              </Link>
              <Link href="/categories" className="text-sm text-gray-400 hover:text-brand-green transition-colors">
                カテゴリ一覧
              </Link>
              <Link href="/about" className="text-sm text-gray-400 hover:text-brand-green transition-colors">
                運営者紹介
              </Link>
            </nav>
          </div>

          {/* お問い合わせリンク */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">お問い合わせ</h3>
            <nav aria-label="お問い合わせナビゲーション" className="flex flex-col gap-2">
              <Link href="/contact" className="text-sm text-gray-400 hover:text-brand-green transition-colors">
                お問い合わせフォーム
              </Link>
              <Link href="/consultation" className="text-sm text-gray-400 hover:text-brand-green transition-colors">
                無料相談（30分）
              </Link>
            </nav>
          </div>
        </div>

        {/* ボトムバー */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            © {currentYear} ITの右腕. All rights reserved.
          </p>
          <nav aria-label="法的情報ナビゲーション" className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/tokushoho" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              特定商取引法に基づく表記
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
