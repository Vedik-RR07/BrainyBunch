import React from "react";
import { motion } from "motion/react";
import { Sparkles, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

interface HeroSectionProps {
  onOpenEnrollment: () => void;
  onExploreSubjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnrollment, onExploreSubjects }) => {
  return (
    <section id="hero" className="relative bg-yellow-50 text-purple-950 pt-8 pb-16 lg:py-20 overflow-hidden border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/*<motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-purple-100 border border-purple-200 text-purple-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
              <span>Irving, TX Premier Tutoring Academy • K-8th Grade</span>
            </motion.div>*/}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-purple-950 tracking-tight leading-tight">
              Unlocking Every Child's <br className="hidden sm:inline" />
              <span className="text-purple-700">
                Brilliance & Academic Confidence
              </span>
            </h1>

            <p className="text-base sm:text-lg text-purple-900/80 max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
              Hands-on learning for students from Kindergarten through 8th Grade in English, Grammar, Math, History, and Science.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <motion.div
                //whileHover={{ scale: 1.05 }}
                className="bg-purple-100 border border-purple-200 rounded-2xl p-3 text-center shadow-sm flex flex-col items-center justify-center"
              >
                <span className="text-purple-900 font-black text-xl sm:text-2xl block">K – 8th Grade</span>
              </motion.div>

              <motion.div
                //whileHover={{ scale: 1.05 }}
                className="bg-yellow-100 border border-yellow-200 rounded-2xl p-3 text-center shadow-sm flex flex-col items-center justify-center"
              >
                <span className="text-amber-900 font-black text-xl sm:text-2xl block">5 Core Classes</span>
                
              </motion.div>

              <motion.div
                //whileHover={{ scale: 1.05 }}
                className="bg-emerald-100 border border-emerald-200 rounded-2xl p-3 text-center shadow-sm col-span-2 sm:col-span-1 flex flex-col items-center justify-center"
              >
                <span className="text-emerald-900 font-black text-xl sm:text-2xl block">Online & In-Person</span>
                
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.08, translateY: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenEnrollment}
                id="hero-enroll-btn"
                className="w-full sm:w-auto bg-yellow-300 hover:bg-yellow-400 text-purple-950 font-black text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl border border-yellow-400 transition-all flex items-center justify-center cursor-pointer"
              >
                <Sparkles className="w-5 h-5 mr-2 text-purple-900" />
                Enroll Your Child Now
                <ArrowRight className="w-5 h-5 ml-2 text-purple-900" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.06, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreSubjects}
                className="w-full sm:w-auto bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-base px-6 py-4 rounded-2xl border border-purple-200 transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                <BookOpen className="w-5 h-5 mr-2 text-purple-700" />
                View 5 Subjects
              </motion.button>
            </div>

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
                Irving + Online DFW
              </span>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="bg-white/70 backdrop-blur-md border-2 border-purple-200 rounded-3xl p-6 shadow-xl w-full">
              <div className="flex items-center justify-center pb-4 border-b border-purple-100 mb-4">
                <Logo size="lg" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-purple-100 shadow-md bg-purple-50">
                <img
                  src="/hero-learning.png"
                  alt="Stack of colorful books with a glowing light bulb representing learning and ideas"
                  className="w-full h-auto object-contain"
                />
              </div>
              {/* <p className="text-center text-xs text-purple-800/80 font-medium mt-4">
                Learn, grow, and succeed with Brainy Bunch Learning Academy.
              </p> */}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
