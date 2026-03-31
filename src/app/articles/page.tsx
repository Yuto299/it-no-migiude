import { redirect } from 'next/navigation'

type SearchParams = { category?: string; page?: string }

export default function ArticlesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = new URLSearchParams()
  if (searchParams.category) params.set('category', searchParams.category)
  if (searchParams.page) params.set('page', searchParams.page)
  const qs = params.toString()
  redirect(qs ? `/?${qs}` : '/')
}
