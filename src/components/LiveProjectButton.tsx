import React from 'react';

interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  id?: string;
}

export default function LiveProjectButton({ onClick, className = '', id }: LiveProjectButtonProps) {
  return (
    <button
      id={id || "live-project-btn"}
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest cursor-pointer select-none transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:scale-105 active:scale-95 focus:outline-none flex items-center justify-center
        px-8 py-3 sm:px-10 sm:py-3.5
        text-sm sm:text-base ${className}`}
    >
      Live Project
    </button>
  );
}
