import React from 'react';
import isotipoBlackbox from "@/src/assets/Isotipos/isotipo_blackbox.png";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  inline?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
  className = '',
  inline = false,
}) => {
  const wrapperClass = inline
    ? `py-8 flex items-center justify-center ${className}`
    : `min-h-screen bg-[#151a10] flex items-center justify-center ${className}`;

  return (
    <div className={wrapperClass}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          {/* Anillo animado */}
          <div className="absolute w-20 h-20 rounded-full border-4 border-transparent border-t-[#f5c518] animate-spin" />
          {/* Logo */}
          <img
            src={isotipoBlackbox}
            alt="BlackBox"
            className="w-12 h-12 object-contain"
          />
        </div>
        <p className="text-[#a0a890] text-sm font-medium tracking-wide">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;