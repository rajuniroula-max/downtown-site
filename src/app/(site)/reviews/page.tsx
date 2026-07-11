"use client";

import React, { useState } from "react";
import { 
  Star, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  GraduationCap
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { Button } from "@/components/ui/button";
import { mockTestimonials } from "@/lib/types/mock-data";

export default function TestimonialReviewsPage() {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up review submit in Stage 6
    setReviewSubmitted(true);
  };

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
            {mockTestimonials.map((testimonial) => (
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

          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl text-left max-w-2xl mx-auto">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              Review Form (TODO: Wire submit action in Stage 6)
            </span>

            {reviewSubmitted ? (
              <div className="text-center py-8 space-y-3 bg-blue-50/50 border border-blue-100/50 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Review Submitted!</h4>
                <p className="text-slate-500 text-xs max-w-xs mx-auto">
                  Thank you for sharing your experience. Your feedback will be reviewed and published soon.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setReviewSubmitted(false)}
                  className="mt-3 rounded-xl"
                >
                  Write Another Review
                </Button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleReviewSubmit}>
                {/* Rating selection stars */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">Your Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = hoveredRating !== null ? star <= hoveredRating : star <= rating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(null)}
                          className="text-slate-300 hover:text-brand-accent p-0.5 transition-colors focus:outline-none"
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              isActive ? "text-brand-accent fill-brand-accent" : "text-slate-200"
                            }`} 
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                      required
                    />
                  </div>

                  {/* Destination */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase">University / Destination</label>
                    <input 
                      type="text" 
                      placeholder="e.g. York University, Canada" 
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                      required
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Review Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your study abroad experience with Downtown Consultancy..." 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                    required
                  />
                </div>

                <Button className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white font-bold py-3.5 rounded-xl">
                  Publish Review
                </Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
