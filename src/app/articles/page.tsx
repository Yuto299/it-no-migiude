import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles, getCategories } from '@/lib/microcms'
import ArticleList from '@/components/article/ArticleList'
import Pagination from '@/components/ui/Pagination'

export const revalidate = 60

export const metadata: Metadata = {
  title: '記事一覧',
  description: 'DX・IT活用に関する記事の一覧です。',
}

const LIMIT = 10

type SearchParams = {
  category?: string
  page?: string
}

export default async function ArticlesPage({ searchParams }: { searchParams: SearchParams }) {
  const currentPage = Math.max(1, Number(searchParams.page ?? 1))
  const categorySlug = searchParams.category

  const [categories, articleResult] = await Promise.all([
    getCategories().catch(() => []),
    getArticles({
      limit: LIMIT,
      offset: (currentPage - 1) * LIMIT,
      categorySlug,
    }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: LIMIT })),
  ])

  const articles = articleResult.contents
  const totalPages = Math.ceil(articleResult.totalCount / LIMIT)

  function buildHref(page: number) {
    const params = new URLSearchParams()
    if (categorySlug) params.set('category', categorySlug)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return `/articles${qs ? `?${qs}` : ''}`
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8">記事一覧</h1>

      {/* カテゴリフィルター */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="カテゴリフィルター">
          <Link
            href="/articles"
            role="tab"
            aria-selected={!categorySlug}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !categorySlug
                ? 'bg-brand-green text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            すべて
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/articles?category=${cat.slug}`}
              role="tab"
              aria-selected={categorySlug === cat.slug}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                categorySlug === cat.slug
                  ? 'bg-brand-green text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* 記事グリッド */}
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
