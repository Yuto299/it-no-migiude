import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/form/ContactForm'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'お問い合わせはこちらから。',
}

export default function ContactPage() {
  return (
    <main className="bg-[#f8f8f6] min-h-screen py-16 md:py-20">
      <div className="max-w-xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-10 text-center">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Contact</p>
          <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] mb-3">お問い合わせ</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            DX推進・IT活用・システム開発に関するご相談は
            <br className="hidden sm:block" />
            お気軽にお問い合わせください。2営業日以内にご返信します。
          </p>
        </div>

        {/* フォームカード */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <ContactForm />
        </div>

        {/* 相談ページへの誘導 */}
        <p className="text-center text-xs text-gray-400 mt-6">
          すぐに話したい方は
          <Link href="/consultation" className="text-gray-700 hover:underline underline-offset-2 ml-1">
            無料相談（30分）の予約
          </Link>
          もご利用いただけます。
        </p>
      </div>
    </main>
  )
}
