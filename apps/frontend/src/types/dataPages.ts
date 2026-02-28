/**
 * Tipos para páginas de datos (Choferes, Flota, Historial).
 * Alineados con la respuesta del backend cuando los endpoints estén disponibles.
 */

export interface Chofer extends Record<string, unknown> {
  unidadAsignada: string;
  idChofer: string;
  nombre: string;
  licencia: string;
  estadoOperativo: string;
}

export interface ChoferesFilters {
  idChofer?: string;
}

export interface UnidadFlota extends Record<string, unknown> {
  idUnidad: string;
  estado: string;
  chofer: string;
  ultimaInspeccion: string;
}

export interface FlotaFilters {
  idUnidad?: string;
}

export interface RegistroHistorial extends Record<string, unknown> {
  idUnidad: string;
  idChofer: string;
  fechaInspeccion: string;
  fechaIncidente: string;
  fechaMantenimiento: string;
}

/** Criterios de búsqueda para historial */
export type CriterioHistorial =
  | "idUnidad"
  | "idChofer"
  | "fechaInspeccion"
  | "fechaIncidente"
  | "fechaMantenimiento";

export interface HistorialFilters {
  criterio?: CriterioHistorial;
  valor?: string;
}
