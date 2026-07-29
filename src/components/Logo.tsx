import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = true,
  variant = "light",
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  const subtitleSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <div className={`inline-flex items-center space-x-3 select-none ${className}`}>
      {/* SVG Cute Brainy Mascot Logo with Pastel Colors (Yellow #FDE047, Purple #C084FC, Green #86EFAC) */}
      <div
        className={`${iconSizes[size]} rounded-2xl bg-gradient-to-br from-purple-200 via-yellow-100 to-green-200 p-1.5 shadow-md border-2 border-purple-300/60 flex items-center justify-center flex-shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Soft Pastel Circle */}
          <circle cx="50" cy="50" r="45" fill="#F3E8FF" stroke="#C084FC" strokeWidth="3" />
          
          {/* Open Book Base (Pastel Green) */}
          <path
            d="M 22 68 Q 50 62 50 78 Q 50 62 78 68 L 78 82 Q 50 76 50 86 Q 50 76 22 82 Z"
            fill="#86EFAC"
            stroke="#16A34A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 50 78 L 50 86"
            stroke="#15803D"
            strokeWidth="2.5"
          />

          {/* Cute Owl / Brainy Character Body (Pastel Purple & Pastel Yellow) */}
          <ellipse cx="50" cy="52" rx="22" ry="20" fill="#E9D5FF" stroke="#A855F7" strokeWidth="2.5" />
          {/* Chest Oval (Pastel Yellow) */}
          <ellipse cx="50" cy="56" rx="13" ry="12" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />

          {/* Big Wise Glasses & Eyes */}
          {/* Left Eye Glasses Frame */}
          <circle cx="41" cy="46" r="8" fill="white" stroke="#7E22CE" strokeWidth="2.5" />
          <circle cx="41" cy="46" r="3.5" fill="#3B0764" />
          <circle cx="42.5" cy="44.5" r="1.2" fill="white" />

          {/* Right Eye Glasses Frame */}
          <circle cx="59" cy="46" r="8" fill="white" stroke="#7E22CE" strokeWidth="2.5" />
          <circle cx="59" cy="46" r="3.5" fill="#3B0764" />
          <circle cx="60.5" cy="44.5" r="1.2" fill="white" />

          {/* Glasses Bridge */}
          <path d="M 49 46 L 51 46" stroke="#7E22CE" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cute Beak (Pastel Yellow/Orange) */}
          <polygon points="50,52 46,57 54,57" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />

          {/* Graduation Cap (Dark Purple & Gold Tassel) */}
          <path d="M 50 20 L 74 30 L 50 38 L 26 30 Z" fill="#581C87" stroke="#3B0764" strokeWidth="2" />
          <rect x="42" y="32" width="16" height="7" rx="2" fill="#6B21A8" />
          {/* Gold Tassel (Pastel Yellow) */}
          <path d="M 50 30 Q 64 32 68 42" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="68" cy="43" r="2.5" fill="#EAB308" />

          {/* Sparkles (Pastel Yellow) */}
          <path d="M 18 28 L 20 22 L 22 28 L 28 30 L 22 32 L 20 38 L 18 32 L 12 30 Z" fill="#FACC15" />
          <path d="M 80 24 L 81.5 19 L 83 24 L 88 25.5 L 83 27 L 81.5 32 L 80 27 L 75 25.5 Z" fill="#FACC15" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-black ${titleSizes[size]} tracking-tight leading-none ${
              variant === "dark" ? "text-white" : "text-purple-950"
            }`}
          >
            Brainy Bunch
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-amber-600 tracking-wider uppercase block mt-1">
            Learning Academy
          </span>
        </div>
      )}
    </div>
  );
};
