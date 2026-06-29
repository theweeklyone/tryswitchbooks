"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { blogPosts, blogCategories, type BlogCategory } from "@/data/blog";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { blogImages } from "@/lib/blog-images";
import { clsx } from "@/lib/utils";

type Filter = BlogCategory | "All";

const filters: Filter[] = ["All", ...blogCategories];

export function AdviceHub() {
  const [active, setActive] = useState<Filter>("All");

  const items = useMemo(
    () => (active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active)),
    [active],
  );

  return (
    <div>
      <div className="-mx-1 mb-12 flex flex-wrap gap-2 overflow-x-auto pb-2">
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={clsx(
                "whitespace-nowrap rounded-full border px-5 py-2.5 text-xs uppercase tracking-widest transition-all duration-300",
                isActive
                  ? "border-cocoa-300 bg-cocoa-300 text-cream-50"
                  : "border-sand-100 bg-cream-50 text-cocoa-300 hover:border-cocoa-300",
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <article
            key={post.slug}
            className="card-luxe group relative flex flex-col overflow-hidden"
          >
            <PlaceholderImage
              variant={post.imageStyle}
              className="aspect-[5/3] w-full"
              rounded="rounded-none"
              label={blogImages[post.slug]?.alt ?? post.title}
              src={blogImages[post.slug]?.src}
            />
            <div className="flex flex-1 flex-col p-7">
              <p className="eyebrow">{post.category}</p>
              <h3 className="mt-3 font-serif text-2xl text-cocoa-300">
                <Link
                  href={`/advice/${post.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa-50">{post.excerpt}</p>
              <div aria-hidden className="mt-6 flex items-center justify-between text-xs uppercase tracking-widest">
                <span className="text-cocoa-50/70">{post.readingTime}</span>
                <span className="text-champagne-dark">Read →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
