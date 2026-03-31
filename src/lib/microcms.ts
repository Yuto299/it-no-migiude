import { createClient } from 'microcms-js-sdk'
import type { Article, ArticleListResponse, Category, Achievement, AchievementListResponse } from '@/types'

function getClient() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY

  if (!serviceDomain || !apiKey) {
    throw new Error('microCMS の環境変数が設定されていません（MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY）')
  }

  return createClient({ serviceDomain, apiKey })
}

type GetArticlesOptions = {
  limit?: number
  offset?: number
  categorySlug?: string
  fields?: string
  orders?: string
}

export async function getArticles(options?: GetArticlesOptions): Promise<ArticleListResponse> {
  const { limit = 10, offset = 0, categorySlug, fields, orders = '-publishedAt' } = options ?? {}

  const queries: Record<string, string | number> = { limit, offset, orders }
  if (categorySlug) {
    const category = await getCategoryBySlug(categorySlug)
    if (category) {
      queries.filters = `category[equals]${category.id}`
    }
  }
  if (fields) {
    queries.fields = fields
  }

  return getClient().get<ArticleListResponse>({ endpoint: 'articles', queries })
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await getClient().get<ArticleListResponse>({
    endpoint: 'articles',
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  })
  return data.contents[0] ?? null
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const data = await getClient().get<ArticleListResponse>({
    endpoint: 'articles',
    queries: { fields: 'slug', limit: 100 },
  })
  return data.contents.map((article) => article.slug)
}

export async function getCategories(): Promise<Category[]> {
  const data = await getClient().get<{ contents: Category[] }>({
    endpoint: 'categories',
    queries: { limit: 50 },
  })
  return data.contents
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await getClient().get<{ contents: Category[] }>({
    endpoint: 'categories',
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  })
  return data.contents[0] ?? null
}

export async function getAchievements(limit = 20, offset = 0): Promise<AchievementListResponse> {
  return getClient().get<AchievementListResponse>({
    endpoint: 'achievements',
    queries: { limit, offset, orders: '-publishedAt' },
  })
}

export async function getAchievementBySlug(slug: string): Promise<Achievement | null> {
  const data = await getClient().get<AchievementListResponse>({
    endpoint: 'achievements',
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  })
  return data.contents[0] ?? null
}

export async function getAllAchievementSlugs(): Promise<string[]> {
  const data = await getClient().get<AchievementListResponse>({
    endpoint: 'achievements',
    queries: { fields: 'slug', limit: 100 },
  })
  return data.contents.map((a) => a.slug)
}
