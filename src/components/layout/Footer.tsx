import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#111] text-gray-400">
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-serif text-base font-bold text-white tracking-tight">
            IT<span className="font-normal">の右腕</span>
          </Link>
          <p className="text-xs text-gray-600">© {currentYear} ITの右腕. All rights reserved.</p>
        </div>
        <nav aria-label="法的情報" className="flex items-center gap-4">
          <Link href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="/tokushoho" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            特定商取引法に基づく表記
          </Link>
        </nav>
      </div>
    </footer>
  )
}
