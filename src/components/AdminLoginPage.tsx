import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Mail, Lock } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasEmailError = submitted && email.trim() === "";
  const hasPasswordError = submitted && password.trim() === "";

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/admin/dashboard");
      }
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      return;
    }

    setIsSubmitting(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message ?? "Unable to sign in. Please check your credentials and try again.");
      return;
    }

    if (data.session) {
      navigate("/admin/dashboard");
    } else {
      setErrorMessage("Sign in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 text-purple-950">
      <header className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Logo size="md" />
      </header>

      <main className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 pb-12">
        <div className="w-full max-w-2xl rounded-[2rem] border border-purple-200 bg-white/95 p-8 shadow-2xl sm:p-10">
          <div className="mb-8 sm:flex sm:items-end sm:justify-between sm:gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">Administrator Access</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-purple-950 sm:text-4xl">
                Admin Sign In
              </h1>
              <p className="mt-3 max-w-xl text-sm text-purple-700 leading-7">
                Enter your credentials to securely access the Brainy Bunch admin dashboard.
              </p>
            </div>
            <div className="hidden sm:block rounded-3xl bg-purple-950/5 px-4 py-3 text-right text-xs font-bold uppercase tracking-[0.24em] text-purple-700">
              Secure Access
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-purple-900">
                Email Address
              </label>
              <div className="mt-2 relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setSubmitted(true)}
                  className={`w-full rounded-3xl border px-10 py-3 text-sm font-medium text-purple-950 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                    hasEmailError ? "border-rose-400 bg-rose-50" : "border-purple-200 bg-purple-50"
                  }`}
                  placeholder="admin@brainybunch.com"
                />
              </div>
              {hasEmailError && <p className="mt-2 text-xs text-rose-600">Email is required.</p>}
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-purple-900">
                Password
              </label>
              <div className="mt-2 relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onBlur={() => setSubmitted(true)}
                  className={`w-full rounded-3xl border px-10 py-3 text-sm font-medium text-purple-950 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                    hasPasswordError ? "border-rose-400 bg-rose-50" : "border-purple-200 bg-purple-50"
                  }`}
                  placeholder="Enter your password"
                />
              </div>
              {hasPasswordError && <p className="mt-2 text-xs text-rose-600">Password is required.</p>}
            </div>

            {errorMessage && (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-3xl bg-purple-950 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl transition hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full rounded-3xl border border-purple-200 bg-white px-6 py-3 text-sm font-semibold text-purple-900 transition hover:bg-purple-50"
            >
              Back to Brainy Bunch
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
