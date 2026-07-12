"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  GraduationCap, 
  ChevronDown,
  Sparkles,
  Building
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";



// Custom Social SVGs
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.17a8.16 8.16 0 0 0 4.76 1.51v-3.45c-.86 0-1.69-.2-2.43-.54h-.01l.01-.01H19.6l-.01.01z" />
    </svg>
  );
}

const studyAbroadDestinations = [
  { name: "Study in Australia", href: "/study-abroad/australia" },
  { name: "Study in USA", href: "/study-abroad/usa" },
  { name: "Study in UK", href: "/study-abroad/uk" },
  { name: "Study in Canada", href: "/study-abroad/canada" },
  { name: "Study in New Zealand", href: "/study-abroad/new-zealand" },
  { name: "Study in Europe", href: "/study-abroad/europe" },
];

const testPreparations = [
  { name: "IELTS", href: "/test-preparation/ielts" },
  { name: "TOEFL", href: "/test-preparation/toefl" },
  { name: "PTE Academic", href: "/test-preparation/pte" },
  { name: "SAT", href: "/test-preparation/sat" },
  { name: "GRE / GMAT", href: "/test-preparation/gre-gmat" },
];

const serviceItems = [
  { name: "Career Counselling", href: "/services#career-counselling" },
  { name: "Visa Guidance & Documentation", href: "/services#visa-guidance" },
  { name: "University Application Assistance", href: "/services#uni-application" },
  { name: "Scholarship & Financial Aid Support", href: "/services#scholarships" },
];

const aboutUsItems = [
  { name: "Our Profile & Mission", href: "/about-us" },
  { name: "Meet the Team", href: "/about-us#team" },
  { name: "Testimonials", href: "/reviews" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAnnounce, setShowAnnounce] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<{ facebook?: string; instagram?: string; tiktok?: string }>({});
  const pathname = usePathname();

  useEffect(() => {
    async function fetchSocials() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "social_links")
          .single();
        if (data?.value) setSocialLinks(data.value as any);
      } catch {}
    }
    fetchSocials();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-brand-accent/20 selection:text-brand-primary">
      {/* Google Analytics 4 (Conditional) */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Announcement Bar */}
      {showAnnounce && (
        <div className="bg-brand-primary text-white py-2 px-4 relative z-50 text-center text-xs sm:text-sm font-medium border-b border-blue-900/30 flex items-center justify-center">
          <div className="flex items-center gap-2 max-w-4xl mx-auto px-6">
            <Sparkles className="w-4 h-4 text-brand-accent animate-pulse flex-shrink-0" />
            <span>
              Bookings open for Fall 2026 Admissions. Register for our upcoming Mega Education Fair this Sunday!
            </span>
            <Link 
              href="/fair" 
              className="underline text-brand-accent hover:text-white transition-colors font-semibold inline-flex items-center gap-0.5 ml-1"
            >
              Register Now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <button 
            onClick={() => setShowAnnounce(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-white/10 p-1 rounded-full transition-colors"
            aria-label="Dismiss Announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Mega-Menu */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image 
              src="/downtown.jpg" 
              alt="Downtown Consultancy" 
              width={40} 
              height={40} 
              className="w-10 h-10 object-contain rounded-xl shadow-md border border-slate-100 transition-transform group-hover:scale-105" 
              priority
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-brand-primary leading-tight">
                DOWNTOWN
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent leading-none">
                Educational Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Mega-Menu Nav */}
          <nav className="hidden xl:flex items-center gap-1.5 text-[15px] font-semibold text-slate-700">
            {/* Study Abroad Mega Dropdown */}
            <div className="relative group/menu py-6">
              <button className="px-3.5 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors flex items-center gap-1">
                Study Abroad
                <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-hover/menu:rotate-180" />
              </button>
              <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-3 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 scale-95 group-hover/menu:scale-100 origin-top z-50">
                <span className="block text-xs font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">Top Destinations</span>
                <div className="space-y-0.5 mt-1">
                  {studyAbroadDestinations.map((dest) => (
                    <Link 
                      key={dest.name} 
                      href={dest.href}
                      className="block px-3 py-2 rounded-lg text-slate-700 hover:text-brand-primary hover:bg-blue-50/50 transition-colors"
                    >
                      {dest.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Test Prep Mega Dropdown */}
            <div className="relative group/menu py-6">
              <button className="px-3.5 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors flex items-center gap-1">
                Test Preparation
                <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-hover/menu:rotate-180" />
              </button>
              <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-3 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 scale-95 group-hover/menu:scale-100 origin-top z-50">
                <span className="block text-xs font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">Test Prep Classes</span>
                <div className="space-y-0.5 mt-1">
                  {testPreparations.map((prep) => (
                    <Link 
                      key={prep.name} 
                      href={prep.href}
                      className="block px-3 py-2 rounded-lg text-slate-700 hover:text-brand-primary hover:bg-blue-50/50 transition-colors"
                    >
                      {prep.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Universities */}
            <Link 
              href="/universities" 
              className="px-3.5 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors"
            >
              Universities
            </Link>

            {/* Services Dropdown */}
            <div className="relative group/menu py-6">
              <button className="px-3.5 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors flex items-center gap-1">
                Services
                <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-hover/menu:rotate-180" />
              </button>
              <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-3 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 scale-95 group-hover/menu:scale-100 origin-top z-50">
                <span className="block text-xs font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">Our Services</span>
                <div className="space-y-0.5 mt-1">
                  {serviceItems.map((srv) => (
                    <Link 
                      key={srv.name} 
                      href={srv.href}
                      className="block px-3 py-2 rounded-lg text-slate-700 hover:text-brand-primary hover:bg-blue-50/50 transition-colors leading-snug"
                    >
                      {srv.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog */}
            <Link 
              href="/blog" 
              className="px-3.5 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors"
            >
              Blog
            </Link>

            {/* About Us Dropdown */}
            <div className="relative group/menu py-6">
              <button className="px-3.5 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors flex items-center gap-1">
                About Us
                <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-hover/menu:rotate-180" />
              </button>
              <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-3 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 scale-95 group-hover/menu:scale-100 origin-top z-50">
                <span className="block text-xs font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">Company</span>
                <div className="space-y-0.5 mt-1">
                  {aboutUsItems.map((ab) => (
                    <Link 
                      key={ab.name} 
                      href={ab.href}
                      className="block px-3 py-2 rounded-lg text-slate-700 hover:text-brand-primary hover:bg-blue-50/50 transition-colors"
                    >
                      {ab.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <Link 
              href="/contact-us" 
              className="px-3.5 py-1.5 rounded-lg hover:text-brand-primary hover:bg-slate-50 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden xl:flex items-center gap-4">
            <Link href="/studio">
              <Button variant="ghost" className="text-slate-600 hover:text-brand-primary hover:bg-slate-50 font-semibold">
                Studio Login
              </Button>
            </Link>
            <Link href="/contact-us?counselling=free">
              <Button className="bg-brand-accent hover:bg-brand-accent/90 text-white font-bold px-5 shadow-md shadow-brand-accent/20 rounded-xl transition-all duration-200 hover:translate-y-[-1px]">
                Book Free Counselling
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger menu */}
          <div className="xl:hidden flex items-center gap-3">
            <Link href="/studio">
              <Button size="sm" variant="ghost" className="text-slate-600 hover:text-brand-primary">
                Login
              </Button>
            </Link>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger render={
                <Button variant="outline" size="icon" className="border-slate-200 rounded-lg hover:bg-slate-50 text-slate-800">
                  <Menu className="w-6 h-6" />
                </Button>
              } />
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 z-50 bg-white">
                <div className="h-full flex flex-col justify-between overflow-y-auto">
                  <div className="p-6">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-7 h-7 text-brand-accent" />
                        <span className="font-bold text-lg text-brand-primary tracking-tight">
                          Downtown
                        </span>
                      </div>
                      <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="hover:bg-slate-100 p-1.5 rounded-lg text-slate-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Accordion Nav */}
                    <Accordion className="w-full text-slate-700">
                      {/* Study Abroad Accordion */}
                      <AccordionItem value="study-abroad" className="border-b border-slate-100">
                        <AccordionTrigger className="font-semibold text-base py-3 hover:text-brand-primary hover:no-underline">
                          Study Abroad
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 pl-4 space-y-2.5 text-sm">
                          {studyAbroadDestinations.map((dest) => (
                            <Link 
                              key={dest.name} 
                              href={dest.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-brand-primary text-slate-600"
                            >
                              {dest.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Test Prep Accordion */}
                      <AccordionItem value="test-prep" className="border-b border-slate-100">
                        <AccordionTrigger className="font-semibold text-base py-3 hover:text-brand-primary hover:no-underline">
                          Test Preparation
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 pl-4 space-y-2.5 text-sm">
                          {testPreparations.map((prep) => (
                            <Link 
                              key={prep.name} 
                              href={prep.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-brand-primary text-slate-600"
                            >
                              {prep.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Universities */}
                      <div className="border-b border-slate-100">
                        <Link 
                          href="/universities" 
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 font-semibold text-base hover:text-brand-primary text-slate-900"
                        >
                          Universities
                        </Link>
                      </div>

                      {/* Services Accordion */}
                      <AccordionItem value="services" className="border-b border-slate-100">
                        <AccordionTrigger className="font-semibold text-base py-3 hover:text-brand-primary hover:no-underline">
                          Services
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 pl-4 space-y-2.5 text-sm">
                          {serviceItems.map((srv) => (
                            <Link 
                              key={srv.name} 
                              href={srv.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-brand-primary text-slate-600"
                            >
                              {srv.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Blog */}
                      <div className="border-b border-slate-100">
                        <Link 
                          href="/blog" 
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 font-semibold text-base hover:text-brand-primary text-slate-900"
                        >
                          Blog
                        </Link>
                      </div>

                      {/* About Us Accordion */}
                      <AccordionItem value="about" className="border-b border-slate-100">
                        <AccordionTrigger className="font-semibold text-base py-3 hover:text-brand-primary hover:no-underline">
                          About Us
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 pl-4 space-y-2.5 text-sm">
                          {aboutUsItems.map((ab) => (
                            <Link 
                              key={ab.name} 
                              href={ab.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 hover:text-brand-primary text-slate-600"
                            >
                              {ab.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Contact */}
                      <div>
                        <Link 
                          href="/contact-us" 
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 font-semibold text-base hover:text-brand-primary text-slate-900"
                        >
                          Contact
                        </Link>
                      </div>
                    </Accordion>
                  </div>

                  {/* Drawer Footer CTA */}
                  <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
                    <Link href="/contact-us?counselling=free" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold rounded-xl py-6 shadow-md shadow-brand-accent/10">
                        Book Free Counselling
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {/* Column 1: About */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-brand-accent" />
                <span className="font-extrabold text-lg tracking-tight text-white">
                  Downtown
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Empowering students to achieve their global educational dreams. Since our inception, we have guided thousands of learners to premier destinations with absolute integrity and transparency.
              </p>
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-primary hover:text-white p-2 rounded-lg transition-colors text-slate-400">
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-primary hover:text-white p-2 rounded-lg transition-colors text-slate-400">
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {socialLinks.tiktok && (
                  <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-primary hover:text-white p-2 rounded-lg transition-colors text-slate-400">
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/universities" className="hover:text-brand-accent transition-colors">Partner Universities</Link></li>
                <li><Link href="/blog" className="hover:text-brand-accent transition-colors">Success Blogs & Articles</Link></li>
                <li><Link href="/about-us" className="hover:text-brand-accent transition-colors">About Our Agency</Link></li>
                <li><Link href="/about-us#team" className="hover:text-brand-accent transition-colors">Our Advisory Board</Link></li>
                <li><Link href="/contact-us" className="hover:text-brand-accent transition-colors">Contact Us</Link></li>
                <li><Link href="/careers" className="hover:text-brand-accent transition-colors">Careers & Job Openings</Link></li>
              </ul>
            </div>

            {/* Column 3: Destinations */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Destinations</h4>
              <ul className="space-y-2.5 text-sm">
                {studyAbroadDestinations.map((dest) => (
                  <li key={dest.name}>
                    <Link href={dest.href} className="hover:text-brand-accent transition-colors">
                      {dest.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Head Office Contact */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Head Office</h4>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">
                    Dillibazar-30, Kathmandu 44600
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase leading-none">Mobile</span>
                    <a href="tel:+9779841307624" className="hover:text-brand-accent transition-colors text-slate-300">+977-9841307624</a>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase leading-none">Telephone</span>
                    <a href="tel:014500099" className="hover:text-brand-accent transition-colors text-slate-300">01-4500099</a>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase leading-none">Email</span>
                    <a href="mailto:info@downtown.edu.np" className="hover:text-brand-accent transition-colors text-slate-300">info@downtown.edu.np</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright bar */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Downtown Consultancy. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-slate-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3.5">
        {/* WhatsApp Icon Link */}
        <a 
          href="https://wa.me/9779841307624" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Contact on WhatsApp"
        >
          <Image 
            src="/whatsapp.png" 
            alt="WhatsApp" 
            width={48} 
            height={48} 
            className="w-12 h-12 object-contain rounded-xl shadow-md hover:shadow-lg"
          />
        </a>

        {/* Floating "Get Free Counselling" pill button */}
        <Link href="/contact-us?counselling=free">
          <button className="bg-brand-accent hover:bg-brand-accent/90 text-white font-extrabold text-sm px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-1px] flex items-center gap-2 active:scale-95">
            <GraduationCap className="w-5 h-5" />
            <span>Get Free Counselling</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
