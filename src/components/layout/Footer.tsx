import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#111] text-gray-400">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* サイト説明 */}
          <div className="flex flex-col gap-3">
            <Link href="/articles" className="inline-block">
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                IT<span className="font-normal">の右腕</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              中小企業・スタートアップのDX推進を支援するITメディア。
              現場で使えるIT活用のヒントをお届けします。
            </p>
          </div>

          {/* コンテンツリンク */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-gray-300 tracking-widest uppercase">コンテンツ</h3>
            <nav aria-label="コンテンツナビゲーション" className="flex flex-col gap-2">
              <Link href="/articles" className="text-sm text-gray-500 hover:text-white transition-colors">
                記事一覧
              </Link>
              <Link href="/categories" className="text-sm text-gray-500 hover:text-white transition-colors">
                カテゴリ一覧
              </Link>
              <Link href="/about" className="text-sm text-gray-500 hover:text-white transition-colors">
                運営者紹介
              </Link>
            </nav>
          </div>

          {/* お問い合わせリンク */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-gray-300 tracking-widest uppercase">お問い合わせ</h3>
            <nav aria-label="お問い合わせナビゲーション" className="flex flex-col gap-2">
              <Link href="/contact" className="text-sm text-gray-500 hover:text-white transition-colors">
                お問い合わせフォーム
              </Link>
              <Link href="/consultation" className="text-sm text-gray-500 hover:text-white transition-colors">
                無料相談（30分）
              </Link>
            </nav>
          </div>
        </div>

        {/* ボトムバー */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-600">
            © {currentYear} ITの右腕. All rights reserved.
          </p>
          <nav aria-label="法的情報ナビゲーション" className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/tokushoho" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              特定商取引法に基づく表記
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
