import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  BookOpen, 
  FolderLock,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { Button } from "@/components/ui/button";
import { getUniversityBySlug } from "@/lib/supabase/queries";

// generateStaticParams stub covering mock universities from local helper
export function generateStaticParams() {
  return [
    { slug: "anu-australia" }
  ];
}

interface UniversityDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: UniversityDetailPageProps) {
  const uni = await getUniversityBySlug(params.slug.toLowerCase());
  if (!uni) {
    return {
      title: "University Details | Downtown Consultancy",
    };
  }
  return {
    title: `${uni.name} | Study in ${uni.city}, ${uni.country}`,
    description: uni.aboutText ? uni.aboutText.substring(0, 160) : `Learn more about ${uni.name} in ${uni.city}, ${uni.country}. Check courses offered, admission requirements, and scholarship pathways.`,
    openGraph: {
      title: `${uni.name} | Study in ${uni.city}, ${uni.country}`,
      description: uni.aboutText ? uni.aboutText.substring(0, 160) : `Learn more about courses, requirements, and information to study at ${uni.name}.`,
      images: uni.logo ? [{ url: uni.logo }] : [{ url: "/downtown.jpg" }],
    }
  };
}

export default async function UniversityDetailPage({ params }: UniversityDetailPageProps) {
  const uniSlug = params.slug.toLowerCase();
  
  // Find university details
  const university = await getUniversityBySlug(uniSlug);
  if (!university) {
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
        "name": "Universities",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/universities`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": university.name,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/universities/${university.slug}`
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
      <section className="relative bg-brand-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl z-0" />
        <div className="absolute left-1/10 bottom-1/10 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl z-0" />

        <Container className="relative z-20">
          <Link 
            href="/universities"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Universities
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-brand-accent flex items-center justify-center font-black text-xl shadow-lg">
              {university.logo}
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {university.name}
              </h1>
              <div className="flex items-center gap-1.5 text-blue-100 text-sm">
                <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>{university.city}, {university.country}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. ABOUT & DETAILS */}
      <Section bg="default">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">About the Institution</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {university.aboutText}
                </p>
              </div>

              {/* Courses */}
              <div className="space-y-4 border-t border-slate-100 pt-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-primary" />
                  <span>Popular Programs for Nepalese Students</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {university.coursesOffered.map((course, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-brand-accent" />
                      <span className="font-semibold text-slate-800 text-sm">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admission Requirements */}
              <div className="space-y-4 border-t border-slate-100 pt-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FolderLock className="w-5 h-5 text-brand-primary" />
                  <span>Entry & Language Criteria</span>
                </h3>
                <ul className="space-y-3.5">
                  {university.admissionRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Sidebar (Admissions Guide) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Direct Admissions Support</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Downtown Consultancy provides end-to-end liaison services for {university.name}. We help compile transcripts, verify credit matching, and secure fast-track offer letters.
                </p>
                <Link href="/contact-us?counselling=free">
                  <Button className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-1">
                    <span>Apply for Admission</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Campus Gallery */}
              {university.galleryImages && university.galleryImages.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Campus Gallery</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {university.galleryImages.map((img, idx) => (
                      <div 
                        key={idx}
                        className="h-28 bg-slate-100 rounded-xl border border-slate-200/50 flex items-center justify-center text-slate-400 font-bold text-xs"
                      >
                        Campus Preview
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. CTA FORM SECTION */}
      <section className="bg-slate-900 text-white py-16 text-center border-t border-slate-800">
        <Container className="max-w-3xl space-y-6">
          <GraduationCap className="w-12 h-12 text-brand-accent mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Enroll?</h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Get expert guidance to build a competitive portfolio for {university.name}. Book your free slot now.
          </p>
          <div className="pt-2">
            <Link href="/contact-us?counselling=free">
              <Button className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-6 px-10 rounded-xl shadow-lg shadow-brand-accent/25">
                Book My Spot
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
