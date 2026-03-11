import { User } from "../types";
import { API_ENDPOINTS, STORAGE_KEYS } from "../constants/routes";
import type {
  Chofer,
  ChoferFicha,
  UnidadFlota,
  RegistroHistorial,
  EventoReporte,
} from "../types/dataPages";
import {
  MOCK_CHOFERES,
  MOCK_CHOFER_FICHA,
  MOCK_HISTORIAL,
  MOCK_HISTORIAL_REPORTE,
} from "../data/mockData";

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
    return json.data ?? json;
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
    return json.data ?? json;
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
    const data = json.data ?? json;

    return data.map((v: any) => ({
      id: v.id,
      idUnidad: v.unit_number,
      unit_number: v.unit_number,
      plate: v.plate,
      estado: v.is_active ? "ACTIVO" : "INACTIVO",
      chofer: v.driverId ?? "Sin asignar",
      ultimaInspeccion: v.updatedAt,
    }));
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
    const events = unwrapList<{
      id: string;
      event_datetime?: string;
      event_type?: string;
      general_result?: string | null;
      final_observations?: string | null;
      created_at?: string;
      updated_at?: string;
      driver?: { name?: string } | null;
      createdBy?: { name?: string } | null;
    }>(json);
    const vehicle =
      json && typeof json === "object" && "data" in json
        ? (json as { data?: { vehicle?: Record<string, unknown> } }).data?.vehicle
        : undefined;
    return { events, vehicle };
  },

  // funcion para obtener el historial completo de eventos, con paginacion y filtros
  async getEvents(): Promise<RegistroHistorial[]> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.EVENTS}`,
      { headers: authHeaders() },
    );

    if (response.ok) {
      eventsApiAvailable = true;
      const json = await response.json();
      return json.data ?? json;
    }

    // Si el endpoint aun no existe, usar mock solo si nunca se confirmo disponible.
    if (response.status === 404 && eventsApiAvailable !== true) return MOCK_HISTORIAL;

    throw new Error(await buildErrorMessage(response, "Error al cargar el historial"));
  },

  // funcion para obtener el reporte completo de eventos de una unidad

  async getHistorialReporte(idUnidad: string): Promise<EventoReporte[]> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.EVENTS}/reporte/${encodeURIComponent(idUnidad)}`,
      { headers: authHeaders() },
    );

    if (response.ok) {
      eventsReportApiAvailable = true;
      const json = await response.json();
      return json.data ?? json;
    }

    if (response.status === 404 && eventsReportApiAvailable !== true) return MOCK_HISTORIAL_REPORTE;

    throw new Error(await buildErrorMessage(response, "Error al cargar el historial"));
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

