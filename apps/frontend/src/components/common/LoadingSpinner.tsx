import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  /** Si true, no usa min-h-screen; útil dentro de un card o sección */
  inline?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  className = '',
  inline = false,
}) => {
  const wrapperClass = inline
    ? `py-8 flex items-center justify-center ${className}`
    : `min-h-screen bg-slate-950 flex items-center justify-center ${className}`;

  return (
    <div className={wrapperClass}>
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-indigo-600 rounded-full mb-4"></div>
        <p className="text-slate-400 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
