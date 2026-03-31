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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <FormField
        label="お名前"
        name="name"
        placeholder="山田 太郎"
        required
        error={errors.name}
        register={register}
        rules={{ required: 'お名前を入力してください', maxLength: { value: 50, message: '50文字以内で入力してください' } }}
      />
      <FormField
        label="会社名"
        name="company"
        placeholder="株式会社サンプル"
        required
        error={errors.company}
        register={register}
        rules={{ required: '会社名を入力してください', maxLength: { value: 100, message: '100文字以内で入力してください' } }}
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
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '正しいメールアドレスを入力してください' },
        }}
      />
      <FormField
        label="お問い合わせ内容"
        name="message"
        type="textarea"
        placeholder="DXについて相談したいです..."
        required
        error={errors.message}
        register={register}
        rules={{
          required: 'お問い合わせ内容を入力してください',
          minLength: { value: 10, message: '10文字以上で入力してください' },
          maxLength: { value: 1000, message: '1000文字以内で入力してください' },
        }}
      />

      {serverError && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
          <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v4M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 font-semibold text-sm text-white bg-[#111] hover:bg-[#333] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '送信中...' : '送信する'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        送信後、担当者より2営業日以内にご連絡します。
      </p>
    </form>
  )
}
