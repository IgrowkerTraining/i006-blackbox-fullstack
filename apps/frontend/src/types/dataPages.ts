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

/** Placeholder para cuando exista el endpoint de flota */
export interface UnidadFlota {
  id: string;
  [key: string]: unknown;
}

export interface FlotaFilters {
  [key: string]: unknown;
}

/** Placeholder para cuando exista el endpoint de historial */
export interface RegistroHistorial {
  id: string;
  [key: string]: unknown;
}

export interface HistorialFilters {
  [key: string]: unknown;
}
