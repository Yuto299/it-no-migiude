import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const isValidOptionalString = (v: unknown, max: number) =>
  v === undefined || v === null || v === '' || (typeof v === 'string' && v.length <= max)

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, company, email, message, preferredDate1, preferredDate2, preferredDate3 } = body

  if (
    !name || typeof name !== 'string' || name.length > 50 ||
    !company || typeof company !== 'string' || company.length > 100 ||
    !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message || typeof message !== 'string' || message.length < 10 || message.length > 1000 ||
    !isValidOptionalString(preferredDate1, 100) ||
    !isValidOptionalString(preferredDate2, 100) ||
    !isValidOptionalString(preferredDate3, 100)
  ) {
    return NextResponse.json({ error: '入力内容を確認してください。' }, { status: 400 })
  }

  const preferredDatesHtml = [
    { label: '第1希望', value: preferredDate1 },
    { label: '第2希望', value: preferredDate2 },
    { label: '第3希望', value: preferredDate3 },
  ]
    .filter(({ value }) => typeof value === 'string' && value.trim().length > 0)
    .map(({ label, value }) => `<p><strong>${label}:</strong> ${escapeHtml(value as string)}</p>`)
    .join('')

  const preferredDatesBlock = preferredDatesHtml
    ? `<hr><p><strong>ご希望日時（オンライン相談）</strong></p>${preferredDatesHtml}`
    : ''

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'noreply@it-no-migiude.com',
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `【ITの右腕】お問い合わせ: ${name} 様`,
      html: `
        <p><strong>名前:</strong> ${escapeHtml(name)}</p>
        <p><strong>会社名:</strong> ${escapeHtml(company)}</p>
        <p><strong>メール:</strong> ${escapeHtml(email)}</p>
        <p><strong>内容:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        ${preferredDatesBlock}
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    )
  }
}
