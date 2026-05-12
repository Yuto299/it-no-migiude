import ArticleCard from './ArticleCard'
import type { Article } from '@/types'

type Props = {
  articles: Article[]
}

export default function RelatedArticles({ articles }: Props) {
  if (articles.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-6">
        Related Articles
      </p>
      <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1a1a1a] mb-8">
        関連する記事
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            slug={article.slug}
            thumbnail={article.thumbnail}
            category={{ name: article.category.name, slug: article.category.slug }}
            publishedAt={article.publishedAt}
          />
        ))}
      </div>
    </section>
  )
}
