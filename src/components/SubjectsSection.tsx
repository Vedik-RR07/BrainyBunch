import React, { useState } from "react";
import { motion } from "motion/react";
import { SUBJECTS_LIST } from "../data";
import {
  Calculator,
  Atom,
  BookOpen,
  Globe,
  PenTool,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface SubjectsSectionProps {
  onSelectSubjectForEnrollment: (subjectTitle: string) => void;
}

export const SubjectsSection: React.FC<SubjectsSectionProps> = ({ onSelectSubjectForEnrollment }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Language Arts", "STEM Focus", "Humanities"];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-6 h-6" />;
      case "PenTool":
        return <PenTool className="w-6 h-6" />;
      case "Calculator":
        return <Calculator className="w-6 h-6" />;
      case "Globe":
        return <Globe className="w-6 h-6" />;
      case "Atom":
        return <Atom className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  const filteredSubjects = SUBJECTS_LIST.filter((sub) => {
    const matchesCategory = selectedCategory === "All" || sub.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <section id="subjects" className="py-16 sm:py-24 bg-green-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          {/**<div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-900 border border-purple-300 px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>5 Primary Classes & Programs</span>
          </div>*/}
          <h2 className="text-3xl sm:text-4xl font-black text-purple-950 tracking-tight">
            Core Subjects Offered for K-8 Students
          </h2>
          <p className="text-purple-900/80 text-base sm:text-lg leading-relaxed font-medium">
            From elementary basics to middle school acceleration, our personalized tutoring helps students master every concept with ease.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 bg-purple-50 p-4 rounded-3xl border border-purple-200"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-purple-900 text-white shadow-sm"
                  : "bg-white text-purple-900 hover:bg-purple-100 border border-purple-200"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((sub, idx) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, translateY: -4 }}
              className="rounded-3xl p-6 bg-white/70 backdrop-blur-md border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 text-purple-700 shadow-sm">
                    {getSubjectIcon(sub.iconName)}
                  </div>
                  {/* <span className="text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider bg-yellow-100 text-amber-900 border border-yellow-200">
                    {sub.badge}
                  </span> */}
                </div>

                <h3 className="text-xl font-black mb-2 text-purple-950">
                  {sub.title}
                </h3>

                <p className="text-purple-950/80 text-sm leading-relaxed mb-4 font-medium">
                  {sub.description}
                </p>

                <div className="space-y-1.5 mb-6">
                  {sub.keyTopics.map((topic, i) => (
                    <div key={i} className="flex items-center text-xs text-purple-950 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-purple-100 flex items-center justify-end">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectSubjectForEnrollment(sub.title)}
                  className="bg-purple-950 hover:bg-purple-900 text-white font-black text-xs px-4 py-2.5 rounded-2xl transition-all flex items-center cursor-pointer shadow"
                >
                  Enroll Class
                  <ArrowRight className="w-3.5 h-3.5 ml-1 text-yellow-300" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
