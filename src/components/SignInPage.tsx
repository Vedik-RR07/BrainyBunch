"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Chrome, ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Logo } from "./Logo";

interface SignInPageProps {
  onBack: () => void;
  onGoToSignUp: () => void;
}

export default function SignInPage({ onBack, onGoToSignUp }: SignInPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    type P = { x: number; y: number; v: number; o: number };
    let ps: P[] = [];
    let raf = 0;

    const make = (): P => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: Math.random() * 0.3 + 0.08,
      o: Math.random() * 0.25 + 0.1,
    });

    const init = () => {
      ps = [];
      const count = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < count; i++) ps.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ps.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + Math.random() * 40;
          p.v = Math.random() * 0.3 + 0.08;
          p.o = Math.random() * 0.25 + 0.1;
        }
        ctx.fillStyle = `rgba(109,40,217,${p.o})`;
        ctx.fillRect(p.x, p.y, 1, 2.5);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => { setSize(); init(); };
    window.addEventListener("resize", onResize);
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="fixed inset-0 bg-yellow-50 text-purple-950 z-50 overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      />

      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(70%_50%_at_50%_30%,rgba(167,139,250,0.15),transparent_70%)]" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[18, 50, 82].map((top) => (
          <div
            key={top}
            className="absolute left-0 right-0 h-px bg-purple-200"
            style={{ top: `${top}%` }}
          />
        ))}
        {[22, 50, 78].map((left) => (
          <div
            key={left}
            className="absolute top-0 bottom-0 w-px bg-purple-200"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4 border-b border-purple-200/80 bg-yellow-50/80 backdrop-blur-sm z-10">
        <button
          onClick={onBack}
          className="flex items-center text-sm font-bold text-purple-700 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </button>
        <Logo size="sm" />
      </header>

      {/* Centered card */}
      <div className="h-full w-full grid place-items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <Card className="border-purple-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl text-purple-950">Welcome back</CardTitle>
              <CardDescription className="text-purple-700/70">
                Sign in to track your child's progress and sessions.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              {/* Email */}
              <div className="grid gap-1.5">
                <Label htmlFor="signin-email" className="text-purple-800 font-bold text-xs uppercase tracking-wide">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 border-purple-200 bg-white text-purple-950 placeholder:text-purple-300 focus-visible:border-purple-400 focus-visible:ring-purple-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="signin-password" className="text-purple-800 font-bold text-xs uppercase tracking-wide">
                    Password
                  </Label>
                  <a href="#" className="text-xs text-purple-600 hover:text-purple-900 font-medium">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-purple-200 bg-white text-purple-950 placeholder:text-purple-300 focus-visible:border-purple-400 focus-visible:ring-purple-200"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-purple-400 hover:text-purple-700 transition-colors"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="button"
                className="w-full h-11 rounded-2xl bg-yellow-300 hover:bg-yellow-400 text-purple-950 font-black text-sm border border-yellow-400 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                Sign in
              </button>

              <div className="relative">
                <Separator className="bg-purple-100" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-[11px] uppercase tracking-widest text-purple-400 font-bold">
                  or
                </span>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                className="w-full h-11 rounded-2xl border-2 border-purple-200 bg-white hover:bg-purple-50 text-purple-900 font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Chrome className="h-5 w-5 text-purple-600" />
                Continue with Google
              </button>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-2 text-sm text-purple-600">
              <div>
                New here?{" "}
                <button
                  onClick={onGoToSignUp}
                  className="text-purple-800 font-bold hover:underline"
                >
                  Create an account
                </button>
              </div>
              <p className="text-[10px] text-purple-400">
                Brainy Bunch Learning Academy · Irving, TX
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
