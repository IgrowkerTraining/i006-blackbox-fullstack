import { useState, useCallback, useRef } from "react";
import { api } from "../services/api";
import type { RegistroHistorial, CriterioHistorial } from "../types/dataPages";

export default function useHistorialEvents() {
  const [events, setEvents] = useState<RegistroHistorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastQueryRef = useRef<{ criterio: CriterioHistorial; valor: string } | null>(null);

  const fetchEvents = useCallback(async (criterio?: CriterioHistorial, valor?: string) => {
    const isDirectSearch = criterio && typeof valor === "string";
    if (isDirectSearch && (criterio === "idUnidad" || criterio === "idChofer")) {
      lastQueryRef.current = { criterio, valor };
    }
    const query = lastQueryRef.current;
    if (!query || !query.valor.trim()) return;
    if (query.criterio !== "idUnidad" && query.criterio !== "idChofer") return;

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
  }, []);

  return { events, loading, error, refetch: fetchEvents };
}



