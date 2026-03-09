import { User } from "../types";
import { API_ENDPOINTS } from "../constants/routes";
import { storage } from "../utils/storage";
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
  MOCK_FLOTA,
  MOCK_HISTORIAL,
  MOCK_HISTORIAL_REPORTE,
} from "../data/mockData";

/** Cabeceras con JWT para peticiones autenticadas. */
function getAuthHeaders(): HeadersInit {
  const token = storage.getToken();
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
  } catch {

  }
  return `${fallback} )`;
};

/** Extrae el array de respuestas con formato { success, data }. Si ya es array, lo devuelve. */
function unwrapData<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object" && "data" in json && Array.isArray((json as { data: unknown }).data)) {
    return (json as { data: T[] }).data;
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

  async login(data: any,): Promise<{ user: User; token: string; message: string }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.LOGIN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Credenciales inválidas"));
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

  /**
   * Lista de choferes. Si el backend no tiene el endpoint aún, devuelve mock data.
   * Los filtros se aplican en el frontend.
   */
  async getChoferes(): Promise<Chofer[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.CHOFERES}`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        if (response.status === 404) return MOCK_CHOFERES;
        throw new Error(await buildErrorMessage(response, "Error"));
      }
      const json = await response.json();
      return unwrapData<Chofer>(json);
    } catch {
      return MOCK_CHOFERES;
    }
  },

  /**
   * Ficha de un chofer por ID. Mientras no exista el endpoint (hoy devuelve 400),
   * retornamos siempre el mock para que la UI funcione.
   */
  async getChoferById(idChofer: string): Promise<ChoferFicha> {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASE}${API_ENDPOINTS.CHOFERES}/${encodeURIComponent(idChofer)}`,
        { headers: getAuthHeaders() },
      );
      if (!response.ok) return MOCK_CHOFER_FICHA;
      return response.json() as Promise<ChoferFicha>;
    } catch {
      return MOCK_CHOFER_FICHA;
    }
  },

  /**
   * Inventario de flota. Si el backend no tiene el endpoint aún, devuelve mock data.
   */
  async getFlota(): Promise<UnidadFlota[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.FLOTA}`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        if (response.status === 404) return MOCK_FLOTA;
        throw new Error(await buildErrorMessage(response, "Error"));
      }
      const json = await response.json();
      return unwrapData<UnidadFlota>(json);
    } catch {
      return MOCK_FLOTA;
    }
  },

  /**
   * Historial de eventos. Si el backend no tiene el endpoint aún, devuelve mock data.
   */
  async getHistorial(): Promise<RegistroHistorial[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.HISTORIAL}`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        if (response.status === 404) return MOCK_HISTORIAL;
        throw new Error(await buildErrorMessage(response, "Error"));
      }
      const json = await response.json();
      return unwrapData<RegistroHistorial>(json);
    } catch {
      return MOCK_HISTORIAL;
    }
  },

  /**
   * Registro consolidado de eventos (reporte por unidad). Si el backend no tiene
   * el endpoint, devuelve siempre el mock para cualquier idUnidad.
   */
  async getHistorialReporte(idUnidad: string): Promise<EventoReporte[]> {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASE}${API_ENDPOINTS.HISTORIAL}/reporte/${encodeURIComponent(idUnidad)}`,
        { headers: getAuthHeaders() },
      );
      if (!response.ok) return MOCK_HISTORIAL_REPORTE;
      const json = await response.json();
      return unwrapData<EventoReporte>(json);
    } catch {
      return MOCK_HISTORIAL_REPORTE;
    }
  },
};
