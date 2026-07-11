import React from "react";
import Link from "next/link";
import { 
  Star, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  GraduationCap
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { Button } from "@/components/ui/button";
import { getTestimonials } from "@/lib/supabase/queries";
import ReviewsFormClient from "@/components/site/reviews-form-client";

export default async function TestimonialReviewsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="relative bg-brand-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl z-0" />
        <div className="absolute left-1/10 bottom-1/10 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl z-0" />

        <Container className="relative z-20 text-center max-w-3xl space-y-4">
          <span className="text-brand-accent font-extrabold text-sm uppercase tracking-widest block">
            Alumni Corner
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Student Testimonial Wall
          </h1>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Read stories and feedback from our students placed at premier global destinations.
          </p>
        </Container>
      </section>

      {/* 2. TESTIMONIAL GRID WALL */}
      <Section bg="default">
        <Container>
          <SectionHeading 
            badge="Testimonials Wall"
            title="Success Stories & Reviews"
            description="Our primary objectives are built on complete transparency, high credentials, and focused student reviews."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-5 text-left">
                  <div className="flex items-center gap-1 text-brand-accent">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-200/50">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-brand-primary flex items-center justify-center font-extrabold text-sm">
                    {testimonial.initials}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                    <span className="block text-slate-400 text-xs mt-1 leading-none">{testimonial.destination}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. LEAVE A REVIEW FORM */}
      <Section bg="muted" className="border-t border-slate-100">
        <Container className="max-w-3xl">
          <div className="text-center space-y-4 max-w-xl mx-auto mb-10">
            <MessageSquare className="w-10 h-10 text-brand-accent mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Leave Us Your Review
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Are you an alumnus of Downtown? We would love to hear your feedback on our counseling services and test preparation classes.
            </p>
          </div>

          <ReviewsFormClient />
        </Container>
      </Section>
    </div>
  );
}
