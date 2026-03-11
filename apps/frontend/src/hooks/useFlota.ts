import { useState, useEffect, useRef } from 'react';
import { api } from '@/src/services/api';

export type TimelineItem = {
  id: string;
  timeLabel: string;
  title: string;
  description: string;
  status: string;
};

export type Unit = {
  idUnidad: string;
  name: string;
  driver: string;
  status: string;
  events?: TimelineItem[];
};

interface UseFlotaProps {
  pageSize?: number;
}

export const useFlota = (idUnidad?: string, { pageSize = 10 }: UseFlotaProps = {}) => {
  const [unit, setUnit] = useState<Unit | null>(null);
  const [allUnits, setAllUnits] = useState<Unit[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [unitPage, setUnitPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);
  const [hasMoreUnits, setHasMoreUnits] = useState(true);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);
  const hasMoreEventsRef = useRef(true);

  const fetchAllUnits = async (nextPage: number = 1) => {
    if (!hasMoreUnits) return;
    try {
      setLoading(true);
      const data = await api.getFlota(); // ya usa tu capa api

      if (data.length < pageSize) setHasMoreUnits(false);

      const vehicles: Unit[] = data.map((v: any) => ({
        idUnidad: String(v.id ?? v.vehicleId ?? v.vehicle_id ?? v.idUnidad ?? ""),
        name: String(v.unit_number ?? v.plate ?? v.idUnidad ?? v.id ?? ""),
        driver: String(v.chofer ?? v.driver?.name ?? v.driverId ?? "Sin asignar"),
        status:
          typeof v.is_active === "boolean"
            ? v.is_active
              ? "ACTIVO"
              : "INACTIVO"
            : String(v.estado ?? v.status ?? ""),
      }));

      setAllUnits(prev => [...prev, ...vehicles]);
      setUnitPage(nextPage + 1);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnitDetails = async (vehicleId: string, nextPage: number = 1) => {
    if (!hasMoreEventsRef.current) return;
    try {
      setLoading(true);

      // ✅ Usa api.getHistorialUnidad en vez de fetch directo
      const { events, vehicle } = await api.getHistorialUnidad(vehicleId, nextPage, pageSize);

      if (vehicle && nextPage === 1) {
        const driverName =
          (events[0] && events[0].driver && events[0].driver.name) ||
          "Sin asignar";
        setUnit({
          idUnidad: vehicle.id ?? vehicleId,
          name: vehicle.unit_number ?? vehicle.plate ?? vehicleId,
          driver: driverName,
          status: vehicle.is_active ? "ACTIVO" : "INACTIVO",
        });
      }

      const mapped: TimelineItem[] = events.map((e: any, index: number) => {
        const rawDate =
          e.event_datetime ??
          e.created_at ??
          e.updated_at ??
          e.timestamp ??
          e.createdAt ??
          e.updatedAt ??
          e.date ??
          e.eventDate ??
          e.occurredAt ??
          e.time;
        const timeLabel = rawDate
          ? new Date(rawDate).toLocaleString('es-MX', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
          : 'Sin fecha';
        const inspectionContext =
          e.context ?? e.typeInspection ?? e.inspection_type ?? e.inspectionType;
        const inspectionLabel =
          inspectionContext === "ARRIVAL"
            ? "Inspección de Llegada"
            : inspectionContext === "DEPARTURE"
              ? "Inspección de Salida"
              : undefined;
        const title =
          inspectionLabel ??
          (e.event_type === "INSPECTION" ? "Inspección" : e.event_type) ??
          e.type ??
          e.eventType ??
          e.name ??
          e.title ??
          'Evento';
        const resultLabel =
          e.general_result === "WITH_OBS"
            ? "Con observaciones"
            : e.general_result === "WITHOUT_OBS"
              ? "Sin observaciones"
              : undefined;
        const description =
          e.final_observations ??
          resultLabel ??
          e.description ??
          e.details ??
          e.notes ??
          e.observations ??
          'Sin descripción';
        const status =
          e.general_result ?? e.status ?? e.result ?? e.outcome ?? e.event_type ?? e.type ?? 'Estado';
        const id = e.id ?? e.eventId ?? `${vehicleId}-${nextPage}-${index}`;

        return {
          id,
          timeLabel,
          title,
          description,
          status,
        };
      });

      if (nextPage === 1) {
        setTimeline(mapped);
      } else {
        setTimeline(prev => [...prev, ...mapped]);
      }

      if (events.length < pageSize) {
        hasMoreEventsRef.current = false;
        setHasMoreEvents(false);
      }

      setEventPage(nextPage + 1);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idUnidad) {
      setUnit(null);
      setTimeline([]);
      setError(null);
      setEventPage(1);
      hasMoreEventsRef.current = true;
      setHasMoreEvents(true);
      fetchUnitDetails(idUnidad, 1);
    } else {
      fetchAllUnits(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUnidad]);

  const loadMoreUnits = () => fetchAllUnits(unitPage);
  const loadMoreEvents = () => idUnidad && fetchUnitDetails(idUnidad, eventPage);

  return {
    unit,
    allUnits,
    timeline,
    loading,
    error,
    hasMoreUnits,
    hasMoreEvents,
    loadMoreUnits,
    loadMoreEvents,
  };
};
