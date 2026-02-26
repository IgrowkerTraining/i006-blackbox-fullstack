import React from "react";

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
    />
  </svg>
);

export interface AppHeaderProps {
  title?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title = "Gestión" }) => {
  return (
    <div className="flex w-full h-full items-center justify-between px-4 bg-slate-950">
      <h1 className="text-xl font-semibold text-white truncate">
        {title}
      </h1>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-800 px-3 py-1.5 text-sm font-medium text-white">
          <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
          Sistema Activo
        </span>
        <button
          type="button"
          className="p-1.5 text-white hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Notificaciones"
        >
          <BellIcon />
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
