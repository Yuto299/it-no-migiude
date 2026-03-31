import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

type Props = {
  title: string
  slug: string
  thumbnail: { url: string; width: number; height: number }
  category: { name: string; slug: string }
  publishedAt: string
}

export default function FeaturedArticleCard({ title, slug, thumbnail, category, publishedAt }: Props) {
  return (
    <Link href={`/articles/${slug}`} className="group block py-5 border-b border-gray-100">
      <article className="grid grid-cols-5 gap-5">
        <div className="col-span-2 h-32 overflow-hidden bg-gray-100">
          <Image
            src={thumbnail.url}
            alt={title}
            width={thumbnail.width}
            height={thumbnail.height}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
          />
        </div>
        <div className="col-span-3 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase">
              {category.name}
            </span>
            <time className="text-[11px] text-gray-300" dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
          </div>
          <h2 className="font-serif font-bold text-[#111] text-base md:text-lg leading-snug group-hover:opacity-60 transition-opacity">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  )
}
