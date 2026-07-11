"use client";

import React, { useState } from "react";
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
  Sparkles
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Custom WhatsApp Floating Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.453 5.418 1.454 5.561 0 10.085-4.526 10.088-10.09.002-2.697-1.045-5.234-2.949-7.14C17.299 1.47 14.773.423 12.01.423 6.446.423 1.924 4.949 1.921 10.516c-.001 1.922.502 3.8 1.457 5.404L2.34 20.354l4.307-1.2zm11.196-7.652c-.3-.15-1.77-.874-2.046-.973-.275-.1-.475-.15-.675.15-.2.3-.775.973-.95 1.173-.175.2-.35.225-.65.075-1.205-.6-2.03-1.054-2.825-2.42-.2-.35-.02-.538.156-.713.16-.16.35-.4.525-.6.175-.2.25-.35.375-.6.125-.25.062-.475-.031-.675-.094-.2-1.046-2.52-1.433-3.454-.378-.908-.763-.785-.95-.795-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.116 4.525.715.31 1.273.495 1.71.635.717.228 1.37.196 1.885.118.574-.087 1.77-.724 2.02-1.417.25-.693.25-1.287.175-1.417-.075-.13-.275-.205-.575-.355z" />
    </svg>
  );
}

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

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
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
  { name: "Contact Branches", href: "/contact-us" },
];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAnnounce, setShowAnnounce] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-primary hover:text-white p-2 rounded-lg transition-colors text-slate-400">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-primary hover:text-white p-2 rounded-lg transition-colors text-slate-400">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-primary hover:text-white p-2 rounded-lg transition-colors text-slate-400">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-brand-primary hover:text-white p-2 rounded-lg transition-colors text-slate-400">
                  <TwitterIcon className="w-4 h-4" />
                </a>
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
                <li><Link href="/contact-us" className="hover:text-brand-accent transition-colors">Contact Offices</Link></li>
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

            {/* Column 4: Contact/Branches */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Contact & Branches</h4>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">
                    <strong className="text-slate-200">Head Office:</strong> Putalisadak, Kathmandu (Opp. Kumari Bank)
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">
                    <strong className="text-slate-200">Pokhara Office:</strong> Chipledhunga, Pokhara
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <a href="tel:+977014412345" className="hover:text-brand-accent transition-colors">+977-1-4412345</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-accent flex-shrink-0" />
                  <a href="mailto:info@downtown.edu.np" className="hover:text-brand-accent transition-colors">info@downtown.edu.np</a>
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
          className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group active:scale-95"
          aria-label="Contact on WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6" />
        </a>

        {/* Floating "Get Free Counselling" pill button */}
        <Link href="/contact?counselling=free">
          <button className="bg-brand-accent hover:bg-brand-accent/90 text-white font-extrabold text-sm px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-1px] flex items-center gap-2 active:scale-95">
            <GraduationCap className="w-5 h-5" />
            <span>Get Free Counselling</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
