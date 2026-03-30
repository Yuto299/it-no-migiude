export type Category = {
  id: string
  name: string
  slug: string
  description?: string
}

export type Article = {
  id: string
  title: string
  slug: string
  body: string
  thumbnail: {
    url: string
    width: number
    height: number
  }
  category: Category
  tags?: string[]
  publishedAt: string
  metaDescription?: string
}

export type ArticleListResponse = {
  contents: Article[]
  totalCount: number
  offset: number
  limit: number
}
