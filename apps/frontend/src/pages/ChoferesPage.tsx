import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
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
import type { Chofer } from "../types/dataPages";
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

const ChoferesPage: React.FC = () => {
  useDocumentTitle("Informacion de Choferes");
  const [searchId, setSearchId] = useState("");

  const fetchChoferes = useCallback(() => api.getChoferes(), []);
  const { data: apiData, loading, error, execute } = useApi<Chofer[]>(fetchChoferes);

  useEffect(() => {
    execute();
  }, [execute]);

  // Normalizar datos del backend (id, name, license_number, is_active) al formato de la tabla
  const choferes: Chofer[] = (apiData ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    return {
      ...row,
      idChofer: (r.idChofer ?? r.id ?? "") as string,
      nombre: (r.nombre ?? r.name ?? "") as string,
      licencia: (r.licencia ?? r.license_number ?? "") as string,
      estadoOperativo: (r.estadoOperativo ?? (r.is_active === true ? "Activo" : r.is_active === false ? "Inactivo" : "")) as string,
      unidadAsignada: (r.unidadAsignada ?? "") as string,
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
  } = useDataPage<Chofer, string>({
    data: choferes,
    pageSize: PAGE_SIZE,
    filterState: searchId,
    filterFn: (data, term) => {
      if (!term.trim()) return data;
      const lower = term.trim().toLowerCase();
      return data.filter(
        (row) =>
          String(row.idChofer ?? "").toLowerCase().includes(lower) ||
          String(row.nombre ?? "").toLowerCase().includes(lower) ||
          String(row.licencia ?? "").toLowerCase().includes(lower)
      );
    },
    initialSortColumn: "idChofer",
    initialSortDirection: "asc",
  });

  const columns = [
    {
      id: "unidadAsignada",
      label: "Unidad asignada",
      sortable: false,
      accessor: "unidadAsignada" as keyof Chofer,
    },
    {
      id: "idChofer",
      label: "ID Chofer",
      sortable: true,
      accessor: "idChofer" as keyof Chofer,
    },
    {
      id: "nombre",
      label: "Nombre",
      sortable: true,
      accessor: "nombre" as keyof Chofer,
    },
    {
      id: "licencia",
      label: "Licencia",
      sortable: true,
      accessor: "licencia" as keyof Chofer,
    },
    {
      id: "estadoOperativo",
      label: "Estado operativo",
      sortable: true,
      accessor: "estadoOperativo" as keyof Chofer,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto w-full">
      <PageDataContainer
        title="Información de Choferes"
        filters={
          <Input
            placeholder="Buscar por ID chofer"
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
          <LoadingSpinner message="Cargando..." inline />
        ) : (
          <>
            <DataTable<Chofer>
              columns={columns}
              data={paginatedData}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              renderAction={(row) => (
                <Link
                  to={`/choferes/${row.idChofer}/ficha`}
                  className="text-menu-active hover:opacity-90 font-medium transition-colors"
                >
                  Ver ficha
                </Link>
              )}
            />
            <p className="mt-4 text-xs text-slate-700">
              Nota: El estado operativo se actualiza en tiempo real basado en el registro de horas de servicio y la vigencia de la documentación cargada en el sistema.
            </p>
          </>
        )}
      </PageDataContainer>
    </div>
  );
};

export default ChoferesPage;
