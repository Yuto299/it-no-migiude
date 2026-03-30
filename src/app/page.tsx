import { getArticles, getCategories } from '@/lib/microcms'
import HeroSection from '@/components/sections/HeroSection'
import LatestArticles from '@/components/sections/LatestArticles'
import CategoryList from '@/components/sections/CategoryList'
import CtaSection from '@/components/sections/CtaSection'
import AboutSection from '@/components/sections/AboutSection'

export const revalidate = 60

export default async function HomePage() {
  const [articleResult, categories] = await Promise.all([
    getArticles({ limit: 3 }).catch(() => ({ contents: [] as import('@/types').Article[] })),
    getCategories().catch(() => [] as import('@/types').Category[]),
  ])
  const articles = articleResult.contents

  return (
    <main>
      <HeroSection />
      <LatestArticles articles={articles} />
      <CategoryList categories={categories} />
      <CtaSection />
      <AboutSection />
    </main>
  )
}
