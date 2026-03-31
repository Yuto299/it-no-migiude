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
        <nav aria-label="グローバルナビゲーション" className="hidden md:flex items-center gap-6">
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

        {/* モバイルメニュー */}
        <MobileMenuButton />
      </div>
    </header>
  )
}
