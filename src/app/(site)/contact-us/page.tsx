import React, { Suspense } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Loader2
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { mockBranches } from "@/lib/types/mock-data";
import { ContactFormClient } from "@/components/site/contact-form-client";

export const metadata = {
  title: "Contact Us | Downtown Consultancy",
  description: "Get in touch with Downtown Consultancy's offices. Fill in our online enquiry form, find local hotline numbers, and view directions to our Kathmandu branches.",
  openGraph: {
    title: "Contact Us | Downtown Consultancy",
    description: "Get in touch with Downtown Consultancy's offices. Fill in our online enquiry form, find local hotline numbers, and view directions to our branches.",
    images: [{ url: "/downtown.jpg" }],
  }
};

export default function ContactUsPage() {
  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="relative bg-brand-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl z-0" />
        <div className="absolute left-1/10 bottom-1/10 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl z-0" />

        <Container className="relative z-20 text-center max-w-3xl space-y-4">
          <span className="text-brand-accent font-extrabold text-sm uppercase tracking-widest block">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact Our Offices
          </h1>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Have questions about study abroad options or test prep classes? Send us a message or call one of our branches directly.
          </p>
        </Container>
      </section>

      {/* 2. FORM & DIRECT CHANNELS */}
      <Section bg="default">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Suspense Wrapped Form Client */}
            <Suspense fallback={
              <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-8 rounded-3xl shadow-sm text-center py-20">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-primary mb-3" />
                <span className="text-slate-400 text-xs font-semibold">Loading intake form...</span>
              </div>
            }>
              <ContactFormClient />
            </Suspense>

            {/* Direct Channels */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-4">
                <span className="text-brand-accent text-xs font-extrabold uppercase tracking-widest block">Direct Support</span>
                <h3 className="text-2xl font-bold text-slate-900">Reach Us Instantly</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Call or email our central support desk during office hours (Sunday to Friday, 9:00 AM - 5:00 PM).
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase">Phone Hotline</span>
                    <a href="tel:+977014412345" className="font-bold text-slate-800 hover:text-brand-primary transition-colors text-sm">+977-1-4412345</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-brand-accent flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase">General Email</span>
                    <a href="mailto:info@downtown.edu.np" className="font-bold text-slate-800 hover:text-brand-primary transition-colors text-sm">info@downtown.edu.np</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. BRANCH MAPS */}
      <Section bg="muted" className="border-t border-slate-100">
        <Container>
          <SectionHeading 
            badge="Locations Locator"
            title="Our Branches Details"
            description="Directions and details for our branch offices."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mockBranches.map((branch) => (
              <div 
                key={branch.id}
                className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 text-base">{branch.name}</h4>
                  <ul className="space-y-2 text-xs text-slate-500">
                    <li className="flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{branch.phone}</span>
                    </li>
                  </ul>
                </div>
                
                {/* Embedded map */}
                <div className="h-56 mt-6 rounded-xl overflow-hidden border border-slate-100">
                  <iframe
                    src={branch.mapIframe}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Google Map pointing to ${branch.name}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
