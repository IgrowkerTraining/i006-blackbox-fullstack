import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  iconPosition = "left",
  className = "",
  ...props
}) => {
  const iconOnRight = icon && iconPosition === "right";
  const iconOnLeft = icon && iconPosition === "left";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-400 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {iconOnLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors">
            {icon}
          </div>
        )}
        {iconOnRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full rounded border border-slate-300 bg-surface-subtle px-3 py-2 text-sm
            text-slate-800 placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
            transition-colors
            ${iconOnLeft ? "pl-10" : ""}
            ${iconOnRight ? "pr-10" : ""}
            ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5 ml-1">{error}</p>}
    </div>
  );
};
