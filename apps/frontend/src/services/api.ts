import { User } from "../types";
import { API_ENDPOINTS } from "../constants/routes";
import type {
  Chofer,
  ChoferFicha,
  UnidadFlota,
  RegistroHistorial,
} from "../types/dataPages";
import {
  MOCK_CHOFERES,
  MOCK_CHOFER_FICHA,
  MOCK_FLOTA,
  MOCK_HISTORIAL,
} from "../data/mockData";

export const api = {
  async register(data: any): Promise<{ user: User; message: string }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.REGISTER}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Registration failed");
    }
    return result;
  },

  async login(
    data: any,
  ): Promise<{ user: User; token: string; message: string }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.LOGIN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Login failed");
    }
    return result;
  },

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.HEALTH}`);
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
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.CHOFERES}`);
      if (!response.ok) {
        if (response.status === 404) return MOCK_CHOFERES;
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || `Error ${response.status}`);
      }
      return response.json() as Promise<Chofer[]>;
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
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.FLOTA}`);
      if (!response.ok) {
        if (response.status === 404) return MOCK_FLOTA;
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || `Error ${response.status}`);
      }
      return response.json() as Promise<UnidadFlota[]>;
    } catch {
      return MOCK_FLOTA;
    }
  },

  /**
   * Historial de eventos. Si el backend no tiene el endpoint aún, devuelve mock data.
   */
  async getHistorial(): Promise<RegistroHistorial[]> {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.HISTORIAL}`);
      if (!response.ok) {
        if (response.status === 404) return MOCK_HISTORIAL;
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || `Error ${response.status}`);
      }
      return response.json() as Promise<RegistroHistorial[]>;
    } catch {
      return MOCK_HISTORIAL;
    }
  },
};
