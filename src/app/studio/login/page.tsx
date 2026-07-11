"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react";

export default function StudioLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    console.log("[CLIENT] Attempting sign in with email:", email);
    const signInResult = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("[CLIENT] signInWithPassword raw result:", signInResult);

    if (signInResult.error) {
      setError(signInResult.error.message);
      setLoading(false);
      return;
    }

    // Check profile role
    const userResult = await supabase.auth.getUser();
    console.log("[CLIENT] getUser raw result:", userResult);
    const user = userResult.data.user;
    if (user) {
      const profileResult = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      console.log("[CLIENT] profiles query raw result:", profileResult);

      if (!profileResult.data || !["admin", "editor"].includes(profileResult.data.role)) {
        await supabase.auth.signOut();
        setError("You do not have admin or editor access. Contact your administrator.");
        setLoading(false);
        return;
      }
    }

    router.push("/studio");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-sans text-slate-800">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-primary to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Downtown Studio</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to manage your content</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full h-10 px-3 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
              placeholder="admin@downtown.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full h-10 px-3 pr-10 rounded-lg bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-white text-sm font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Admin accounts are provisioned internally. No public sign-up available.
        </p>
      </div>
    </div>
  );
}
