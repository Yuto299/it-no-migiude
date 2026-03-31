import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

type Props = {
  title: string
  slug: string
  thumbnail: { url: string; width: number; height: number }
  category: { name: string; slug: string }
  publishedAt: string
}

export default function ArticleCard({ title, slug, thumbnail, category, publishedAt }: Props) {
  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article>
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <Image
            src={thumbnail.url}
            alt={title}
            width={thumbnail.width}
            height={thumbnail.height}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
          />
        </div>
        <div className="pt-3">
          <div className="flex items-center gap-3 mb-1.5">
            <Badge label={category.name} slug={category.slug} variant="category" href={`/categories/${category.slug}`} />
            <time className="text-[11px] text-gray-400" dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
          </div>
          <h2 className="font-serif font-bold text-[#111] text-[15px] leading-snug line-clamp-3 group-hover:opacity-60 transition-opacity">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  )
}
