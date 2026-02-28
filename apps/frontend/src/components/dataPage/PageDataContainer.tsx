import React from "react";

export interface PageDataContainerProps {
  title: string;
  filters?: React.ReactNode;
  /** "inline" = título y filtros en la misma fila (default). "stacked" = título arriba, filtros en fila debajo. */
  filterLayout?: "inline" | "stacked";
  children: React.ReactNode;
  pagination?: React.ReactNode;
}

export const PageDataContainer: React.FC<PageDataContainerProps> = ({
  title,
  filters,
  filterLayout = "inline",
  children,
  pagination,
}) => {
  const isStacked = filterLayout === "stacked";

  return (
    <div className="bg-white border border-slate-200 overflow-hidden">
      <div className="p-6 space-y-6">
        {isStacked ? (
          <>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            {filters && (
              <div className="flex flex-wrap items-center gap-3 min-w-0">
                {filters}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            {filters && (
              <div className="flex flex-wrap items-center gap-3 min-w-0">
                {filters}
              </div>
            )}
          </div>
        )}

        <div className="min-w-0">{children}</div>

        {pagination && <div className="flex justify-center">{pagination}</div>}
      </div>
    </div>
  );
};

export default PageDataContainer;
