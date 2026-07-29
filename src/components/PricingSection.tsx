import React from "react";
import { Check, Sparkles, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";
import { ACADEMY_INFO, FAQS_LIST } from "../data";

interface PricingSectionProps {
  onOpenEnrollment: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenEnrollment }) => {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent & Honest Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Quality Education at $25 / Hour. <br className="hidden sm:inline" />
            No Fine Print. Zero Hidden Fees.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We believe world-class tutoring should be accessible to every family in Irving and beyond. Pay as you go with complete peace of mind.
          </p>
        </div>

        {/* Big Pricing Card */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-slate-800 to-slate-850 rounded-3xl border border-slate-700 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Top Value Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-5 py-2 rounded-bl-2xl uppercase tracking-wider shadow">
              ★ Best Value in Irving, TX
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              
              {/* Left Rate Info */}
              <div className="md:col-span-5 text-center md:text-left space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Flat Standard Plan</span>
                <div className="flex items-baseline justify-center md:justify-start">
                  <span className="text-5xl sm:text-6xl font-black text-white">$25</span>
                  <span className="text-slate-400 text-xl font-medium ml-2">/ hour</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Valid for all grades (K-12) and all 9 subjects. Pay per session with full flexibility.
                </p>

                <div className="pt-2">
                  <button
                    onClick={onOpenEnrollment}
                    id="pricing-enroll-btn"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-base py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center cursor-pointer"
                  >
                    Start Tutoring Sessions
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <span className="text-[11px] text-slate-400 block text-center mt-2">
                    Free 20-min consultation & diagnostic included
                  </span>
                </div>
              </div>

              {/* Right Included Features */}
              <div className="md:col-span-7 bg-slate-900/80 rounded-2xl p-6 border border-slate-700/80 space-y-3.5">
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">Everything Included in $25/hr:</h4>

                {[
                  "Free 20-Minute Initial Diagnostic & Consultation",
                  "Dedicated 1-on-1 or Tiny Micro-Group Instruction",
                  "Customized Learning Worksheets & Study Guide Materials",
                  "Weekly Progress Tracking & Direct Parent Updates",
                  "Homework Support & Exam Prep Strategies",
                  "Flexible Session Swaps between In-Person & Online Live",
                  "No Binding Contracts — Cancel or Pause Anytime",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm text-slate-200">
                    <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-full mt-0.5 flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Pricing FAQs Mini Accordion */}
        <div className="mt-16 max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-center text-white flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-amber-400 mr-2" />
            Frequently Asked Questions
          </h3>

          <div className="grid gap-4">
            {FAQS_LIST.slice(0, 3).map((faq, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
                <h4 className="font-bold text-white text-base mb-1">{faq.question}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
