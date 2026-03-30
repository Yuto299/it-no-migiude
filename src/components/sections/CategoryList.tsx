import Link from 'next/link'
import type { Category } from '@/types'
import SectionTitle from '@/components/ui/SectionTitle'

type Props = {
  categories: Category[]
}

// カテゴリスラッグに対応するアイコン（絵文字）
const CATEGORY_ICONS: Record<string, string> = {
  dx: '🔄',
  ai: '🤖',
  cloud: '☁️',
  security: '🔒',
  automation: '⚙️',
  data: '📊',
  tool: '🛠️',
  case: '📋',
}

function getCategoryIcon(slug: string): string {
  return CATEGORY_ICONS[slug] ?? '📁'
}

export default function CategoryList({ categories }: Props) {
  if (categories.length === 0) return null

  return (
    <section className="bg-[#f8f8f6] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="カテゴリ" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-green/20 transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-green-light text-2xl shrink-0">
                {getCategoryIcon(category.slug)}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-semibold text-sm text-gray-900 group-hover:text-brand-green transition-colors truncate">
                  {category.name}
                </span>
                {category.description && (
                  <span className="text-xs text-gray-400 line-clamp-1">{category.description}</span>
                )}
              </div>
              <svg
                className="ml-auto shrink-0 w-4 h-4 text-gray-300 group-hover:text-brand-green transition-colors"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
