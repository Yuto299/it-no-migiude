import type { Metadata } from "next";
import Link from "next/link";
import CalendlyEmbed from "./CalendlyEmbed";

export const metadata: Metadata = {
  title: "無料相談（30分）",
  description:
    "ITやDXについて気軽にご相談ください。30分・完全無料・オンライン対応の無料相談を受け付けています。",
};

const POINTS = [
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
    label: "30分",
    desc: "気軽に話せる短さ",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    label: "オンライン対応",
    desc: "全国どこからでも",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "完全無料",
    desc: "費用は一切かかりません",
  },
];

const TOPICS = [
  "Webサイトを作りたい・リニューアルしたい",
  "DXの進め方がわからない",
  "どのツールを選べばいいか迷っている",
  "社内の業務を効率化したい",
  "コスト削減につながるIT活用を知りたい",
  "ベンダーとのやり取りで困っている",
  "何から始めればいいか整理したい",
];

export default function ConsultationPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

  return (
    <main>
      {/* ヒーロー */}
      <section className="bg-[#f8faf9] border-b border-gray-100 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-4">
            Free Consultation
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            無料相談（30分）
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
            Web制作・ツール選定・業務効率化・DX推進など、
            <br />
            ITに関することならなんでもOKです。
            <br />
            「こんなこと聞いていいの？」という内容ほど、ぜひお話しください。
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 flex flex-col gap-12">
        {/* 3ポイント */}
        <div className="grid grid-cols-3 gap-4">
          {POINTS.map((point) => (
            <div
              key={point.label}
              className="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-gray-100 shadow-sm text-center"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#E1F5EE] text-brand-green">
                {point.icon}
              </div>
              <span className="font-bold text-sm text-[#1a1a1a]">
                {point.label}
              </span>
              <span className="text-xs text-gray-400 leading-snug">
                {point.desc}
              </span>
            </div>
          ))}
        </div>

        {/* こんな相談できます */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="font-bold text-[#1a1a1a] mb-5">
            こんなご相談ができます
          </h2>
          <ul className="flex flex-col gap-3">
            {TOPICS.map((topic) => (
              <li
                key={topic}
                className="flex items-center gap-3 text-sm text-gray-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-gray-400 border-t border-gray-100 pt-4">
            上記以外でも、ITに関することならなんでも相談できます。「まだ具体的じゃない」でも全然OK。
          </p>
        </div>

        {/* Calendly埋め込み */}
        <div>
          <h2 className="font-bold text-[#1a1a1a] mb-5">
            日程を選択してください
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <CalendlyEmbed url={calendlyUrl} />
          </div>
        </div>

        {/* フォームへの誘導 */}
        <p className="text-center text-sm text-gray-400">
          日程が合わない場合は
          <Link
            href="/contact"
            className="text-brand-green font-medium hover:underline underline-offset-2 ml-1"
          >
            お問い合わせフォーム
          </Link>
          からご連絡ください。
        </p>
      </div>
    </main>
  );
}
