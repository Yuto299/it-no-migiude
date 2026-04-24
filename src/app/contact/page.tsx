import type { Metadata } from "next";
import ContactForm from "@/components/form/ContactForm";

export const metadata: Metadata = {
  title: "無料相談（30分）・お問い合わせ",
  description:
    "30分・完全無料・オンライン対応の相談を受け付けています。DX・IT活用・システム開発に関するご相談はこちらから。2営業日以内にご返信します。",
};

const TOPICS = [
  "Webサイトを作りたい・リニューアルしたい",
  "DXの進め方がわからない",
  "どのツールを選べばいいか迷っている",
  "社内の業務を効率化したい",
  "コスト削減につながるIT活用を知りたい",
  "ベンダーとのやり取りで困っている",
  "何から始めればいいか整理したい",
];

const META = [
  { label: "Duration", jp: "所要時間", value: "30分" },
  { label: "Fee", jp: "費用", value: "完全無料" },
  { label: "Format", jp: "形式", value: "オンライン" },
  { label: "Reply", jp: "返信目安", value: "2営業日以内" },
];

export default function ContactPage() {
  return (
    <main>
      {/* ヒーロー */}
      <section className="relative border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green-light/40 via-white to-white pointer-events-none" />
        <div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-brand-green/5 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-14 md:pb-20">
          <p className="text-xs font-semibold text-brand-green uppercase tracking-[0.2em] mb-5">
            Free Consultation
          </p>
          <h1 className="font-serif text-[#1a1a1a] mb-6 leading-[1.15]">
            <span className="block text-4xl md:text-5xl font-bold">
              30分の無料相談
            </span>
            <span className="block mt-3 text-sm md:text-base text-gray-500 font-normal tracking-wide">
              オンライン ・ 完全無料 ・ 事前準備不要
            </span>
          </h1>
          <p className="text-sm md:text-[15px] text-gray-600 leading-loose max-w-2xl mt-8">
            Web制作・業務効率化・DX推進など、まずは30分、気軽にお聞かせください。
            <br className="hidden md:block" />
            日程はご希望を3つまでご記入いただければ、こちらで調整してお返事します。
          </p>

          {/* メタ情報 */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 mt-12 pt-8 border-t border-gray-200/70">
            {META.map((item) => (
              <div key={item.label}>
                <dt className="mb-2">
                  <span className="text-[10px] font-semibold text-brand-green uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                  <span className="block text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-1">
                    {item.jp}
                  </span>
                </dt>
                <dd className="font-serif text-base md:text-lg font-bold text-[#1a1a1a]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* こんな相談ができます */}
      <section className="border-b border-gray-100 bg-gray-50/40">
        <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <p className="text-xs font-semibold text-brand-green uppercase tracking-[0.2em] mb-3">
            Topics
          </p>
          <h2 className="font-serif text-2xl md:text-[28px] font-bold text-[#1a1a1a] mb-3 leading-snug">
            こんなご相談をいただきます
          </h2>
          <p className="text-sm text-gray-500 mb-10 leading-relaxed">
            もちろん下記以外でも問題ございません。具体的な内容以外も大歓迎です。
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {TOPICS.map((t, i) => (
              <li
                key={t}
                className="flex gap-6 items-baseline py-4 border-b border-gray-200/70"
              >
                <span className="text-xs font-semibold text-brand-green shrink-0 min-w-[1.75rem] tracking-wider">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-[#1a1a1a] leading-relaxed">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* フォーム */}
      <section>
        <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <p className="text-xs font-semibold text-brand-green uppercase tracking-[0.2em] mb-3">
            Contact Form
          </p>
          <h2 className="font-serif text-2xl md:text-[28px] font-bold text-[#1a1a1a] mb-4 leading-snug">
            お申し込みフォーム
          </h2>
          <p className="text-sm text-gray-500 mb-12 leading-loose">
            入力はおよそ2〜3分。
            <span className="text-red-500 font-semibold">*</span>{" "}
            は必須項目です。
            <br />
            送信後、2営業日以内にメールにてご連絡します。
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
