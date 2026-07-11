import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Clock, 
  Share2
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/supabase/queries";

// Custom Social Sharing SVGs
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// generateStaticParams stub covering mock blog slugs
export function generateStaticParams() {
  return [
    { slug: "australia-visa-guide" }
  ];
}

interface BlogPostDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostDetailPageProps) {
  const post = await getBlogPostBySlug(params.slug.toLowerCase());
  if (!post) {
    return {
      title: "Blog Post | Downtown Consultancy",
    };
  }
  return {
    title: `${post.title} | Downtown Consultancy Blog`,
    description: post.excerpt || `Read our article on ${post.title}. Stay updated with key advice for Nepalese international students.`,
    openGraph: {
      title: `${post.title} | Downtown Consultancy Blog`,
      description: post.excerpt || `Latest educational updates and visa guidelines for international students.`,
      images: [{ url: "/downtown.jpg" }],
    }
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const postSlug = params.slug.toLowerCase();

  // Find blog post details
  const post = await getBlogPostBySlug(postSlug);
  if (!post) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog/${post.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || "Downtown Editorial Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Downtown Consultancy",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/downtown.jpg`
      }
    },
    "image": [
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/downtown.jpg`
    ]
  };

  // Filter related posts (exclude current)
  const allBlogs = await getBlogPosts();
  const relatedPosts = allBlogs.filter(p => p.slug !== postSlug).slice(0, 2);

  return (
    <div>
      {/* Dynamic JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* 1. ARTICLE HEADER BANNER */}
      <section className="bg-slate-50 border-b border-slate-100 py-12 md:py-16">
        <Container>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog Feed
          </Link>

          <div className="max-w-3xl space-y-4 text-left">
            <span className="text-[10px] font-bold text-brand-primary bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta details */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-300" />
                <span className="font-semibold text-slate-600">{post.author}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span>{post.date}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-300" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. ARTICLE CONTENT */}
      <Section bg="default">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Content body */}
            <div className="lg:col-span-8 space-y-8">
              <div 
                className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share block */}
              <div className="border-t border-b border-slate-100 py-4 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Share2 className="w-4 h-4" /> Share This Article
                </span>
                <div className="flex items-center gap-2">
                  <button className="bg-slate-50 hover:bg-blue-50 hover:text-[#1877F2] p-2 rounded-lg transition-colors border border-slate-200/50">
                    <FacebookIcon className="w-4 h-4" />
                  </button>
                  <button className="bg-slate-50 hover:bg-blue-50 hover:text-[#1DA1F2] p-2 rounded-lg transition-colors border border-slate-200/50">
                    <TwitterIcon className="w-4 h-4" />
                  </button>
                  <button className="bg-slate-50 hover:bg-blue-50 hover:text-[#0A66C2] p-2 rounded-lg transition-colors border border-slate-200/50">
                    <LinkedinIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar (Counselling trigger) */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">Need Personalized Guidance?</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Rules and procedures are constantly changing. Speak directly to our senior directors to get custom updates mapped to your qualifications.
              </p>
              <Link href="/contact-us?counselling=free">
                <Button className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-3">
                  Schedule Counselling
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <Section bg="muted" className="border-t border-slate-100">
          <Container>
            <SectionHeading 
              badge="Related Articles"
              title="More Resources For You"
              description="Keep reading our recent updates and guidelines for international applicants."
            />

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {relatedPosts.map((p) => (
                <div 
                  key={p.slug}
                  className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded uppercase">
                      {p.category}
                    </span>
                    <h4 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors text-base line-clamp-2">
                      {p.title}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {p.excerpt}
                    </p>
                  </div>
                  <Link href={`/blog/${p.slug}`}>
                    <div className="mt-5 pt-3 border-t border-slate-50 flex items-center text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                      <span>Read Guide</span>
                      <ArrowLeft className="w-3.5 h-3.5 ml-1 rotate-180" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
