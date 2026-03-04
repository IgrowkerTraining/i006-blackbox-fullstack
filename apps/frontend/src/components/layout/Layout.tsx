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
  const hasSidebar = sidebar !== null;

  return (
    <div
      className={`min-h-screen flex flex-col bg-[var(--page)] text-slate-200 ${className}`}
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-10 h-14 flex-shrink-0 border-b border-slate-800 bg-slate-950 overflow-hidden">
        {header === undefined ? (
          <div className="px-4 py-3 flex items-center h-full">
            <span className="text-sm text-slate-400">Header placeholder</span>
          </div>
        ) : (
          header
        )}
      </header>

      {/* ── Body (sidebar + main) ── */}
      {/* flex-1 + flex-row makes sidebar and main sit side by side */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        {hasSidebar && (
          <aside className="hidden md:flex flex-col w-64 flex-shrink-0 min-h-0 border-r border-slate-800 bg-slate-950 overflow-y-auto">
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

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 overflow-auto p-4 h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

/* ─────────────────────────────────────────── */

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/choferes": "Gestión de Choferes",
  "/flota": "Flota",
  "/historial": "Historial",
  "/blackbox-engine": "BlackBox Engine",
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