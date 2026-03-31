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

export default function FeaturedArticleCard({ title, slug, thumbnail, category, publishedAt }: Props) {
  return (
    <Link href={`/articles/${slug}`} className="group block pb-10 mb-10 border-b border-gray-100">
      <article className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10">
        <div className="md:col-span-3 aspect-video w-full overflow-hidden bg-gray-100">
          <Image
            src={thumbnail.url}
            alt={title}
            width={thumbnail.width}
            height={thumbnail.height}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
            priority
          />
        </div>
        <div className="md:col-span-2 flex flex-col justify-center gap-3">
          <div className="flex items-center gap-3">
            <Badge label={category.name} slug={category.slug} variant="category" href={`/categories/${category.slug}`} />
            <time className="text-[11px] text-gray-400" dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
          </div>
          <h2 className="font-serif font-bold text-[#111] text-xl md:text-2xl leading-snug group-hover:opacity-60 transition-opacity">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  )
}
