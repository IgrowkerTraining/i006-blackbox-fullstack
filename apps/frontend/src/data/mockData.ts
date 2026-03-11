import type {
  Chofer,
  ChoferFicha,
  UnidadFlota,
  RegistroHistorial,
  EventoReporte,
} from "../types/dataPages";


/**
 * Mock de choferes. Se usa cuando el backend no tiene aún el endpoint /api/choferes.
 */
export const MOCK_CHOFERES: Chofer[] = [
  { unidadAsignada: "U505", idChofer: "CH205", nombre: "Emiliano Cerati", licencia: "TX-99281", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U601", idChofer: "CH207", nombre: "Josué Maradona", licencia: "TX-99282", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U789", idChofer: "CH104", nombre: "Amanda Miguel", licencia: "TX-99283", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH097", nombre: "Elvis Crespo", licencia: "TX-99284", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "Sin asignar", idChofer: "CH063", nombre: "Natanael Cano", licencia: "TX-99289", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U502", idChofer: "CH201", nombre: "Luis Fonsi", licencia: "TX-99285", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U603", idChofer: "CH088", nombre: "Shakira Rodríguez", licencia: "TX-99286", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U790", idChofer: "CH312", nombre: "Carlos Vives", licencia: "TX-99287", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U506", idChofer: "CH115", nombre: "Ricardo Arjona", licencia: "TX-99290", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH102", nombre: "Juanes García", licencia: "TX-99291", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U602", idChofer: "CH210", nombre: "Alejandro Sanz", licencia: "TX-99292", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U791", idChofer: "CH118", nombre: "Laura Pausini", licencia: "TX-99293", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U507", idChofer: "CH099", nombre: "Miguel Bosé", licencia: "TX-99294", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U604", idChofer: "CH220", nombre: "Thalía Fernández", licencia: "TX-99295", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U792", idChofer: "CH125", nombre: "Ricky Martin", licencia: "TX-99296", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH108", nombre: "Paulina Rubio", licencia: "TX-99297", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U508", idChofer: "CH230", nombre: "Enrique Iglesias", licencia: "TX-99298", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U605", idChofer: "CH130", nombre: "Gloria Estefan", licencia: "TX-99299", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U793", idChofer: "CH135", nombre: "Marc Anthony", licencia: "TX-99300", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U509", idChofer: "CH240", nombre: "Jennifer López", licencia: "TX-99301", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U606", idChofer: "CH140", nombre: "Chayanne", licencia: "TX-99302", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH145", nombre: "Luis Miguel", licencia: "TX-99303", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U794", idChofer: "CH250", nombre: "Juan Luis Guerra", licencia: "TX-99304", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U510", idChofer: "CH150", nombre: "Vicente Fernández", licencia: "TX-99305", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U607", idChofer: "CH260", nombre: "Alejandra Guzmán", licencia: "TX-99306", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U795", idChofer: "CH155", nombre: "Franco de Vita", licencia: "TX-99307", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U511", idChofer: "CH270", nombre: "Cristian Castro", licencia: "TX-99308", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH160", nombre: "Yuri", licencia: "TX-99309", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U608", idChofer: "CH280", nombre: "Marco Antonio Solís", licencia: "TX-99310", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U796", idChofer: "CH165", nombre: "Ana Gabriel", licencia: "TX-99311", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U512", idChofer: "CH290", nombre: "Pepe Aguilar", licencia: "TX-99312", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U609", idChofer: "CH170", nombre: "Belinda", licencia: "TX-99313", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U797", idChofer: "CH300", nombre: "Reik", licencia: "TX-99314", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH175", nombre: "Ha-Ash", licencia: "TX-99315", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U513", idChofer: "CH310", nombre: "Camilo", licencia: "TX-99316", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U610", idChofer: "CH180", nombre: "Bad Bunny", licencia: "TX-99317", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U798", idChofer: "CH185", nombre: "J Balvin", licencia: "TX-99318", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U514", idChofer: "CH320", nombre: "Daddy Yankee", licencia: "TX-99319", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U611", idChofer: "CH190", nombre: "Ozuna", licencia: "TX-99320", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U799", idChofer: "CH195", nombre: "Karol G", licencia: "TX-99321", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH200", nombre: "Maluma", licencia: "TX-99322", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U515", idChofer: "CH330", nombre: "Sebastian Yatra", licencia: "TX-99323", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U612", idChofer: "CH340", nombre: "Rauw Alejandro", licencia: "TX-99324", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U800", idChofer: "CH350", nombre: "Feid", licencia: "TX-99325", estadoOperativo: "Vacaciones/Descanso" },
  { unidadAsignada: "U516", idChofer: "CH360", nombre: "Peso Pluma", licencia: "TX-99326", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U613", idChofer: "CH370", nombre: "Grupo Frontera", licencia: "TX-99327", estadoOperativo: "Autorizado" },
  { unidadAsignada: "U801", idChofer: "CH380", nombre: "Eslabon Armado", licencia: "TX-99328", estadoOperativo: "Autorizado" },
  { unidadAsignada: "Sin asignar", idChofer: "CH390", nombre: "Fuerza Regida", licencia: "TX-99329", estadoOperativo: "Licencia vencida" },
  { unidadAsignada: "U517", idChofer: "CH400", nombre: "Carin León", licencia: "TX-99330", estadoOperativo: "Autorizado" },
];

/**
 * Mock de ficha de un chofer. Se usa cuando el backend no tiene aún el endpoint por ID.
 * Siempre se devuelve este chofer para cualquier id solicitado.
 */
export const MOCK_CHOFER_FICHA: ChoferFicha = {
  unidadAsignada: "U505",
  idChofer: "CH205",
  nombre: "Emiliano Cerati",
  licencia: "TX-99281",
  estadoOperativo: "Autorizado",
  fotoUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=300&fit=crop",
  antiguedadAnios: 4,
  estadoActual: "En Ruta (Asignado a Unit 505)",
  unidadAsignadaActual: "Unit 505",
  metricaCumplimiento: "100% Inspecciones Registradas (14/14)",
  inspeccionesRegistradas: "14/14",
};

/**
 * Mock de flota. Se usa cuando el backend no tiene aún el endpoint /api/flota.
 */
export const MOCK_FLOTA: UnidadFlota[] = [
  { idUnidad: "U505", estado: "ACTIVO", chofer: "Emiliano Cerati", ultimaInspeccion: "Hoy, 10:30 hrs" },
  { idUnidad: "U601", estado: "ACTIVO", chofer: "Josué Maradona", ultimaInspeccion: "Hoy, 8:30 hrs" },
  { idUnidad: "U789", estado: "ACTIVO", chofer: "Amanda Miguel", ultimaInspeccion: "Ayer 18:00 hrs" },
  { idUnidad: "U365", estado: "ACTIVO", chofer: "Elvis Crespo", ultimaInspeccion: "Ayer 13:00 hrs" },
  { idUnidad: "U236", estado: "OBSERVACIÓN", chofer: "Natanael Cano", ultimaInspeccion: "Hace 2 días" },
  { idUnidad: "U502", estado: "ACTIVO", chofer: "Luis Fonsi", ultimaInspeccion: "Hace 3 días" },
  { idUnidad: "U603", estado: "ACTIVO", chofer: "Shakira Rodríguez", ultimaInspeccion: "Hoy, 7:00 hrs" },
  { idUnidad: "U790", estado: "OBSERVACIÓN", chofer: "Carlos Vives", ultimaInspeccion: "Ayer 9:00 hrs" },
  { idUnidad: "U506", estado: "ACTIVO", chofer: "Ricardo Arjona", ultimaInspeccion: "Hoy, 11:15 hrs" },
  { idUnidad: "U602", estado: "ACTIVO", chofer: "Alejandro Sanz", ultimaInspeccion: "Ayer 16:30 hrs" },
  { idUnidad: "U791", estado: "ACTIVO", chofer: "Laura Pausini", ultimaInspeccion: "Hace 2 días" },
  { idUnidad: "U507", estado: "ACTIVO", chofer: "Miguel Bosé", ultimaInspeccion: "Hoy, 9:45 hrs" },
  { idUnidad: "U604", estado: "ACTIVO", chofer: "Thalía Fernández", ultimaInspeccion: "Ayer 14:00 hrs" },
  { idUnidad: "U792", estado: "OBSERVACIÓN", chofer: "Ricky Martin", ultimaInspeccion: "Hace 4 días" },
  { idUnidad: "U508", estado: "ACTIVO", chofer: "Enrique Iglesias", ultimaInspeccion: "Hoy, 8:00 hrs" },
  { idUnidad: "U605", estado: "ACTIVO", chofer: "Gloria Estefan", ultimaInspeccion: "Ayer 12:00 hrs" },
  { idUnidad: "U793", estado: "ACTIVO", chofer: "Marc Anthony", ultimaInspeccion: "Hace 1 día" },
  { idUnidad: "U509", estado: "ACTIVO", chofer: "Jennifer López", ultimaInspeccion: "Hoy, 10:00 hrs" },
  { idUnidad: "U606", estado: "ACTIVO", chofer: "Chayanne", ultimaInspeccion: "Ayer 17:00 hrs" },
  { idUnidad: "U794", estado: "ACTIVO", chofer: "Juan Luis Guerra", ultimaInspeccion: "Hace 2 días" },
  { idUnidad: "U510", estado: "OBSERVACIÓN", chofer: "Vicente Fernández", ultimaInspeccion: "Hace 5 días" },
  { idUnidad: "U607", estado: "ACTIVO", chofer: "Alejandra Guzmán", ultimaInspeccion: "Hoy, 6:30 hrs" },
  { idUnidad: "U795", estado: "ACTIVO", chofer: "Franco de Vita", ultimaInspeccion: "Ayer 10:00 hrs" },
  { idUnidad: "U511", estado: "ACTIVO", chofer: "Cristian Castro", ultimaInspeccion: "Hace 3 días" },
  { idUnidad: "U608", estado: "ACTIVO", chofer: "Marco Antonio Solís", ultimaInspeccion: "Hoy, 12:00 hrs" },
];

/**
 * Mock de historial de eventos. Se usa cuando el backend no tiene aún el endpoint /api/historial.
 */
export const MOCK_HISTORIAL: RegistroHistorial[] = [
  { idUnidad: "U505", idChofer: "CH205", fechaInspeccion: "20/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U601", idChofer: "CH207", fechaInspeccion: "20/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U789", idChofer: "CH104", fechaInspeccion: "20/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U365", idChofer: "CH097", fechaInspeccion: "20/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U236", idChofer: "CH063", fechaInspeccion: "20/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U502", idChofer: "CH201", fechaInspeccion: "19/11/2022", fechaIncidente: "19/11/2022", fechaMantenimiento: "18/11/2022" },
  { idUnidad: "U603", idChofer: "CH088", fechaInspeccion: "21/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "21/11/2022" },
  { idUnidad: "U790", idChofer: "CH312", fechaInspeccion: "18/11/2022", fechaIncidente: "—", fechaMantenimiento: "18/11/2022" },
  { idUnidad: "U506", idChofer: "CH115", fechaInspeccion: "22/11/2022", fechaIncidente: "22/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U602", idChofer: "CH210", fechaInspeccion: "17/11/2022", fechaIncidente: "17/11/2022", fechaMantenimiento: "17/11/2022" },
  { idUnidad: "U791", idChofer: "CH118", fechaInspeccion: "20/11/2022", fechaIncidente: "—", fechaMantenimiento: "19/11/2022" },
  { idUnidad: "U507", idChofer: "CH099", fechaInspeccion: "19/11/2022", fechaIncidente: "19/11/2022", fechaMantenimiento: "19/11/2022" },
  { idUnidad: "U604", idChofer: "CH220", fechaInspeccion: "21/11/2022", fechaIncidente: "—", fechaMantenimiento: "21/11/2022" },
  { idUnidad: "U792", idChofer: "CH125", fechaInspeccion: "16/11/2022", fechaIncidente: "16/11/2022", fechaMantenimiento: "16/11/2022" },
  { idUnidad: "U508", idChofer: "CH230", fechaInspeccion: "20/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U605", idChofer: "CH130", fechaInspeccion: "15/11/2022", fechaIncidente: "—", fechaMantenimiento: "15/11/2022" },
  { idUnidad: "U793", idChofer: "CH135", fechaInspeccion: "23/11/2022", fechaIncidente: "23/11/2022", fechaMantenimiento: "22/11/2022" },
  { idUnidad: "U509", idChofer: "CH240", fechaInspeccion: "20/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U606", idChofer: "CH140", fechaInspeccion: "14/11/2022", fechaIncidente: "14/11/2022", fechaMantenimiento: "14/11/2022" },
  { idUnidad: "U794", idChofer: "CH250", fechaInspeccion: "19/11/2022", fechaIncidente: "—", fechaMantenimiento: "19/11/2022" },
  { idUnidad: "U510", idChofer: "CH150", fechaInspeccion: "20/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U607", idChofer: "CH260", fechaInspeccion: "13/11/2022", fechaIncidente: "13/11/2022", fechaMantenimiento: "13/11/2022" },
  { idUnidad: "U795", idChofer: "CH155", fechaInspeccion: "21/11/2022", fechaIncidente: "—", fechaMantenimiento: "21/11/2022" },
  { idUnidad: "U511", idChofer: "CH270", fechaInspeccion: "20/11/2022", fechaIncidente: "20/11/2022", fechaMantenimiento: "20/11/2022" },
  { idUnidad: "U608", idChofer: "CH280", fechaInspeccion: "12/11/2022", fechaIncidente: "12/11/2022", fechaMantenimiento: "12/11/2022" },
];

/**
 * Mock del registro consolidado de eventos (reporte). Se devuelve para cualquier unidad
 * mientras el backend no exponga el endpoint.
 */
export const MOCK_HISTORIAL_REPORTE: EventoReporte[] = [
  { fecha: "02 Feb 2026", hora: "10:30 AM", unidad: "U505", evento: "Inspección Salida", resultadoDetalle: "Sin Observaciones", tipoResultado: "normal", registradoPor: "Rick Ramirez" },
  { fecha: "02 Feb 2026", hora: "07:15 AM", unidad: "U505", evento: "Inspección Llegada", resultadoDetalle: "Hallazgo: Luz Trasera Rota", tipoResultado: "hallazgo", registradoPor: "Rick Ramirez" },
  { fecha: "01 Feb 2026", hora: "02:00 PM", unidad: "U505", evento: "Inspección Salida", resultadoDetalle: "Sin Observaciones", tipoResultado: "normal", registradoPor: "Rick Ramirez" },
  { fecha: "01 Feb 2026", hora: "11:00 AM", unidad: "U505", evento: "Inspección Llegada", resultadoDetalle: "Hallazgo: Neumático delantero izquierdo bajo", tipoResultado: "hallazgo", registradoPor: "Rick Ramirez" },
  { fecha: "01 Feb 2026", hora: "09:00 AM", unidad: "U505", evento: "Mantenimiento", resultadoDetalle: "Preventivo Completado", tipoResultado: "completado", registradoPor: "Rick Ramirez" },
  { fecha: "31 Ene 2026", hora: "04:30 PM", unidad: "U505", evento: "Inspección Llegada", resultadoDetalle: "Sin Observaciones", tipoResultado: "normal", registradoPor: "Rick Ramirez" },
  { fecha: "31 Ene 2026", hora: "08:00 AM", unidad: "U505", evento: "Inspección Salida", resultadoDetalle: "Hallazgo: Espejo retrovisor dañado", tipoResultado: "hallazgo", registradoPor: "Rick Ramirez" },
  { fecha: "30 Ene 2026", hora: "01:15 PM", unidad: "U505", evento: "Mantenimiento", resultadoDetalle: "Correctivo Completado", tipoResultado: "completado", registradoPor: "Rick Ramirez" },
  { fecha: "30 Ene 2026", hora: "09:45 AM", unidad: "U505", evento: "Inspección Salida", resultadoDetalle: "Sin Observaciones", tipoResultado: "normal", registradoPor: "Rick Ramirez" },
  { fecha: "29 Ene 2026", hora: "05:00 PM", unidad: "U505", evento: "Inspección Llegada", resultadoDetalle: "Sin Observaciones", tipoResultado: "normal", registradoPor: "Rick Ramirez" },
];
