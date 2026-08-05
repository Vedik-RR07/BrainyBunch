import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { WhyUsSection } from "./WhyUsSection";
import { SubjectsSection } from "./SubjectsSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

export default function HomePage() {
  const navigate = useNavigate();

  const handleOpenEnrollment = (subject?: string, format?: "In Person" | "Online" | "Hybrid") => {
    navigate("/signup", { state: { preselectedSubject: subject, preselectedFormat: format } });
  };

  const handleExploreSubjects = () => {
    const el = document.getElementById("subjects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-purple-950 font-sans antialiased selection:bg-yellow-200 selection:text-purple-950">
      <Navbar
        onOpenEnrollment={(subj) => handleOpenEnrollment(subj)}
        onOpenAdmin={() => navigate("/admin/login")}
        onOpenSignUp={() => navigate("/signup")}
      />

      <main>
        <HeroSection onOpenEnrollment={() => handleOpenEnrollment()} onExploreSubjects={handleExploreSubjects} />
        <WhyUsSection onOpenEnrollment={() => handleOpenEnrollment()} />
        <SubjectsSection onSelectSubjectForEnrollment={(subjTitle) => handleOpenEnrollment(subjTitle)} />
        <ContactSection />
      </main>

      <Footer onOpenAdmin={() => navigate("/admin/login")} onOpenEnrollment={() => handleOpenEnrollment()} />
    </div>
  );
}
