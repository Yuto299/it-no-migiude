import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAchievementBySlug, getAllAchievementSlugs } from '@/lib/microcms'
import { formatDate } from '@/lib/utils'

export const revalidate = 60
export const dynamicParams = true

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllAchievementSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const achievement = await getAchievementBySlug(params.slug).catch(() => null)
  if (!achievement) return {}

  return {
    title: achievement.title,
    description: achievement.description,
    openGraph: {
      title: achievement.title,
      description: achievement.description,
      images: [
        {
          url: `${achievement.thumbnail.url}?w=1200&h=630&fit=crop`,
          width: 1200,
          height: 630,
          alt: achievement.title,
        },
      ],
    },
  }
}

export default async function AchievementDetailPage({ params }: Props) {
  const achievement = await getAchievementBySlug(params.slug).catch(() => null)
  if (!achievement) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/achievements"
        className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#1a1a1a] transition-colors mb-8"
      >
        ← 支援実績一覧へ
      </Link>

      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest text-brand-green uppercase mb-2">
          {achievement.industry ?? achievement.client}
        </p>
        <h1 className="font-bold text-2xl md:text-3xl text-[#1a1a1a] leading-tight">
          {achievement.title}
        </h1>
        <time className="text-xs text-gray-400 mt-2 block" dateTime={achievement.publishedAt}>
          {formatDate(achievement.publishedAt)}
        </time>
      </div>

      <Image
        src={achievement.thumbnail.url}
        alt={achievement.title}
        width={achievement.thumbnail.width}
        height={achievement.thumbnail.height}
        className="w-full h-auto rounded-xl mb-8"
        priority
      />

      <div
        className="prose prose-sm md:prose-base max-w-none"
        dangerouslySetInnerHTML={{ __html: achievement.body }}
      />
    </main>
  )
}
