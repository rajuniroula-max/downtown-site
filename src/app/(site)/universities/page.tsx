"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  GraduationCap, 
  Building
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { Button } from "@/components/ui/button";
import { mockUniversities } from "@/lib/types/mock-data";

const countryFilters = [
  { label: "All Countries", value: "all" },
  { label: "Australia", value: "Australia" },
  { label: "United States", value: "United States" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "Canada", value: "Canada" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Europe", value: "Europe" }
];

export default function UniversitiesListPage() {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering logic
  const filteredUniversities = mockUniversities.filter((uni) => {
    const matchesCountry = selectedCountry === "all" || uni.country === selectedCountry;
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          uni.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="relative bg-brand-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl z-0" />
        <div className="absolute left-1/10 bottom-1/10 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl z-0" />

        <Container className="relative z-20 text-center max-w-3xl space-y-4">
          <span className="text-brand-accent font-extrabold text-sm uppercase tracking-widest block">
            Institution Network
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Partner Universities & Colleges
          </h1>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover accredited global schools where you can secure direct admissions and entry scholarship options.
          </p>
        </Container>
      </section>

      {/* 2. SEARCH & FILTERING BAR */}
      <Section bg="default" className="py-10 border-b border-slate-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Country Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
              {countryFilters.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedCountry(tab.value)}
                  className={`px-4.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
                    selectedCountry === tab.value
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Input Search Box */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by university name or city..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. UNIVERSITIES GRID LIST */}
      <Section bg="default" className="pt-6 pb-20">
        <Container>
          {filteredUniversities.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUniversities.map((uni) => (
                <div 
                  key={uni.slug}
                  className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between p-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                        {uni.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors text-base line-clamp-1">
                          {uni.name}
                        </h3>
                        <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                          <span>{uni.city}, {uni.country}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {uni.aboutText}
                    </p>

                    <div className="space-y-2 border-t border-slate-50 pt-4">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Sample Programs:
                      </span>
                      <ul className="space-y-1 text-slate-600 text-xs">
                        {uni.coursesOffered.slice(0, 2).map((course, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 truncate">
                            <span className="w-1 h-1 rounded-full bg-brand-accent" />
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link href={`/universities/${uni.slug}`}>
                    <div className="mt-6 pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                      <span>View Requirements & Details</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
              <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-lg">No Universities Found</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                No partner universities match your filter parameters. Try searching for a different name or checking other countries.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* 4. FOOTER ADVISORY BANNER */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <Container className="max-w-3xl space-y-6">
          <GraduationCap className="w-12 h-12 text-brand-accent mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold">Need Help Shortlisting Universities?</h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every profile is different. Sit down with our experienced education counselors to shortlist institutions that perfectly align with your budget and academic goals.
          </p>
          <div className="pt-2">
            <Link href="/contact-us?counselling=free">
              <Button className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-6 px-8 rounded-xl">
                Get Personalized Assistance
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
