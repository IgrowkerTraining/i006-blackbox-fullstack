import React from "react";
import { useAuth } from "../../hooks/useAuth";

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

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v3.75M9 11L3 15m0 0l6 4M3 15h12a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0015 4.5H3"
    />
  </svg>
);

export interface AppHeaderProps {
  title?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title = "Gestión" }) => {
  const { logout } = useAuth();

  return (
    <div className="flex w-full h-full items-center justify-between px-6 pr-4 bg-transparent min-h-full">
      <h1 className="text-xl font-semibold text-white truncate min-w-0">
        {title}
      </h1>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-800/90 px-3 py-1.5 text-sm font-medium text-white">
          <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
          Sistema Activo
        </span>
        <button
          type="button"
          className="p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Notificaciones"
        >
          <BellIcon />
        </button>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
          aria-label="Cerrar sesión"
        >
          <LogoutIcon />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
