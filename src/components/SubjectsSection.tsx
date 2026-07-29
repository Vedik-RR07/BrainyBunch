import React, { useState } from "react";
import { motion } from "motion/react";
import { SUBJECTS_LIST } from "../data";
import { SubjectItem } from "../types";
import {
  Calculator,
  Atom,
  BookOpen,
  Globe,
  PenTool,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X
} from "lucide-react";

interface SubjectsSectionProps {
  onSelectSubjectForEnrollment: (subjectTitle: string) => void;
}

export const SubjectsSection: React.FC<SubjectsSectionProps> = ({ onSelectSubjectForEnrollment }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalSubject, setActiveModalSubject] = useState<SubjectItem | null>(null);

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
    const matchesSearch =
      sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.keyTopics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || sub.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="subjects" className="py-16 sm:py-24 bg-white border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-900 border border-purple-300 px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>5 Primary Classes & Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-purple-950 tracking-tight">
            Core Subjects Offered for K-8 Students
          </h2>
          <p className="text-purple-900/80 text-base sm:text-lg leading-relaxed font-medium">
            From elementary basics to middle school acceleration, our personalized tutoring helps students master every concept with ease.
          </p>
        </motion.div>

        {/* Search & Category Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-purple-50/50 p-4 rounded-3xl border border-purple-200/80"
        >
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search English, Math, Science..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-purple-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-700 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
          </div>
        </motion.div>

        {/* 5 Core Subjects Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((sub, idx) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, translateY: -4 }}
              className={`rounded-3xl p-6 border-2 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl ${sub.colorTheme.bg} ${sub.colorTheme.border}`}
            >
              <div>
                {/* Header row: Icon + Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-white shadow-sm ${sub.colorTheme.text}`}>
                    {getSubjectIcon(sub.iconName)}
                  </div>
                  <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${sub.colorTheme.badgeBg}`}>
                    {sub.badge}
                  </span>
                </div>

                <h3 className={`text-xl font-black mb-2 ${sub.colorTheme.text}`}>
                  {sub.title}
                </h3>

                <p className="text-purple-950/80 text-sm leading-relaxed mb-4 font-medium">
                  {sub.description}
                </p>

                {/* Key Topics List */}
                <div className="space-y-1.5 mb-6">
                  {sub.keyTopics.map((topic, i) => (
                    <div key={i} className="flex items-center text-xs text-purple-950 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Row with Magnifying Buttons */}
              <div className="pt-4 border-t border-purple-200/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalSubject(sub)}
                  className="text-xs font-bold text-purple-900 hover:text-purple-950 underline underline-offset-2 cursor-pointer"
                >
                  View Details
                </button>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectSubjectForEnrollment(sub.title)}
                  className="bg-purple-950 hover:bg-purple-900 text-white font-black text-xs px-4 py-2.5 rounded-2xl transition-all flex items-center cursor-pointer shadow"
                >
                  Enroll Class
                  <ArrowRight className="w-3.5 h-3.5 ml-1 text-amber-300" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12 bg-purple-50 rounded-3xl border border-purple-200 mt-6">
            <p className="text-purple-900 font-bold text-base">No classes found matching "{searchTerm}".</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-3 text-sm font-extrabold text-amber-700 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Subject Detail Modal */}
      {activeModalSubject && (
        <div className="fixed inset-0 z-50 bg-purple-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-2 border-purple-200"
          >
            <button
              onClick={() => setActiveModalSubject(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-purple-100 text-purple-400 hover:text-purple-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-2xl bg-purple-100 ${activeModalSubject.colorTheme.text}`}>
                {getSubjectIcon(activeModalSubject.iconName)}
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 block">
                  {activeModalSubject.category}
                </span>
                <h3 className="text-2xl font-black text-purple-950">{activeModalSubject.title}</h3>
              </div>
            </div>

            <p className="text-purple-900/80 text-sm leading-relaxed mb-6 font-medium">
              {activeModalSubject.description}
            </p>

            <div className="bg-yellow-50/80 rounded-2xl p-4 border border-yellow-200 mb-6 space-y-2">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Curriculum Highlights:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-purple-950">
                {activeModalSubject.keyTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-purple-100">
              <div className="text-xs text-purple-900 font-bold">
                Rate: <strong className="text-amber-800">$25/hr</strong> • Flat Fee
              </div>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const title = activeModalSubject.title;
                  setActiveModalSubject(null);
                  onSelectSubjectForEnrollment(title);
                }}
                className="bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-purple-950 font-black px-5 py-2.5 rounded-2xl text-sm transition-all shadow-md border border-amber-300 cursor-pointer"
              >
                Enroll in {activeModalSubject.title}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
