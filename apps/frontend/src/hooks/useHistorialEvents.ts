import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import type { RegistroHistorial } from "../types/dataPages";

export default function useHistorialEvents() {
  const [events, setEvents] = useState<RegistroHistorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getEvents();
      setEvents(response);
    } catch (err) {
      setError("Error al cargar el historial de eventos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
}



