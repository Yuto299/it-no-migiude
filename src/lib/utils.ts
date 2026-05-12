export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function estimateReadingMinutes(html: string): number {
  const text = html.replace(/<[^>]+>/g, '')
  const charCount = text.replace(/\s/g, '').length
  return Math.max(1, Math.round(charCount / 600))
}
