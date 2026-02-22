import React from "react";

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
    <div className={`min-h-screen bg-slate-950 text-slate-200 ${className}`}>
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        {header === undefined ? (
          <div className="px-4 py-3">
            <span className="text-sm text-slate-400">Header placeholder</span>
          </div>
        ) : (
          header
        )}
      </header>

      <div className="flex min-h-[calc(100vh-56px)]">
        {sidebar === null ? null : (
          <aside className="hidden w-64 border-r border-slate-800 md:block">
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

        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;