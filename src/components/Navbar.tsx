import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, ShieldCheck, LogIn, UserPlus } from "lucide-react";
import { Logo } from "./Logo";

interface NavbarProps {
  onOpenEnrollment: (subject?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const sections = ["hero", "why-us", "subjects", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "why-us", label: "Why Us" },
    { id: "subjects", label: "Subjects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-purple-100/80"
            : "bg-white/90 backdrop-blur-sm py-4 border-b border-purple-100/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("hero")}
            className="flex items-center text-left cursor-pointer group"
          >
            <Logo size="md" />
          </motion.button>

          <div className="hidden md:flex items-center space-x-2 bg-purple-50 p-1.5 rounded-2xl border border-purple-100">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <motion.button
                  key={link.id}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-purple-900 hover:text-purple-950 hover:bg-yellow-100"
                  }`}
                >
                  {link.label}
                </motion.button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.06, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="bg-white hover:bg-purple-50 text-purple-900 font-bold px-4 py-2.5 rounded-2xl border border-purple-200 transition-all flex items-center cursor-pointer text-sm shadow-sm"
            >
              <LogIn className="w-4 h-4 mr-2 text-purple-700" />
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="bg-yellow-300 hover:bg-yellow-400 text-purple-950 font-black px-5 py-2.5 rounded-2xl shadow-md hover:shadow-lg border border-yellow-400 transition-all flex items-center cursor-pointer text-sm"
            >
              <UserPlus className="w-4 h-4 mr-2 text-purple-900" />
              Sign Up
            </motion.button>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-purple-950 hover:bg-purple-100/80 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/98 backdrop-blur-lg border-b border-purple-200 px-4 pt-3 pb-6 space-y-2 shadow-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  activeSection === link.id
                    ? "bg-purple-100 text-purple-900 font-black border border-purple-200"
                    : "text-slate-700 hover:bg-yellow-50"
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-purple-100 flex flex-col space-y-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                className="w-full bg-white text-purple-900 font-bold py-3 rounded-2xl text-center text-sm border border-purple-200 flex items-center justify-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                className="w-full bg-yellow-300 text-purple-950 font-black py-3 rounded-2xl shadow-md text-center text-sm border border-yellow-400 flex items-center justify-center"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </motion.button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-2 rounded-xl text-xs text-center flex items-center justify-center border border-purple-200"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-purple-700" />
                Staff Portal
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};
