import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ITの右腕'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const iconUrl = new URL('/icon.png', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').toString()

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0e1a14',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '80px 100px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 左：テキスト */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '4px',
              color: '#1D9E75',
              textTransform: 'uppercase',
            }}
          >
            IT NO MIGIUDE
          </div>
          <div
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            ITの右腕
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#9ca3af',
              lineHeight: 1.6,
              marginTop: '8px',
            }}
          >
            中小企業・スタートアップの
            <br />
            DX推進を支援するITメディア
          </div>

          {/* 下部ライン */}
          <div
            style={{
              marginTop: '32px',
              width: '60px',
              height: '3px',
              background: '#1D9E75',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* 右：アイコン */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconUrl}
          width={280}
          height={280}
          alt=""
          style={{ opacity: 0.9 }}
        />
      </div>
    ),
    { ...size }
  )
}
