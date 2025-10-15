import { notFound } from "next/navigation";
import { getAllBlogs } from "@lib/data/getBlogs";
import { BlogPost } from "../type";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { FaArrowLeft, FaShareAlt, FaBookmark, FaClock } from "react-icons/fa";

// Client components for interactive elements
import ShareButton from "@modules/blogs/components/ShareButton";
import SaveButton from "@modules/blogs/components/SaveButton";

// SEO Metadata function
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blogs: BlogPost[] = getAllBlogs();
  const post = blogs.find((b) => b.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vapezone.co.ke";
  const fullTitle = `${post.title} | Vapezone Kenya Knowledge Hub`;
  const description = post.subtitle || `Read ${post.title} on Vapezone Kenya Knowledge Hub`;
  const imageUrl = post.image || `${siteUrl}/default-product.webp`;

  return {
    title: fullTitle,
    description: description,
    keywords: post.tags?.join(", ") || "",
    authors: [{ name: post.author || "Admin" }],
    publisher: "Admin",
    creator: post.author || "Admin",
    robots: "index, follow, max-image-preview:large",
    openGraph: {
      title: fullTitle,
      description: description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author || "Admin"],
      tags: post.tags || [],
      siteName: "Your Blog Name",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description,
      images: [imageUrl],
      creator: "@vapezonekenya",
      site: "@vapezonekenya",
    },
    alternates: {
      canonical: `${siteUrl}/ke/content/blog/${post.slug}`,
    },
    other: {
      "article:section": post.category || "General",
    },
  };
}

// JSON-LD Schema function
function generateBlogPostSchema(post: BlogPost, readingTime: number) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vapezone.co.ke";
  
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.subtitle,
      "image": post.image ? [post.image] : [],
      "datePublished": post.date,
      "dateModified": post.date,
      "author": {
        "@type": "Person",
        "name": post.author || "Admin",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Vapezone Kenya",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteUrl}/ke/content/blog/${post.slug}`
      },
      "articleSection": post.category || "General",
      "keywords": post.tags?.join(", ") || "",
      "wordCount": post.content.split(/\s+/).length,
      "timeRequired": `PT${readingTime}M`,
      "inLanguage": "en-US",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".prose h1", ".prose h2", ".prose p"]
      }
    })
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blogs: BlogPost[] = getAllBlogs();
  const post = blogs.find((b) => b.slug === params.slug);

  if (!post) return notFound();

  const formattedDate = post.date
    ? format(new Date(post.date), "MMMM dd, yyyy")
    : "";

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const schemaData = generateBlogPostSchema(post, readingTime);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaData}
      />
      
      <main className="min-h-screen bg-gradient-to-br mt-16 from-gray-50 via-white to-gray-100">
        {/* Navigation */}
        <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-3">
            <Link
              href="/content/blog"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-all duration-300 group"
              aria-label="Back to all blog posts"
              prefetch={true}
            >
              <FaArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Blogs
            </Link>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0 py-8 md:py-12" itemScope itemType="https://schema.org/BlogPosting">
          {/* Header */}
          <header className="mb-12">
            <div className="flex sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-full font-medium border border-indigo-100 text-sm"
                  itemProp="articleSection"
                >
                  {post.category}
                </span>
                {post.category && formattedDate && (
                  <span className="hidden sm:inline text-gray-300">•</span>
                )}
                <time
                  dateTime={post.date}
                  className="text-gray-600 flex items-center"
                  itemProp="datePublished"
                >
                  {formattedDate}
                </time>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600 flex items-center">
                  <FaClock className="w-3.5 h-3.5 mr-1" />
                  <span itemProp="timeRequired">{readingTime} min read</span>
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Client components for interactive buttons */}
                <SaveButton postId={post.slug} />
                <ShareButton 
                  title={post.title}
                  url={`${typeof window !== 'undefined' ? window.location.href : ''}/blog/${post.slug}`}
                />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight" itemProp="headline">
              {post.title}
            </h1>
            
            {post.subtitle && (
              <p className="text-sm md:text-xl text-gray-800 font-light max-w-2xl leading-relaxed mb-8" itemProp="description">
                {post.subtitle}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 text-sm px-4 py-1.5 rounded-full font-medium border border-indigo-100 hover:shadow-sm transition-shadow"
                    itemProp="keywords"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-10 rounded-sm overflow-hidden shadow-xl transition-all duration-500 hover:shadow-md">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                itemProp="image"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg md:prose-xl text-sm md:text-xl text-gray-800 font-light max-w-none leading-relaxed" itemProp="articleBody">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-sm md:text-xl font-bold text-gray-800 mt-8 mb-3 pb-2 border-b border-gray-300"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-sm md:text-xl font-semibold text-gray-800 mt-4 mb-2 border-b border-gray-200"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-gray-700 font-normal leading-relaxed mb-7"
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
                    className="my-1 space-y-1 list-disc list-inside marker:text-indigo-500 font-thin"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="my-1 space-y-1 list-decimal list-inside marker:text-blue-500 marker:font-semibold"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="text-gray-700 pl-1 font-thin"
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
              <div className="flex items-center gap-4" itemProp="author" itemScope itemType="https://schema.org/Person">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {post.author?.[0]?.toUpperCase() || "A"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg" itemProp="name">
                    {post.author || "Anonymous"}
                  </p>
                  <p className="text-gray-500">Author</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-500">Published on</div>
                <time dateTime={post.date} className="font-medium text-gray-700" itemProp="datePublished">
                  {formattedDate}
                </time>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <ShareButton 
                title={post.title}
                url={`/ke/content/blog/${post.slug}`}
                variant="primary"
              />
              <SaveButton postId={post.slug} variant="secondary" />
              <Link
                href="/content/blog"
                className="px-6 py-2.5 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors inline-flex items-center"
                prefetch={true}
              >
                <FaArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}