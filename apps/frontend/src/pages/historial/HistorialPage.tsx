import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/src/components/common/Input";
import { Select } from "@/src/components/common/Select";
import { Button } from "@/src/components/common/Button";
import { LoadingSpinner } from "@/src/components/common/LoadingSpinner";
import { ErrorMessage } from "@/src/components/common/ErrorMessage";
import {
  PageDataContainer,
  DataTable,
  Pagination,
  useDataPage,
} from "@/src/components/dataPage";
import type { RegistroHistorial, CriterioHistorial } from "@/src/types/dataPages";
import { useDocumentTitle } from "@/src/hooks/useDocumentTitle";
import useHistorialEvents from "@/src/hooks/useHistorialEvents";

const PAGE_SIZE = 5;

const CRITERIO_OPTIONS: { value: CriterioHistorial; label: string }[] = [
  { value: "idUnidad", label: "ID Unidad" },
  { value: "idChofer", label: "ID Chofer" },
  { value: "fechaInspeccion", label: "Fecha Inspección" },
  { value: "fechaIncidente", label: "Fecha Incidente" },
  { value: "fechaMantenimiento", label: "Fecha Mantenimiento" },
];

const CRITERIO_PLACEHOLDER: Record<CriterioHistorial, string> = {
  idUnidad: "Ingresar ID Unidad",
  idChofer: "Ingresar ID Chofer",
  fechaInspeccion: "Ingresar fecha (ej. 01/01/2025)",
  fechaIncidente: "Ingresar fecha (ej. 01/01/2025)",
  fechaMantenimiento: "Ingresar fecha (ej. 01/01/2025)",
};

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

export interface HistorialFilterState {
  criterio: CriterioHistorial;
  valor: string;
}

const HistorialPage: React.FC = () => {
  useDocumentTitle("Historial de eventos");
  const [criterio, setCriterio] = useState<CriterioHistorial>("idUnidad");
  const [inputVal, setInputVal] = useState("");
  const [filterVal, setFilterVal] = useState("");


  const { events, loading, error, refetch } = useHistorialEvents();

  const filterState: HistorialFilterState = { criterio, valor: filterVal };

  const {
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
    sortColumn,
    sortDirection,
    handleSort,
  } = useDataPage<RegistroHistorial, HistorialFilterState>({
    data: events,
    pageSize: PAGE_SIZE,
    filterState,
    filterFn: (data, state) => {
      if (!state.valor.trim()) return data;
      const term = state.valor.trim().toLowerCase();
      const key = state.criterio;
      return data.filter((row) => {
        const val = String(row[key] ?? "").toLowerCase();
        return val.includes(term);
      });
    },
    initialSortColumn: "idUnidad",
    initialSortDirection: "asc",
  });

  const handleBuscar = () => {
    setFilterVal(inputVal);
    if (criterio === "idUnidad" || criterio === "idChofer") {
      refetch(criterio, inputVal);
    }
  };

  const columns = [
    { id: "idUnidad", label: "ID UNIDAD", sortable: true, accessor: "idUnidad" as keyof RegistroHistorial },
    { id: "idChofer", label: "ID CHOFER", sortable: true, accessor: "idChofer" as keyof RegistroHistorial },
    { id: "fechaInspeccion", label: "FECHA INSPECCION", sortable: true, accessor: "fechaInspeccion" as keyof RegistroHistorial },
    { id: "fechaIncidente", label: "FECHA INCIDENTE", sortable: true, accessor: "fechaIncidente" as keyof RegistroHistorial },
    { id: "fechaMantenimiento", label: "FECHA MANTENIMIENTO", sortable: true, accessor: "fechaMantenimiento" as keyof RegistroHistorial },
  ];

  const filtersContent = (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-sm text-slate-700">Realizar la búsqueda por:</span>
      <div className="flex flex-nowrap items-center justify-between gap-3 overflow-x-auto min-w-0 w-full">
        <div className="flex flex-nowrap items-center gap-3 shrink-0 h-10">
          <div className="w-[260px] shrink-0">
            <Select<CriterioHistorial>
              value={criterio}
              onChange={(e) => setCriterio(e.target.value as CriterioHistorial)}
              options={CRITERIO_OPTIONS}
              className="h-10"
            />
          </div>
          <div className="w-[260px] shrink-0">
            <Input
              placeholder={CRITERIO_PLACEHOLDER[criterio]}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
              icon={<SearchIcon />}
              iconPosition="right"
              className="h-10"
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={handleBuscar}
          className="h-10 bg-yellow-400 hover:bg-yellow-500 w-40 !text-black shrink-0 px-4 rounded-lg transition-colors"
        >
          Buscar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto w-full">
      <PageDataContainer
        title="Historial de eventos"
        filterLayout="stacked"
        filters={filtersContent}
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
          <ErrorMessage message={error} onRetry={refetch} className="mb-4" />
        )}
        {loading ? (
          <LoadingSpinner message="Cargando Historial..." inline />
        ) : (
          <DataTable<RegistroHistorial>
            columns={columns}
            data={paginatedData}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            renderAction={(row) => (
              <Link
                to={`/historial/reporte/${row.idUnidad}`}
                className="text-accent hover:opacity-90 font-medium transition-colors"
              >
                Ver reporte
              </Link>
            )}
          />
        )}
      </PageDataContainer>
    </div>
  );
};

export default HistorialPage;
