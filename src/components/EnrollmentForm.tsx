import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { EnrollmentData } from "../types";
import { SUBJECTS_LIST, ACADEMY_INFO } from "../data";
import { Sparkles, CheckCircle2, User, Mail, Phone, GraduationCap, Clock, Send, Loader2, Copy, Check } from "lucide-react";

interface EnrollmentFormProps {
  preselectedSubject?: string;
  preselectedFormat?: "In-Person" | "Online Live" | "1-on-1 Dedicated";
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ preselectedSubject, preselectedFormat }) => {
  const [formData, setFormData] = useState<EnrollmentData>({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    childName: "",
    childGrade: "5th Grade",
    subject: preselectedSubject || "English",
    format: preselectedFormat || "In-Person",
    preferredTime: "Weekday Afternoons (4:00 PM - 6:00 PM)",
    notes: "",
  });

  useEffect(() => {
    if (preselectedSubject) {
      setFormData((prev) => ({ ...prev, subject: preselectedSubject }));
    }
    if (preselectedFormat) {
      setFormData((prev) => ({ ...prev, format: preselectedFormat }));
    }
  }, [preselectedSubject, preselectedFormat]);

  const [loading, setLoading] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<EnrollmentData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  const gradeOptions = [
    "Kindergarten",
    "1st Grade",
    "2nd Grade",
    "3rd Grade",
    "4th Grade",
    "5th Grade",
    "6th Grade",
    "7th Grade",
    "8th Grade",
  ];

  const timeOptions = [
    "Weekday Afternoons (3:00 PM – 5:00 PM)",
    "Weekday Evenings (5:00 PM – 8:00 PM)",
    "Saturday Mornings (9:00 AM – 12:00 PM)",
    "Saturday Afternoons (1:00 PM – 5:00 PM)",
    "Flexible / Custom Days",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit enrollment application.");
      }

      setSubmittedResult(resData.enrollment);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (submittedResult?.confirmationCode) {
      navigator.clipboard.writeText(submittedResult.confirmationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div id="enroll" className="mt-12 bg-white rounded-3xl border-2 border-purple-200 shadow-xl p-6 sm:p-10 relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-amber-900 border border-yellow-300 px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Fast & Easy Application</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-purple-950">
            Enroll Your Child in Brainy Bunch
          </h3>
          <p className="text-purple-900/80 text-xs sm:text-sm font-medium">
            Fill out the simple form below. Our director in Irving will contact you within 24 hours to confirm your child's schedule.
          </p>
        </div>

        {submittedResult ? (
          /* Confirmation Celebration State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-4"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-700 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-black text-emerald-700 uppercase tracking-widest block mb-1">Application Submitted!</span>
              <h4 className="text-2xl sm:text-3xl font-black text-purple-950">
                Welcome to Brainy Bunch, {submittedResult.childName}!
              </h4>
              <p className="text-purple-900/80 text-sm max-w-md mx-auto mt-2 font-medium">
                We have received your enrollment request. Our director will call you at <strong className="text-purple-950 font-bold">{submittedResult.parentPhone}</strong> shortly.
              </p>
            </div>

            {/* Confirmation Code Card */}
            <div className="bg-purple-950 text-white rounded-2xl p-5 max-w-md mx-auto space-y-2 border border-purple-800 shadow-md">
              <span className="text-xs text-purple-300 uppercase tracking-wider block font-bold">Official Confirmation ID</span>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl font-black tracking-wider text-amber-300 font-mono">
                  {submittedResult.confirmationCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 bg-purple-800 hover:bg-purple-700 text-purple-200 rounded-lg transition-colors text-xs flex items-center cursor-pointer"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Summary details */}
            <div className="bg-yellow-50/80 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2 text-xs text-purple-950 border border-yellow-200 font-medium">
              <p><strong>Parent Name:</strong> {submittedResult.parentName}</p>
              <p><strong>Subject Selected:</strong> {submittedResult.subject}</p>
              <p><strong>Grade Level:</strong> {submittedResult.childGrade}</p>
              <p><strong>Format Preference:</strong> {submittedResult.format}</p>
              <p><strong>Preferred Time:</strong> {submittedResult.preferredTime}</p>
              <p><strong>Hourly Rate:</strong> <span className="text-amber-800 font-bold">${ACADEMY_INFO.hourlyRate}/hr</span></p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubmittedResult(null)}
                className="bg-purple-950 hover:bg-purple-900 text-white font-black py-3 px-6 rounded-2xl text-sm transition-colors cursor-pointer shadow"
              >
                Submit Another Application
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Enrollment Application Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-bold">
                {errorMessage}
              </div>
            )}

            {/* Section 1: Parent Info */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center pb-2 border-b border-purple-100">
                <User className="w-4 h-4 mr-1.5 text-amber-600" /> 1. Parent or Guardian Details
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">Parent Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">Parent Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. jane@example.com"
                      value={formData.parentEmail}
                      onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-medium"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-purple-950 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (972) 555-0199"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Student & Subject Info */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-black text-purple-800 uppercase tracking-wider flex items-center pb-2 border-b border-purple-100">
                <GraduationCap className="w-4 h-4 mr-1.5 text-purple-600" /> 2. Student & Class Details
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">Child's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Doe"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">Grade Level *</label>
                  <select
                    value={formData.childGrade}
                    onChange={(e) => setFormData({ ...formData, childGrade: e.target.value })}
                    className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-bold"
                  >
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-purple-950 mb-1">Subject / Class Requested *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-bold"
                  >
                    {SUBJECTS_LIST.map((sub) => (
                      <option key={sub.id} value={sub.title}>
                        {sub.title} ({sub.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Preference & Notes */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center pb-2 border-b border-purple-100">
                <Clock className="w-4 h-4 mr-1.5 text-emerald-600" /> 3. Session Format & Schedule
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">Format Preference *</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-bold"
                  >
                    <option value="In-Person">In-Person (Irving Campus)</option>
                    <option value="Online Live">Online Live Interactive</option>
                    <option value="1-on-1 Dedicated">1-on-1 Dedicated Sessions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">Preferred Time Window</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-bold"
                  >
                    {timeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-purple-950 mb-1">
                    Notes or Specific Learning Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention any specific topics or goals your child needs help with..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button with Hover Magnification */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                id="submit-enrollment-btn"
                className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-purple-950 font-black text-base py-4 rounded-2xl shadow-md hover:shadow-xl border border-amber-300 transition-all flex items-center justify-center cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin text-purple-950" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 text-purple-950" />
                    Submit Enrollment Request ($25/hr Flat Rate)
                  </>
                )}
              </motion.button>
              <p className="text-[11px] text-purple-800/70 text-center mt-2 font-medium">
                🔒 Confidential application • Brainy Bunch Learning Academy Irving, TX
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
