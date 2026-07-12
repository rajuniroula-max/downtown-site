import React, { Suspense } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Loader2,
  Building
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { ContactFormClient } from "@/components/site/contact-form-client";
import { getBranches, getContactInfo } from "@/lib/supabase/queries";

export const metadata = {
  title: "Contact Us | Downtown Consultancy",
  description: "Get in touch with Downtown Consultancy's head office. Fill in our online enquiry form, find local hotline numbers, and view directions to our Kathmandu branches.",
  openGraph: {
    title: "Contact Us | Downtown Consultancy",
    description: "Get in touch with Downtown Consultancy's head office. Fill in our online enquiry form, find local hotline numbers, and view directions to our branches.",
    images: [{ url: "/downtown.jpg" }],
  }
};

export default async function ContactUsPage() {
  const branchesData = await getBranches();
  const contactInfo = await getContactInfo();

  const branches = branchesData.length > 0 ? branchesData : [{
    id: "head-office",
    name: "Downtown Educational Consultancy — Head Office",
    address: contactInfo?.address || "Dillibazar-30, Kathmandu 44600",
    phone: contactInfo?.mobile || contactInfo?.hotline || "+977-9841307624",
    telephone: contactInfo?.telephone || "014500099",
    email: contactInfo?.email || "info@downtown.edu.np",
    mapIframe: contactInfo?.map_iframe || "https://maps.google.com/maps?q=27.7054777,85.3258023&z=17&output=embed"
  }];

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
            Contact Our Head Office
          </h1>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Have questions about study abroad options or test prep classes? Send us a message or call our office directly.
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
                    <a href="tel:+9779841307624" className="font-bold text-slate-800 hover:text-brand-primary transition-colors text-sm">+977-9841307624</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase">Landline Telephone</span>
                    <a href="tel:014500099" className="font-bold text-slate-800 hover:text-brand-primary transition-colors text-sm">01-4500099</a>
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
      {branches.length > 0 && (
        <Section bg="muted" className="border-t border-slate-100">
          <Container>
            <SectionHeading 
              badge="Office Location"
              title="Our Head Office Address"
              description="Directions and details to visit us physically."
            />

            <div className="max-w-5xl mx-auto">
              {branches.map((branch) => (
                <div 
                  key={branch.id}
                  className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm grid md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-5 space-y-4 text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-brand-primary border border-blue-100">
                      Head Office
                    </span>
                    <h4 className="font-bold text-slate-900 text-lg">{branch.name}</h4>
                    <ul className="space-y-3.5 text-sm text-slate-500">
                      <li className="flex items-start gap-2.5">
                        <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                        <span>{branch.address}</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-brand-accent flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase leading-none">Mobile</span>
                          <a href={`tel:${branch.phone}`} className="hover:text-brand-accent transition-colors font-semibold text-slate-700">{branch.phone}</a>
                        </div>
                      </li>
                      {branch.telephone && (
                        <li className="flex items-center gap-2.5">
                          <Building className="w-4 h-4 text-brand-accent flex-shrink-0" />
                          <div>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase leading-none">Telephone</span>
                            <a href={`tel:${branch.telephone}`} className="hover:text-brand-accent transition-colors font-semibold text-slate-700">{branch.telephone}</a>
                          </div>
                        </li>
                      )}
                      <li className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-brand-accent flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase leading-none">Email</span>
                          <a href={`mailto:${branch.email}`} className="hover:text-brand-accent transition-colors font-semibold text-slate-700">{branch.email}</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Embedded map */}
                  <div className="md:col-span-7 h-72 rounded-2xl overflow-hidden border border-slate-150 relative">
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
      )}
    </div>
  );
}
