import ArticleCard from './ArticleCard'
import type { Article } from '@/types'

type Props = {
  articles: Article[]
  columns?: 2 | 3
}

export default function ArticleList({ articles, columns = 3 }: Props) {
  const gridClass = columns === 2
    ? 'grid grid-cols-1 sm:grid-cols-2 gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'

  return (
    <div className={gridClass}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          slug={article.slug}
          thumbnail={article.thumbnail}
          category={article.category}
          publishedAt={article.publishedAt}
        />
      ))}
    </div>
  )
}
