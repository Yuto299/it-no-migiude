import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
} from '@/lib/microcms'
import { formatDate } from '@/lib/utils'
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
      <main className="max-w-5xl mx-auto px-4 py-12">
        <article>
          <header className="mb-6 max-w-3xl">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {article.category.name}
            </span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-2 leading-tight">
              {article.title}
            </h1>
            <time
              className="text-xs text-gray-400 mt-2 block"
              dateTime={article.publishedAt}
            >
              {formatDate(article.publishedAt)}
            </time>
          </header>

          <Image
            src={article.thumbnail.url}
            alt={article.title}
            width={article.thumbnail.width}
            height={article.thumbnail.height}
            className="w-full max-w-3xl h-auto rounded-xl mb-8"
            priority
          />

          <div className="lg:hidden max-w-3xl">
            <TableOfContents headings={processed.toc} variant="mobile" />
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(0,720px)_220px] lg:gap-12">
            <div
              className="article-body min-w-0"
              dangerouslySetInnerHTML={{ __html: processed.html }}
            />
            <div className="hidden lg:block">
              <TableOfContents headings={processed.toc} variant="sidebar" />
            </div>
          </div>

          <div className="max-w-3xl">
            <RelatedArticles articles={related} />
          </div>
        </article>
      </main>
    </>
  )
}
