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
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  return (
    <div className={`inline-flex items-center space-x-3 select-none ${className}`}>
      <img
        src="/logo.png"
        alt="Brainy Bunch Learning Academy logo"
        className={`${iconSizes[size]} rounded-full object-cover flex-shrink-0 shadow-md border-2 border-purple-200 group-hover:scale-105 transition-transform duration-300`}
      />

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-black ${titleSizes[size]} tracking-tight leading-none ${
              variant === "dark" ? "text-white" : "text-purple-950"
            }`}
          >
            Brainy Bunch
          </span>
          <span
            className={`text-[11px] sm:text-xs font-bold tracking-wider uppercase block mt-1 ${
              variant === "dark" ? "text-yellow-200" : "text-purple-700"
            }`}
          >
            Learning Academy
          </span>
        </div>
      )}
    </div>
  );
};
