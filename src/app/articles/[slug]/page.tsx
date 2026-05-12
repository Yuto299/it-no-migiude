import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
} from '@/lib/microcms'
import { formatDate, estimateReadingMinutes } from '@/lib/utils'
import { processArticleBody } from '@/lib/article-html'
import TableOfContents from '@/components/article/TableOfContents'
import RelatedArticles from '@/components/article/RelatedArticles'

export const revalidate = 60
export const dynamicParams = true

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

  const [related, processed] = await Promise.all([
    getRelatedArticles(article.id, article.category.id, 3).catch(() => []),
    Promise.resolve(processArticleBody(article.body)),
  ])

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://it-no-migiude.com'
  const articleUrl = `${siteUrl}/articles/${article.slug}`

  const jsonLdGraph: object[] = [
    {
      '@type': 'Article',
      '@id': `${articleUrl}#article`,
      headline: article.title,
      description: article.metaDescription ?? article.title,
      image: {
        '@type': 'ImageObject',
        url: `${article.thumbnail.url}?w=1200&h=630&fit=crop`,
        width: 1200,
        height: 630,
      },
      url: articleUrl,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      author: {
        '@type': 'Organization',
        name: 'ITの右腕',
        '@id': `${siteUrl}/#organization`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'ITの右腕',
        '@id': `${siteUrl}/#organization`,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icon.png`,
        },
      },
      inLanguage: 'ja',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ホーム',
          item: `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: article.category.name,
          item: `${siteUrl}/?category=${article.category.slug}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: articleUrl,
        },
      ],
    },
  ]

  if (processed.faqs.length > 0) {
    jsonLdGraph.push({
      '@type': 'FAQPage',
      mainEntity: processed.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': jsonLdGraph,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <article>
          <header className="mb-8">
            <Link
              href={`/categories/${article.category.slug}`}
              className="inline-flex items-center px-3 py-1 rounded-full bg-brand-green-light text-brand-green-dark text-xs font-semibold tracking-wide hover:bg-brand-green hover:text-white transition-colors"
            >
              {article.category.name}
            </Link>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-4 leading-tight">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
              <span aria-hidden className="text-gray-300">·</span>
              <span>読了 約{estimateReadingMinutes(article.body)}分</span>
              {article.tags && (
                <>
                  <span aria-hidden className="text-gray-300">·</span>
                  <span className="flex flex-wrap gap-1.5">
                    {(Array.isArray(article.tags)
                      ? article.tags
                      : String(article.tags).split(',')
                    )
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .slice(0, 5)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-gray-100 text-gray-600"
                        >
                          #{tag}
                        </span>
                      ))}
                  </span>
                </>
              )}
            </div>
          </header>

          <Image
            src={article.thumbnail.url}
            alt={article.title}
            width={article.thumbnail.width}
            height={article.thumbnail.height}
            className="w-full max-w-[480px] h-auto rounded-xl mb-10"
            priority
          />

          <div className="lg:hidden">
            <TableOfContents headings={processed.toc} variant="mobile" />
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
            <div
              className="article-body min-w-0"
              dangerouslySetInnerHTML={{ __html: processed.html }}
            />
            <div className="hidden lg:block">
              <TableOfContents headings={processed.toc} variant="sidebar" />
            </div>
          </div>

          <RelatedArticles articles={related} />
        </article>
      </main>
    </>
  )
}
