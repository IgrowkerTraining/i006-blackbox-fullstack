import React from "react";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export interface SidebarUserProps {
  name: string;
  role?: string;
  initials?: string;
  avatarUrl?: string;
  className?: string;
}

export const SidebarUser: React.FC<SidebarUserProps> = ({
  name,
  role,
  initials,
  avatarUrl,
  className = "",
}) => {
  const displayInitials = initials ?? getInitials(name);

  return (
    <div
      className={`flex items-center gap-3 border-t border-slate-600 bg-main-dark px-4 py-3 ${className}`}
      role="region"
      aria-label="Información del usuario"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-slate-600"
        />
      ) : (
        <div
          className="w-10 h-10 rounded-full bg-menu-active flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm"
          aria-hidden
        >
          {displayInitials}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white truncate">{name}</p>
        {role ? (
          <p className="text-xs text-slate-400 truncate">{role}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SidebarUser;
