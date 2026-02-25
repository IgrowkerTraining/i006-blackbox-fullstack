import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { MenuItem } from "./MenuItem";
import { MenuSection } from "./MenuSection";
import { SidebarUser } from "./SidebarUser";

const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const IconFlota = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-1.607-1.274-2.905-2.846-2.905S11.25 4.51 11.25 6.117v.958m0 0v1.5m0-1.5v-.958c0-1.607 1.274-2.905 2.846-2.905S16.5 4.51 16.5 6.117v.958m0 0v1.5m0-1.5h-2.25" />
  </svg>
);

const IconChoferes = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const IconHistorial = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const IconBlackBox = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

function isActive(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(to + "/");
}

export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-full min-h-0 w-64 flex-shrink-0 bg-slate-900">
      <nav className="flex-1 flex flex-col overflow-y-auto py-2 min-h-0">
        <MenuItem
          icon={<IconDashboard />}
          label="Dashboard"
          to="/dashboard"
          active={isActive(pathname, "/dashboard")}
        />
        <MenuItem
          icon={<IconFlota />}
          label="Flota"
          to="/flota"
          active={isActive(pathname, "/flota")}
        />
        <MenuItem
          icon={<IconChoferes />}
          label="Choferes"
          to="/choferes"
          active={isActive(pathname, "/choferes")}
        />
        <MenuItem
          icon={<IconHistorial />}
          label="Historial"
          to="/historial"
          active={isActive(pathname, "/historial")}
        />

        <MenuSection label="INTELIGENCIA" />

        <MenuItem
          icon={<IconBlackBox />}
          label="BlackBox Engine"
          to="/blackbox-engine"
          active={isActive(pathname, "/blackbox-engine")}
        />
      </nav>

      <SidebarUser
        name={user?.name ?? "Usuario"}
        role="Usuario"
        avatarUrl={user?.avatar}
      />
    </div>
  );
};

export default Sidebar;
