import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問い合わせ完了',
  robots: { index: false },
}

export default function ThanksPage() {
  return (
    <main className="bg-[#f8f8f6] min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        {/* アイコン */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-green-light mx-auto mb-6">
          <svg className="w-8 h-8 text-brand-green" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M6 16l7 7L26 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-serif text-2xl font-bold text-[#1a1a1a] mb-3">
          送信が完了しました
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          お問い合わせありがとうございます。
          <br />
          内容を確認の上、2営業日以内にご返信いたします。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm bg-brand-green text-white hover:bg-brand-green-dark transition-colors"
          >
            トップページへ戻る
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            記事を読む
          </Link>
        </div>
      </div>
    </main>
  )
}
