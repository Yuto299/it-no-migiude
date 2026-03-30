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
        className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
      >
        <span
          className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
            isOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
          <nav className="flex flex-col px-4 py-4 gap-1">
            <Link
              href="/articles"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-green hover:bg-brand-green-light rounded-lg transition-colors"
            >
              記事一覧
            </Link>
            <Link
              href="/categories"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-green hover:bg-brand-green-light rounded-lg transition-colors"
            >
              カテゴリ
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-green hover:bg-brand-green-light rounded-lg transition-colors"
            >
              運営者紹介
            </Link>
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-gray-100">
              <Link
                href="/consultation"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-brand-blue border-2 border-brand-blue rounded-lg hover:bg-brand-blue-light transition-colors"
              >
                無料相談（30分）
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-brand-green rounded-lg hover:bg-brand-green-dark transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
