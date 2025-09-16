import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../../data/data";
import ReactMarkdown from "react-markdown"


export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id.toString() === params.id);

  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 g-gradient-to-b from-gray-50 to-gray-200">
      {/* Back button */}
      <Link
        href="/content/blog"
        className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6"
      >
        ← Home
      </Link>
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="rounded mb-6"
      />

      <div className="prose prose-slate max-w-none">
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <h2 {...props} className="text-blue-800 font-semibold text-xl py-5" />
            ),
            h3: ({ node, ...props }) => (
              <h3 {...props} className="text-blue-700 font-medium text-lg py-4" />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="text-slate-600 " />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc pl-5 text-slate-600" />
            ),
            li: ({ node, ...props }) => (
              <li {...props} className="" />
            ),
            strong: ({ node, ...props }) => (
              <strong {...props} className="font-semibold text-slate-700" />
            ),
          }}
        >
          {post.excerpt || "No description available."}
        </ReactMarkdown>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Published on{" "}
        {new Date(post.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
