import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowRight, 
  CheckCircle2, 
  Wallet, 
  GraduationCap, 
  ArrowLeft,
  User
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  getDestinationBySlug, 
  getUniversities, 
  getBlogPosts 
} from "@/lib/supabase/queries";

// generateStaticParams stub covering Australia, UK, USA, Canada, New Zealand, Europe
export function generateStaticParams() {
  return [
    { country: "australia" },
    { country: "uk" },
    { country: "usa" },
    { country: "canada" },
    { country: "new-zealand" },
    { country: "europe" }
  ];
}

interface DestinationPageProps {
  params: {
    country: string;
  };
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const dest = await getDestinationBySlug(params.country.toLowerCase());
  if (!dest) {
    return {
      title: "Study Abroad Guide | Downtown Consultancy",
    };
  }
  return {
    title: `Study in ${dest.country} | Admissions, Visas & Fees Guide`,
    description: dest.tagline || `Discover admission requirements, costs of living, and visa processes for international students to study in ${dest.country}.`,
    openGraph: {
      title: `Study in ${dest.country} | Admissions, Visas & Fees Guide`,
      description: dest.tagline || `Complete details on visa processes, scholarship guides, and colleges to study in ${dest.country}.`,
      images: dest.heroImage ? [{ url: dest.heroImage }] : [{ url: "/downtown.jpg" }],
    }
  };
}

export default async function StudyAbroadCountryPage({ params }: DestinationPageProps) {
  const countrySlug = params.country.toLowerCase();
  
  // Find destination details
  const destination = await getDestinationBySlug(countrySlug);
  if (!destination) {
    notFound();
  }

  // Filter top partner universities in this country
  const allUniversities = await getUniversities();
  const countryNameLower = destination.country.toLowerCase();
  const countryUniversities = allUniversities.filter(uni => 
    uni.country.toLowerCase() === countryNameLower || 
    (countrySlug === "europe" && ["europe", "germany", "france"].includes(uni.country.toLowerCase()))
  );

  // Filter related blog posts
  const allBlogs = await getBlogPosts();
  const relatedBlogs = allBlogs.filter(post => 
    post.title.toLowerCase().includes(countrySlug) ||
    post.excerpt.toLowerCase().includes(countrySlug)
  );

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
        "name": "Study Abroad",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/#destinations`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": destination.country,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/study-abroad/${destination.slug}`
      }
    ]
  };

  return (
    <div>
      {/* Dynamic JSON-LD breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* 1. HERO BANNER */}
      <section className="relative bg-brand-primary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl z-0" />
        <div className="absolute left-1/10 bottom-1/10 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl z-0" />

        <Container className="relative z-20">
          <Link 
            href="/#destinations"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Destinations
          </Link>
          <div className="max-w-3xl space-y-4">
            <span className="text-brand-accent font-extrabold text-sm sm:text-base uppercase tracking-widest block">
              Study Abroad Guide
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Study in {destination.country} {destination.flagIcon}
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ textWrap: "balance" }}>
              {destination.tagline}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. WHY STUDY HERE */}
      <Section bg="default">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-brand-primary border border-blue-100">
                Why Choose {destination.country}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Global Recognition & Outstanding Learning Experience
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {destination.whyStudyText}
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-4">
                {destination.whyStudyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 bg-blue-50/50 rounded-3xl p-6 border border-blue-100/50 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-primary text-white flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Admissions Open</h4>
                  <span className="block text-slate-400 text-xs uppercase font-bold mt-0.5">Direct Partner Tickers</span>
                </div>
              </div>
              
              <div className="space-y-3.5">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Popular Courses:</span>
                <div className="flex flex-wrap gap-2">
                  {destination.popularCourses.map((course) => (
                    <span 
                      key={course}
                      className="bg-white border border-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-1.5 rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. COST OF LIVING OVERVIEW */}
      <Section bg="muted" className="border-t border-b border-slate-100">
        <Container>
          <SectionHeading 
            badge="Budget Planning"
            title="Estimated Cost of Living"
            description="A realistic summary of weekly and yearly costs. Note: These figures vary depending on your city and accommodation choice."
          />

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Rent */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-brand-accent flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Accommodation</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{destination.costOfLiving.rent}</p>
            </div>

            {/* Food */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Food & Groceries</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{destination.costOfLiving.food}</p>
            </div>

            {/* Transport */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-brand-accent flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Local Transport</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{destination.costOfLiving.transport}</p>
            </div>

            {/* Overall */}
            <div className="bg-white border border-brand-accent/20 rounded-2xl p-6 shadow-md shadow-brand-accent/5 space-y-3 relative overflow-hidden">
              <div className="absolute right-0 top-0 bg-brand-accent text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-bl-lg">
                Visa Req
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Overall Minimum</h4>
              <p className="text-brand-primary text-sm font-bold leading-relaxed">{destination.costOfLiving.overallEstimate}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. TOP PARTNER UNIVERSITIES */}
      {countryUniversities.length > 0 && (
        <Section bg="default">
          <Container>
            <SectionHeading 
              badge="Partner Networks"
              title="Top Partner Universities"
              description={`We directly coordinate admissions with premier institutions in ${destination.country}.`}
            />

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {countryUniversities.map((uni) => (
                <div 
                  key={uni.slug}
                  className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                        {uni.logo}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors text-base">{uni.name}</h4>
                        <span className="text-xs text-slate-400 font-semibold">{uni.city}, {uni.country}</span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {uni.aboutText}
                    </p>
                  </div>
                  <Link href={`/universities/${uni.slug}`}>
                    <div className="mt-6 pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                      <span>View Courses & Admission Criteria</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. VISA REQUIREMENTS ACCORDION */}
      <Section bg="muted" className="border-t border-b border-slate-100">
        <Container className="max-w-4xl">
          <SectionHeading 
            badge="Embassy Processes"
            title="Student Visa Guidelines"
            description={`Key parameters requested by the embassy for study visas to ${destination.country}.`}
          />

          <Accordion className="w-full text-slate-700 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            {destination.visaRequirements.map((req, idx) => (
              <AccordionItem 
                key={idx} 
                value={`req-${idx}`}
                className="border-b border-slate-100 last:border-0"
              >
                <AccordionTrigger className="font-bold text-slate-800 text-base py-4 hover:text-brand-primary hover:no-underline">
                  {req.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-slate-600 leading-relaxed text-sm">
                  {req.details}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      {/* 6. RELATED BLOG POSTS */}
      {relatedBlogs.length > 0 && (
        <Section bg="default">
          <Container>
            <SectionHeading 
              badge="Country Insights"
              title={`Latest for ${destination.country}`}
              description="Guides, tips, and student visa updates written by our country directors."
            />

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {relatedBlogs.map((blog) => (
                <article 
                  key={blog.id}
                  className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded uppercase">
                      {blog.category}
                    </span>
                    <h3 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors text-base">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <User className="w-3 h-3" />
                      <span>{blog.author}</span>
                    </div>
                    <Link href={`/blog/${blog.slug}`} className="text-brand-primary font-bold hover:text-brand-accent">
                      Read Full Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 7. CTA BANNER */}
      <section className="bg-brand-primary text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/20 z-0" />
        <Container className="relative z-10 space-y-6 max-w-3xl">
          <h2 className="text-3xl font-extrabold">Ready to Process Your Admission for {destination.country}?</h2>
          <p className="text-blue-100">
            Book a free, 1-on-1 counseling session with our qualified country director for {destination.country}. Get personalized support on universities list and eligibility.
          </p>
          <div className="flex justify-center pt-2">
            <Link href="/contact-us?counselling=free">
              <Button className="bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-bold py-6 px-10 rounded-xl shadow-lg shadow-brand-accent/25 flex items-center gap-2">
                Book Free Consultation <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
