import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'ITの右腕のプライバシーポリシーをご確認ください。',
}

const SECTIONS = [
  {
    title: '個人情報の収集について',
    body: '当サイトでは、お問い合わせや無料相談のお申し込みの際に、お名前・会社名・メールアドレス等の個人情報をご提供いただく場合があります。',
  },
  {
    title: '個人情報の利用目的',
    body: '収集した個人情報は、お問い合わせへの返答、無料相談の実施、サービスに関するご案内のためにのみ使用します。ご本人の同意なく第三者に提供することはありません。',
  },
  {
    title: 'Cookie（クッキー）について',
    body: '当サイトでは、アクセス解析のためにGoogle Analyticsを使用しています。Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することができます。',
  },
  {
    title: '個人情報の管理',
    body: 'お預かりした個人情報は、不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、適切なセキュリティ対策を実施します。',
  },
  {
    title: '個人情報の開示・訂正・削除',
    body: 'ご本人から個人情報の開示・訂正・削除をご希望の場合は、お問い合わせフォームよりご連絡ください。速やかに対応いたします。',
  },
  {
    title: 'プライバシーポリシーの変更',
    body: '本ポリシーの内容は、法令の変更やサービス内容の変化に応じて予告なく変更する場合があります。変更後のポリシーは当ページに掲載した時点で効力を生じるものとします。',
  },
  {
    title: 'お問い合わせ',
    body: '個人情報の取り扱いに関するお問い合わせは、サイト内のお問い合わせフォームよりご連絡ください。',
  },
]

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-3">Privacy Policy</p>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">プライバシーポリシー</h1>
      <p className="text-sm text-gray-500 mb-12">
        ITの右腕（以下「当サイト」）は、ご利用者の個人情報の保護を重要と考え、以下のとおりプライバシーポリシーを定めます。
      </p>

      <div className="flex flex-col gap-10">
        {SECTIONS.map((section, i) => (
          <section key={section.title}>
            <h2 className="font-bold text-[#1a1a1a] mb-3">
              第{i + 1}条　{section.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>

      <p className="mt-12 text-xs text-gray-400">制定日：2026年4月1日</p>
    </main>
  )
}
