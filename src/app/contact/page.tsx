import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/form/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "DX推進・IT活用・システム開発に関するご相談はこちらから。2営業日以内にご返信します。",
};

const INFOS = [
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "返信目安",
    value: "2営業日以内",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 7v5l3 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "対応時間",
    value: "平日 10:00〜18:00",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* ヒーロー */}
      <section className="bg-[#f8faf9] border-b border-gray-100 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-4">
            Contact
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            お問い合わせ
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto">
            Web制作・業務効率化・DX推進など、
            <br />
            ITに関することならなんでも受け付けています。
            <br />
            まずは気軽にお問い合わせください。
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サイド情報 */}
          <aside className="flex flex-col gap-4">
            {INFOS.map((info) => (
              <div
                key={info.label}
                className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
              >
                <div className="shrink-0 w-9 h-9 rounded-full bg-[#E1F5EE] text-brand-green flex items-center justify-center">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{info.label}</p>
                  <p className="text-sm font-semibold text-[#1a1a1a]">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}

            <div className="p-4 bg-[#E1F5EE] rounded-xl border border-[#c6ead9]">
              <p className="text-xs font-semibold text-brand-green mb-1">
                すぐ話したい方へ
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                30分・完全無料のオンライン相談がおすすめです。
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center text-xs font-semibold text-brand-green hover:underline underline-offset-2"
              >
                無料相談を予約する →
              </Link>
            </div>
          </aside>

          {/* フォームカード */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
