import React from "react";

export interface MenuSectionProps {
  label: string;
  className?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  label,
  className = "",
}) => {
  return (
    <div
      className={`px-4 pt-6 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 ${className}`}
      role="presentation"
    >
      {label}
    </div>
  );
};

export default MenuSection;
