import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { SubjectsSection } from "./components/SubjectsSection";
import { ContactSection } from "./components/ContactSection";
import { AdminModal } from "./components/AdminModal";
import { Footer } from "./components/Footer";
import SignUpPage from "./components/SignUpPage";

type ActivePage = "home" | "signup";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);
  const [selectedFormat, setSelectedFormat] = useState<"In Person" | "Online" | "Hybrid" | undefined>(undefined);

  const handleOpenEnrollment = (subject?: string, format?: "In Person" | "Online" | "Hybrid") => {
    if (subject) setSelectedSubject(subject);
    if (format) setSelectedFormat(format);

    // Redirect user to the Sign Up page which now holds the Enrollment form
    setActivePage("signup");
  };

  const handleExploreSubjects = () => {
    const el = document.getElementById("subjects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-purple-950 font-sans antialiased selection:bg-yellow-200 selection:text-purple-950">

      {/* Auth pages overlay */}
      {activePage === "signup" && (
        <SignUpPage
          onBack={() => setActivePage("home")}
          preselectedSubject={selectedSubject}
          preselectedFormat={selectedFormat}
        />
      )}

      {/* Sticky Navigation Header */}
      <Navbar
        onOpenEnrollment={(subj) => handleOpenEnrollment(subj)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSignUp={() => setActivePage("signup")}
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
        <ContactSection />
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
