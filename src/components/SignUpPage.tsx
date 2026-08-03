"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";
import { EnrollmentForm } from "./EnrollmentForm";

interface SignUpPageProps {
  onBack: () => void;
  preselectedSubject?: string;
  preselectedFormat?: "In Person" | "Online" | "Hybrid" | undefined;
}

export default function SignUpPage({ onBack, preselectedSubject, preselectedFormat }: SignUpPageProps) {
  return (
    <section className="fixed inset-0 bg-yellow-50 text-purple-950 z-50 overflow-auto">
      <header className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-4 border-b border-purple-100/80 bg-yellow-50/90 backdrop-blur-sm z-10">
        <button
          onClick={onBack}
          className="flex items-center text-sm font-bold text-purple-700 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Home
        </button>
        <Logo size="sm" />
      </header>

      <div className="pt-20 pb-8 px-4 flex items-start justify-center">
        <div className="w-full max-w-3xl">
          <EnrollmentForm
            preselectedSubject={preselectedSubject}
            preselectedFormat={preselectedFormat}
          />
        </div>
      </div>
    </section>
  );
}
