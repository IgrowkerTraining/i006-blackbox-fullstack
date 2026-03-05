import React from "react";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string = string>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  options?: SelectOption<T>[];
  children?: React.ReactNode;
}

export const Select = <T extends string = string>({
  label,
  error,
  options,
  children,
  className = "",
  ...props
}: SelectProps<T>) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>
      )}
      <select
        className={`
          w-full rounded border border-slate-300 bg-surface-subtle px-3 py-2 text-sm
          text-slate-800
          focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
          transition-colors
          ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : ""}
          ${className}
        `}
        {...props}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {error && (
        <p className="text-xs text-red-500 mt-0.5 ml-1">{error}</p>
      )}
    </div>
  );
};
