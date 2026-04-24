'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import FormField from './FormField'

type ContactInput = {
  name: string
  company: string
  email: string
  message: string
  preferredDate1?: string
  preferredDate2?: string
  preferredDate3?: string
}

function SectionHeader({
  num,
  title,
  note,
}: {
  num: string
  title: string
  note?: string
}) {
  return (
    <div className="flex items-baseline gap-5 mb-7 pb-4 border-b border-gray-200">
      <span className="text-sm font-bold text-brand-green tracking-wider leading-none">{num}</span>
      <h3 className="font-serif text-base md:text-lg font-bold text-[#1a1a1a]">{title}</h3>
      {note && <span className="text-[11px] text-gray-400 ml-auto tracking-wide">{note}</span>}
    </div>
  )
}

export default function ContactForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>()

  const onSubmit = async (data: ContactInput) => {
    setServerError(null)

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.push('/contact/thanks')
      return
    }

    const json = await res.json().catch(() => ({}))
    setServerError(json.error ?? '送信に失敗しました。時間をおいて再度お試しください。')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-14" noValidate>
      {/* 01 */}
      <section>
        <SectionHeader num="01" title="お客様情報" />
        <div className="flex flex-col gap-6">
          <FormField
            label="お名前"
            name="name"
            placeholder="山田 太郎"
            required
            error={errors.name}
            register={register}
            rules={{
              required: 'お名前を入力してください',
              maxLength: { value: 50, message: '50文字以内で入力してください' },
            }}
          />
          <FormField
            label="会社名"
            name="company"
            placeholder="株式会社サンプル"
            required
            error={errors.company}
            register={register}
            rules={{
              required: '会社名を入力してください',
              maxLength: { value: 100, message: '100文字以内で入力してください' },
            }}
          />
          <FormField
            label="メールアドレス"
            name="email"
            type="email"
            placeholder="yamada@example.com"
            required
            error={errors.email}
            register={register}
            rules={{
              required: 'メールアドレスを入力してください',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '正しいメールアドレスを入力してください',
              },
            }}
          />
        </div>
      </section>

      {/* 02 */}
      <section>
        <SectionHeader num="02" title="ご相談内容" />
        <FormField
          label="お困りごと・ご質問"
          name="message"
          type="textarea"
          placeholder="例）社内の受発注業務を効率化したい。現状Excelでやりとりしているが属人化していて困っている。"
          required
          error={errors.message}
          register={register}
          rules={{
            required: 'ご相談内容を入力してください',
            minLength: { value: 10, message: '10文字以上で入力してください' },
            maxLength: { value: 1000, message: '1000文字以内で入力してください' },
          }}
        />
      </section>

      {/* 03 — 希望日時（tint カード） */}
      <section className="relative bg-brand-green-light/50 border border-brand-green/20 p-6 md:p-10">
        <div className="flex items-baseline gap-5 mb-3">
          <span className="text-sm font-bold text-brand-green tracking-wider leading-none">03</span>
          <h3 className="font-serif text-base md:text-lg font-bold text-[#1a1a1a]">
            ご希望日時
          </h3>
          <span className="text-[11px] text-gray-500 ml-auto tracking-wide">任意</span>
        </div>
        <p className="text-xs md:text-[13px] text-gray-600 mb-7 leading-relaxed">
          30分のオンライン相談をご希望の場合、候補日時を第3希望までご記入ください。
          <br />
          入力がなくても、お返事の際にこちらから候補日をご提案します。
        </p>
        <div className="flex flex-col gap-5">
          <FormField
            label="第1希望"
            name="preferredDate1"
            placeholder="例: 12/15(月) 15:00-16:00"
            error={errors.preferredDate1}
            register={register}
            rules={{ maxLength: { value: 100, message: '100文字以内で入力してください' } }}
          />
          <FormField
            label="第2希望"
            name="preferredDate2"
            placeholder="例: 12/16(火) 午前"
            error={errors.preferredDate2}
            register={register}
            rules={{ maxLength: { value: 100, message: '100文字以内で入力してください' } }}
          />
          <FormField
            label="第3希望"
            name="preferredDate3"
            placeholder="例: 12/17(水) 以降いつでも"
            error={errors.preferredDate3}
            register={register}
            rules={{ maxLength: { value: 100, message: '100文字以内で入力してください' } }}
          />
        </div>
      </section>

      {serverError && (
        <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 text-sm text-red-600">
          <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v4M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {serverError}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full py-5 font-semibold text-sm tracking-[0.15em] text-white bg-brand-green hover:bg-brand-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="inline-flex items-center gap-3">
            {isSubmitting ? '送信中…' : '無料相談を申し込む'}
            {!isSubmitting && (
              <span aria-hidden className="text-base transition-transform group-hover:translate-x-1">
                →
              </span>
            )}
          </span>
        </button>
        <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
          送信後、2営業日以内にメールにてご連絡します。
          <br />
          お急ぎの場合もこのフォームから送信してください。
        </p>
      </div>
    </form>
  )
}
