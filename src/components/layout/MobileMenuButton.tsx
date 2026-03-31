'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded hover:bg-gray-100 transition-colors"
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
      >
        <span className={`block w-5 h-0.5 bg-[#111] transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block w-5 h-0.5 bg-[#111] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-[#111] transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50">
          <nav className="flex flex-col max-w-5xl mx-auto px-4 py-3">
            <Link onClick={() => setIsOpen(false)} href="/articles" className="py-3 text-sm text-gray-600 hover:text-[#111] border-b border-gray-100 transition-colors">
              記事一覧
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/categories" className="py-3 text-sm text-gray-600 hover:text-[#111] border-b border-gray-100 transition-colors">
              カテゴリ
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/about" className="py-3 text-sm text-gray-600 hover:text-[#111] border-b border-gray-100 transition-colors">
              運営者紹介
            </Link>
            <div className="flex flex-col gap-2 pt-3">
              <Link onClick={() => setIsOpen(false)} href="/consultation" className="flex items-center justify-center py-2.5 text-sm font-semibold text-[#111] border border-[#111] hover:bg-gray-50 transition-colors">
                無料相談（30分）
              </Link>
              <Link onClick={() => setIsOpen(false)} href="/contact" className="flex items-center justify-center py-2.5 text-sm font-semibold text-white bg-[#111] hover:bg-[#333] transition-colors">
                お問い合わせ
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
