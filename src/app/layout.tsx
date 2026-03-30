import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'ITの右腕',
    template: '%s | ITの右腕',
  },
  description: '中小企業・スタートアップのDX推進を支援するITメディア。現場で使えるIT活用のヒントが見つかります。',
  openGraph: {
    siteName: 'ITの右腕',
    type: 'website',
    locale: 'ja_JP',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'ITの右腕',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="font-sans antialiased bg-white text-[#1a1a1a]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
