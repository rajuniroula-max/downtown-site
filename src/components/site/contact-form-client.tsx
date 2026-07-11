"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitInquiry } from "@/app/actions/inquiry";

export function ContactFormClient() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Controlled fields (prefilled from URL query params)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formLoadTime, setFormLoadTime] = useState<number>(0);

  useEffect(() => {
    setFormLoadTime(Date.now());
    setName(searchParams.get("name") || "");
    setEmail(searchParams.get("email") || "");
    setPhone(searchParams.get("phone") || "");
    const dest = searchParams.get("destination");
    if (dest) {
      setSubject("abroad");
      setMessage(`Interested in studying in ${dest.toUpperCase()}.`);
    }
  }, [searchParams]);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("formLoadTime", String(formLoadTime));
    formData.set("sourcePage", "Contact Us Page");

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
    <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm">
      <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
        Enquiry Intake Form
      </span>

      {formSubmitted ? (
        <div className="text-center py-10 space-y-3 bg-white border border-blue-100/50 rounded-2xl p-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 text-lg">Thank You!</h4>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            Your request has been recorded. Our counselling director will get back to you within 24 working hours.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setFormSubmitted(false);
              setName("");
              setEmail("");
              setPhone("");
              setSubject("");
              setMessage("");
            }}
            className="mt-3 rounded-xl"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form className="space-y-5 text-left" onSubmit={handleFormSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Spam Honeypot Field */}
          <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden -z-50">
            <input
              type="text"
              name="website"
              placeholder="Leave this empty"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name" 
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                required
                disabled={isPending}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                required
                disabled={isPending}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number" 
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                required
                disabled={isPending}
              />
            </div>

            {/* Subject / Target */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Subject of Enquiry</label>
              <select 
                name="destination"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                required
                disabled={isPending}
              >
                <option value="">Choose topic...</option>
                <option value="abroad">Study Abroad Counselling</option>
                <option value="ielts">IELTS Prep Class</option>
                <option value="pte">PTE Prep Class</option>
                <option value="visa">Visa Documentation Review</option>
                <option value="other">General Query</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Your Message</label>
            <textarea 
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Write your query in detail..." 
              className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
              required
              disabled={isPending}
            />
          </div>

          <Button 
            type="submit"
            disabled={isPending}
            className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </form>
      )}
    </div>
  );
}
