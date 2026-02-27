import React from "react";
import { Link } from "react-router-dom";

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  active = false,
  to,
  href,
  onClick,
  className = "",
}) => {
  const baseStyles =
    "flex items-center gap-3 w-full text-left font-medium transition-colors duration-200";
  const activeStyles = active
    ? "bg-[#4E63A8]/50 text-white py-[35px] px-[30px]"
    : "bg-slate-900 text-white hover:bg-slate-800 px-4 py-[35px]";

  const content = (
    <>
      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-current">
        {icon}
      </span>
      <span>{label}</span>
    </>
  );

  if (to !== undefined) {
    return (
      <Link
        to={to}
        className={`${baseStyles} ${activeStyles} ${className}`}
        aria-current={active ? "page" : undefined}
      >
        {content}
      </Link>
    );
  }

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${activeStyles} ${className}`}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${activeStyles} ${className}`}
    >
      {content}
    </button>
  );
};

export default MenuItem;
