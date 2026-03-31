import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/microcms'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug).catch(() => null)
  if (!article) return {}

  return {
    title: article.title,
    description: article.metaDescription ?? article.title,
    openGraph: {
      title: article.title,
      description: article.metaDescription ?? article.title,
      type: 'article',
      publishedTime: article.publishedAt,
      images: [
        {
          url: `${article.thumbnail.url}?w=1200&h=630&fit=crop`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await getArticleBySlug(params.slug).catch(() => null)
  if (!article) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.thumbnail.url,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: '運営者名',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{article.category.name}</span>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-2 leading-tight">
            {article.title}
          </h1>
          <time className="text-xs text-gray-400 mt-2 block" dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <Image
          src={article.thumbnail.url}
          alt={article.title}
          width={article.thumbnail.width}
          height={article.thumbnail.height}
          className="w-full h-auto rounded-xl mb-8"
          priority
        />

        <div
          className="prose prose-sm md:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </main>
    </>
  )
}
