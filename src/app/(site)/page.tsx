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
import dynamic from "next/dynamic";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { cn } from "@/lib/utils";

const LeadFormClient = dynamic(
  () => import("@/components/site/lead-form-client").then((mod) => mod.LeadFormClient),
  { 
    ssr: true,
    loading: () => (
      <div className="h-64 bg-slate-50 border border-slate-100 rounded-3xl animate-pulse text-center py-20">
        <span className="text-slate-400 text-xs font-semibold">Loading free counselling form...</span>
      </div>
    )
  }
);
import { 
  getDestinations, 
  getServices, 
  getTestimonials, 
  getBlogPosts,
  getBranches
} from "@/lib/supabase/queries";

export const metadata = {
  title: "Downtown Consultancy | Best Study Abroad Agency in Nepal",
  description: "DOWNTOWN Educational Consultancy is the leading study abroad agency in Kathmandu, Nepal. Get expert counselling for Australia, USA, UK, Canada, and New Zealand. Boost your test preparation with our IELTS and PTE classes.",
  openGraph: {
    title: "Downtown Consultancy | Best Study Abroad Agency in Nepal",
    description: "DOWNTOWN Educational Consultancy is the leading study abroad agency in Kathmandu, Nepal. Expert counselling for Australia, USA, UK, Canada, New Zealand.",
    images: [{ url: "/downtown.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Downtown Consultancy | Best Study Abroad Agency in Nepal",
    description: "Get expert counselling for Australia, USA, UK, Canada, and New Zealand in Nepal.",
    images: ["/downtown.jpg"],
  }
};

// Map string icon names to Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  FileText: FileText,
  Award: Award,
  Plane: Plane,
  HeartHandshake: HeartHandshake
};

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

export default async function Home() {
  // Fetch real data from Supabase
  const studyDestinations = await getDestinations();
  const rawServices = await getServices();
  const studentTestimonials = await getTestimonials();
  const recentBlogs = (await getBlogPosts()).slice(0, 3);
  const branches = await getBranches();

  // Map service styles
  const consultancyServices = rawServices.map((srv, idx) => ({
    ...srv,
    icon: iconMap[srv.iconName] || GraduationCap,
    bgColor: idx % 2 === 0 
      ? "bg-blue-50 text-brand-primary border-blue-100" 
      : "bg-orange-50 text-brand-accent border-orange-100"
  }));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Downtown Educational Consultancy",
    "url": siteUrl,
    "logo": `${siteUrl}/downtown.jpg`,
    "description": "Leading study abroad consultancy in Kathmandu, Nepal. Authorized QEAC counselors assisting students in admission and visa documentation for Australia, USA, UK, Canada, and New Zealand.",
    "sameAs": [
      "https://facebook.com/downtowneducancy",
      "https://instagram.com/downtowneducancy"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Downtown Educational Consultancy",
    "image": `${siteUrl}/downtown.jpg`,
    "url": siteUrl,
    "telephone": "+977-1-4412345",
    "address": branches.map((b) => ({
      "@type": "PostalAddress",
      "streetAddress": b.address,
      "addressLocality": b.name,
      "addressCountry": "NP"
    }))
  };

  return (
    <div className="bg-slate-50/50">
      {/* Dynamic structured SEO schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50/30 pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-slate-100">
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
              <Link href="/contact-us?counselling=free">
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
                Quick Academic Finder
              </span>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Destination Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Select Destination</label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary">
                    <option value="">Choose Country...</option>
                    <option value="australia">Australia</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="new-zealand">New Zealand</option>
                    <option value="europe">Europe</option>
                  </select>
                </div>

                {/* Study Level */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Target Study Level</label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary">
                    <option value="">Choose Level...</option>
                    <option value="undergraduate">Bachelor (Undergraduate)</option>
                    <option value="postgraduate">Master (Postgraduate)</option>
                    <option value="diploma">Diploma / VET</option>
                  </select>
                </div>

                {/* Field of Study */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600">Preferred Field</label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary">
                    <option value="">Choose Stream...</option>
                    <option value="it">Information Technology</option>
                    <option value="business">Business & MBA</option>
                    <option value="engineering">Engineering</option>
                    <option value="health">Nursing & Public Health</option>
                  </select>
                </div>

                {/* Search trigger */}
                <div className="flex items-end">
                  <Link href="/universities" className="w-full">
                    <Button className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-1.5">
                      <Search className="w-4 h-4" /> Find Courses
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. STUDY DESTINATIONS SECTION */}
      <Section id="destinations" bg="default">
        <Container>
          <SectionHeading 
            badge="Top Locations"
            title="Explore Study Destinations"
            description="Find detailed information on universities, standard costs, admission steps, and visa guidelines per country."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studyDestinations.map((dest) => (
              <div 
                key={dest.slug}
                className="group relative bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Thumbnail image header */}
                <div className="h-48 relative overflow-hidden bg-slate-100 border-b border-slate-100">
                  {dest.heroImage ? (
                    <img 
                      src={dest.heroImage} 
                      alt={dest.heroImageAlt || `Study in ${dest.country}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-350 bg-slate-200">
                      <Globe className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                  {/* Badge on top of image */}
                  {dest.badge && (
                    <span className="absolute top-3.5 right-3.5 text-[9px] font-bold text-white bg-brand-primary/95 border border-brand-primary/10 px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm z-10">
                      {dest.badge}
                    </span>
                  )}
                  {/* Flag emoji or code inside overlay */}
                  <div className="absolute bottom-3.5 left-3.5 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center text-xl font-bold text-slate-800 shadow-sm z-10">
                    {dest.flagIcon}
                  </div>
                </div>

                {/* Content body wrapper */}
                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                      Study in {dest.country}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {dest.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span className="text-slate-400 font-semibold">{dest.universitiesCount} Partner Universities</span>
                    <Link href={`/study-abroad/${dest.slug}`}>
                      <span className="text-brand-primary group-hover:text-brand-accent transition-colors flex items-center gap-0.5 cursor-pointer">
                        Explore Guide <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. CORE ADVISING SERVICES SECTION */}
      <Section id="services" bg="muted" className="border-t border-b border-slate-100">
        <Container>
          <SectionHeading 
            badge="Expert Counsel"
            title="Our Dedicated Services"
            description="Providing complete transparency and end-to-end guidance to secure your academic career."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultancyServices.map((service) => {
              const IconComp = service.icon;
              return (
                <div 
                  key={service.slug}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className={cn("w-12 h-12 rounded-xl border flex items-center justify-center", service.bgColor)}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-50">
                    <Link href={`/services#${service.slug}`}>
                      <span className="text-xs font-bold text-brand-primary hover:text-brand-accent cursor-pointer flex items-center gap-1">
                        View Service Detail <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. WHY CHOOSE US (STATS COUNTER) */}
      <Section bg="default">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-brand-accent text-xs font-extrabold uppercase tracking-widest block">Downtown Legacy</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Empowering Aspirations With Honesty & Integrity
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Downtown Consultancy stands as a premier educational agency in Kathmandu. Our advisory processes align with global QEAC standards, ensuring that every document compiled represents true facts, avoiding admission discrepancies.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold text-sm">Direct university placement collaborations</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold text-sm">Qualified Education Agent Counsellors (QEAC)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-semibold text-sm">Pre-visa interview preparation drills</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm space-y-1">
                <span className="block text-3xl md:text-4xl font-extrabold text-brand-primary">12+</span>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Years Experience</span>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm space-y-1">
                <span className="block text-3xl md:text-4xl font-extrabold text-brand-primary">5000+</span>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Students Placed</span>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm space-y-1">
                <span className="block text-3xl md:text-4xl font-extrabold text-brand-primary">200+</span>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Partner Schools</span>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm space-y-1">
                <span className="block text-3xl md:text-4xl font-extrabold text-brand-primary">98%</span>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Visa Success</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. PARTNER UNIVERSITIES TICKER */}
      <section className="bg-slate-900 text-white py-12 overflow-hidden border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest block">Accredited Network</span>
          <h3 className="font-extrabold text-lg sm:text-xl text-white mt-1">Some of Our Partner Institutions</h3>
        </div>
        <div className="flex gap-10 select-none overflow-hidden [mask-image:linear-gradient(to_right,parent,transparent,white_20%,white_80%,transparent)]">
          <div className="flex gap-10 shrink-0 min-w-full justify-around animate-marquee">
            {partnerUniversities.map((uni, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-accent" />
                <span className="font-semibold text-slate-300 text-sm">{uni.name} ({uni.country})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ALUMNI REVIEWS SECTION */}
      {studentTestimonials.length > 0 && (
        <Section bg="default">
          <Container>
            <SectionHeading 
              badge="Alumni Stories"
              title="What Our Students Say"
              description="Real reviews and success stories shared by students placed in international universities."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studentTestimonials.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-brand-accent">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm italic leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-50">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center font-bold text-xs border border-blue-100">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{testimonial.name}</h4>
                      <span className="block text-slate-400 text-[10px] mt-0.5">{testimonial.destination}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 7. RECENT BLOG POSTS */}
      {recentBlogs.length > 0 && (
        <Section bg="muted" className="border-t border-b border-slate-100">
          <Container>
            <SectionHeading 
              badge="Knowledge Hub"
              title="Latest Blogs & Updates"
              description="Keep up with visa updates, test tips, and college guidelines written by our senior directors."
            />

            <div className="grid md:grid-cols-3 gap-8">
              {recentBlogs.map((blog) => (
                <article 
                  key={blog.id} 
                  className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <span className="text-[10px] font-bold text-brand-primary bg-blue-50 border border-blue-100 px-2 py-0.5 rounded uppercase">
                      {blog.category}
                    </span>
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
                <Button variant="outline" className="border-slate-200 hover:bg-slate-50 font-bold px-6 bg-white">
                  View All Blogs & Updates
                </Button>
              </Link>
            </div>
          </Container>
        </Section>
      )}

      {/* 8. GET FREE COUNSELLING (CTA LEAD FORM) */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
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
          <LeadFormClient />
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
