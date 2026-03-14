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

  const resolveVehicleId = async (value: string): Promise<string | null> => {
    const list = await api.getFlota();
    const match = list.find((v: any) => {
      const unit = v.unit_number ?? v.unitNumber ?? v.idUnidad ?? v.plate ?? v.id;
      return (
        String(v.id ?? "") === value ||
        String(v.vehicleId ?? "") === value ||
        String(v.vehicle_id ?? "") === value ||
        String(unit ?? "") === value
      );
    });
    const resolved = (match?.id ?? match?.vehicleId ?? match?.vehicle_id) as string | undefined;
    return resolved ? String(resolved) : null;
  };

  const fetchUnitDetails = async (vehicleId: string, nextPage: number = 1) => {
    if (!hasMoreEventsRef.current) return;
    try {
      setLoading(true);

      // ✅ Usa api.getHistorialUnidad en vez de fetch directo
      let events: any[] = [];
      let vehicle: any | undefined;
      try {
        const result = await api.getHistorialUnidad(vehicleId, nextPage, pageSize);
        events = result.events;
        vehicle = result.vehicle;
      } catch {
        const resolvedId = await resolveVehicleId(vehicleId);
        if (resolvedId && resolvedId !== vehicleId) {
          const result = await api.getHistorialUnidad(resolvedId, nextPage, pageSize);
          events = result.events;
          vehicle = result.vehicle;
        } else {
          throw new Error("No se pudo resolver la unidad");
        }
      }

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
        const inspectionType =
          e.inspection_details?.[0]?.type_inspection ??
          e.typeInspection ??
          e.inspection_type ??
          e.inspectionType ??
          e.context;
        const inspectionLabel =
          inspectionType === "ARRIVAL"
            ? "Inspeccion de Llegada"
            : inspectionType === "DEPARTURE"
              ? "Inspeccion de Salida"
              : undefined;

        const eventType = e.event_type ?? e.type ?? e.eventType ?? e.name ?? e.title;
        const title =
          inspectionLabel ??
          (eventType === "INSPECTION"
            ? "Inspeccion"
            : eventType === "MAINTENANCE"
              ? "Mantenimiento"
              : eventType === "ACCIDENT"
                ? "Accidente"
                : eventType === "OTHER"
                  ? "Evento"
                  : eventType) ??
          "Evento";

        let parsedObs: Record<string, unknown> | null = null;
        if (typeof e.final_observations === "string") {
          try {
            parsedObs = JSON.parse(e.final_observations);
          } catch {
            parsedObs = null;
          }
        }

        const resultLabel =
          e.general_result === "WITH_OBS"
            ? "Con observaciones"
            : e.general_result === "WITHOUT_OBS"
              ? "Sin observaciones"
              : undefined;

        const registeredBy =
          e.createdBy?.name ??
          e.created_by_user_id ??
          e.createdByUserId ??
          undefined;
        const driverName = e.driver?.name ?? e.driverName ?? undefined;
        const signatureName = e.e_signature ? "Firma registrada" : undefined;

        const description =
          (parsedObs?.description as string | undefined) ??
          (parsedObs?.eventDescription as string | undefined) ??
          (parsedObs?.serviceType as string | undefined) ??
          (parsedObs?.maintenanceType as string | undefined) ??
          (parsedObs?.locationDetails as string | undefined) ??
          e.final_observations ??
          resultLabel ??
          e.description ??
          e.details ??
          e.notes ??
          e.observations ??
          (registeredBy
            ? `Registrado por ${registeredBy}`
            : driverName
              ? `Conductor: ${driverName}${signatureName ? ` (${signatureName})` : ""}`
              : signatureName ?? "Sin descripcion");

        const status =
          e.general_result ??
          e.status ??
          e.result ??
          e.outcome ??
          (eventType === "INSPECTION" ? "WITHOUT_OBS" : "COMPLETED");
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
