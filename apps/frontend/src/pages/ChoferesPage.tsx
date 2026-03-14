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
  const [driverUnitById, setDriverUnitById] = useState<Record<string, string>>({});

  const fetchChoferes = useCallback(() => api.getChoferes(), []);
  const { data: apiData, loading, error, execute } = useApi<Chofer[]>(fetchChoferes);

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [flota, events] = await Promise.all([
          api.getFlota({ includeCurrentDriver: true }),
          api.getAllEventsRaw(500, 0),
        ]);
        if (cancelled) return;

        const vehicleIdToUnit: Record<string, string> = {};
        for (const v of flota as Array<Record<string, unknown>>) {
          const vehicleId = (v.id ?? v.vehicleId ?? v.vehicle_id) as string | undefined;
          const unit =
            (v.unit_number ?? v.unitNumber ?? v.plate ?? v.idUnidad ?? v.id ?? "") as string;
          if (vehicleId && unit) vehicleIdToUnit[String(vehicleId)] = String(unit);
        }

        const latestByDriver: Record<string, { unit: string; time: number }> = {};
        for (const e of events as Array<Record<string, unknown>>) {
          const driverId = (e.driver_id ?? (e.driver as Record<string, unknown> | undefined)?.id) as string | undefined;
          const vehicleId = (e.vehicle_id ?? (e.vehicle as Record<string, unknown> | undefined)?.id) as string | undefined;
          const dt = (e.event_datetime ?? e.created_at ?? e.createdAt) as string | undefined;
          if (!driverId || !vehicleId || !dt) continue;
          const unit = vehicleIdToUnit[String(vehicleId)];
          if (!unit) continue;
          const time = new Date(dt).getTime();
          const prev = latestByDriver[String(driverId)];
          if (!prev || time > prev.time) {
            latestByDriver[String(driverId)] = { unit: String(unit), time };
          }
        }

        const map: Record<string, string> = {};
        for (const [driverId, info] of Object.entries(latestByDriver)) {
          map[driverId] = info.unit;
        }
        setDriverUnitById(map);
      } catch {
        if (!cancelled) setDriverUnitById({});
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Normalizar datos del backend (id, name, license_number, is_active) al formato de la tabla
  const choferes: Chofer[] = (apiData ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    const vehicle = (r.vehicle as Record<string, unknown> | undefined) ?? (r.assignedVehicle as Record<string, unknown> | undefined);
    const driverId = (r.id ?? r.idChofer) as string;
    const unitFromMap = driverId ? driverUnitById[String(driverId)] : undefined;
    const rawUnidad = (r.unidadAsignada ?? r.unit_number ?? r.unitNumber ?? r.plate ?? r.vehicleId ?? vehicle?.unit_number ?? vehicle?.unitNumber ?? vehicle?.plate ?? vehicle?.id ?? "") as string;
    const normalizedRawUnidad =
      String(rawUnidad || "").trim().toLowerCase() === "sin asignar" ? "" : String(rawUnidad || "");
    const unidadAsignadaFinal = normalizedRawUnidad || unitFromMap || "Sin asignar";
    return {
      ...row,
      idChofer: (r.idChofer ?? r.id ?? "") as string,
      nombre: (r.nombre ?? r.name ?? "") as string,
      licencia: (r.licencia ?? r.license_number ?? "") as string,
      estadoOperativo: (r.estadoOperativo ?? (r.is_active === true ? "Activo" : r.is_active === false ? "Inactivo" : "")) as string,
      unidadAsignada: unidadAsignadaFinal,
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
          <LoadingSpinner message="Cargando Choferes..." inline />
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
