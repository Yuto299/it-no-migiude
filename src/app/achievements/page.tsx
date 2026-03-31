import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAchievements } from '@/lib/microcms'

export const revalidate = 60

export const metadata: Metadata = {
  title: '支援実績',
  description: 'ITの右腕がこれまでに支援した企業・プロジェクトの実績をご紹介します。',
}

export default async function AchievementsPage() {
  const data = await getAchievements().catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 20 }))
  const achievements = data.contents

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-12">
        <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">Achievements</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">支援実績</h1>
        <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-xl">
          中小企業・スタートアップのDX推進・IT活用を支援してきた実績の一部をご紹介します。
        </p>
      </div>

      {achievements.length === 0 ? (
        <p className="text-gray-400 text-sm">現在、掲載できる実績はありません。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement) => (
            <Link
              key={achievement.id}
              href={`/achievements/${achievement.slug}`}
              className="group block border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <Image
                  src={achievement.thumbnail.url}
                  alt={achievement.title}
                  width={achievement.thumbnail.width}
                  height={achievement.thumbnail.height}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold tracking-widest text-brand-green uppercase mb-1">
                  {achievement.industry ?? achievement.client}
                </p>
                <h2 className="font-bold text-[#1a1a1a] text-base leading-snug group-hover:opacity-60 transition-opacity mb-2">
                  {achievement.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{achievement.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
