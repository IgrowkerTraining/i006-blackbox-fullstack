import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "./AppHeader";
import Sidebar from "./sidebar/Sidebar";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard Operativo",
  "/choferes": "Gestión de Choferes",
  "/flota": "Gestión de Flota",
  "/historial": "Gestión de Eventos",
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const title =
    routeTitles[pathname] ??
    (pathname.startsWith("/choferes/") ? routeTitles["/choferes"] : null) ??
    (pathname.startsWith("/flota/") ? routeTitles["/flota"] : null) ??
    (pathname.startsWith("/historial/") ? routeTitles["/historial"] : null) ??
    "Gestión";

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <aside className="hidden lg:flex w-56 flex-shrink-0 flex-col h-full min-h-0 overflow-hidden">
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col min-h-0">
        <header className="sticky top-0 z-10 flex h-14 flex-shrink-0 items-stretch rounded-lg bg-blackbox-green shadow-sm">
          <AppHeader title={title} onToggleSidebar={toggleSidebar} />
        </header>
        <main className="min-h-0 flex-1 overflow-auto p-6 bg-main">
          {children}
        </main>
      </div>

      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
        aria-hidden
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 bg-main-dark transform transition-transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Menú lateral"
      >
        <Sidebar />
      </aside>
    </div>
  );
};

export default AppLayout;
