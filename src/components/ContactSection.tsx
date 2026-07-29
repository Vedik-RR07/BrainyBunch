import React, { useState } from "react";
import { motion } from "motion/react";
import { ACADEMY_INFO } from "../data";
import { Phone, MapPin, Clock, Send, CheckCircle2, Loader2, Sparkles, UserCheck } from "lucide-react";
import { EnrollmentForm } from "./EnrollmentForm";

interface ContactSectionProps {
  preselectedSubject?: string;
  preselectedFormat?: "In-Person" | "Online Live" | "1-on-1 Dedicated";
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedSubject, preselectedFormat }) => {
  const [activeTab, setActiveTab] = useState<"enrollment" | "message">("enrollment");
  
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to send message.");
      }

      setSuccess(true);
      setContactForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-purple-50/60 via-yellow-50/40 to-emerald-50/60 text-purple-950 relative border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-10"
        >
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-amber-900 border border-yellow-300 px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Contact & Enrollment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-purple-950 tracking-tight">
            Get in Touch or Enroll Your Child
          </h2>
          <p className="text-purple-900/80 text-sm sm:text-base font-medium">
            Have questions or ready to register? Give us a call, send a quick message, or submit an enrollment form below.
          </p>
        </motion.div>

        {/* Contact Info Cards Bar (Phone numbers, Location, Hours, Rate) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          {/* Phone Numbers */}
          <motion.div
            whileHover={{ scale: 1.04, translateY: -3 }}
            className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm flex items-start space-x-3"
          >
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-purple-950 block font-black text-sm">Phone Lines:</strong>
              <p className="text-xs text-purple-900 mt-1 font-semibold">
                <a href={`tel:${ACADEMY_INFO.primaryPhone}`} className="hover:text-amber-700 underline">{ACADEMY_INFO.primaryPhone}</a>
              </p>
              <p className="text-xs text-purple-900 font-semibold">
                <a href={`tel:${ACADEMY_INFO.secondaryPhone}`} className="hover:text-amber-700 underline">{ACADEMY_INFO.secondaryPhone}</a>
              </p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            whileHover={{ scale: 1.04, translateY: -3 }}
            className="bg-white rounded-3xl p-5 border-2 border-purple-200 shadow-sm flex items-start space-x-3"
          >
            <div className="p-2.5 bg-purple-100 text-purple-800 rounded-2xl flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-purple-950 block font-black text-sm">Irving Academy Location:</strong>
              <p className="text-xs text-purple-900/80 mt-1 font-medium leading-snug">
                {ACADEMY_INFO.locationFull}
              </p>
            </div>
          </motion.div>

          {/* Operating Hours */}
          <motion.div
            whileHover={{ scale: 1.04, translateY: -3 }}
            className="bg-white rounded-3xl p-5 border-2 border-yellow-200 shadow-sm flex items-start space-x-3"
          >
            <div className="p-2.5 bg-yellow-100 text-amber-800 rounded-2xl flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-purple-950 block font-black text-sm">Hours:</strong>
              <p className="text-xs text-purple-900/80 mt-1 font-medium">Mon-Fri: 3PM - 8PM</p>
              <p className="text-xs text-purple-900/80 font-medium">Sat: 9AM - 5PM</p>
            </div>
          </motion.div>

          {/* Rate Badge */}
          <motion.div
            whileHover={{ scale: 1.04, translateY: -3 }}
            className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-3xl p-5 border-2 border-yellow-300 shadow-sm flex items-start space-x-3"
          >
            <div className="p-2.5 bg-amber-200 text-amber-900 rounded-2xl flex-shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-amber-950 block font-black text-sm">Transparent Rate:</strong>
              <span className="text-2xl font-black text-purple-950 block">${ACADEMY_INFO.hourlyRate} / hr</span>
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">No Fine Print</span>
            </div>
          </motion.div>

        </div>

        {/* Tab Switcher: Enrollment Form vs Quick Message Form */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-purple-100 p-1.5 rounded-2xl border border-purple-200 shadow-sm">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab("enrollment")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === "enrollment"
                  ? "bg-purple-950 text-white shadow"
                  : "text-purple-900 hover:text-purple-950"
              }`}
            >
              📝 Student Enrollment Form
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab("message")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTab === "message"
                  ? "bg-purple-950 text-white shadow"
                  : "text-purple-900 hover:text-purple-950"
              }`}
            >
              💬 Send Us A Message
            </motion.button>
          </div>
        </div>

        {/* Dynamic Subsection Content */}
        {activeTab === "enrollment" ? (
          <EnrollmentForm
            preselectedSubject={preselectedSubject}
            preselectedFormat={preselectedFormat}
          />
        ) : (
          <div className="max-w-2xl mx-auto bg-white border-2 border-purple-200 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-black text-purple-950 mb-2">Send A Quick Message</h3>
            <p className="text-purple-900/80 text-xs sm:text-sm mb-6 font-medium">
              Have questions about schedules, custom tutoring arrangements, or diagnostic testing?
            </p>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-purple-950">Message Sent Successfully!</h4>
                <p className="text-purple-900/80 text-xs font-medium">
                  Thank you for reaching out. A representative from Brainy Bunch Academy will get back to you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-purple-950 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm text-purple-950 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-950 mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm text-purple-950 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-purple-950 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="(972) 555-0199"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm text-purple-950 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-950 mb-1">Inquiry Subject</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm text-purple-950 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="In-Person Facility Visit">In-Person Facility Visit</option>
                      <option value="Online Tutoring Help">Online Tutoring Help</option>
                      <option value="Diagnostic Assessment">Diagnostic Assessment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help your child excel?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-3.5 bg-purple-50/50 border border-purple-200 rounded-xl text-sm text-purple-950 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-purple-950 font-black py-3 rounded-2xl text-sm transition-all shadow border border-amber-300 cursor-pointer flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Send Inquiry Message
                </motion.button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
