import React from 'react';
import { Phone } from 'lucide-react';

const FloatingCallButton = () => {
  const phoneNumber = "+919164112779";

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-6 right-6 z-[9999] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-emerald-400 text-white shadow-2xl transition-all duration-200 hover:scale-110 hover:bg-emerald-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)] active:scale-95 md:bottom-8 md:right-8"
      aria-label="Call Admin"
    >
      <Phone size={28} fill="currentColor" className="text-white" />

      {/* Optional: subtle pulse effect */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-400 opacity-20"></span>
    </a>
  );
};

export default FloatingCallButton;
