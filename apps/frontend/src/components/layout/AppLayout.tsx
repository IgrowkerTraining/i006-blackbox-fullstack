import React from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "./AppHeader";
import Sidebar from "./sidebar/Sidebar";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard Operativo",
  "/choferes": "Gestión de Choferes",
  "/flota": "Flota",
  "/historial": "Historial",
  "/blackbox-engine": "BlackBox Engine",
  "/inspeccion/nueva": "Nueva inspección de Activo",
};

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal de la app con sidebar y header. Se usa en todas las rutas protegidas.
 * Las rutas de auth (login, register) usan AuthLayout en su lugar.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const title = routeTitles[pathname] ?? "Gestión";

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <aside className="hidden md:flex w-64 flex-shrink-0 flex-col h-full min-h-0 overflow-hidden">
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col min-h-0">
        <header className="sticky top-0 z-10 flex h-14 flex-shrink-0 items-stretch rounded-lg bg-black shadow-sm">
          <AppHeader title={title} />
        </header>
        <main className="min-h-0 flex-1 overflow-auto p-6 bg-slate-100 text-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
