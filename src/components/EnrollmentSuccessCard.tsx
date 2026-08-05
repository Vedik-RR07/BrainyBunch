import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Copy, Check } from "lucide-react";
import type { EnrollmentData } from "../types";

interface EnrollmentSuccessCardProps {
  enrollment: EnrollmentData;
  onReset: () => void;
}

export const EnrollmentSuccessCard: React.FC<EnrollmentSuccessCardProps> = ({ enrollment, onReset }) => {
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleCopyCode = () => {
    if (!enrollment.confirmationCode) return;
    navigator.clipboard.writeText(enrollment.confirmationCode);
    setCopiedCode(true);
    window.setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
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
          Welcome to Brainy Bunch, {enrollment.childName}!
        </h4>
        <p className="text-purple-900/80 text-sm max-w-md mx-auto mt-2 font-medium">
          We have received your enrollment request. Our director will call you at <strong className="text-purple-950 font-bold">{enrollment.parentPhone}</strong> shortly.
        </p>
      </div>

      <div className="bg-purple-950 text-white rounded-2xl p-5 max-w-md mx-auto space-y-2 border border-purple-800 shadow-md">
        <span className="text-xs text-purple-300 uppercase tracking-wider block font-bold">Official Confirmation ID</span>
        <div className="flex items-center justify-center space-x-3">
          <span className="text-2xl font-black tracking-wider text-yellow-200 font-mono">
            {enrollment.confirmationCode}
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

      <div className="bg-yellow-50 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2 text-xs text-purple-950 border border-yellow-200 font-medium">
        <p><strong>Parent Name:</strong> {enrollment.parentName}</p>
        <p><strong>Subjects Selected:</strong> {enrollment.subject}</p>
        <p><strong>Grade Level:</strong> {enrollment.childGrade}</p>
        <p><strong>Format Preference:</strong> {enrollment.format}</p>
        <p><strong>Preferred Time:</strong> {enrollment.preferredTime}</p>
        {enrollment.assessmentDate && enrollment.assessmentTime && (
          <p><strong>Initial Assessment:</strong> {enrollment.assessmentDate} at {enrollment.assessmentTime}</p>
        )}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="bg-purple-950 hover:bg-purple-900 text-white font-black py-3 px-6 rounded-2xl text-sm transition-colors cursor-pointer shadow"
        >
          Submit Another Application
        </motion.button>
      </div>
    </motion.div>
  );
};
