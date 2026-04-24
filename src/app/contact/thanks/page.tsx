import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問い合わせ完了',
  robots: { index: false },
}

export default function ThanksPage() {
  return (
    <main>
      {/* ヒーロー */}
      <section className="bg-gray-50 border-b border-gray-100 py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Thank You</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight mb-4">
            送信が完了しました
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            お問い合わせありがとうございます。<br />
            内容を確認の上、2営業日以内にご返信いたします。
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* 完了アイコン */}
        <div className="flex gap-10 mb-10 pb-10 border-b border-gray-100 items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1F5EE] shrink-0">
            <svg className="w-6 h-6 text-brand-green" viewBox="0 0 32 32" fill="none" aria-hidden>
              <path d="M6 16l7 7L26 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a1a1a] mb-1">受付が完了しました</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              ご登録いただいたメールアドレスに確認メールをお送りしています。<br />
              届いていない場合は迷惑メールフォルダをご確認ください。
            </p>
          </div>
        </div>

        {/* 次のアクション */}
        <div className="mb-10 pb-10 border-b border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">次にできること</p>
          <ul className="flex flex-col">
            <li className="flex items-center justify-between py-3.5 text-sm text-[#1a1a1a] font-medium">
              記事でIT活用のヒントを探す
              <Link href="/articles" className="text-brand-green text-xs ml-4 shrink-0 hover:underline underline-offset-2">記事一覧 →</Link>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-[#1a1a1a] transition-colors"
        >
          ← トップページに戻る
        </Link>
      </div>
    </main>
  )
}
