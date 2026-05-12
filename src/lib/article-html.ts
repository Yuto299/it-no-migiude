export type TocHeading = {
  id: string
  text: string
  level: 2 | 3
}

export type FaqItem = {
  question: string
  answer: string
}

export type ProcessedArticle = {
  html: string
  toc: TocHeading[]
  faqs: FaqItem[]
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '').trim()
}

function slugify(_text: string, index: number): string {
  return `heading-${index}`
}

export function processArticleBody(rawHtml: string): ProcessedArticle {
  const toc: TocHeading[] = []
  let headingIndex = 0

  const htmlWithIds = rawHtml.replace(
    /<(h2|h3)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string | undefined, inner: string) => {
      const level = (tag.toLowerCase() === 'h2' ? 2 : 3) as 2 | 3
      const text = stripTags(inner)
      const id = slugify(text, headingIndex++)
      toc.push({ id, text, level })
      const cleanedAttrs = (attrs ?? '').replace(/\s+id\s*=\s*("[^"]*"|'[^']*')/gi, '')
      return `<${tag}${cleanedAttrs} id="${id}">${inner}</${tag}>`
    },
  )

  const faqs = extractFaqs(rawHtml)

  return { html: htmlWithIds, toc, faqs }
}

function extractFaqs(rawHtml: string): FaqItem[] {
  const faqSectionRegex =
    /<h2[^>]*>\s*よくある質問\s*<\/h2>([\s\S]*?)(?=<hr|<h2|$)/i
  const match = rawHtml.match(faqSectionRegex)
  if (!match) return []

  const section = match[1]
  const items: FaqItem[] = []
  const qaRegex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi
  let qa: RegExpExecArray | null
  while ((qa = qaRegex.exec(section)) !== null) {
    const rawQ = stripTags(qa[1])
    const rawA = stripTags(qa[2])
    const question = rawQ.replace(/^Q[.:：\s]*/i, '').trim()
    const answer = rawA.replace(/^A[.:：\s]*/i, '').trim()
    if (question && answer) {
      items.push({ question, answer })
    }
  }
  return items
}
