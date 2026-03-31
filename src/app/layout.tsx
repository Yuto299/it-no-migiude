import type { Metadata } from 'next'
import { Noto_Sans_JP, Shippori_Mincho, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-serif',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
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
    <html lang="ja" className={`${notoSans.variable} ${shipporiMincho.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans antialiased bg-white text-[#1a1a1a] flex flex-col min-h-screen">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
