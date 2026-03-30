import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

type Props = {
  title: string
  slug: string
  thumbnail: { url: string; width: number; height: number }
  category: { name: string; slug: string }
  publishedAt: string
  excerpt?: string
}

export default function ArticleCard({ title, slug, thumbnail, category, publishedAt, excerpt }: Props) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <Image
          src={thumbnail.url}
          alt={title}
          width={thumbnail.width}
          height={thumbnail.height}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col gap-2 p-4 flex-1">
        <div className="flex items-center gap-2">
          <Badge label={category.name} variant="category" />
          <time className="text-xs text-gray-400" dateTime={publishedAt}>
            {formatDate(publishedAt)}
          </time>
        </div>
        <h2 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-green transition-colors">
          {title}
        </h2>
        {excerpt && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-1">{excerpt}</p>
        )}
      </div>
    </Link>
  )
}
