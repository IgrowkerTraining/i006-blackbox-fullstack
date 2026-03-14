import { useState, useCallback, useRef, useEffect } from "react";
import { api } from "../services/api";
import type { RegistroHistorial, CriterioHistorial } from "../types/dataPages";

export default function useHistorialEvents() {
  const [events, setEvents] = useState<RegistroHistorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastQueryRef = useRef<{ criterio: CriterioHistorial; valor: string } | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rawEvents = await api.getAllEventsRaw(500, 0);
      const byVehicle: Record<
        string,
        {
          idUnidad: string;
          idChofer: string;
          latestInspection?: string;
          latestAccident?: string;
          latestMaintenance?: string;
          latestTime?: number;
        }
      > = {};

      for (const e of rawEvents) {
        const vehicleId = (e.vehicle_id ?? (e.vehicle as Record<string, unknown> | undefined)?.id) as string | undefined;
        if (!vehicleId) continue;
        const unit =
          (e.vehicle as Record<string, unknown> | undefined)?.unit_number ??
          (e.vehicle as Record<string, unknown> | undefined)?.plate ??
          vehicleId;
        const driverId = (e.driver_id ?? (e.driver as Record<string, unknown> | undefined)?.id ?? "") as string;
        const dt = (e.event_datetime ?? e.created_at ?? e.createdAt) as string | undefined;
        const time = dt ? new Date(dt).getTime() : 0;

        if (!byVehicle[vehicleId]) {
          byVehicle[vehicleId] = {
            idUnidad: String(unit),
            idChofer: String(driverId || ""),
          };
        }
        const item = byVehicle[vehicleId];
        if (time && (!item.latestTime || time > item.latestTime)) {
          item.latestTime = time;
          item.idChofer = String(driverId || item.idChofer || "");
        }

        if ((e as any).event_type === "INSPECTION" && dt) item.latestInspection = dt;
        if ((e as any).event_type === "ACCIDENT" && dt) item.latestAccident = dt;
        if ((e as any).event_type === "MAINTENANCE" && dt) item.latestMaintenance = dt;
      }

      const mapped = Object.values(byVehicle).map((v) => ({
        idUnidad: v.idUnidad,
        idChofer: v.idChofer,
        fechaInspeccion: v.latestInspection ? new Date(v.latestInspection).toLocaleDateString("es-EC") : "",
        fechaIncidente: v.latestAccident ? new Date(v.latestAccident).toLocaleDateString("es-EC") : "",
        fechaMantenimiento: v.latestMaintenance ? new Date(v.latestMaintenance).toLocaleDateString("es-EC") : "",
      })) as RegistroHistorial[];

      setEvents(mapped);
    } catch {
      setError("Error al cargar el historial de eventos.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEvents = useCallback(async (criterio?: CriterioHistorial, valor?: string) => {
    const isDirectSearch = criterio && typeof valor === "string";
    if (isDirectSearch && (criterio === "idUnidad" || criterio === "idChofer")) {
      lastQueryRef.current = { criterio, valor };
    }
    const query = lastQueryRef.current;
    if (!query || !query.valor.trim()) {
      await fetchAll();
      return;
    }
    if (query.criterio !== "idUnidad" && query.criterio !== "idChofer") {
      await fetchAll();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.getEvents(query.criterio, query.valor.trim());
      setEvents(response);
    } catch (err) {
      setError("Error al cargar el historial de eventos.");
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { events, loading, error, refetch: fetchEvents };
}



