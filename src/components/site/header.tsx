import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            D
          </div>
          <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Downtown Consultancy
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <Link href="#services" className="hover:text-white transition-colors">Services</Link>
          <Link href="#features" className="hover:text-white transition-colors">Why Us</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/studio">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              Studio Login
            </Button>
          </Link>
          <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
