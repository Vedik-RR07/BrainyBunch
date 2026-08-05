import React from "react";
import { motion } from "motion/react";
import { ACADEMY_INFO } from "../data";
import { Sparkles, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenEnrollment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenEnrollment }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-purple-950 text-purple-200 text-xs border-t border-purple-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-purple-800/80">
          
          {/* Col 1: Logo & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" variant="dark" />

            <p className="text-purple-300 leading-relaxed text-xs font-medium">
              "{ACADEMY_INFO.tagline}" — Serving K-8 students in Irving, Las Colinas, Coppell, and the Dallas area with in-person and live online tutoring.
            </p>

          </div>

          {/* Col 2: Leadership & Founders */}
          <div className="lg:col-span-4 space-y-3 bg-purple-900/60 p-5 rounded-3xl border border-purple-800">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
              Founders & Academic Leadership
            </h4>

            <div className="space-y-2">
              {ACADEMY_INFO.founders.map((founder, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-200 text-purple-950 flex items-center justify-center font-black text-xs flex-shrink-0 border border-yellow-400">
                    {founder.initials}
                  </div>
                  <div>
                    <strong className="text-white font-bold block text-xs">{founder.name}</strong>
                    <span className="text-[10px] text-amber-300 font-semibold block">{founder.role}</span>
                    <p className="text-[11px] text-purple-300 leading-tight mt-0">{founder.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links & Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Academy Information</h4>
            
            <ul className="space-y-2 text-purple-200 font-medium">
              <li className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-2 text-amber-300 flex-shrink-0" />
                {ACADEMY_INFO.locationFull}
              </li>
              <li className="flex items-center">
                <Phone className="w-3.5 h-3.5 mr-2 text-emerald-300 flex-shrink-0" />
                {ACADEMY_INFO.primaryPhone} 
              </li>
              <li className="flex items-center">
                <Mail className="w-3.5 h-3.5 mr-2 text-purple-300 flex-shrink-0" />
                {ACADEMY_INFO.email}
              </li>
            </ul>

            <div className="pt-3 flex flex-wrap gap-2">
              {[
                { id: "hero", label: "Home" },
                { id: "why-us", label: "Why Us" },
                { id: "subjects", label: "Subjects" },
                { id: "contact", label: "Contact" },
              ].map((link) => (
                <motion.button
                  key={link.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(link.id)}
                  className="px-3 py-1 bg-purple-900 hover:bg-purple-800 text-purple-200 rounded-xl text-[11px] font-bold transition-colors cursor-pointer border border-purple-800"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-purple-400 text-[11px] font-medium">
          <p>© {new Date().getFullYear()} Brainy Bunch Learning Academy. All rights reserved. Irving, TX.</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="rounded-2xl bg-yellow-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-950 transition hover:bg-yellow-400"
            >
              Admin Login
            </button>
            <button
              type="button"
              onClick={onOpenEnrollment}
              className="rounded-2xl border border-purple-700 bg-purple-900/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-100 transition hover:bg-purple-800"
            >
              Enroll Now
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
