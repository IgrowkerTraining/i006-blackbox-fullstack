import React from "react";

export type ColumnAlign = "left" | "right" | "center";

export interface DataTableColumn<T> {
  id: string;
  label: string;
  sortable?: boolean;
  align?: ColumnAlign;
  render?: (row: T) => React.ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (columnId: string) => void;
  renderAction?: (row: T) => React.ReactNode;
}

function SortIcon({ direction }: { direction: "asc" | "desc" }) {
  return (
    <span className="inline-flex flex-col ml-1 text-slate-500" aria-hidden>
      <span
        className={`leading-none ${direction === "asc" ? "text-indigo-400" : "opacity-50"}`}
      >
        ▲
      </span>
      <span
        className={`leading-none -mt-0.5 ${direction === "desc" ? "text-indigo-400" : "opacity-50"}`}
      >
        ▼
      </span>
    </span>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  sortColumn,
  sortDirection = "asc",
  onSort,
  renderAction,
}: DataTableProps<T>): React.ReactElement {
  const alignClass = (align?: ColumnAlign) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const getCellContent = (row: T, col: DataTableColumn<T>): React.ReactNode => {
    if (col.render) return col.render(row);
    if (col.accessor) {
      const value =
        typeof col.accessor === "function"
          ? col.accessor(row)
          : row[col.accessor];
      return value != null ? String(value) : "—";
    }
    const fallback = row[col.id as keyof T];
    return fallback != null ? String(fallback) : "—";
  };

  return (
    <div className="overflow-x-auto border border-indigo-500/30 rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-dotted border-slate-600">
            {columns.map((col) => (
              <th
                key={col.id}
                className={`px-4 py-3 font-semibold text-slate-300 uppercase tracking-wider ${alignClass(col.align)} ${col.sortable && onSort ? "cursor-pointer select-none hover:text-slate-200" : ""}`}
                scope="col"
                onClick={
                  col.sortable && onSort
                    ? () => onSort(col.id)
                    : undefined
                }
              >
                <span className="inline-flex items-center">
                  {col.label}
                  {col.sortable && onSort && (
                    <SortIcon
                      direction={
                        sortColumn === col.id ? sortDirection : "asc"
                      }
                    />
                  )}
                </span>
              </th>
            ))}
            {renderAction && (
              <th
                className="px-4 py-3 font-semibold text-slate-300 uppercase tracking-wider text-left"
                scope="col"
              >
                ACCIÓN
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderAction ? 1 : 0)}
                className="px-4 py-8 text-center text-slate-500"
              >
                No hay datos para mostrar.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/30 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={`px-4 py-3 text-slate-200 ${alignClass(col.align)}`}
                  >
                    {getCellContent(row, col)}
                  </td>
                ))}
                {renderAction && (
                  <td className="px-4 py-3 text-left">
                    {renderAction(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
