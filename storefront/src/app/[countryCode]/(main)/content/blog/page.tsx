import { getAllBlogs } from "@lib/data/getBlogs"
import BlogList from "./index"

export default function BlogPage() {
  const posts = getAllBlogs() 
  return <BlogList posts={posts} />
}
