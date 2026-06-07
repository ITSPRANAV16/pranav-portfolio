import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  id?: string;
}

export default function ContactButton({ onClick, className = '', id }: ContactButtonProps) {
  return (
    <button
      id={id || "contact-me-btn"}
      onClick={onClick}
      className={`relative rounded-full font-medium uppercase tracking-widest text-[#121212] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer select-none focus:outline-none flex items-center justify-center
        px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
        text-xs sm:text-sm md:text-base ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #0EA5E9 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  );
}
