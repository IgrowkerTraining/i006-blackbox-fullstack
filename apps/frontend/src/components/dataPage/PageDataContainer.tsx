import React from "react";

export interface PageDataContainerProps {
  title: string;
  filters?: React.ReactNode;
  children: React.ReactNode;
  pagination?: React.ReactNode;
}

export const PageDataContainer: React.FC<PageDataContainerProps> = ({
  title,
  filters,
  children,
  pagination,
}) => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {filters && (
            <div className="flex flex-wrap items-center gap-3 min-w-0">
              {filters}
            </div>
          )}
        </div>

        <div className="min-w-0">{children}</div>

        {pagination && <div className="flex justify-center">{pagination}</div>}
      </div>
    </div>
  );
};

export default PageDataContainer;
