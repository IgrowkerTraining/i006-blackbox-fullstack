import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import type { EventoReporte } from "../types/dataPages";

const PAGE_SIZE = 5;

const HistorialReportePage: React.FC = () => {
  const { idUnidad } = useParams<{ idUnidad: string }>();

  const fetchReporte = useCallback(
    () => api.getHistorialReporte(idUnidad ?? ""),
    [idUnidad],
  );
  const { data: apiData, loading, error, execute } = useApi<EventoReporte[]>(fetchReporte);

  const eventos: EventoReporte[] = apiData ?? [];

  const {
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useDataPage<EventoReporte, void>({
    data: eventos,
    pageSize: PAGE_SIZE,
    filterFn: (data, _state) => data,
    initialSortColumn: "fecha",
    initialSortDirection: "desc",
  });

  useEffect(() => {
    if (idUnidad == null) return;
    execute();
  }, [execute, idUnidad]);

  const resultadoDetalleClass = (tipo: EventoReporte["tipoResultado"]) => {
    if (tipo === "hallazgo") return "text-red-600 font-medium";
    if (tipo === "completado") return "text-green-700 font-medium";
    return "text-slate-800";
  };

  const columns = [
    {
      id: "fechaHora",
      label: "FECHA Y HORA",
      sortable: false,
      render: (row: EventoReporte) => (
        <div>
          <div className="text-slate-700">{row.fecha}</div>
          <div className="font-semibold text-slate-900">{row.hora}</div>
        </div>
      ),
    },
    {
      id: "unidad",
      label: "UNIDAD",
      sortable: false,
      accessor: "unidad" as keyof EventoReporte,
    },
    {
      id: "evento",
      label: "EVENTO",
      sortable: false,
      accessor: "evento" as keyof EventoReporte,
    },
    {
      id: "resultadoDetalle",
      label: "RESULTADO/DETALLE",
      sortable: false,
      render: (row: EventoReporte) => (
        <span className={resultadoDetalleClass(row.tipoResultado)}>
          {row.resultadoDetalle}
        </span>
      ),
    },
    {
      id: "registradoPor",
      label: "REGISTRADO POR",
      sortable: false,
      accessor: "registradoPor" as keyof EventoReporte,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto w-full">
      <PageDataContainer
        title="Registro Consolidado de Eventos"
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxVisiblePages={10}
          />
        }
      >
        {idUnidad == null ? (
          <ErrorMessage message="Unidad no especificada." className="mb-4" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={execute} className="mb-4" />
        ) : loading ? (
          <LoadingSpinner message="Cargando reporte..." inline />
        ) : (
          <DataTable<EventoReporte>
            columns={columns}
            data={paginatedData}
          />
        )}
      </PageDataContainer>
    </div>
  );
};

export default HistorialReportePage;
