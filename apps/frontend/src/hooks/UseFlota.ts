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
        idUnidad: v.id,
        name: v.name,
        driver: v.driver,
        status: v.status,
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
      const events = await api.getHistorialUnidad(vehicleId, nextPage, pageSize);

      const mapped: TimelineItem[] = events.map((e) => ({
        id: e.id,
        timeLabel: new Date(e.timestamp).toLocaleString('es-MX', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        title: e.type,
        description: e.description,
        status: e.type,
      }));

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