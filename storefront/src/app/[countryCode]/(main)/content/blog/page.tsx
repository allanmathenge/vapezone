"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../data/data"
import Thumbnail from "@modules/products/components/thumbnail"

const Blog = () => {
  const categories = [
    "All",
    "Beginner Guides",
    "Device Reviews",
    "E-Liquid & Flavors",
    "Troubleshooting",
    "Industry News"
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">
            Vapezone Kenya Knowledge Hub
          </h1>
          <p className="text-sm text-gray-700 max-w-3xl mx-auto">
            Your expert guide to vaping, product reviews, and industry news.
            Learn, explore and vape responsibly.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex w-full items-center ">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                className="h-48 w-full object-cover"
                src={post.image}
                alt={post.title}
                width={500}
                height={300}
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-gray-900 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-gray-600 line-clamp-2">
                  {post.subtitle}
                </p>
                <div className="mt-4 flex items-center">
                  <div className="text-sm text-gray-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </div>

                <Link
                  href={`/content/blog/${post.id}`}
                  className="mt-4 block w-full text-center py-2.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-200"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm tracking-wide text-red-500 text-center">
            These products are intended for use by adults of legal smoking age
            (18+). They are not recommended for use by non-smokers, children,
            women who are pregnant or breastfeeding. Nicotine is an addictive
            chemical.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
