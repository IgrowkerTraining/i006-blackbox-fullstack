import React, { useState, useCallback, useEffect } from "react";
import { Input } from "@/src/components/common/Input";
import { LoadingSpinner } from "@/src/components/common/LoadingSpinner";
import { ErrorMessage } from "@/src/components/common/ErrorMessage";
import {
  PageDataContainer,
  DataTable,
  Pagination,
  useDataPage,
} from "@/src/components/dataPage";
import { useApi } from "@/src/hooks/useApi";
import { api } from "@/src/services/api";
import type { UnidadFlota } from "@/src/types/dataPages";
import { useDocumentTitle } from "@/src/hooks/useDocumentTitle";

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

function EstadoBadge({ estado }: { estado?: string | null }) {
  const value = estado ?? "";
  const isActivo = value.toUpperCase() === "ACTIVO";
  const label = value || "—";
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
        isActivo ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
      }`}
    >
      {label}
    </span>
  );
}

const FlotaPage: React.FC = () => {
  useDocumentTitle("Inventario Flota");
  const [searchId, setSearchId] = useState("");

  const fetchFlota = useCallback(
    () => api.getFlota({ includeCurrentDriver: true, includeLastInspection: true }),
    [],
  );
  const { data: apiData, loading, error, execute } = useApi<UnidadFlota[]>(fetchFlota);

  useEffect(() => {
    execute();
  }, [execute]);

  // Normalizar datos del backend (id, unit_number, is_active, driver) al formato de la tabla
  const flota: UnidadFlota[] = (apiData ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    return {
      ...row,
      idUnidad: (r.idUnidad ?? r.unit_number ?? r.plate ?? r.id ?? "") as string,
      estado: (r.estado ?? (r.is_active === true ? "Activo" : r.is_active === false ? "Inactivo" : "")) as string,
      chofer: (r.chofer ?? (r.driver && typeof r.driver === "object" && "name" in r.driver ? (r.driver as { name: string }).name : "")) as string,
      ultimaInspeccion: (r.ultimaInspeccion ?? "") as string,
    };
  });

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
      return data.filter((row) => String(row.idUnidad ?? "").toLowerCase().includes(lower));
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
            className="min-w-[260px] max-w-md"
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
          <LoadingSpinner message="Cargando Flota..." inline />
        ) : (
          <DataTable<UnidadFlota>
            columns={columns}
            data={paginatedData}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            renderAction={(row) => (
              <a
                href={`/flota/${String((row as Record<string, unknown>).id ?? row.idUnidad)}/historial`}
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
