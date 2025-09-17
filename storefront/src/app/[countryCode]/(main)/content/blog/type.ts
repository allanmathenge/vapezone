export interface BlogPost {
  slug: string
  title: string
  subtitle?: string
  date: string
  category: string
  content: string
  image?: string
  tags?: string[]
  author?: string
}
