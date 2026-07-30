import React from "react";
import { FORMATS_LIST } from "../data";
import { Building2, Video, UserCheck, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

interface FormatsSectionProps {
  onOpenEnrollmentWithFormat: (formatName: "In Person" | "Online" | "Hybrid") => void;
}

export const FormatsSection: React.FC<FormatsSectionProps> = ({ onOpenEnrollmentWithFormat }) => {
  const getFormatIcon = (iconName: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="w-7 h-7 text-blue-600" />;
      case "Video":
        return <Video className="w-7 h-7 text-purple-600" />;
      case "UserCheck":
        return <UserCheck className="w-7 h-7 text-amber-600" />;
      default:
        return <Building2 className="w-7 h-7 text-blue-600" />;
    }
  };

  const getFormatEnum = (title: string): "In Person" | "Online" | "Hybrid" => {
    if (title.includes("In-Person")) return "In Person";
    if (title.includes("Online")) return "Online";
    return "Hybrid";
  };

  return (
    <section id="formats" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>3 Flexible Ways To Learn</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tailored Session Formats Built Around Your Child
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Choose the environment where your child feels most confident and productive. Mix & match formats anytime!
          </p>
        </div>

        {/* Formats Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {FORMATS_LIST.map((format) => (
            <div
              key={format.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Header */}
                <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center mb-6 transition-colors shadow-inner">
                  {getFormatIcon(format.iconName)}
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                  {format.tagline}
                </span>

                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {format.title}
                </h3>

                {/* Feature Bullet Points */}
                <div className="space-y-3 mb-6">
                  {format.features.map((feat, i) => (
                    <div key={i} className="flex items-start text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Best For Callout */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 mb-6">
                  <strong className="text-slate-900 font-bold block mb-0.5">Best For:</strong>
                  {format.bestFor}
                </div>
              </div>

              {/* Select Format Button */}
              <button
                onClick={() => onOpenEnrollmentWithFormat(getFormatEnum(format.title))}
                className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm flex items-center justify-center cursor-pointer shadow-md"
              >
                Choose {format.title.split(" ")[0]} Format
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
