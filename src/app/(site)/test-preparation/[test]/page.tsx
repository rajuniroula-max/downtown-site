import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  ArrowLeft
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTestPrepBySlug } from "@/lib/supabase/queries";

// generateStaticParams stub covering IELTS, TOEFL, PTE, SAT, GRE-GMAT
export function generateStaticParams() {
  return [
    { test: "ielts" },
    { test: "toefl" },
    { test: "pte" },
    { test: "sat" },
    { test: "gre-gmat" }
  ];
}

interface TestPrepPageProps {
  params: {
    test: string;
  };
}

export async function generateMetadata({ params }: TestPrepPageProps) {
  const prep = await getTestPrepBySlug(params.test.toLowerCase());
  if (!prep) {
    return {
      title: "Test Preparation | Downtown Consultancy",
    };
  }
  return {
    title: `${prep.name.toUpperCase()} Preparation Classes Kathmandu | Downtown`,
    description: prep.tagline || `Enroll in our top-rated ${prep.name} preparation classes in Kathmandu, Nepal. Complete syllabus coverage, certified tutors, flexible timing, and free study materials.`,
    openGraph: {
      title: `${prep.name.toUpperCase()} Preparation Classes Kathmandu | Downtown`,
      description: prep.tagline || `Certified test preparation courses for ${prep.name} with flexible schedules and mock exams.`,
      images: [{ url: "/downtown.jpg" }],
    }
  };
}

export default async function TestPrepDetailPage({ params }: TestPrepPageProps) {
  const testSlug = params.test.toLowerCase();
  
  // Find test prep program details
  const program = await getTestPrepBySlug(testSlug);
  if (!program) {
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
        "name": "Test Preparation",
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/#test-prep`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": program.name,
        "item": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/test-preparation/${program.slug}`
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
            href="/#services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="max-w-3xl space-y-4">
            <span className="text-brand-accent font-extrabold text-sm sm:text-base uppercase tracking-widest block">
              Test Preparation
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              {program.name} Preparation
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ textWrap: "balance" }}>
              {program.tagline}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. OVERVIEW & SYLLABUS */}
      <Section bg="default">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Overview */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-brand-primary border border-blue-100">
                Course Syllabus
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                About the {program.name} Examination
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {program.overview}
              </p>
              
              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-bold text-slate-800 text-base mb-4">Core Modules Covered:</h4>
                <ul className="space-y-3.5">
                  {program.syllabusPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-5 bg-blue-50/50 rounded-3xl p-8 border border-blue-100/50 space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-brand-primary text-lg">Course Logistics</h3>
                <span className="block text-slate-400 text-xs font-bold uppercase tracking-wide">Validated Admissions Hub</span>
              </div>

              <ul className="space-y-4 border-t border-b border-blue-100/50 py-5">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-semibold">Duration:</span>
                  <span className="font-bold text-slate-800">{program.duration}</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-semibold">Weekly commitment:</span>
                  <span className="font-bold text-slate-800">6 Days a week</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-semibold">Course Fee:</span>
                  <span className="font-bold text-brand-primary">{program.pricing}</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link href="#enroll">
                  <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-6 rounded-xl shadow-md shadow-brand-accent/10">
                    Enroll in Class Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. CLASS SCHEDULE TABLE */}
      <Section bg="muted" className="border-t border-b border-slate-100">
        <Container className="max-w-4xl">
          <SectionHeading 
            badge="Timing Batches"
            title="Class Schedule Batches"
            description="Find a timing that fits your schedule. Morning, afternoon, and evening batches are open."
          />

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4">Batch Name</th>
                    <th className="px-6 py-4">Time Interval</th>
                    <th className="px-6 py-4">Lead Instructor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {program.classSchedule.map((sched, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{sched.batch}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-accent" />
                        <span>{sched.timing}</span>
                      </td>
                      <td className="px-6 py-4">{sched.instructor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <span className="block text-center text-xs text-slate-400 mt-4">
            * Every Sunday morning features a full simulated mock exam. Recommended for all batches.
          </span>
        </Container>
      </Section>

      {/* 4. FAQ ACCORDION */}
      <Section bg="default">
        <Container className="max-w-3xl">
          <SectionHeading 
            badge="Common Questions"
            title="Test Prep FAQs"
            description="Got questions about registration, scoring, or materials? Check out the answers below."
          />

          <Accordion className="w-full text-slate-700 bg-slate-50 rounded-2xl border border-slate-100 p-4">
            {program.faq.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`faq-${idx}`}
                className="border-b border-slate-200/60 last:border-0"
              >
                <AccordionTrigger className="font-bold text-slate-800 text-base py-4 hover:text-brand-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-slate-600 leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      {/* 5. ENROLL CTA BANNER */}
      <section id="enroll" className="bg-brand-primary text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/20 z-0" />
        <Container className="relative z-10 space-y-6 max-w-3xl">
          <GraduationCap className="w-12 h-12 text-brand-accent mx-auto" />
          <h2 className="text-3xl font-extrabold">Ready to Boost Your {program.name} Score?</h2>
          <p className="text-blue-100">
            Book a free 2-day trial class before enrolling. Take a diagnostic mock test and evaluate your current scores under the guidance of our experts.
          </p>
          
          <div className="flex justify-center pt-2">
            <Link href="/contact-us?counselling=class">
              <Button className="bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-bold py-6 px-10 rounded-xl shadow-lg shadow-brand-accent/25 flex items-center gap-2">
                Book a Free Trial Session <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
