import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string,
  content: string
}

export function getAllBlogs(): BlogPost[] {
  const blogsDir = path.join(process.cwd(), "src/lib/content")
  const filenames = fs.readdirSync(blogsDir)

  if (!fs.existsSync(blogsDir)) {
    return []
  }

  return filenames.map((filename) => {
    const filePath = path.join(blogsDir, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title,
      date: data.date,
      category: data.category,
      content,
    }
  })
}
