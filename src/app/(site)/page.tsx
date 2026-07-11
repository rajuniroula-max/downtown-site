import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Globe, 
  ShieldCheck, 
  Award, 
  Star, 
  ChevronRight,
  BookOpen,
  FileText,
  HeartHandshake
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";

// Destructured country data
const popularDestinations = [
  {
    country: "Australia",
    description: "World-class education, post-study work rights, and vibrant student cities like Sydney & Melbourne.",
    icon: "🦘",
    badge: "Most Popular",
    link: "/destinations/australia"
  },
  {
    country: "United States (USA)",
    description: "Home to Ivy Leagues and global tech hubs. Unmatched research opportunities and academic flexibility.",
    icon: "🇺🇸",
    badge: "Ivy League Hub",
    link: "/destinations/usa"
  },
  {
    country: "United Kingdom (UK)",
    description: "Accelerated degree programs (1-year Masters), historic universities, and rich cultural heritage.",
    icon: "🇬🇧",
    badge: "Fast-Track Degrees",
    link: "/destinations/uk"
  },
  {
    country: "Canada",
    description: "High quality of life, affordable tuition fees, and straightforward pathways to permanent residency.",
    icon: "🇨🇦",
    badge: "PR Pathways",
    link: "/destinations/canada"
  },
  {
    country: "New Zealand",
    description: "Stunning landscapes, safe learning environments, and highly practical, industry-focused qualifications.",
    icon: "🇳🇿",
    badge: "Safe & Serene",
    link: "/destinations/new-zealand"
  }
];

// Destructured test preparation data
const testPrepClasses = [
  { name: "IELTS", desc: "International English Language Testing System. Regular feedback & mock tests.", duration: "6 Weeks" },
  { name: "PTE Academic", desc: "Pearson Test of English. Computer-based testing with AI scoring prep.", duration: "5 Weeks" },
  { name: "TOEFL", desc: "Test of English as a Foreign Language. Computer-lab practice simulations.", duration: "6 Weeks" },
  { name: "SAT", desc: "Scholastic Assessment Test for undergraduate admissions in USA.", duration: "8 Weeks" },
];

export default function Home() {
  return (
    <div className="bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50/30 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Soft background elements */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />

        <Container className="relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-100 bg-blue-50/80 text-brand-primary text-xs sm:text-sm font-semibold backdrop-blur-sm">
                <SparklesIcon className="w-4 h-4 text-brand-accent animate-pulse" />
                <span>Your Trustworthy Study Abroad Companion</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
                Empowering Your Journey to <span className="text-brand-primary">Global Education</span>
              </h1>
              
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-xl">
                Get end-to-end guidance from Nepal&apos;s leading education consultants. From course selection to visa approvals, we walk with you at every step.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link href="/contact?counselling=free">
                  <Button className="bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-bold py-6 px-8 rounded-xl shadow-lg shadow-brand-accent/20 transition-all duration-200 hover:translate-y-[-1px] flex items-center justify-center gap-2">
                    Book Free Consultation <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#destinations">
                  <Button variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-700 text-base font-bold py-6 px-8 rounded-xl flex items-center justify-center gap-2">
                    Explore Destinations
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 max-w-md">
                <div>
                  <span className="block text-3xl font-extrabold text-brand-primary">12+</span>
                  <span className="block text-xs text-slate-500 font-medium uppercase mt-0.5">Years Experience</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-brand-primary">98%</span>
                  <span className="block text-xs text-slate-500 font-medium uppercase mt-0.5">Visa Success</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-brand-primary">5000+</span>
                  <span className="block text-xs text-slate-500 font-medium uppercase mt-0.5">Guided Students</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Column */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl border border-slate-100 bg-white/70 p-3 shadow-xl backdrop-blur-sm">
                <div className="rounded-2xl bg-brand-primary text-white p-8 relative overflow-hidden flex flex-col justify-between h-[420px]">
                  {/* Decorative card glow */}
                  <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-brand-accent/20 blur-3xl" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-accent">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <span className="block text-xs font-bold text-brand-accent uppercase tracking-wider">Top Achievement</span>
                    <h3 className="text-2xl font-bold tracking-tight">Guiding Your Ambitions to the Best Global Universities</h3>
                    <p className="text-blue-100/80 text-sm leading-relaxed">
                      We offer free, personalized advising, test-prep courses under certified trainers, and thorough visa interview coaching sessions.
                    </p>
                  </div>

                  {/* Highlights Floating Box */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center justify-between text-xs relative z-10">
                    <div className="space-y-1">
                      <span className="block text-slate-300 font-semibold uppercase tracking-wider text-[10px]">Upcoming Fair</span>
                      <span className="font-bold text-sm">Kathmandu Mega Fair</span>
                    </div>
                    <Link href="/fair" className="bg-brand-accent hover:bg-brand-accent-hover text-white px-3.5 py-2 rounded-lg font-bold flex items-center gap-1 transition-colors">
                      Join <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Destinations Section */}
      <Section id="destinations" bg="default" className="border-t border-slate-100">
        <Container>
          <SectionHeading 
            badge="Study Destinations"
            title="Choose Your Dream Country"
            description="We support admissions and visas across all top English-speaking academic destinations in the world."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((dest, i) => (
              <div 
                key={dest.country}
                className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">{dest.icon}</div>
                    <span className="text-[10px] font-bold text-brand-primary bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {dest.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                      {dest.country}
                    </h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center text-sm font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">
                  <span>Explore Course Options</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section bg="muted" className="border-t border-b border-slate-100">
        <Container>
          <SectionHeading 
            badge="Our Services"
            title="Comprehensive Support Structure"
            description="Our service framework is tailored to ensure you experience a hassle-free transition from your local classes to the overseas campus."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 text-brand-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Academic Selection & Planning</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We assist you in selecting compatible universities and courses that fit your career aspirations, academic background, and budget requirements.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-6 text-brand-accent">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Visa Counselling & Assistance</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Thorough guidance on financial documentation, SOP drafting reviews, and simulated mock interviews to prepare you fully for your visa submission.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 text-brand-primary">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Scholarship Guidance</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Identify and apply for institutional scholarships, bursaries, and merit-based grants to minimize your study costs effectively.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Test Prep Section */}
      <Section bg="default" className="border-b border-slate-100">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Test Prep Left */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-brand-primary border border-blue-100">
                Score Booster Classes
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Prepare with Certified & Experienced Instructors
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Score high in your proficiency tests. We offer intensive test prep classes in high-tech computer labs, accompanied by daily mock tests, official materials, and individual advice.
              </p>
              
              <ul className="space-y-3.5 text-slate-600">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <span>Free diagnostic mock test before starting</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <span>Flexible schedules (morning, day, and evening batches)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <span>Interactive lab access and feedback sessions</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link href="/contact?counselling=class">
                  <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold px-6 py-5 rounded-xl flex items-center gap-2">
                    Book a Free Trial Class <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Test Prep Right Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {testPrepClasses.map((item) => (
                <div 
                  key={item.name}
                  className="bg-slate-50 rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xl text-brand-primary">{item.name}</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded uppercase">
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs text-brand-primary font-bold hover:text-brand-accent transition-colors cursor-pointer">
                    <span>Enrol Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section bg="brand-dark">
        <Container>
          <SectionHeading 
            badge="Downtown Advantages"
            title="Why We Stand Out"
            description="Our primary objectives are built on complete transparency, high credentials, and focused mentorship."
            theme="dark"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Advantage 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">QEAC Certified Advisors</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed">
                Advisors who are internationally qualified ensuring reliable, professional educational planning services.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">Direct University Partners</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed">
                Direct partnerships with hundreds of colleges and universities worldwide for faster admissions and processing.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">High Visa Success Rate</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed">
                Proven application review methodologies resulting in a consistent 98% study visa success record.
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">No Hidden Charges</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed">
                Honest and transparent information. Complete breakdown of tuition fees, insurance, and embassy costs upfront.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section bg="muted" className="border-t border-slate-100">
        <Container>
          <SectionHeading 
            badge="Testimonials"
            title="Success Stories From Our Alumni"
            description="Hear directly from our students studying their dream courses at premium global campuses."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-1 text-brand-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                &ldquo;Downtown Consultancy guided me so well throughout my visa application for Australia. Their visa guidance class helped me gain confidence for my GTE review. Highly recommended if you want transparent and honest processing.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-primary font-bold text-sm">
                  SS
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Sajina Shrestha</h4>
                  <span className="block text-slate-400 text-xs">University of Technology Sydney (UTS), Australia</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-1 text-brand-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                &ldquo;Their SAT classes were outstanding. The instructors provided personal attention and focused strategy logs which helped me score 1480. My USA study visa got approved in the first attempt thanks to their interview prep sessions.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-primary font-bold text-sm">
                  RB
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Rohan Basnet</h4>
                  <span className="block text-slate-400 text-xs">University of Texas at Arlington, USA</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA Banner */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-100 relative">
        <Container className="text-center space-y-6 max-w-4xl">
          <GraduationCap className="w-14 h-14 text-brand-accent mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Ready to Take Your Education to the Global Stage?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Book your slot with our expert advisors today for a completely free, one-on-one virtual or physical career planning session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/contact?counselling=free">
              <Button className="bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-bold py-6 px-8 rounded-xl shadow-lg shadow-brand-accent/20 flex items-center gap-2">
                Schedule My Free Appointment <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="https://wa.me/9779841307624" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-base font-bold py-6 px-8 rounded-xl flex items-center gap-2">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
