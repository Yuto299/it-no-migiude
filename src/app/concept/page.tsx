import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ITの右腕とは",
  description:
    "中小企業・スタートアップのDX推進を支援するITメディア「ITの右腕」のコンセプトと想いをご紹介します。",
};

const PROBLEMS = [
  "ITのことを相談できる人が社内にいない",
  "導入したいツールはあるが、何から始めればいいかわからない",
  "ベンダーの説明が難しくて、正しい判断ができない",
  "DXと言われても、自社に何が必要かイメージできない",
];

const VALUES = [
  {
    num: "01",
    title: "現場目線の情報",
    desc: "難しい技術用語を使わず、経営者・現場担当者が「明日から使える」レベルで解説します。",
  },
  {
    num: "02",
    title: "中立な立場",
    desc: "特定のツールやベンダーに偏らず、自社に合った選択ができるよう客観的な情報をお届けします。",
  },
  {
    num: "03",
    title: "相談できる距離感",
    desc: "記事を読んで興味を持ったら、無料相談でそのまま聞いていただくことが可能です。",
  },
];

export default function ConceptPage() {
  return (
    <main>
      {/* ヒーロー */}
      <section className="bg-[#f8faf9] border-b border-gray-100 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-4">
            About
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-6">
            あなたの会社に、
            <br />
            <span className="text-brand-green">ITの右腕</span>を。
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
            Webサイト制作・業務効率化・ツール選定・DX推進など、
            <br />
            ITに関することならなんでもご相談ください。
            <br />
            「こんなこと聞いていいの？」という小さな悩みほど、大歓迎です。
          </p>
        </div>
      </section>

      {/* 課題 */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-3">
            Problem
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-10">
            こんなお悩みはありませんか？
          </h2>
          <ul className="flex flex-col gap-4">
            {PROBLEMS.map((p, i) => (
              <li
                key={p}
                className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-xl shadow-sm"
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#E1F5EE] text-brand-green text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {p}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-gray-500 leading-relaxed bg-[#f8faf9] rounded-xl p-5 border border-gray-100">
            「うちには関係ない」「難しそう」と感じている方こそ、ぜひ一度話してみてください。
            <br />
            一緒に整理するだけで、次の一手が見えてくることがほとんどです。
            <br />
            気軽な雑談レベルから、具体的な依頼まで——なんでも受け付けています。
          </p>
        </div>
      </section>

      {/* 価値観 */}
      <section className="py-16 md:py-20 bg-[#f8faf9] border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-3">
            Values
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-10">
            大切にしていること
          </h2>
          <div className="flex flex-col gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex gap-6 items-start bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <span className="shrink-0 text-3xl font-bold text-[#E1F5EE] leading-none">
                  {v.num}
                </span>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-3">
            Get Started
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
            まずは気軽にお話ししましょう
          </h2>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            30分・完全無料・オンライン対応。
            <br />
            「相談するほどじゃないかな」と思っている方も、ぜひお気軽にお申し込みください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors"
            >
              無料相談（30分）を予約する →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              記事を読む
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
