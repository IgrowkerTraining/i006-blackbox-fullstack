import React, { useState, useCallback, useEffect } from "react";
import { Input } from "../components/common/Input";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import {
  PageDataContainer,
  DataTable,
  Pagination,
  useDataPage,
} from "../components/dataPage";
import { useApi } from "../hooks/useApi";
import { api } from "../services/api";
import type { UnidadFlota } from "../types/dataPages";

const PAGE_SIZE = 5;

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

function EstadoBadge({ estado }: { estado: string }) {
  const isActivo = estado.toUpperCase() === "ACTIVO";
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
        isActivo ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
      }`}
    >
      {estado}
    </span>
  );
}

const FlotaPage: React.FC = () => {
  const [searchId, setSearchId] = useState("");

  const fetchFlota = useCallback(() => api.getFlota(), []);
  const { data: apiData, loading, error, execute } = useApi<UnidadFlota[]>(fetchFlota);

  useEffect(() => {
    execute();
  }, [execute]);

  const flota: UnidadFlota[] = apiData ?? [];

  const {
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
    sortColumn,
    sortDirection,
    handleSort,
  } = useDataPage<UnidadFlota, string>({
    data: flota,
    pageSize: PAGE_SIZE,
    filterState: searchId,
    filterFn: (data, term) => {
      if (!term.trim()) return data;
      const lower = term.trim().toLowerCase();
      return data.filter((row) => row.idUnidad.toLowerCase().includes(lower));
    },
    initialSortColumn: "idUnidad",
    initialSortDirection: "asc",
  });

  const columns = [
    {
      id: "idUnidad",
      label: "ID UNIDAD",
      sortable: true,
      accessor: "idUnidad" as keyof UnidadFlota,
    },
    {
      id: "estado",
      label: "ESTADO",
      sortable: true,
      accessor: "estado" as keyof UnidadFlota,
      render: (row: UnidadFlota) => <EstadoBadge estado={row.estado} />,
    },
    {
      id: "chofer",
      label: "CHOFER",
      sortable: true,
      accessor: "chofer" as keyof UnidadFlota,
    },
    {
      id: "ultimaInspeccion",
      label: "ÚLTIMA INSPECCIÓN",
      sortable: true,
      accessor: "ultimaInspeccion" as keyof UnidadFlota,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto w-full">
      <PageDataContainer
        title="Inventario Flota"
        filters={
          <Input
            placeholder="Buscar ID unidad..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            icon={<SearchIcon />}
            iconPosition="right"
            className="min-w-[280px] max-w-md py-2 rounded bg-surface-subtle border-slate-200 text-slate-800 placeholder:text-slate-500"
          />
        }
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxVisiblePages={10}
          />
        }
      >
        {error && (
          <ErrorMessage message={error} onRetry={execute} className="mb-4" />
        )}
        {loading ? (
          <LoadingSpinner message="Cargando..." inline />
        ) : (
          <DataTable<UnidadFlota>
            columns={columns}
            data={paginatedData}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            renderAction={(row) => (
              <a
                href={`#/flota/${row.idUnidad}/historial`}
                className="text-accent hover:opacity-90 font-medium transition-colors"
              >
                Ver historial
              </a>
            )}
          />
        )}
      </PageDataContainer>
    </div>
  );
};

export default FlotaPage;
