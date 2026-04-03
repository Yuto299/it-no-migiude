import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: "ITの右腕の特定商取引法に基づく表記です。",
};

const ITEMS = [
  { label: "事業者名", value: "太田 悠斗" },
  {
    label: "所在地",
    value: "東京都渋谷区道玄坂1丁目10番8号渋谷道玄坂東急ビル2F−C",
  },
  { label: "電話番号", value: "お問い合わせフォームよりご連絡ください" },
  { label: "メールアドレス", value: "お問い合わせフォームよりご連絡ください" },
  {
    label: "サービス内容",
    value:
      "DX推進・IT活用に関するコンサルティング、Webサイト制作、業務効率化支援",
  },
  {
    label: "料金",
    value: "各サービスのご提案時にご提示します。無料相談は完全無料です。",
  },
  { label: "支払い方法", value: "銀行振込（請求書払い）" },
  { label: "支払い時期", value: "ご契約後、請求書発行日より30日以内" },
  {
    label: "サービス提供時期",
    value: "ご契約後、別途合意した納期・スケジュールに準じます",
  },
  {
    label: "キャンセル・返金",
    value:
      "無料相談はキャンセル料不要です。\n有料サービスのキャンセルについては、契約書に定める条件に従います。",
  },
];

export default function TokushohoPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-3">
        Legal
      </p>
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-4">
        特定商取引法に基づく表記
      </h1>
      <p className="text-sm text-gray-500 mb-12">
        特定商取引に関する法律第11条に基づき、以下のとおり表記します。
      </p>

      <div className="border border-gray-100 rounded-xl overflow-hidden">
        {ITEMS.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col sm:flex-row gap-2 sm:gap-6 p-5 ${i !== ITEMS.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <dt className="shrink-0 w-40 text-xs font-semibold text-gray-400 pt-0.5">
              {item.label}
            </dt>
            <dd className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {item.value}
            </dd>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-gray-400">
        ※括弧内の項目は順次更新します。ご不明な点はお問い合わせフォームよりご連絡ください。
      </p>
    </main>
  );
}
