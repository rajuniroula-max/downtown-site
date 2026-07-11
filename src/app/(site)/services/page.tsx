"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Award, 
  Plane, 
  HeartHandshake,
  CheckCircle2
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { Button } from "@/components/ui/button";
import { mockServices } from "@/lib/types/mock-data";

// Map string icon names to Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  FileText: FileText,
  Award: Award,
  Plane: Plane,
  HeartHandshake: HeartHandshake
};

export default function ServicesPage() {
  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="relative bg-brand-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl z-0" />
        <div className="absolute left-1/10 bottom-1/10 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl z-0" />

        <Container className="relative z-20 text-center max-w-3xl space-y-4">
          <span className="text-brand-accent font-extrabold text-sm uppercase tracking-widest block">
            Advisory Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Core Services
          </h1>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From initial stream counseling to sorting housing housing abroad, we provide complete transparency at every stage.
          </p>
        </Container>
      </section>

      {/* 2. OVERVIEW ICON-GRID */}
      <Section bg="default">
        <Container>
          <SectionHeading 
            badge="Services Grid"
            title="End-to-End Advising Framework"
            description="We support international student applications with professional care. Click on any service to scroll to its details."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.map((srv) => {
              const IconComponent = iconMap[srv.iconName] || GraduationCap;
              return (
                <a 
                  key={srv.id} 
                  href={`#${srv.slug}`}
                  className="group bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-brand-primary flex items-center justify-center shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{srv.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{srv.shortDesc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-200/50 flex items-center text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                    <span>Learn process details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. DETAILED ANCHOR SECTIONS */}
      {mockServices.map((srv, idx) => {
        const IconComponent = iconMap[srv.iconName] || GraduationCap;
        const isMutedBg = idx % 2 === 1;
        return (
          <Section 
            key={srv.id} 
            id={srv.slug} 
            bg={isMutedBg ? "muted" : "default"}
            className="border-t border-slate-100 scroll-mt-20"
          >
            <Container>
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Visual icon element */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="w-28 h-28 rounded-3xl bg-blue-50 border border-blue-100 text-brand-primary flex items-center justify-center shadow-lg">
                    <IconComponent className="w-14 h-14" />
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-8 space-y-6 text-left">
                  <span className="text-brand-accent text-xs font-extrabold uppercase tracking-widest block">
                    Detail Overview
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {srv.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {srv.detailedContent}
                  </p>

                  <div className="space-y-3.5 pt-2 border-t border-slate-200/60">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Methodology & Steps:</h4>
                    <ul className="grid sm:grid-cols-2 gap-3.5">
                      {srv.processSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* 4. FINAL CTA BANNER */}
      <section className="bg-brand-primary text-white py-16 text-center">
        <Container className="max-w-3xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Have Queries on Our Procedures?</h2>
          <p className="text-blue-100 leading-relaxed">
            All counselings and assessment logs at Downtown are completely free of charge. Fill in our intake form to schedule an appointment.
          </p>
          <div className="pt-2">
            <Link href="/contact-us?counselling=free">
              <Button className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-6 px-10 rounded-xl">
                Book My Free Session
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
