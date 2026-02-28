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
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            {icon}
          </div>
        )}
        {iconOnRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 
            ${iconOnLeft ? "pl-10" : ""} 
            ${iconOnRight ? "pr-10" : ""}
            text-slate-200 placeholder:text-slate-600
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
            transition-all duration-200
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
