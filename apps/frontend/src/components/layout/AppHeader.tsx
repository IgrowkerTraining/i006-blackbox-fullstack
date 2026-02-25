import React from "react";

const LogoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8 text-slate-900"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
    />
  </svg>
);

export interface AppHeaderProps {
  title?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title = "Gestión" }) => {
  return (
    <div className="flex w-full h-full">
      <div className="hidden w-64 flex-shrink-0 bg-white border-r border-slate-200 px-4 flex items-center gap-2 md:flex">
        <LogoIcon />
        <span className="text-lg font-bold tracking-tight text-slate-900">
          BLACKBOX
        </span>
      </div>
      <div className="flex-1 flex items-center px-4 py-0 bg-slate-950 border-b border-slate-800 min-h-0">
        <h1 className="text-lg font-semibold text-white truncate">{title}</h1>
      </div>
    </div>
  );
};

export default AppHeader;
