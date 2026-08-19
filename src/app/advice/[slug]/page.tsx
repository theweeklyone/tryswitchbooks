import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { og } from "@/lib/og";
import { blogPosts, findPost, relatedPosts } from "@/data/blog";
import { CTASection } from "@/components/CTASection";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { blogImages } from "@/lib/blog-images";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { site } from "@/data/site";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// Article body is authored as plain text in data/blog.ts, but paragraphs and
// list items may contain inline markdown links — [label](/href) — so a pillar
// article can link contextually into its cluster. Parse those into real links
// (Next <Link> for internal paths, <a target=_blank> for external URLs).
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const linkClass =
  "font-medium text-cocoa-300 underline decoration-champagne/70 underline-offset-4 transition hover:decoration-champagne";

function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const index = m.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const [full, label, href] = m;
    nodes.push(
      href.startsWith("/") ? (
        <Link key={key++} href={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {label}
        </a>
      ),
    );
    last = index + full.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? nodes : text;
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = findPost(params.slug);
  if (!post) return {};
  const img = blogImages[post.slug];
  return {
    // Absolute (no " | Switch Books" suffix) so long article titles aren't
    // pushed past the ~60-char SERP limit. Google re-appends the site name itself.
    title: { absolute: post.title },
    description: post.excerpt,
    alternates: { canonical: `/advice/${post.slug}` },
    openGraph: og(
      `/advice/${post.slug}`,
      "article",
      img?.src ? { src: img.src, alt: img.alt ?? post.title } : undefined,
    ),
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug);
  if (!post) notFound();

  const more = relatedPosts(post.slug, 2);

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
                        <span>{renderInline(it)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{renderInline(block.text ?? "")}</p>;
            })}
          </div>

          {post.related && post.related.length > 0 ? (
            <aside className="mt-14 rounded-2xl border border-sand-100 bg-blush-50/60 p-7 sm:p-8">
              <p className="eyebrow">Related reading</p>
              <ul className="mt-4 space-y-3">
                {post.related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="group inline-flex items-center gap-2 text-base text-cocoa-300 hover:text-champagne-dark"
                    >
                      <span
                        aria-hidden
                        className="inline-block h-px w-5 shrink-0 bg-champagne transition-all group-hover:w-7"
                      />
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
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
