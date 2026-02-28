import { User } from "../types";
import type { Chofer } from "../types/dataPages";
import { API_ENDPOINTS } from "../constants/routes";
import { MOCK_CHOFERES } from "../data/mockData";

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
};
