import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { SubjectsSection } from "./components/SubjectsSection";
import { ContactSection } from "./components/ContactSection";
import { AdminModal } from "./components/AdminModal";
import { Footer } from "./components/Footer";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);
  const [selectedFormat, setSelectedFormat] = useState<"In-Person" | "Online Live" | "1-on-1 Dedicated" | undefined>(undefined);

  const handleOpenEnrollment = (subject?: string, format?: "In-Person" | "Online Live" | "1-on-1 Dedicated") => {
    if (subject) setSelectedSubject(subject);
    if (format) setSelectedFormat(format);

    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreSubjects = () => {
    const el = document.getElementById("subjects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-purple-950 font-sans antialiased selection:bg-yellow-200 selection:text-purple-950">
      
      {/* Sticky Navigation Header */}
      <Navbar
        onOpenEnrollment={(subj) => handleOpenEnrollment(subj)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main>
        {/* Subsection 1: Home (Hero) */}
        <HeroSection
          onOpenEnrollment={() => handleOpenEnrollment()}
          onExploreSubjects={handleExploreSubjects}
        />

        {/* Subsection 2: Why Us */}
        <WhyUsSection
          onOpenEnrollment={() => handleOpenEnrollment()}
        />

        {/* Subsection 3: Subjects (5 Core Classes) */}
        <SubjectsSection
          onSelectSubjectForEnrollment={(subjTitle) => handleOpenEnrollment(subjTitle)}
        />

        {/* Subsection 4: Contact & Enrollment */}
        <ContactSection
          preselectedSubject={selectedSubject}
          preselectedFormat={selectedFormat}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenEnrollment={() => handleOpenEnrollment()}
      />

      {/* Backend Enrollment Data Management Modal for Academy Staff */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
