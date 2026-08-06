import React from "react";
import { motion } from "motion/react";
import { ACADEMY_INFO } from "../data";
import { Phone, MapPin, Clock } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-yellow-50 text-purple-950 relative border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-10"
        >
          {/**<div className="inline-flex items-center space-x-2 bg-yellow-100 text-amber-900 border border-yellow-300 px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Contact & Enrollment</span>
          </div>*/}
          <h2 className="text-3xl sm:text-4xl font-black text-purple-950 tracking-tight">
            Get in Touch or Enroll Your Child
          </h2>
          <p className="text-purple-900/80 text-sm sm:text-base font-medium">
            Have questions or ready to register? Give us a call or submit an enrollment form by signing up.
          </p>
        </motion.div>

        {/* Contact Info Cards Bar (Phone numbers, Hours) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">
          
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
              <p className="text-xs text-purple-900/80 mt-1 font-medium">Mon-Fri: 8AM - 5PM</p>
              <p className="text-xs text-purple-900/80 font-medium">Weekday sessions only</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
