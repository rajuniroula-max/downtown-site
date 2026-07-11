"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  BookOpen, 
  Calendar, 
  User, 
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-components";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/types/mock-data";

interface ClientProps {
  initialPosts: BlogPost[];
}

const categories = ["All", "Visa Guide", "Scholarships", "Study Abroad"];

export default function BlogListClient({ initialPosts }: ClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter logic
  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Simple Mock Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="relative bg-brand-primary text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-brand-accent/20 blur-3xl z-0" />
        <div className="absolute left-1/10 bottom-1/10 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl z-0" />

        <Container className="relative z-20 text-center max-w-3xl space-y-4">
          <span className="text-brand-accent font-extrabold text-sm uppercase tracking-widest block">
            Resource Library
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Consultancy Blog & News
          </h1>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Get reliable, detailed updates on student visa changes, university deadlines, and scholarship pathways.
          </p>
        </Container>
      </section>

      {/* 2. FILTERING & SEARCH BAR */}
      <Section bg="default" className="py-10 border-b border-slate-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1); // reset to page 1
                  }}
                  className={`px-4.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  {tabName(cat)}
                </button>
              ))}
            </div>

            {/* Input Search Box */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // reset to page 1
                }}
                placeholder="Search blog topics or text..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. BLOG POSTS LIST GRID */}
      <Section bg="default" className="pt-6 pb-20">
        <Container>
          {currentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((blog) => (
                <article 
                  key={blog.id} 
                  className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Visual icon box */}
                    <div className="h-44 bg-slate-100 relative flex items-center justify-center text-slate-300 group-hover:bg-slate-200/50 transition-colors">
                      <BookOpen className="w-10 h-10 text-slate-300" />
                      <span className="absolute bottom-3 left-3 text-[10px] font-bold text-brand-primary bg-white border border-blue-100 px-2 py-0.5 rounded-md uppercase">
                        {blog.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors text-base line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-4">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <User className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.date}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${blog.slug}`}>
                      <div className="w-full text-center py-2.5 rounded-xl border border-slate-100 text-xs font-bold text-brand-primary hover:bg-slate-50 hover:text-brand-accent transition-colors flex items-center justify-center gap-1 cursor-pointer">
                        <span>Read Full Guide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-lg">No Blogs Found</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                Try typing a different keyword or checking other filter categories.
              </p>
            </div>
          )}

          {/* 4. PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="gap-1 rounded-xl"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>
              <span className="text-xs text-slate-500 font-bold">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="gap-1 rounded-xl"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}

function tabName(category: string) {
  return category;
}
