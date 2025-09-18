import { notFound } from "next/navigation";
import { getAllBlogs } from "@lib/data/getBlogs";
import { BlogPost } from "../type";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blogs: BlogPost[] = getAllBlogs();
  const post = blogs.find((b) => b.slug === params.slug);

  if (!post) return notFound();

  // Format date if needed
  const formattedDate = post.date
    ? format(new Date(post.date), "MMMM dd, yyyy")
    : "";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      <article className="max-w-4xl mx-auto px-1 py-10 md:py-16">
        {/* Header */}

        <header className="mb-12 text-center">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
            <Link
              href="/content/blog"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors group"
            >
              <FaArrowLeft className="w-3 h-3 mr-0.5 transition-transform group-hover:-translate-x-1" />
              Back
            </Link>
            <div className="flex gap-2">
              <span className="font-medium text-indigo-600">{post.category}</span>
              {post.category && formattedDate && <span>•</span>}
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight mb-6">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 text-sm px-4 py-2 rounded-full font-medium border border-indigo-100 shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full h-80 md:h-96 mb-8 rounded-sm overflow-hidden shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        {post.subtitle && (
          <p className="text-xl text-gray-600 font-light mx-auto leading-relaxed mb-8">
            {post.subtitle}
          </p>
        )}

        {/* Content */}
        <div className="prose prose-lg md:prose-xl max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl md:text-2xl font-bold text-gray-800 mt-16 mb-6 pb-2 border-b border-gray-200"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl md:text-2xl font-semibold text-gray-800 mt-12 mb-4"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-gray-700 leading-relaxed mb-7 text-lg"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-indigo-600 hover:text-indigo-800 underline transition-colors font-medium"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-indigo-500 pl-6 italic text-gray-600 my-10 bg-indigo-50 py-5 rounded-r text-lg"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="my-7 space-y-3 list-disc list-inside"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="my-7 space-y-3 list-decimal list-inside"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="text-gray-700 text-lg pl-2"
                  {...props}
                />
              ),
              code: ({ node, className, ...props }) => {
                const isInline = !className?.includes('language-');
                return isInline ? (
                  <code
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-base font-mono"
                    {...props}
                  />
                ) : (
                  <code
                    className="block bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto text-base font-mono my-8"
                    {...props}
                  />
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {post.author?.[0] || "A"}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {post.author || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Published on</span>
              <time dateTime={post.date} className="font-medium">
                {formattedDate}
              </time>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}