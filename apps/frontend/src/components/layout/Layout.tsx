import React from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "./AppHeader";
import Sidebar from "./sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode | null;
  sidebar?: React.ReactNode | null;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  className = "",
  header,
  sidebar,
}) => {
  return (
    <div className={`min-h-screen flex bg-slate-100 text-slate-900 ${className}`}>
      {sidebar === null ? null : (
        <aside className="hidden w-64 flex-shrink-0 flex flex-col min-h-0 md:flex overflow-hidden">
          {sidebar === undefined ? (
            <div className="p-4">
              <span className="text-sm text-slate-400">
                Sidebar placeholder
              </span>
            </div>
          ) : (
            sidebar
          )}
        </aside>
      )}

      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        <header className="sticky top-0 z-10 h-14 flex-shrink-0 flex items-stretch bg-gradient-to-r from-[#0B0F12] to-[#0E1B0A] shadow-sm rounded-lg">
          {header === undefined ? (
            <div className="px-4 py-3 flex items-center h-full">
              <span className="text-sm text-slate-400">Header placeholder</span>
            </div>
          ) : (
            header
          )}
        </header>
        <main className="flex-1 min-h-0 p-6 overflow-auto bg-slate-100 text-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

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

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const title = routeTitles[pathname] ?? "Gestión";

  return (
    <Layout header={<AppHeader title={title} />} sidebar={<Sidebar />}>
      {children}
    </Layout>
  );
};