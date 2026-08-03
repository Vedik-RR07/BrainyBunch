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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Chrome,
  User,
  Mail,
  Lock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Logo } from "./Logo";

interface SignUpPageProps {
  onBack: () => void;
  onGoToSignIn: () => void;
}

export default function SignUpPage({ onBack, onGoToSignIn }: SignUpPageProps) {
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
    <section className="fixed inset-0 bg-green-50 text-purple-950 z-50 overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      />

      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(70%_50%_at_50%_30%,rgba(167,243,208,0.3),transparent_70%)]" />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[18, 50, 82].map((top) => (
          <div
            key={top}
            className="absolute left-0 right-0 h-px bg-emerald-200"
            style={{ top: `${top}%` }}
          />
        ))}
        {[22, 50, 78].map((left) => (
          <div
            key={left}
            className="absolute top-0 bottom-0 w-px bg-emerald-200"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4 border-b border-emerald-200/80 bg-green-50/80 backdrop-blur-sm z-10">
        <button
          onClick={onBack}
          className="flex items-center text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </button>
        <Logo size="sm" />
      </header>

      {/* Scrollable container so card doesn't get clipped on small screens */}
      <div className="h-full w-full overflow-y-auto pt-20 pb-8 px-4 flex items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <Card className="border-emerald-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-2">
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  Free to Join
                </span>
              </div>
              <CardTitle className="text-2xl text-purple-950">Create an account</CardTitle>
              <CardDescription className="text-purple-700/70">
                Join Brainy Bunch and track your child's learning journey.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              {/* Full Name */}
              <div className="grid gap-1.5">
                <Label htmlFor="signup-name" className="text-purple-800 font-bold text-xs uppercase tracking-wide">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your name"
                    className="pl-10 border-purple-200 bg-white text-purple-950 placeholder:text-purple-300 focus-visible:border-purple-400 focus-visible:ring-purple-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-1.5">
                <Label htmlFor="signup-email" className="text-purple-800 font-bold text-xs uppercase tracking-wide">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 border-purple-200 bg-white text-purple-950 placeholder:text-purple-300 focus-visible:border-purple-400 focus-visible:ring-purple-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid gap-1.5">
                <Label htmlFor="signup-password" className="text-purple-800 font-bold text-xs uppercase tracking-wide">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    id="signup-password"
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

              {/* Terms */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  className="border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="terms" className="text-purple-700 text-sm font-medium">
                  I agree to the{" "}
                  <a href="#" className="text-purple-900 font-bold hover:underline">
                    Terms & Privacy
                  </a>
                </Label>
              </div>

              {/* Submit */}
              <button
                type="button"
                className="w-full h-11 rounded-2xl bg-yellow-300 hover:bg-yellow-400 text-purple-950 font-black text-sm border border-yellow-400 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Create account
              </button>

              <div className="relative">
                <Separator className="bg-purple-100" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-[11px] uppercase tracking-widest text-purple-400 font-bold">
                  or
                </span>
              </div>

              {/* Google */}
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
                Already have an account?{" "}
                <button
                  onClick={onGoToSignIn}
                  className="text-purple-800 font-bold hover:underline"
                >
                  Sign in
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
