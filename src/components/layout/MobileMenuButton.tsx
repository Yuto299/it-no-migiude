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
            <Link onClick={() => setIsOpen(false)} href="/concept" className="py-3 text-sm text-gray-600 hover:text-[#111] border-b border-gray-100 transition-colors">
              ITの右腕とは
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/" className="py-3 text-sm text-gray-600 hover:text-[#111] border-b border-gray-100 transition-colors">
              記事一覧
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/achievements" className="py-3 text-sm text-gray-600 hover:text-[#111] border-b border-gray-100 transition-colors">
              支援実績
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/consultation" className="py-3 text-sm text-gray-600 hover:text-[#111] border-b border-gray-100 transition-colors">
              無料相談
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/contact" className="py-3 text-sm text-gray-600 hover:text-[#111] transition-colors">
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
