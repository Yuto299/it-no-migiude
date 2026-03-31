import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles, getCategories } from '@/lib/microcms'
import FeaturedArticleCard from '@/components/article/FeaturedArticleCard'
import ArticleList from '@/components/article/ArticleList'
import Pagination from '@/components/ui/Pagination'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'ITの右腕',
  description: 'DX・IT活用に関する記事の一覧です。',
}

const LIMIT = 10

type SearchParams = {
  category?: string
  page?: string
}

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
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

  const [featured, ...rest] = articles

  function buildHref(page: number) {
    const params = new URLSearchParams()
    if (categorySlug) params.set('category', categorySlug)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return `/${qs ? `?${qs}` : ''}`
  }

  return (
    <main className="max-w-5xl mx-auto px-4 pt-0 pb-0">

      {/* カテゴリフィルター（アンダーラインタブ） */}
      {categories.length > 0 && (
        <div
          className="flex items-center gap-0 overflow-x-auto overflow-y-hidden border-b border-gray-100 mb-10 -mx-4 px-4 md:mx-0 md:px-0"
          role="tablist"
          aria-label="カテゴリフィルター"
        >
          <Link
            href="/"
            role="tab"
            aria-selected={!categorySlug}
            className={`shrink-0 px-4 py-3 text-sm transition-colors border-b-2 -mb-px ${
              !categorySlug
                ? 'border-[#1a1a1a] font-semibold text-[#1a1a1a]'
                : 'border-transparent text-gray-400 hover:text-[#1a1a1a]'
            }`}
          >
            すべて
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/?category=${cat.slug}`}
              role="tab"
              aria-selected={categorySlug === cat.slug}
              className={`shrink-0 px-4 py-3 text-sm transition-colors border-b-2 -mb-px ${
                categorySlug === cat.slug
                  ? 'border-[#1a1a1a] font-semibold text-[#1a1a1a]'
                  : 'border-transparent text-gray-400 hover:text-[#1a1a1a]'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* 記事なし */}
      {articles.length === 0 && (
        <p className="text-gray-400 text-sm py-24 text-center">記事を準備中です。</p>
      )}

      {/* フィーチャー記事 */}
      {featured && (
        <FeaturedArticleCard
          title={featured.title}
          slug={featured.slug}
          thumbnail={featured.thumbnail}
          category={featured.category}
          publishedAt={featured.publishedAt}
        />
      )}

      {/* 残り記事グリッド */}
      {rest.length > 0 && <ArticleList articles={rest} columns={3} />}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        buildHref={buildHref}
      />
    </main>
  )
}
