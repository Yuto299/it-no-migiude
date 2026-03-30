import type { Article } from '@/types'
import ArticleList from '@/components/article/ArticleList'
import SectionTitle from '@/components/ui/SectionTitle'

type Props = {
  articles: Article[]
}

export default function LatestArticles({ articles }: Props) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="新着記事" linkLabel="一覧を見る" linkHref="/articles" />
        {articles.length > 0 ? (
          <ArticleList articles={articles} columns={3} />
        ) : (
          <p className="text-gray-400 text-sm">記事を準備中です。</p>
        )}
      </div>
    </section>
  )
}
