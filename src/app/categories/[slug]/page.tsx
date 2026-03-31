import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getArticles } from '@/lib/microcms'
import ArticleList from '@/components/article/ArticleList'
import Pagination from '@/components/ui/Pagination'

export const revalidate = 300

const LIMIT = 10

type Props = {
  params: { slug: string }
  searchParams: { page?: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug).catch(() => null)
  if (!category) return {}

  return {
    title: `${category.name}の記事一覧`,
    description: category.description ?? `${category.name}に関する記事の一覧です。`,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const currentPage = Math.max(1, Number(searchParams.page ?? 1))

  const [category, articleResult] = await Promise.all([
    getCategoryBySlug(params.slug).catch(() => null),
    getArticles({
      categorySlug: params.slug,
      limit: LIMIT,
      offset: (currentPage - 1) * LIMIT,
    }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: LIMIT })),
  ])

  if (!category) notFound()

  const articles = articleResult.contents
  const totalPages = Math.ceil(articleResult.totalCount / LIMIT)

  function buildHref(page: number) {
    return page > 1
      ? `/categories/${params.slug}?page=${page}`
      : `/categories/${params.slug}`
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <p className="text-xs font-medium text-brand-green uppercase tracking-wider mb-2">Category</p>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2">
        {category.name}
      </h1>
      {category.description && (
        <p className="text-sm text-gray-500 mb-8">{category.description}</p>
      )}
      {!category.description && <div className="mb-8" />}

      {articles.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center">記事を準備中です。</p>
      ) : (
        <>
          <ArticleList articles={articles} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            buildHref={buildHref}
          />
        </>
      )}
    </main>
  )
}
