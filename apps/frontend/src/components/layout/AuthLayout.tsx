import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout independiente para páginas de autenticación (login, register).
 * No usa el layout de la app; las pantallas de auth quedan sin header ni sidebar.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-200">
      <div className="w-full max-w-md p-4 mx-auto">{children}</div>
    </div>
  );
}
