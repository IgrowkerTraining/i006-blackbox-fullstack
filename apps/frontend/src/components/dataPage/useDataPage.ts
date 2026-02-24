import { useState, useMemo, useCallback, useEffect } from "react";

export interface UseDataPageOptions<T, F = unknown> {
  data: T[];
  pageSize: number;
  filterState?: F;
  filterFn?: (data: T[], filterState: F) => T[];
  initialSortColumn?: string;
  initialSortDirection?: "asc" | "desc";
}

export interface UseDataPageReturn<T> {
  paginatedData: T[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortColumn: string;
  sortDirection: "asc" | "desc";
  handleSort: (columnId: string) => void;
  filteredCount: number;
}

/**
 * Encapsula filtrado, ordenación y paginación para tablas de datos.
 * Cada página mantiene su propio estado de filtros y pasa filterState + filterFn;
 * el hook devuelve paginatedData, estado de ordenación y manejadores para conectar
 * con PageDataContainer, DataTable y Pagination.
 */
export function useDataPage<T extends Record<string, unknown>, F = unknown>(
  options: UseDataPageOptions<T, F>
): UseDataPageReturn<T> {
  const {
    data,
    pageSize,
    filterState,
    filterFn,
    initialSortColumn = "",
    initialSortDirection = "asc",
  } = options;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSortDirection
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterState]);

  const filteredData = useMemo(() => {
    if (filterFn && filterState !== undefined) {
      return filterFn(data, filterState);
    }
    return data;
  }, [data, filterState, filterFn]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = String(
        (a as Record<string, unknown>)[sortColumn] ?? ""
      ).toLowerCase();
      const bVal = String(
        (b as Record<string, unknown>)[sortColumn] ?? ""
      ).toLowerCase();
      const cmp = aVal.localeCompare(bVal);
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = useCallback(
    (columnId: string) => {
      setSortDirection((prev) =>
        sortColumn === columnId && prev === "asc" ? "desc" : "asc"
      );
      setSortColumn(columnId);
      setCurrentPage(1);
    },
    [sortColumn]
  );

  return {
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
    sortColumn,
    sortDirection,
    handleSort,
    filteredCount: filteredData.length,
  };
}

export default useDataPage;
