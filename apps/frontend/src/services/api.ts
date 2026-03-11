import { User } from "../types";
import { API_ENDPOINTS, STORAGE_KEYS } from "../constants/routes";
import type {
  Chofer,
  ChoferFicha,
  UnidadFlota,
  RegistroHistorial,
  EventoReporte,
} from "../types/dataPages";
import { MOCK_CHOFER_FICHA, MOCK_HISTORIAL, MOCK_HISTORIAL_REPORTE } from "../data/mockData";

/** Cabeceras con JWT para peticiones autenticadas. */
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const buildErrorMessage = async (response: Response, fallback: string) => {
  try {
    const data = await response.json();
    const msg = data?.error || data?.message;
    if (msg) return `${fallback} `;
  } catch {}
  return `${fallback}`;
};


const authHeaders = (): HeadersInit => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Marca si el endpoint de eventos ya estuvo disponible en esta sesión.
let eventsApiAvailable: boolean | null = null;
let eventsReportApiAvailable: boolean | null = null;

/** Extrae el array de respuestas con formato { success, data }. Si ya es array, lo devuelve. */
function unwrapData<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object" && "data" in json && Array.isArray((json as { data: unknown }).data)) {
    return (json as { data: T[] }).data;
  }
  return [];
}

function unwrapList<T>(json: unknown): T[] {
  const direct = unwrapData<T>(json);
  if (direct.length > 0) return direct;
  if (!json || typeof json !== "object") return [];

  const anyJson = json as Record<string, any>;
  const data = anyJson.data as Record<string, any> | undefined;
  const candidates = [
    data?.items,
    data?.results,
    data?.events,
    data?.history,
    data?.rows,
    anyJson.items,
    anyJson.results,
    anyJson.events,
    anyJson.history,
    anyJson.rows,
  ];

  for (const c of candidates) {
    if (Array.isArray(c)) return c as T[];
  }
  return [];
}

const formatDate = (value?: string | null): string => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTime = (value?: string | null): string => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const toChofer = (raw: Record<string, unknown>): Chofer => {
  const vehicle = (raw.vehicle as Record<string, unknown> | undefined) ?? undefined;
  const unidad =
    (raw.unidadAsignada ??
      raw.unit_number ??
      raw.unitNumber ??
      raw.plate ??
      raw.vehicleId ??
      vehicle?.unit_number ??
      vehicle?.unitNumber ??
      vehicle?.plate ??
      vehicle?.id ??
      "Sin asignar") as string;
  const isActive = raw.is_active ?? raw.isActive;
  return {
    unidadAsignada: String(unidad || "Sin asignar"),
    idChofer: String((raw.idChofer ?? raw.id ?? "") as string),
    nombre: String((raw.nombre ?? raw.name ?? "") as string),
    licencia: String((raw.licencia ?? raw.license_number ?? "") as string),
    estadoOperativo:
      typeof isActive === "boolean" ? (isActive ? "Activo" : "Inactivo") : String(raw.estadoOperativo ?? ""),
  };
};

const toChoferFicha = (raw: Record<string, unknown>): ChoferFicha => {
  const base = toChofer(raw);
  const createdAt = (raw.created_at ?? raw.createdAt) as string | undefined;
  const years =
    createdAt && !Number.isNaN(new Date(createdAt).getTime())
      ? Math.max(0, new Date().getFullYear() - new Date(createdAt).getFullYear())
      : 0;
  const isActive = raw.is_active ?? raw.isActive;
  return {
    ...base,
    fotoUrl: (raw.fotoUrl ?? MOCK_CHOFER_FICHA.fotoUrl) as string,
    antiguedadAnios: years,
    estadoActual: typeof isActive === "boolean" ? (isActive ? "Activo" : "Inactivo") : "Sin estado",
    unidadAsignadaActual: base.unidadAsignada,
    metricaCumplimiento: (raw.metricaCumplimiento ?? "Sin datos") as string,
    inspeccionesRegistradas: (raw.inspeccionesRegistradas ?? "N/D") as string,
  };
};

export const api = {
  async register(data: any): Promise<{ user: User; message: string }> {
    data.company = {
      "name": "Logistica Veloz",
      "usdotNumber": "US-123456",
      "state": "TX"
    }

    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.REGISTER}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Registration failed"));
    }
    return response.json();
  },

 async login(data: any): Promise<{ user: User; token: string; message: string }> {
  const response = await fetch(
    `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.LOGIN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error("Datos inválidos. Verifica tu correo y contraseña.");
      case 401:
        throw new Error("Credenciales incorrectas. Verifica tu correo y contraseña.");
      case 403:
        throw new Error("Tu cuenta no tiene permisos para acceder.");
      case 404:
        throw new Error("Usuario no encontrado.");
      case 429:
        throw new Error("Demasiados intentos. Espera unos minutos e intenta de nuevo.");
      case 500:
        throw new Error("Error en el servidor. Intenta más tarde.");
      case 503:
        throw new Error("Servicio no disponible. Intenta más tarde.");
      default:
        throw new Error(await buildErrorMessage(response, "Error al iniciar sesión."));
    }
  }

  return response.json();
},

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.HEALTH}`, {
        headers: getAuthHeaders(),
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  async getChoferes(): Promise<Chofer[]> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.CHOFERES}`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar choferes"));
    }
    const json = await response.json();
    const data = unwrapData<Record<string, unknown>>(json);
    return data.map(toChofer);
  },

  async getChoferById(idChofer: string): Promise<ChoferFicha> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.CHOFERES}/${encodeURIComponent(idChofer)}`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar el chofer"));
    }
    const json = await response.json();
    const raw =
      json && typeof json === "object" && "data" in json
        ? ((json as { data?: unknown }).data as Record<string, unknown> | undefined)
        : (json as Record<string, unknown>);
    return toChoferFicha(raw ?? {});
  },


  // funcion para obtener la lista de unidades de la flota, con su estado y chofer asignado

  async getFlota(): Promise<UnidadFlota[]> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.FLOTA}`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar la flota"));
    }
    const json = await response.json();
    const data = unwrapData<Record<string, unknown>>(json);

    return data.map((v: Record<string, unknown>) => {
      const unitNumber = (v.unit_number ?? v.unitNumber ?? v.idUnidad ?? v.plate ?? v.id ?? "") as string;
      const driver = (v.driver as Record<string, unknown> | undefined) ?? undefined;
      return {
        ...v,
        id: (v.id ?? v.vehicleId ?? v.vehicle_id ?? v.idUnidad ?? "") as string,
        idUnidad: String(unitNumber || v.plate || v.id || ""),
        unit_number: unitNumber,
        plate: (v.plate ?? "") as string,
        estado:
          typeof v.is_active === "boolean"
            ? v.is_active
              ? "ACTIVO"
              : "INACTIVO"
            : (v.estado ?? "") as string,
        chofer: (v.chofer ??
          v.driverName ??
          driver?.name ??
          v.driverId ??
          "Sin asignar") as string,
        ultimaInspeccion: (v.updatedAt ?? v.updated_at ?? "") as string,
      };
    });
  },

 //Funcion para obtener el historial de una flota/unidad especifica, con paginacion
  async getHistorialUnidad(
    vehicleId: string,
    page: number,
    limit: number,
  ): Promise<{
    events: {
      id: string;
      event_datetime?: string;
      event_type?: string;
      general_result?: string | null;
      final_observations?: string | null;
      created_at?: string;
      updated_at?: string;
      driver?: { name?: string } | null;
      createdBy?: { name?: string } | null;
    }[];
    vehicle?: {
      id?: string;
      unit_number?: string;
      plate?: string;
      is_active?: boolean;
      driverId?: string | null;
    };
  }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}/events/vehicle/${encodeURIComponent(vehicleId)}/history?page=${page}&limit=${limit}`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar el historial de la unidad"));
    }
    const json = await response.json();
    const payload =
      json && typeof json === "object" && "data" in json
        ? ((json as { data?: unknown }).data as Record<string, unknown> | undefined)
        : (json as Record<string, unknown>);
    const events = Array.isArray(payload?.events) ? (payload?.events as any[]) : unwrapList<any>(json);
    const vehicle =
      payload && typeof payload === "object" && "vehicle" in payload
        ? (payload as { vehicle?: Record<string, unknown> }).vehicle
        : undefined;
    return { events, vehicle };
  },

  async getHistorialChofer(
    driverId: string,
    page: number,
    limit: number,
  ): Promise<{
    events: {
      id: string;
      event_datetime?: string;
      event_type?: string;
      general_result?: string | null;
      final_observations?: string | null;
      created_at?: string;
      updated_at?: string;
      driver?: { name?: string } | null;
      createdBy?: { name?: string } | null;
      vehicle_id?: string;
    }[];
    driver?: {
      id?: string;
      name?: string;
      license_number?: string;
    };
  }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}/events/driver/${encodeURIComponent(driverId)}/history?page=${page}&limit=${limit}`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar el historial del chofer"));
    }
    const json = await response.json();
    const payload =
      json && typeof json === "object" && "data" in json
        ? ((json as { data?: unknown }).data as Record<string, unknown> | undefined)
        : (json as Record<string, unknown>);
    const events = Array.isArray(payload?.events) ? (payload?.events as any[]) : unwrapList<any>(json);
    const driver =
      payload && typeof payload === "object" && "driver" in payload
        ? (payload as { driver?: Record<string, unknown> }).driver
        : undefined;
    return { events, driver };
  },

  // funcion para obtener el historial completo de eventos, con paginacion y filtros
  async getEvents(
    criterio: "idUnidad" | "idChofer",
    valor: string,
  ): Promise<RegistroHistorial[]> {
    if (!valor.trim()) return [];
    try {
      if (criterio === "idUnidad") {
        const { events, vehicle } = await this.getHistorialUnidad(valor, 1, 200);
        eventsApiAvailable = true;
        return events.map((e: any) => ({
          idUnidad: String(vehicle?.unit_number ?? vehicle?.plate ?? valor ?? e.vehicle_id ?? ""),
          idChofer: String(e.driver_id ?? e.driver?.id ?? ""),
          fechaInspeccion: e.event_type === "INSPECTION" ? formatDate(e.event_datetime) : "",
          fechaIncidente: e.event_type === "INCIDENT" ? formatDate(e.event_datetime) : "",
          fechaMantenimiento: e.event_type === "MAINTENANCE" ? formatDate(e.event_datetime) : "",
        }));
      }

      const { events, driver } = await this.getHistorialChofer(valor, 1, 200);
      eventsApiAvailable = true;
      return events.map((e: any) => ({
        idUnidad: String(e.vehicle_id ?? ""),
        idChofer: String(driver?.id ?? valor ?? e.driver_id ?? ""),
        fechaInspeccion: e.event_type === "INSPECTION" ? formatDate(e.event_datetime) : "",
        fechaIncidente: e.event_type === "INCIDENT" ? formatDate(e.event_datetime) : "",
        fechaMantenimiento: e.event_type === "MAINTENANCE" ? formatDate(e.event_datetime) : "",
      }));
    } catch (err) {
      if (eventsApiAvailable !== true) return MOCK_HISTORIAL;
      throw err;
    }
  },

  // funcion para obtener el reporte completo de eventos de una unidad

  async getHistorialReporte(idUnidad: string): Promise<EventoReporte[]> {
    if (!idUnidad) return [];
    try {
      const { events, vehicle } = await this.getHistorialUnidad(idUnidad, 1, 200);
      eventsReportApiAvailable = true;
      return events.map((e: any) => {
        const rawDate = e.event_datetime ?? e.created_at ?? e.updated_at;
        const context = e.context ?? e.typeInspection ?? e.inspection_type ?? e.inspectionType;
        const eventoLabel =
          context === "ARRIVAL"
            ? "Inspeccion Llegada"
            : context === "DEPARTURE"
              ? "Inspeccion Salida"
              : e.event_type ?? "Evento";
        const tipoResultado =
          e.general_result === "WITH_OBS"
            ? "hallazgo"
            : e.general_result === "WITHOUT_OBS"
              ? "normal"
              : "completado";
        return {
          fecha: formatDate(rawDate),
          hora: formatTime(rawDate),
          unidad: String(vehicle?.unit_number ?? vehicle?.plate ?? idUnidad),
          evento: String(eventoLabel),
          resultadoDetalle: String(
            e.final_observations ??
              (e.general_result === "WITH_OBS"
                ? "Con observaciones"
                : e.general_result === "WITHOUT_OBS"
                  ? "Sin observaciones"
                  : "Completado"),
          ),
          tipoResultado,
          registradoPor: String(e.createdBy?.name ?? e.created_by_user_id ?? "Sistema"),
        } as EventoReporte;
      });
    } catch (err) {
      if (eventsReportApiAvailable !== true) return MOCK_HISTORIAL_REPORTE;
      throw err;
    }
  },

  /**
   * Crea una inspección. Requiere auth (JWT).
   * POST /api/events/inspection
   */
  async createInspection(payload: CreateInspectionPayload): Promise<{ success: boolean; data: unknown }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.EVENTS}/inspection`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al guardar la inspección"));
    }
    return response.json();
  },
};

/** Payload para POST /api/events/inspection (alineado con backend CreateInspectionDto) */
export interface CreateInspectionPayload {
  vehicleId: string;
  driverId: string;
  typeInspection: "ARRIVAL" | "DEPARTURE";
  documentationVerified: boolean;
  vehicleCondition: "ACCEPTABLE" | "NOT_ACCEPTABLE";
  lightsOk: boolean;
  tiresOk: boolean;
  brakesOk: boolean;
  safetyElementsOk: boolean;
  eSignature: string;
  isConfirmed: boolean;
  finalObservations?: string;
  generalResult?: "WITH_OBS" | "WITHOUT_OBS";
  context?: "ARRIVAL" | "DEPARTURE";
}

