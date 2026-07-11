"use client";

import React, { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReviewsFormClient() {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up review submit in Stage 6 (using public insert)
    setReviewSubmitted(true);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl text-left max-w-2xl mx-auto">
      <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
        Review Form
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
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary"
                required
              />
            </div>

            {/* Destination */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">University / Destination</label>
              <input 
                type="text" 
                placeholder="e.g. York University, Canada" 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary"
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
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary"
              required
            />
          </div>

          <Button className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white font-bold py-3.5 rounded-xl">
            Publish Review
          </Button>
        </form>
      )}
    </div>
  );
}
