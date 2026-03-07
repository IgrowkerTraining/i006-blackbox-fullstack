import { useState, useEffect } from 'react';

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


  const [page, setPage] = useState(1);
  const [hasMoreUnits, setHasMoreUnits] = useState(true);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);

  // Función para traer todas las unidades de la flota
  const fetchAllUnits = async (nextPage: number = 1) => {
    if (!hasMoreUnits) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/vehicles?page=${nextPage}&limit=${pageSize}`);
      if (!res.ok) throw new Error('Error al cargar flota');
      const data = await res.json();

      if (data.length < pageSize) setHasMoreUnits(false); // fin de la lista

      const vehicles: Unit[] = data.map((v: any) => ({
        idUnidad: v.id,
        name: v.name,
        driver: v.driver,
        status: v.status,
      }));

      setAllUnits(prev => [...prev, ...vehicles]);
      setPage(nextPage + 1);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Función para traer el evento de una unidad específica y su historial
  const fetchUnitDetails = async (unitId: string, nextPage: number = 1) => {
    if (!hasMoreEvents) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/vehicles/${unitId}/events?page=${nextPage}&limit=${pageSize}`);
      if (!res.ok) throw new Error('Error al cargar la unidad');
      const data = await res.json();

      if (nextPage === 1) {
        setUnit({ idUnidad: unitId, name: data.unitName, driver: data.driver, status: data.status });
        setTimeline(data.events || []);
      } else {
        setTimeline(prev => [...prev, ...(data.events || [])]);
      }

      if (!data.events || data.events.length < pageSize) setHasMoreEvents(false);
      setPage(nextPage + 1);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // useEffect principal
  useEffect(() => {
    if (idUnidad) {
      fetchUnitDetails(idUnidad, 1);
    } else {
      fetchAllUnits(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUnidad]);

  // Funciones para cargar más
  const loadMoreUnits = () => fetchAllUnits(page);
  const loadMoreEvents = () => idUnidad && fetchUnitDetails(idUnidad, page);

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