import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { BlogPost } from "app/[countryCode]/(main)/content/blog/type"

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
      subtitle: data.subtitle,
      date: data.date,
      category: data.category,
      image: data.image,
      tags: data.tags || [],
      author: data.author,
      content,
    }
  })
}
