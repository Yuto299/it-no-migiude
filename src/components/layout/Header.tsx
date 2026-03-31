import Link from 'next/link'
import MobileMenuButton from './MobileMenuButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* ロゴ */}
        <Link href="/articles" className="shrink-0">
          <span className="font-serif text-lg font-bold text-[#111] tracking-tight">
            IT<span className="font-normal">の右腕</span>
          </span>
        </Link>

        {/* デスクトップナビ */}
        <nav aria-label="グローバルナビゲーション" className="hidden md:flex items-center gap-8">
          <Link href="/articles" className="text-sm text-gray-500 hover:text-[#111] transition-colors">
            記事一覧
          </Link>
          <Link href="/categories" className="text-sm text-gray-500 hover:text-[#111] transition-colors">
            カテゴリ
          </Link>
          <Link href="/about" className="text-sm text-gray-500 hover:text-[#111] transition-colors">
            運営者紹介
          </Link>
        </nav>

        {/* モバイルメニュー */}
        <MobileMenuButton />
      </div>
    </header>
  )
}
