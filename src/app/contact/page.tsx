import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/form/ContactForm'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'DX推進・IT活用・システム開発に関するご相談はこちらから。2営業日以内にご返信します。',
}

export default function ContactPage() {
  return (
    <main>
      {/* ヒーロー */}
      <section className="bg-gray-50 border-b border-gray-100 py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Contact</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight mb-4">
            お問い合わせ
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Web制作・業務効率化・DX推進など、ITに関することならなんでも受け付けています。<br />
            まずは気軽にお問い合わせください。
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* メタ情報 */}
        <div className="flex gap-10 mb-10 pb-10 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">返信目安</p>
            <p className="text-sm font-semibold text-[#1a1a1a]">2営業日以内</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">対応時間</p>
            <p className="text-sm font-semibold text-[#1a1a1a]">平日 10:00〜18:00</p>
          </div>
        </div>

        {/* フォーム */}
        <ContactForm />

        {/* 相談誘導 */}
        <p className="mt-10 text-sm text-gray-500">
          すぐ話したい方は
          <Link href="/consultation" className="text-brand-green hover:underline underline-offset-2 ml-1">
            無料相談（30分）の予約
          </Link>
          もご利用いただけます。
        </p>
      </div>
    </main>
  )
}
