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

/** Ficha extendida de un chofer (vista detalle). Incluye foto, estado actual y métrica de cumplimiento. */
export interface ChoferFicha extends Chofer {
  fotoUrl?: string;
  antiguedadAnios: number;
  estadoActual: string;
  unidadAsignadaActual?: string;
  metricaCumplimiento: string;
  inspeccionesRegistradas?: string;
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

/** Evento del registro consolidado (reporte por unidad). */
export type TipoResultadoEvento = "normal" | "hallazgo" | "completado";

export interface EventoReporte extends Record<string, unknown> {
  fecha: string;
  hora: string;
  unidad: string;
  evento: string;
  resultadoDetalle: string;
  tipoResultado: TipoResultadoEvento;
  registradoPor: string;
}


export interface EventoReporte {
  tipo: "Arrival" | "Departure" | "Mantenimiento";
  fecha: string;
  descripcion: string;
}

export interface HistorialFlota {
  idUnidad: string;
  nombreUnidad: string;
  choferAsignado: string;
  estadoActual: string;
  eventos: EventoReporte[];
}