import { notFound } from "next/navigation";
import { getAllBlogs } from "@lib/data/getBlogs";
import { BlogPost } from "../type";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { FaArrowLeft, FaShareAlt, FaBookmark, FaClock } from "react-icons/fa";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blogs: BlogPost[] = getAllBlogs();
  const post = blogs.find((b) => b.slug === params.slug);

  if (!post) return notFound();

  const formattedDate = post.date
    ? format(new Date(post.date), "MMMM dd, yyyy")
    : "";

  // Calculate reading time (assuming 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-3">
          <Link
            href="/content/blog"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-all duration-300 group"
          >
            <FaArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0 py-8 md:py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-full font-medium border border-indigo-100 text-sm">
                {post.category}
              </span>
              {post.category && formattedDate && (
                <span className="hidden sm:inline text-gray-300">•</span>
              )}
              <time
                dateTime={post.date}
                className="text-gray-600 flex items-center"
              >
                {formattedDate}
              </time>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600 flex items-center">
                <FaClock className="w-3.5 h-3.5 mr-1" />
                {readingTime} min read
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors hover:bg-indigo-50 rounded-full"
                aria-label="Save article"
              >
                <FaBookmark className="w-4 h-4" />
              </button>
              <button 
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors hover:bg-indigo-50 rounded-full"
                aria-label="Share article"
              >
                <FaShareAlt className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl leading-relaxed mb-8">
              {post.subtitle}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 text-sm px-4 py-1.5 rounded-full font-medium border border-indigo-100 hover:shadow-sm transition-shadow"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 mb-10 rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg md:prose-xl max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl md:text-3xl font-bold text-gray-900 mt-16 mb-6 pb-2 border-b border-gray-100"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl md:text-2xl font-semibold text-gray-900 mt-12 mb-4"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-gray-700 leading-relaxed mb-7 text-lg md:text-xl"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-indigo-600 hover:text-indigo-800 underline transition-colors font-medium decoration-2 underline-offset-4"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-indigo-500 pl-6 italic text-gray-600 my-10 bg-gradient-to-r from-indigo-50 to-transparent py-5 rounded-r text-lg md:text-xl"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="my-7 space-y-3 list-disc list-inside marker:text-indigo-500"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="my-7 space-y-3 list-decimal list-inside marker:text-indigo-500 marker:font-bold"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="text-gray-700 text-lg md:text-xl pl-2"
                  {...props}
                />
              ),
              code: ({ node, className, ...props }) => {
                const isInline = !className?.includes('language-');
                return isInline ? (
                  <code
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-base font-mono border border-gray-200"
                    {...props}
                  />
                ) : (
                  <div className="relative my-8 overflow-hidden rounded-lg">
                    <div className="absolute top-0 left-0 right-0 bg-gray-900 text-gray-100 py-2 px-4 text-sm flex justify-between items-center">
                      <span>{className?.replace('language-', '') || 'code'}</span>
                      <button className="text-xs text-gray-400 hover:text-gray-200">
                        Copy
                      </button>
                    </div>
                    <code
                      className="block bg-gray-900 text-gray-100 p-5 pt-14 overflow-x-auto text-base font-mono"
                      {...props}
                    />
                  </div>
                );
              },
              img: ({ node, ...props }) => {
                // Extract alt text and src from props
                const { alt, src } = props;
                return (
                  <div className="my-8 overflow-hidden rounded-lg shadow-md">
                    <div className="relative w-full h-64 md:h-96">
                      <Image
                        src={src || ''}
                        alt={alt || 'Blog image'}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      />
                    </div>
                  </div>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                {post.author?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {post.author || "Anonymous"}
                </p>
                <p className="text-gray-500">Author</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-gray-500">Published on</div>
              <time dateTime={post.date} className="font-medium text-gray-700">
                {formattedDate}
              </time>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md flex items-center">
              <FaShareAlt className="w-4 h-4 mr-2" />
              Share Article
            </button>
            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center">
              <FaBookmark className="w-4 h-4 mr-2" />
              Save for Later
            </button>
            <Link
              href="/content/blog"
              className="px-6 py-2.5 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors inline-flex items-center"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}