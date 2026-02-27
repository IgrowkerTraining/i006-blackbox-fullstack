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
    <div className="min-h-screen flex bg-slate-950 text-slate-900">
      <aside className="hidden w-64 flex-shrink-0 flex flex-col min-h-0 md:flex overflow-hidden">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        <header className="sticky top-0 z-10 h-14 flex-shrink-0 flex items-stretch bg-gradient-to-r from-[#0B0F12] to-[#0E1B0A] shadow-sm rounded-lg">
          <AppHeader title={title} />
        </header>
        <main className="flex-1 min-h-0 p-6 overflow-auto bg-slate-100 text-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
