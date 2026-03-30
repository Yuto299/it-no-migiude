import Link from 'next/link'
import MobileMenuButton from './MobileMenuButton'

export default function Header() {
  return (
    <header className="relative sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-serif text-xl font-bold text-[#1a1a1a] tracking-tight">
            IT<span className="text-brand-green">の右腕</span>
          </span>
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/articles"
            className="text-sm font-medium text-gray-600 hover:text-brand-green transition-colors"
          >
            記事一覧
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium text-gray-600 hover:text-brand-green transition-colors"
          >
            カテゴリ
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-brand-green transition-colors"
          >
            運営者紹介
          </Link>
        </nav>

        {/* デスクトップCTAボタン */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/consultation"
            className="px-4 py-2 text-sm font-semibold text-brand-blue border-2 border-brand-blue rounded-lg hover:bg-brand-blue-light transition-colors"
          >
            無料相談（30分）
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-semibold text-white bg-brand-green rounded-lg hover:bg-brand-green-dark transition-colors"
          >
            お問い合わせ
          </Link>
        </div>

        {/* モバイルメニュー */}
        <MobileMenuButton />
      </div>
    </header>
  )
}
