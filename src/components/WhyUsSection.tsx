import React from "react";
import { motion } from "motion/react";
import { WHY_US_FEATURES } from "../data";
import { Users, GraduationCap, Target, Clock, TrendingUp, CheckCircle, Sparkles } from "lucide-react";

interface WhyUsSectionProps {
  onOpenEnrollment: () => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onOpenEnrollment }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="w-6 h-6 text-purple-700" />;
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-emerald-700" />;
      case "Target":
        return <Target className="w-6 h-6 text-amber-700" />;
      case "Clock":
        return <Clock className="w-6 h-6 text-purple-700" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-emerald-700" />;
      default:
        return <CheckCircle className="w-6 h-6 text-purple-700" />;
    }
  };

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-purple-50 border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          {/*<div className="inline-flex items-center space-x-2 bg-yellow-100 text-amber-900 border border-yellow-300 px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Why Families Choose Us</span>
          </div>*/}
          <h2 className="text-3xl sm:text-4xl font-black text-purple-950 tracking-tight">
            5 Key Reasons Parents & Students Love Brainy Bunch
          </h2>
          <p className="text-purple-900/80 text-base sm:text-lg leading-relaxed font-medium">
            We combine high-caliber subject mentorship with personalized learning plans so every child builds lasting academic confidence and mastery.
          </p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_US_FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.04, translateY: -4 }}
              className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-purple-100 border border-purple-200">
                    {getIcon(feature.iconName)}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-purple-950 block leading-tight">{feature.stat}</span>
                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">{feature.statLabel}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-purple-950 mb-2">
                  {feature.title}
                </h3>

                <p className="text-purple-900/80 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

              {/*<div className="mt-6 pt-4 border-t border-purple-100 flex items-center text-xs font-extrabold text-purple-700 group-hover:translate-x-1 transition-transform">
                <span>Included in every plan</span>
                <span className="ml-1">&rarr;</span>
              </div>*/}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-purple-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-purple-800"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-black text-yellow-200">Experience the Brainy Bunch Difference</h4>
            <p className="text-purple-200 text-sm font-medium">Schedule a free diagnostic consultation for your child in Irving, TX or online.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenEnrollment}
            className="bg-yellow-300 hover:bg-yellow-400 text-purple-950 font-black px-7 py-3.5 rounded-2xl shadow-lg border border-yellow-400 whitespace-nowrap cursor-pointer text-sm"
          >
            Claim Free Assessment
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
