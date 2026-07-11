import React from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building,
  GraduationCap
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { getTeamMembers, getBranches } from "@/lib/supabase/queries";

export const metadata = {
  title: "About Us | Downtown Consultancy",
  description: "Learn about Downtown Consultancy's mission, our certified country counselors, and our branch network. We are dedicated to providing ethical, student-first study abroad advising.",
};

const companyMilestones = [
  { year: "2014", title: "Downtown Founded", desc: "Started operations in Kathmandu with 3 counselors focusing on USA/Australia admissions." },
  { year: "2017", title: "QEAC Admittance", desc: "Obtained official Qualified Education Agent Counsellor credentials for Australia admissions." },
  { year: "2020", title: "Pokhara Branch Launch", desc: "Expanded operations to Pokhara to support western region students." },
  { year: "2024", title: "5000+ Enrolled Students", desc: "Successfully milestone reached of placing international students across global university campuses." }
];

export default async function AboutUsPage() {
  const teamMembers = await getTeamMembers();
  const branches = await getBranches();

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="relative bg-brand-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl z-0" />
        <div className="absolute left-1/10 bottom-1/10 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl z-0" />

        <Container className="relative z-20 text-center max-w-3xl space-y-4">
          <span className="text-brand-accent font-extrabold text-sm uppercase tracking-widest block">
            About Our Company
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Story & Values
          </h1>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Downtown Consultancy was built on the foundation of absolute honesty and structured advising.
          </p>
        </Container>
      </section>

      {/* 2. STORY & MISSION */}
      <Section bg="default">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Story */}
            <div className="space-y-5">
              <span className="text-brand-accent text-xs font-extrabold uppercase tracking-widest block">Company Story</span>
              <h2 className="text-3xl font-bold text-slate-900">Guiding Ambitions Safely</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                For over a decade, we have worked directly with students and international universities to outline highly accurate study abroad pathways. We believe that foreign education is not just about a visa stamp; it is a life-altering investment.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Our directors are QEAC credentialed and evaluate files meticulously before submissions, ensuring that applications contain no discrepancies or gaps.
              </p>
            </div>

            {/* Mission / Vision Cards */}
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3 shadow-sm">
                <h4 className="font-extrabold text-brand-primary text-base">Our Mission</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  To deliver honest, accurate, and prompt advising services, supporting international students to secure admissions and academic success worldwide.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3 shadow-sm">
                <h4 className="font-extrabold text-brand-primary text-base">Our Vision</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  To be recognized as Nepal&apos;s most reliable educational agency, setting standards in ethical counseling and campus placements.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. TIMELINE OF MILESTONES */}
      <Section bg="muted" className="border-t border-b border-slate-100">
        <Container>
          <SectionHeading 
            badge="Company Milestones"
            title="Our Growth Journey"
            description="Highlighting key stages of Downtown Consultancy since its founding."
          />

          <div className="relative border-l border-slate-200/80 max-w-2xl mx-auto space-y-8 pl-6">
            {companyMilestones.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Bullet */}
                <div className="absolute left-[-30px] top-1.5 w-4 h-4 rounded-full bg-brand-accent border-2 border-white shadow-sm" />
                <div className="space-y-1.5">
                  <span className="font-extrabold text-brand-primary text-base">{item.year} - {item.title}</span>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. TEAM GRID */}
      {teamMembers.length > 0 && (
        <Section id="team" bg="default">
          <Container>
            <SectionHeading 
              badge="Downtown Directors"
              title="Meet Our Board of Advisors"
              description="Our counseling team consists of qualified directors with extensive international study experience."
            />

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm p-6 text-center space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-brand-primary flex items-center justify-center font-black text-lg mx-auto border border-blue-100">
                    {member.image}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">{member.name}</h4>
                    <span className="block text-brand-accent text-xs font-bold uppercase tracking-wider">{member.role}</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. BRANCH OFFICES LOCATOR */}
      {branches.length > 0 && (
        <Section bg="muted" className="border-t border-slate-100">
          <Container>
            <SectionHeading 
              badge="Locations Locator"
              title="Our Branch Offices"
              description="Visit our offices physically for a consultation. Directions and maps are details below."
            />

            <div className="space-y-16 max-w-5xl mx-auto">
              {branches.map((branch, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div 
                    key={branch.id}
                    className={`grid lg:grid-cols-12 gap-8 items-center bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm`}
                  >
                    {/* Branch details */}
                    <div className="lg:col-span-5 space-y-5 text-left">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-brand-primary border border-blue-100">
                        Office Branch
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{branch.name}</h3>
                      
                      <ul className="space-y-3.5 text-sm text-slate-500">
                        <li className="flex items-start gap-2.5">
                          <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                          <span>{branch.address}</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-brand-accent flex-shrink-0" />
                          <a href={`tel:${branch.phone}`} className="hover:text-brand-accent transition-colors font-semibold">{branch.phone}</a>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-brand-accent flex-shrink-0" />
                          <a href={`mailto:${branch.email}`} className="hover:text-brand-accent transition-colors font-semibold">{branch.email}</a>
                        </li>
                      </ul>
                    </div>

                    {/* Responsive Map Iframe */}
                    <div className="lg:col-span-7 h-80 rounded-2xl overflow-hidden border border-slate-150 relative">
                      <iframe
                        src={branch.mapIframe}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map showing ${branch.name}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
