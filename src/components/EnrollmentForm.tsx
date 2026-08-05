import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { format } from "date-fns";
import { EnrollmentData } from "../types";
import { SUBJECTS_LIST } from "../data";
import { AssessmentDatePicker } from "./AssessmentDatePicker";
import { createEnrollment, getConfirmationCode, sanitizeText, validateEnrollmentPayload } from "../lib/enrollmentService";
import { EnrollmentSuccessCard } from "./EnrollmentSuccessCard";
import { Sparkles, CheckCircle2, User, Mail, Phone, GraduationCap, Clock, Send, Loader2, CalendarDays } from "lucide-react";

interface EnrollmentFormProps {
  preselectedSubject?: string;
  preselectedFormat?: "In Person" | "Online" | "Hybrid";
}

export const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ preselectedSubject, preselectedFormat }) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    preselectedSubject ? [preselectedSubject] : ["English"]
  );
  const [assessmentDate, setAssessmentDate] = useState<Date | undefined>(undefined);
  const [assessmentTime, setAssessmentTime] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<EnrollmentData, "subject" | "subjects" | "assessmentDate" | "assessmentTime">>({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    childName: "",
    childGrade: "5th Grade",
    format: preselectedFormat || "In Person",
    preferredTime: "Weekday Mornings (8:00 AM – 12:00 PM)",
    notes: "",
  });

  useEffect(() => {
    if (preselectedSubject) {
      setSelectedSubjects((prev) =>
        prev.includes(preselectedSubject) ? prev : [...prev, preselectedSubject]
      );
    }
    if (preselectedFormat) {
      setFormData((prev) => ({ ...prev, format: preselectedFormat }));
    }
  }, [preselectedSubject, preselectedFormat]);

  const [loading, setLoading] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<EnrollmentData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

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
    "Weekday Mornings (8:00 AM – 12:00 PM)",
    "Weekday Afternoons (12:00 PM – 5:00 PM)",
    "Flexible / Custom Weekdays (Specify in Notes)",
  ];

  const toggleSubject = (title: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (selectedSubjects.length === 0) {
      setErrorMessage("Please select at least one subject.");
      return;
    }

    if (!assessmentDate || !assessmentTime) {
      setErrorMessage("Please select a date and time for your initial assessment.");
      return;
    }

    const payload = {
      parentName: sanitizeText(formData.parentName),
      parentEmail: sanitizeText(formData.parentEmail).toLowerCase(),
      parentPhone: sanitizeText(formData.parentPhone),
      childName: sanitizeText(formData.childName),
      childGrade: sanitizeText(formData.childGrade),
      format: formData.format,
      preferredTime: sanitizeText(formData.preferredTime),
      notes: formData.notes ? sanitizeText(formData.notes) : null,
      subject: sanitizeText(selectedSubjects.join(", ")),
      subjects: selectedSubjects.map(s => sanitizeText(s)),
      assessmentDate: format(assessmentDate, "yyyy-MM-dd"),
      assessmentTime,
      confirmationCode: getConfirmationCode(formData.childName),
    };

    const validationErrors = validateEnrollmentPayload(payload);
    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors[0]);
      return;
    }

    setLoading(true);

    try {
      const createdEnrollment = await createEnrollment(payload);
      setSubmittedResult(createdEnrollment);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="enroll" className="mt-12 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-purple-200 shadow-xl p-6 sm:p-10 relative">
      <div className="max-w-3xl mx-auto">

        <div className="text-center space-y-2 mb-8">
          {/* <div className="inline-flex items-center space-x-2 bg-yellow-100 text-amber-900 border border-yellow-300 px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Fast & Easy Application</span>
          </div> */}
        </div>

        {!submittedResult && (
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-purple-950">
              Enroll Your Child in Brainy Bunch
            </h3>
            <p className="text-purple-900/80 text-xs sm:text-sm font-medium">
              Fill out the simple form below. Our director in Irving will contact you within 24 hours to confirm your child's schedule.
            </p>
          </div>
        )}

        {submittedResult ? (
          <EnrollmentSuccessCard
            enrollment={submittedResult}
            onReset={() => setSubmittedResult(null)}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-bold">
                {errorMessage}
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center pb-2 border-b border-purple-200">
                <User className="w-4 h-4 mr-1.5 text-purple-700" /> 1. Parent or Guardian Details
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

            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center pb-2 border-b border-purple-200">
                <GraduationCap className="w-4 h-4 mr-1.5 text-purple-700" /> 2. Student & Class Details
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
                  <label className="block text-xs font-bold text-purple-950 mb-2">
                    Subjects Requested * <span className="font-normal text-purple-700">(select one or more)</span>
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {SUBJECTS_LIST.map((sub) => {
                      const isSelected = selectedSubjects.includes(sub.title);
                      return (
                        <label
                          key={sub.id}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors text-sm font-medium ${
                            isSelected
                              ? "bg-purple-100 border-purple-400 text-purple-950"
                              : "bg-white border-purple-200 text-purple-900 hover:bg-purple-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSubject(sub.title)}
                            className="rounded border-purple-300 text-purple-700 focus:ring-purple-500"
                          />
                          {sub.title}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center pb-2 border-b border-purple-200">
                <Clock className="w-4 h-4 mr-1.5 text-purple-700" /> 3. Session Format & Schedule
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">Format Preference *</label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value as EnrollmentData["format"] })}
                    className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-950 font-bold"
                  >
                    <option value="In Person">In Person</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">Preferred Time Window (Weekdays Only)</label>
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

            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center pb-2 border-b border-purple-200">
                <CalendarDays className="w-4 h-4 mr-1.5 text-purple-700" /> 4. Schedule Initial Assessment
              </h4>
              <p className="text-xs text-purple-800/80 font-medium">
                Choose a weekday and time for your child's free initial assessment. Our team will confirm availability within 24 hours.
              </p>
              <AssessmentDatePicker
                selectedDate={assessmentDate}
                selectedTime={assessmentTime}
                onDateChange={setAssessmentDate}
                onTimeChange={setAssessmentTime}
              />
              {assessmentDate && assessmentTime && (
                <p className="text-xs text-purple-900 font-semibold">
                  Selected: {format(assessmentDate, "EEEE, MMMM d, yyyy")} at {assessmentTime}
                </p>
              )}
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                id="submit-enrollment-btn"
                className="w-full bg-yellow-300 hover:bg-yellow-400 text-purple-950 font-black text-base py-4 rounded-2xl shadow-md hover:shadow-xl border border-yellow-400 transition-all flex items-center justify-center cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin text-purple-950" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 text-purple-950" />
                    Submit Enrollment Request
                  </>
                )}
              </motion.button>
              <p className="text-[11px] text-purple-800/70 text-center mt-2 font-medium">
                Confidential application • Brainy Bunch Learning Academy Irving, TX
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
