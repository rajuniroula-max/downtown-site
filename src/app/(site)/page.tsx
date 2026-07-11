"use client";

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
  HeartHandshake,
  Plane,
  Users,
  Compass,
  Search,
  Calendar,
  User
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { cn } from "@/lib/utils";

/* ==========================================================================
   MOCK DATASETS (TODO: Wire to Supabase in Stage 5)
   ========================================================================== */

// Study Destinations List
const studyDestinations = [
  {
    country: "Australia",
    universitiesCount: "42",
    description: "World-class education, post-study work rights, and vibrant student cities like Sydney & Melbourne.",
    icon: "🇦🇺",
    badge: "Most Popular",
    link: "/study-abroad/australia"
  },
  {
    country: "United Kingdom",
    universitiesCount: "130+",
    description: "Accelerated degree programs (1-year Masters), historic universities, and rich cultural heritage.",
    icon: "🇬🇧",
    badge: "Fast-Track Degrees",
    link: "/study-abroad/uk"
  },
  {
    country: "United States (USA)",
    universitiesCount: "4000+",
    description: "Home to Ivy Leagues and global tech hubs. Unmatched research opportunities and academic flexibility.",
    icon: "🇺🇸",
    badge: "Ivy League Hub",
    link: "/study-abroad/usa"
  },
  {
    country: "Canada",
    universitiesCount: "100+",
    description: "High quality of life, affordable tuition fees, and straightforward pathways to permanent residency.",
    icon: "🇨🇦",
    badge: "PR Pathways",
    link: "/study-abroad/canada"
  },
  {
    country: "New Zealand",
    universitiesCount: "8",
    description: "Stunning landscapes, safe learning environments, and highly practical, industry-focused qualifications.",
    icon: "🇳🇿",
    badge: "Safe & Serene",
    link: "/study-abroad/new-zealand"
  },
  {
    country: "Europe",
    universitiesCount: "500+",
    description: "Affordable tuition (often free in Germany), rich historical backgrounds, and Schengen zone accessibility.",
    icon: "🇪🇺",
    badge: "Budget-Friendly",
    link: "/study-abroad/europe"
  }
];

// Core Services List
const consultancyServices = [
  {
    title: "Test Preparation",
    desc: "Intensive preparation classes for IELTS, PTE Academic, TOEFL, and SAT with daily mock tests and expert mentoring.",
    icon: GraduationCap,
    bgColor: "bg-blue-50 text-brand-primary border-blue-100"
  },
  {
    title: "University Selection & Application",
    desc: "Personalized profiling to select the right universities, secure offer letters, and handle paperwork smoothly.",
    icon: BookOpen,
    bgColor: "bg-orange-50 text-brand-accent border-orange-100"
  },
  {
    title: "Visa Documentation & Counselling",
    desc: "Accurate file compilation, financial advice, SOP evaluation, and simulated mock interview sessions.",
    icon: FileText,
    bgColor: "bg-blue-50 text-brand-primary border-blue-100"
  },
  {
    title: "Scholarship & Financial Aid",
    desc: "Scouting university grants, merit scholarships, and state-funded bursaries to decrease overall study costs.",
    icon: Award,
    bgColor: "bg-orange-50 text-brand-accent border-orange-100"
  },
  {
    title: "Pre-departure Briefing",
    desc: "Critical sessions on academic culture, local laws, accommodation booking tips, and student banking setup.",
    icon: Plane,
    bgColor: "bg-blue-50 text-brand-primary border-blue-100"
  },
  {
    title: "Career & Stream Counselling",
    desc: "One-on-one psychological mapping to align your natural strengths with prospective global employment sectors.",
    icon: HeartHandshake,
    bgColor: "bg-orange-50 text-brand-accent border-orange-100"
  }
];

// Partner Universities List (Ticker)
const partnerUniversities = [
  { name: "Australian National University", country: "Australia" },
  { name: "University of Toronto", country: "Canada" },
  { name: "Arizona State University", country: "USA" },
  { name: "University of Leeds", country: "UK" },
  { name: "University of Auckland", country: "New Zealand" },
  { name: "Munich Business School", country: "Germany" },
  { name: "Macquarie University", country: "Australia" },
  { name: "York University", country: "Canada" },
  { name: "University of Manchester", country: "UK" },
  { name: "RMIT University", country: "Australia" },
];

// Student Testimonials List
const studentTestimonials = [
  {
    name: "Sajina Shrestha",
    destination: "University of Technology Sydney (UTS), Australia",
    initials: "SS",
    quote: "Downtown Consultancy guided me so well throughout my visa application for Australia. Their visa guidance class helped me gain confidence for my GTE review. Highly recommended if you want transparent and honest processing.",
    rating: 5
  },
  {
    name: "Rohan Basnet",
    destination: "University of Texas at Arlington, USA",
    initials: "RB",
    quote: "Their SAT classes were outstanding. The instructors provided personal attention and focused strategy logs which helped me score 1480. My USA study visa got approved in the first attempt thanks to their interview prep sessions.",
    rating: 5
  },
  {
    name: "Kiran Adhikari",
    destination: "University of Leeds, UK",
    initials: "KA",
    quote: "Applying for UK universities seemed complex until I came to Downtown. They finalized my application within a week and coached me thoroughly for the university interview. I got my visa without any delays.",
    rating: 5
  }
];

// Recent Blog Posts List
const recentBlogs = [
  {
    id: "1",
    title: "Essential Guide to Australia Student Visas for Fall 2026",
    excerpt: "Everything you need to know about the latest visa guidelines, financial requirements, and GTE criteria for Nepali students.",
    category: "Visa Guide",
    date: "Jul 10, 2026",
    author: "Prabin Shrestha",
    link: "/blog/australia-visa-guide"
  },
  {
    id: "2",
    title: "Understanding Scholarships at US Universities",
    excerpt: "Learn how to secure up to 100% tuition coverage. Discover critical deadlines, essay requirements, and CSS profiling guidelines.",
    category: "Scholarships",
    date: "Jul 05, 2026",
    author: "Soniya Thapa",
    link: "/blog/us-scholarships"
  },
  {
    id: "3",
    title: "Why Canada Remains a Top Study Choice in 2026",
    excerpt: "Analyzing post-graduation work permit updates, living costs, and student pathways to permanent residency across Canadian provinces.",
    category: "Study Abroad",
    date: "Jun 28, 2026",
    author: "Raju Niroula",
    link: "/blog/canada-pathways"
  }
];

export default function Home() {
  return (
    <div className="bg-slate-50/50">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50/30 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-slate-100">
        {/* Soft background glow circles */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />

        <Container className="relative">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-100 bg-blue-50/80 text-brand-primary text-xs sm:text-sm font-semibold backdrop-blur-sm mx-auto">
              <SparklesIcon className="w-4 h-4 text-brand-accent animate-pulse" />
              <span>Your Trusted Study Abroad Partner</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Unlock Your Potential with <span className="text-brand-primary">Global Education</span>
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Nepal&apos;s premier advisory consultancy guiding you to top academic destinations. Experience absolute transparency, credentialed counselors, and excellent visa success.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact?counselling=free">
                <Button className="bg-brand-accent hover:bg-brand-accent/90 text-white text-base font-bold py-6 px-8 rounded-xl shadow-lg shadow-brand-accent/20 transition-all duration-200 hover:translate-y-[-1px] flex items-center justify-center gap-2">
                  Book Free Counselling <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="#destinations">
                <Button variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-700 text-base font-bold py-6 px-8 rounded-xl flex items-center justify-center gap-2 bg-white">
                  Explore Destinations
                </Button>
              </Link>
            </div>

            {/* Quick-Search Bar */}
            <div className="mt-12 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xl max-w-4xl mx-auto text-left relative z-10">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3.5">
                Quick Academic Finder (TODO: Wire search logic in Stage 5)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Destination Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Select Destination</label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10">
                    <option value="">Choose Country...</option>
                    <option value="australia">Australia</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="new-zealand">New Zealand</option>
                    <option value="europe">Europe</option>
                  </select>
                </div>

                {/* Study Level Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Study Level</label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10">
                    <option value="">Choose Level...</option>
                    <option value="undergraduate">Undergraduate (Bachelors)</option>
                    <option value="postgraduate">Postgraduate (Masters)</option>
                    <option value="diploma">Vocational / Diploma</option>
                    <option value="phd">Research / PhD</option>
                  </select>
                </div>

                {/* Field of Study Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Field of Study</label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10">
                    <option value="">Choose Field...</option>
                    <option value="business">Business & Management</option>
                    <option value="it">Information Technology (IT)</option>
                    <option value="engineering">Engineering</option>
                    <option value="health">Health & Nursing</option>
                    <option value="hospitality">Hospitality & Tourism</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <Button className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all">
                    <Search className="w-4 h-4" />
                    <span>Find Courses</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. STUDY DESTINATIONS */}
      <Section id="destinations" bg="default">
        <Container>
          <SectionHeading 
            badge="Study Destinations"
            title="Choose Your Study Location"
            description="Explore our curated university connections and comprehensive student guides for all top international campuses."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studyDestinations.map((dest, i) => (
              <div 
                key={dest.country}
                className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl filter saturate-100">{dest.icon}</span>
                    <span className="text-[10px] font-bold text-brand-primary bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {dest.badge}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                        {dest.country}
                      </h3>
                      <span className="text-xs text-slate-400 font-semibold">({dest.universitiesCount} Universities)</span>
                    </div>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>
                </div>
                <Link href={dest.link}>
                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                    <span>Explore Universities</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. OUR SERVICES */}
      <Section bg="muted" className="border-t border-b border-slate-100">
        <Container>
          <SectionHeading 
            badge="Our Services"
            title="Supporting You in Every Stage"
            description="Our service framework is designed to deliver a smooth and transparent pathway from application to landing on campus."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultancyServices.map((service, i) => (
              <div 
                key={service.title}
                className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={cn("w-12 h-12 rounded-xl border flex items-center justify-center", service.bgColor)}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. PARTNER UNIVERSITIES TICKER */}
      <Section bg="default" className="py-12 md:py-16 overflow-hidden">
        <Container>
          <div className="text-center mb-8 max-w-xl mx-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Direct University Partners (TODO: Fetch dynamically in Stage 5)
            </span>
          </div>
          
          {/* Logo Marquee Wrapper */}
          <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent">
            <div className="flex gap-8 py-3 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] w-max">
              {/* Loop 1 */}
              {partnerUniversities.map((uni, idx) => (
                <div 
                  key={`uni-1-${idx}`}
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-bold text-sm select-none hover:border-blue-100 hover:bg-blue-50/20 transition-all cursor-default"
                >
                  <GraduationCap className="w-4 h-4 text-brand-primary" />
                  <span>{uni.name}</span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded uppercase">
                    {uni.country}
                  </span>
                </div>
              ))}
              {/* Loop 2 to cover loop gap */}
              {partnerUniversities.map((uni, idx) => (
                <div 
                  key={`uni-2-${idx}`}
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-bold text-sm select-none hover:border-blue-100 hover:bg-blue-50/20 transition-all cursor-default"
                >
                  <GraduationCap className="w-4 h-4 text-brand-primary" />
                  <span>{uni.name}</span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded uppercase">
                    {uni.country}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. WHY CHOOSE US (STATS BAR) */}
      <Section bg="brand-dark">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center text-white">
            <div className="space-y-2">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white">12+</span>
              <h4 className="text-blue-100 font-semibold text-sm sm:text-base uppercase tracking-wider">Years Experience</h4>
              <p className="text-blue-100/70 text-xs hidden sm:block max-w-[200px] mx-auto">Providing high-integrity advising services in Nepal.</p>
            </div>
            <div className="space-y-2">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white">5,000+</span>
              <h4 className="text-blue-100 font-semibold text-sm sm:text-base uppercase tracking-wider">Students Placed</h4>
              <p className="text-blue-100/70 text-xs hidden sm:block max-w-[200px] mx-auto">Enrolled in leading world universities and schools.</p>
            </div>
            <div className="space-y-2">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white">500+</span>
              <h4 className="text-blue-100 font-semibold text-sm sm:text-base uppercase tracking-wider">Partner Universities</h4>
              <p className="text-blue-100/70 text-xs hidden sm:block max-w-[200px] mx-auto">Direct admissions mappings worldwide.</p>
            </div>
            <div className="space-y-2">
              <span className="block text-4xl sm:text-5xl font-extrabold text-white">98%</span>
              <h4 className="text-blue-100 font-semibold text-sm sm:text-base uppercase tracking-wider">Visa Success Rate</h4>
              <p className="text-blue-100/70 text-xs hidden sm:block max-w-[200px] mx-auto">Based on transparent file compilation steps.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. TESTIMONIALS */}
      <Section bg="muted" className="border-t border-slate-100">
        <Container>
          <SectionHeading 
            badge="Testimonials"
            title="Hear From Our Success Stories"
            description="Our record is built on the accomplishments of thousands of students pursuing degrees abroad."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {studentTestimonials.map((testimonial, i) => (
              <div 
                key={testimonial.name}
                className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-1 text-brand-accent">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-primary font-extrabold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                    <span className="block text-slate-400 text-xs leading-none mt-1">{testimonial.destination}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. LATEST FROM OUR BLOG */}
      <Section bg="default" className="border-t border-b border-slate-100">
        <Container>
          <SectionHeading 
            badge="Latest Blogs"
            title="Insights & Student Updates"
            description="Stay updated with visa news, university policies, admission logs, and destination guides."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map((blog) => (
              <article 
                key={blog.id} 
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 flex flex-col h-full"
              >
                {/* Mock Image Placeholder */}
                <div className="h-48 bg-slate-100 relative flex items-center justify-center text-slate-400 font-semibold group-hover:bg-slate-200/70 transition-colors">
                  <BookOpen className="w-10 h-10 text-slate-300" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-brand-primary bg-white border border-blue-100 px-2 py-0.5 rounded-md uppercase">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/blog">
              <Button variant="outline" className="border-slate-200 hover:bg-slate-50 font-bold px-6">
                View All Blogs & Updates
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* 8. GET FREE COUNSELLING (CTA LEAD FORM) */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        {/* Soft decorative background circles */}
        <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[-10%] w-[30%] h-[30%] rounded-full bg-orange-50 blur-3xl pointer-events-none" />

        <Container className="relative max-w-4xl text-center space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <GraduationCap className="w-14 h-14 text-brand-accent mx-auto" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Begin Your Global Journey Today
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fill in the counselling request form below. One of our qualified country directors will call you back within 24 working hours for a free consultation.
            </p>
          </div>

          {/* Lead Intake Form */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl text-left max-w-3xl mx-auto">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              Free Counselling Form (TODO: Wire submit action in Stage 6)
            </span>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="Enter your contact number" 
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                    required
                  />
                </div>

                {/* Destination Interest */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase">Target Destination</label>
                  <select 
                    className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                    required
                  >
                    <option value="">Select Target Country...</option>
                    <option value="australia">Australia</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="new-zealand">New Zealand</option>
                    <option value="europe">Europe</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <Button className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent/90 text-white text-base font-bold py-4 px-10 rounded-xl shadow-lg shadow-brand-accent/20 transition-all">
                  Request Call Back
                </Button>
                <span className="block text-[11px] text-slate-400 mt-3 text-center">
                  * By clicking submit, you agree to our privacy policy guidelines. No spam, guaranteed.
                </span>
              </div>
            </form>
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
