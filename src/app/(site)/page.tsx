import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Users, BarChart3, ShieldCheck, Mail } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden relative font-sans">
      {/* Decorative background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/20 blur-[120px] pointer-events-none" />

      {/* Header */}
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-400 text-xs font-medium mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Transforming Business in the Modern Era
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto mb-8 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none">
          Elevate Your Business Strategy With Us
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          We provide high-impact, data-driven consulting services tailored to scale operations, build robust architectures, and drive digital growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 px-8 flex items-center gap-2">
            Schedule Call <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-slate-800 hover:bg-slate-900 text-slate-300">
            Our Portfolio
          </Button>
        </div>

        {/* Feature Grid Mockup / Dashboard Preview */}
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-2 backdrop-blur-sm max-w-5xl mx-auto shadow-2xl shadow-indigo-500/5">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex flex-col md:flex-row gap-6 items-start text-left">
            <div className="flex-1">
              <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Executive Summary</span>
              <h3 className="text-xl font-bold mt-1 text-white">Q3 Financial Advisory Analysis</h3>
              <p className="text-slate-400 text-sm mt-2">
                Operational margins improved by 14.2% across key consultancy metrics following dynamic restructuring of target workflows.
              </p>
              <div className="mt-6 flex items-center gap-6">
                <div>
                  <span className="text-2xl font-bold text-white">$1.2M</span>
                  <span className="block text-xs text-slate-500">Revenue Growth</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="text-2xl font-bold text-emerald-400">+18%</span>
                  <span className="block text-xs text-slate-500">Efficiency</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-80 rounded-lg bg-slate-900/40 border border-slate-800/80 p-4 flex flex-col gap-3">
              <span className="text-xs font-semibold text-slate-400">Services Overview</span>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/50 text-xs">
                <span>Business Advisory</span>
                <span className="text-indigo-400 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/50 text-xs">
                <span>Infrastructure Scale</span>
                <span className="text-violet-400 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/50 text-xs">
                <span>Security Compliance</span>
                <span className="text-emerald-400 font-semibold">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="border-t border-slate-900 bg-slate-950/60 py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Capabilities</h2>
            <p className="text-slate-400">
              We leverage modern analytics, industry expertise, and robust software integrations to build scalable solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-8 hover:border-indigo-500/20 transition-all hover:bg-slate-900/30">
              <div className="w-10 h-10 rounded-lg bg-indigo-950 border border-indigo-500/20 flex items-center justify-center mb-6">
                <Compass className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Strategic Advisory</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Strategic maps designed to optimize core performance, establish market fit, and minimize financial risks.
              </p>
            </div>

            <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-8 hover:border-violet-500/20 transition-all hover:bg-slate-900/30">
              <div className="w-10 h-10 rounded-lg bg-violet-950 border border-violet-500/20 flex items-center justify-center mb-6">
                <Users className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Workflow Automation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                End-to-end integration mapping designed to automate standard business operations and increase output speed.
              </p>
            </div>

            <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-8 hover:border-emerald-500/20 transition-all hover:bg-slate-900/30">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/20 flex items-center justify-center mb-6">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Growth Marketing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Data pipelines and automation workflows focused on high conversion and brand retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white text-[10px]">
              D
            </div>
            <span>© {new Date().getFullYear()} Downtown Consultancy. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
