import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問い合わせ完了',
  robots: { index: false },
}

export default function ThanksPage() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mx-auto mb-6">
          <svg className="w-8 h-8 text-[#111]" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M6 16l7 7L26 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#111] mb-3">送信が完了しました</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          お問い合わせありがとうございます。
          <br />
          内容を確認の上、2営業日以内にご返信いたします。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/articles" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-sm bg-[#111] text-white hover:bg-[#333] transition-colors">
            記事を読む
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            フォームに戻る
          </Link>
        </div>
      </div>
    </main>
  )
}
