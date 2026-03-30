import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, company, email, message } = body

  if (
    !name || typeof name !== 'string' || name.length > 50 ||
    !company || typeof company !== 'string' || company.length > 100 ||
    !email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message || typeof message !== 'string' || message.length < 10 || message.length > 1000
  ) {
    return NextResponse.json({ error: '入力内容を確認してください。' }, { status: 400 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'noreply@itno-migite.com',
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `【ITの右腕】お問い合わせ: ${name} 様`,
      html: `
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>会社名:</strong> ${company}</p>
        <p><strong>メール:</strong> ${email}</p>
        <p><strong>内容:</strong><br>${message.replace(/\n/g, '<br>')}</p>
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
