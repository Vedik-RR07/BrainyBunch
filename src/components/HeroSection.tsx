import React from "react";
import { motion } from "motion/react";
import { Sparkles, BookOpen, Clock, MapPin, CheckCircle2, ArrowRight, Award, Users } from "lucide-react";
import { ACADEMY_INFO } from "../data";
import { Logo } from "./Logo";

interface HeroSectionProps {
  onOpenEnrollment: () => void;
  onExploreSubjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnrollment, onExploreSubjects }) => {
  return (
    <section id="hero" className="relative bg-gradient-to-b from-purple-50/90 via-yellow-50/50 to-emerald-50/60 text-purple-950 pt-8 pb-16 lg:py-20 overflow-hidden border-b border-purple-100">
      {/* Soft Pastel Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-yellow-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Pastel Pill Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-purple-100/90 border border-purple-300 text-purple-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Irving, TX Premier Tutoring Academy • K-8th Grade</span>
            </motion.div>

            {/* Big Headline with Pastel Accent Highlights */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-purple-950 tracking-tight leading-tight">
              Unlocking Every Child's <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 bg-clip-text text-transparent">
                Brilliance & Academic Confidence
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-purple-900/80 max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
              Empowering students from Kindergarten through 8th Grade in English, Grammar, Math, History, and Science. 
              Enjoy personalized attention, expert tutors, and transparent <strong className="text-amber-700 font-bold bg-yellow-200/80 px-1.5 py-0.5 rounded-md">$25/hour</strong> flat pricing with zero hidden fees.
            </p>

            {/* Key Stats Cards Bar (Pastel Yellow, Purple, Green) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-purple-100/80 border border-purple-200 rounded-2xl p-3 text-center shadow-sm"
              >
                <span className="text-purple-900 font-black text-xl sm:text-2xl block">K – 8th Grade</span>
                <span className="text-purple-700 text-xs font-semibold">Grade Range</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-yellow-100/80 border border-yellow-200 rounded-2xl p-3 text-center shadow-sm"
              >
                <span className="text-amber-900 font-black text-xl sm:text-2xl block">5 Core</span>
                <span className="text-amber-800 text-xs font-semibold">Classes Offered</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-emerald-100/80 border border-emerald-200 rounded-2xl p-3 text-center shadow-sm"
              >
                <span className="text-emerald-900 font-black text-xl sm:text-2xl block">$25 / hr</span>
                <span className="text-emerald-800 text-xs font-semibold">Flat Clear Rate</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-purple-100/80 border border-purple-200 rounded-2xl p-3 text-center shadow-sm"
              >
                <span className="text-purple-900 font-black text-xl sm:text-2xl block">Online & In-Person</span>
                <span className="text-purple-700 text-xs font-semibold">Flexible Sessions</span>
              </motion.div>
            </div>

            {/* Action Buttons with Hover Magnification */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.08, translateY: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenEnrollment}
                id="hero-enroll-btn"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-purple-950 font-black text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl border border-amber-300 transition-all flex items-center justify-center cursor-pointer"
              >
                <Sparkles className="w-5 h-5 mr-2 text-purple-900" />
                Enroll Your Child Now
                <ArrowRight className="w-5 h-5 ml-2 text-purple-900" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.06, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreSubjects}
                className="w-full sm:w-auto bg-purple-100 hover:bg-purple-200/80 text-purple-900 font-bold text-base px-6 py-4 rounded-2xl border border-purple-200 transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                <BookOpen className="w-5 h-5 mr-2 text-purple-700" />
                View 5 Subjects
              </motion.button>
            </div>

            {/* Micro Trust Bullet Points */}
            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-purple-900/90 font-bold">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
                Free Initial Assessment
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
                No Long-Term Contracts
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
                Irving Campus + Online DFW
              </span>
            </div>

          </motion.div>

          {/* Right Visual Highlight Card featuring Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/90 border-2 border-purple-200 rounded-3xl p-6 shadow-xl backdrop-blur-md relative overflow-hidden">
              
              {/* Card Header with Logo */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                <Logo size="md" />
                <span className="bg-emerald-100 text-emerald-900 text-xs px-3 py-1 rounded-full font-black border border-emerald-300">
                  $25/hr Flat
                </span>
              </div>

              {/* List of Key Academy Benefits */}
              <div className="py-5 space-y-4 text-sm text-purple-950">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 text-purple-700 rounded-xl mt-0.5 border border-purple-200">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-purple-950">Micro-Groups & 1-on-1</p>
                    <p className="text-xs text-purple-800/80">Targeted support tailored to your child's unique learning pace.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-yellow-100 text-amber-800 rounded-xl mt-0.5 border border-yellow-200">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-purple-950">5 Core Subjects Covered</p>
                    <p className="text-xs text-purple-800/80">English, Grammar & Handwriting, K-8 Math, History, and Science.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl mt-0.5 border border-emerald-200">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-purple-950">Flexible Weekday & Weekend Slots</p>
                    <p className="text-xs text-purple-800/80">After-school homework help and weekend skill acceleration.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 text-purple-700 rounded-xl mt-0.5 border border-purple-200">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-purple-950">Irving Campus & Online Live</p>
                    <p className="text-xs text-purple-800/80">Located on MacArthur Blvd in Irving, TX or online from home.</p>
                  </div>
                </div>
              </div>

              {/* Callout box inside card */}
              <div className="bg-yellow-100/80 border border-yellow-300 rounded-2xl p-4 text-center">
                <p className="text-xs text-amber-950 font-bold">Ready to see your child succeed?</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenEnrollment}
                  className="mt-2 w-full bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-purple-950 font-black py-2.5 rounded-xl text-sm transition-all shadow border border-amber-300 cursor-pointer"
                >
                  Schedule Free Consultation ($25/hr)
                </motion.button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
