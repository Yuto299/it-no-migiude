'use client'

import type { UseFormRegister, FieldError, RegisterOptions } from 'react-hook-form'

type Props = {
  label: string
  name: string
  type?: 'text' | 'email' | 'textarea'
  placeholder?: string
  required?: boolean
  error?: FieldError
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: RegisterOptions<any>
}

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  register,
  rules,
}: Props) {
  const baseInputClass = `w-full px-4 py-3 border text-sm text-[#1a1a1a] bg-white placeholder:text-gray-400 transition-colors outline-none focus:ring-2 focus:ring-gray-200 ${
    error
      ? 'border-red-400 focus:border-red-400'
      : 'border-gray-200 focus:border-gray-400'
  }`

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500 text-xs">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          {...register(name, rules)}
          placeholder={placeholder}
          rows={6}
          className={`${baseInputClass} resize-none`}
        />
      ) : (
        <input
          {...register(name, rules)}
          type={type}
          placeholder={placeholder}
          className={baseInputClass}
        />
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden>
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 4v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  )
}
