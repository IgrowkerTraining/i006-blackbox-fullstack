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
    <div className="min-h-screen">
      {children}
    </div>
  );
}
