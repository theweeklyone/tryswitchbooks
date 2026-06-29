import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, findPost } from "@/data/blog";
import { CTASection } from "@/components/CTASection";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { blogImages } from "@/lib/blog-images";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { site } from "@/data/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = findPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/advice/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug);
  if (!post) notFound();

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Advice", path: "/advice" },
          { name: post.title, path: `/advice/${post.slug}` },
        ]}
      />
      <article>
        <header className="pt-28 lg:pt-36">
          <div className="container-luxe max-w-3xl">
            <Link
              href="/advice"
              className="text-xs uppercase tracking-widest text-cocoa-50 hover:text-cocoa-300"
            >
              ← Advice hub
            </Link>
            <p className="eyebrow mt-8">{post.category}</p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.06] text-cocoa-300 sm:text-5xl md:text-[3.5rem]">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-cocoa-50">{post.excerpt}</p>
            <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-widest text-cocoa-50/70">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>{post.publishedOn}</span>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        <div className="container-luxe mt-12 max-w-5xl">
          <PlaceholderImage
            variant={post.imageStyle}
            className="aspect-[16/8] w-full"
            label={blogImages[post.slug]?.alt ?? post.title}
            src={blogImages[post.slug]?.src}
          />
        </div>

        <div className="container-luxe mt-16 max-w-3xl pb-16">
          <div className="prose-luxe space-y-6 text-base leading-[1.85] text-cocoa-50 sm:text-lg">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="!mt-12 font-serif text-3xl text-cocoa-300 sm:text-4xl"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul" && block.items) {
                return (
                  <ul key={i} className="space-y-3">
                    {block.items.map((it, j) => (
                      <li key={j} className="flex gap-3">
                        <span aria-hidden className="mt-3 inline-block h-px w-5 shrink-0 bg-champagne" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{block.text}</p>;
            })}
          </div>
        </div>
      </article>

      {/* More reading */}
      {more.length > 0 ? (
        <section className="bg-blush-50 py-20">
          <div className="container-luxe">
            <p className="eyebrow">Keep reading</p>
            <h2 className="mt-3 font-serif text-3xl text-cocoa-300 sm:text-4xl">More reading.</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/advice/${p.slug}`}
                  className="card-luxe group flex flex-col overflow-hidden"
                >
                  <PlaceholderImage
                    variant={p.imageStyle}
                    className="aspect-[5/3] w-full"
                    rounded="rounded-none"
                    label={blogImages[p.slug]?.alt ?? p.title}
                    src={blogImages[p.slug]?.src}
                  />
                  <div className="p-7">
                    <p className="eyebrow">{p.category}</p>
                    <h3 className="mt-3 font-serif text-2xl text-cocoa-300">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cocoa-50">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        eyebrow="Recognise the problem?"
        title="Let's match you with the right firm."
        description="Take the free, no-pressure review. Tell us what's not working and we'll find you a local accountant who fixes it."
        primaryLabel="Take the free review"
        primaryHref={site.consultationUrl}
        secondaryLabel="Talk to us"
        secondaryHref="/contact"
      />
    </>
  );
}
