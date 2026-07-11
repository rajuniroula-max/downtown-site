"use client";

import React, { useState, useEffect, useTransition } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitInquiry } from "@/app/actions/inquiry";

export function LeadFormClient() {
  const [isPending, startTransition] = useTransition();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formLoadTime, setFormLoadTime] = useState<number>(0);

  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("formLoadTime", String(formLoadTime));
    formData.set("sourcePage", "Homepage Lead Form");

    startTransition(async () => {
      try {
        const res = await submitInquiry(formData);
        if (res.success) {
          setFormSubmitted(true);
        } else {
          setError(res.message || "Failed to submit inquiry.");
        }
      } catch (err: any) {
        console.error("Submission error:", err);
        setError(err.message || "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl text-left max-w-3xl mx-auto">
      <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
        Free Counselling Form
      </span>

      {formSubmitted ? (
        <div className="text-center py-10 space-y-3 bg-white border border-blue-100/50 rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 text-lg">Thank You!</h4>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            Your request has been successfully recorded. A downtown advisor will contact you within 24 working hours.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFormSubmitted(false)}
            className="mt-3 rounded-xl"
          >
            Send Another Request
          </Button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-750 rounded-xl px-4 py-3 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Spam Honeypot Field (invisible to users, filled by bots) */}
          <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden -z-50">
            <input
              type="text"
              name="website"
              placeholder="Leave this empty"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Enter your name" 
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                required
                disabled={isPending}
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                required
                disabled={isPending}
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="Enter your contact number" 
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                required
                disabled={isPending}
              />
            </div>

            {/* Target Destination */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Target Destination</label>
              <select 
                name="destination"
                className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary"
                required
                disabled={isPending}
              >
                <option value="">Select Target Country...</option>
                <option value="Australia">Australia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Europe">Europe</option>
              </select>
            </div>
          </div>

          {/* Simple message field for lead form so it inserts cleanly */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Special Message / Note</label>
            <textarea
              name="message"
              rows={3}
              placeholder="Optional notes or questions..."
              className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
              disabled={isPending}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent/90 text-white text-base font-bold py-4 px-10 rounded-xl shadow-lg shadow-brand-accent/20 transition-all flex items-center gap-2 justify-center"
            >
              {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
              {isPending ? "Requesting Call..." : "Request Call Back"}
            </Button>
            <span className="block text-[11px] text-slate-400 mt-3 text-center">
              * By clicking submit, you agree to our privacy policy guidelines. No spam, guaranteed.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
