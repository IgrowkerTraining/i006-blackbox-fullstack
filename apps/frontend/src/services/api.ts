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

export interface OperationalEvent {
  id: string;
  vehicle_id?: string | null;
  driver_id?: string | null;
  event_type?: string;
  event_datetime?: string;
  location?: string | null;
  context?: string | null;
  general_result?: string | null;
  severity?: string | null;
  cost?: number | null;
  mileage?: number | null;
  next_service_date?: string | null;
  injuries_reported?: boolean | null;
  final_observations?: string | null;
  is_confirmed?: boolean | null;
  vehicle?: { id?: string; unit_number?: string | null; plate?: string | null } | null;
  driver?: { id?: string; name?: string | null } | null;
  createdBy?: { name?: string | null } | null;
  inspection_details?: Array<{
    type_inspection?: "ARRIVAL" | "DEPARTURE" | null;
    documentation_verified?: boolean | null;
    vehicle_condition?: "ACCEPTABLE" | "NOT_ACCEPTABLE" | null;
    lights_ok?: boolean | null;
    tires_ok?: boolean | null;
    brakes_ok?: boolean | null;
    safety_elements_ok?: boolean | null;
  }>;
}

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

const resolveVehicleIdFromFlota = async (value: string): Promise<string | null> => {
  if (!value) return null;
  try {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.FLOTA}`,
      { headers: authHeaders() },
    );
    if (!response.ok) return null;
    const json = await response.json();
    const data = unwrapData<Record<string, unknown>>(json);
    const match = data.find((v: Record<string, unknown>) => {
      const unit =
        (v.unit_number ?? v.unitNumber ?? v.idUnidad ?? v.plate ?? v.id) as string | undefined;
      return (
        String(v.id ?? "") === value ||
        String(v.vehicleId ?? "") === value ||
        String(v.vehicle_id ?? "") === value ||
        String(unit ?? "") === value
      );
    });
    const resolved = (match?.id ?? match?.vehicleId ?? match?.vehicle_id) as string | undefined;
    return resolved ? String(resolved) : null;
  } catch {
    return null;
  }
};

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

const formatDateTime = (value?: string | null): string => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("es-EC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
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

const fetchLastInspectionMap = async (): Promise<Record<string, string>> => {
  const response = await fetch(
    `${API_ENDPOINTS.BASE}${API_ENDPOINTS.EVENTS}?limit=500&offset=0`,
    { headers: authHeaders() },
  );
  if (!response.ok) return {};
  const json = await response.json();
  const payload =
    json && typeof json === "object" && "data" in json
      ? ((json as { data?: unknown }).data as Record<string, unknown> | undefined)
      : undefined;
  const events = Array.isArray(payload?.events) ? (payload?.events as any[]) : [];

  const map: Record<string, string> = {};
  for (const e of events) {
    if (e?.event_type !== "INSPECTION") continue;
    const vehicleId = e?.vehicle_id ?? e?.vehicleId;
    const dt = e?.event_datetime ?? e?.created_at ?? e?.createdAt;
    if (!vehicleId || !dt) continue;
    const prev = map[String(vehicleId)];
    if (!prev || new Date(dt).getTime() > new Date(prev).getTime()) {
      map[String(vehicleId)] = String(dt);
    }
  }
  return map;
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

  async getFlota(
    options?: { includeCurrentDriver?: boolean; includeLastInspection?: boolean },
  ): Promise<UnidadFlota[]> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.FLOTA}`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar la flota"));
    }
    const json = await response.json();
    const data = unwrapData<Record<string, unknown>>(json);

    const lastInspectionMap = options?.includeLastInspection
      ? await fetchLastInspectionMap()
      : null;

    const base = data.map((v: Record<string, unknown>) => {
      const unitNumber = (v.unit_number ?? v.unitNumber ?? v.idUnidad ?? v.plate ?? v.id ?? "") as string;
      const driver = (v.driver as Record<string, unknown> | undefined) ?? undefined;
      const vehicleId = (v.id ?? v.vehicleId ?? v.vehicle_id ?? v.idUnidad ?? "") as string;
      const lastInspection =
        (lastInspectionMap && vehicleId ? lastInspectionMap[String(vehicleId)] : undefined) ??
        (v.lastInspection ??
          v.last_inspection ??
          v.lastInspectionAt ??
          v.last_inspection_at ??
          v.last_event_datetime ??
          v.lastEventDate ??
          "") as string;
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
        ultimaInspeccion: formatDateTime(lastInspection || ""),
      };
    });

    if (!options?.includeCurrentDriver) return base;

    const enriched = await Promise.all(
      base.map(async (v) => {
        if (v.chofer && v.chofer !== "Sin asignar") return v;
        const vehicleId =
          (v.id ??
            (v as Record<string, unknown>).vehicleId ??
            (v as Record<string, unknown>).vehicle_id ??
            v.idUnidad) as string | undefined;
        if (!vehicleId) return v;

        try {
          const current = await this.getCurrentDriver(vehicleId);
          const name = current?.name;
          const id = current?.id;
          return {
            ...v,
            chofer: (name ?? v.chofer ?? "Sin asignar") as string,
            currentDriverId: id ?? (v as any).currentDriverId,
            currentDriverName: name ?? (v as any).currentDriverName,
          };
        } catch {
          return v;
        }
      }),
    );

    return enriched;
  },

  async getCurrentDriver(
    vehicleId: string,
  ): Promise<{ id?: string; name?: string } | null> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}/events/vehicle/${encodeURIComponent(vehicleId)}/current-driver`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar conductor actual"));
    }
    const json = await response.json();
    const payload =
      json && typeof json === "object" && "data" in json
        ? ((json as { data?: unknown }).data as Record<string, unknown> | undefined)
        : (json as Record<string, unknown>);
    const current =
      payload && typeof payload === "object" && "currentDriver" in payload
        ? (payload as { currentDriver?: Record<string, unknown> | null }).currentDriver
        : (payload as Record<string, unknown> | null);
    if (!current || typeof current !== "object") return null;
    return {
      id: (current as Record<string, unknown>).id as string | undefined,
      name: (current as Record<string, unknown>).name as string | undefined,
    };
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
        let events: any[] = [];
        let vehicle: Record<string, unknown> | undefined;
        try {
          const result = await this.getHistorialUnidad(valor, 1, 200);
          events = result.events;
          vehicle = result.vehicle as Record<string, unknown> | undefined;
        } catch {
          const resolved = await resolveVehicleIdFromFlota(valor);
          if (resolved && resolved !== valor) {
            const result = await this.getHistorialUnidad(resolved, 1, 200);
            events = result.events;
            vehicle = result.vehicle as Record<string, unknown> | undefined;
          } else {
            throw new Error("No se pudo resolver la unidad");
          }
        }
        eventsApiAvailable = true;
        if (!events.length) return [];
        const latestByType: Record<string, string> = {};
        let latestOverall: any = null;
        for (const e of events) {
          const dt = e.event_datetime ?? e.created_at ?? e.createdAt;
          const time = dt ? new Date(dt).getTime() : 0;
          if (!latestOverall || time > (new Date(latestOverall.event_datetime ?? latestOverall.created_at ?? latestOverall.createdAt).getTime() || 0)) {
            latestOverall = e;
          }
          if (!dt || !e.event_type) continue;
          const prev = latestByType[e.event_type];
          if (!prev || new Date(dt).getTime() > new Date(prev).getTime()) {
            latestByType[e.event_type] = dt;
          }
        }
        return [
          {
            idUnidad: String((vehicle as any)?.unit_number ?? (vehicle as any)?.plate ?? valor ?? latestOverall?.vehicle_id ?? ""),
            idChofer: String(latestOverall?.driver_id ?? latestOverall?.driver?.id ?? ""),
            fechaInspeccion: latestByType["INSPECTION"] ? formatDate(latestByType["INSPECTION"]) : "",
            fechaIncidente: latestByType["ACCIDENT"] ? formatDate(latestByType["ACCIDENT"]) : "",
            fechaMantenimiento: latestByType["MAINTENANCE"] ? formatDate(latestByType["MAINTENANCE"]) : "",
          } as RegistroHistorial,
        ];
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

  async getAllEvents(limit: number = 200, offset: number = 0): Promise<RegistroHistorial[]> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.EVENTS}?limit=${limit}&offset=${offset}`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar el historial de eventos"));
    }
    const json = await response.json();
    const payload =
      json && typeof json === "object" && "data" in json
        ? ((json as { data?: unknown }).data as Record<string, unknown> | undefined)
        : undefined;
    const events = Array.isArray(payload?.events) ? (payload?.events as any[]) : unwrapList<any>(json);

    return events.map((e: any) => ({
      idUnidad: String(
        e.vehicle?.unit_number ??
          e.vehicle?.plate ??
          e.vehicle_id ??
          "",
      ),
      idChofer: String(
        e.driver?.id ??
          e.driver_id ??
          "",
      ),
      fechaInspeccion: e.event_type === "INSPECTION" ? formatDate(e.event_datetime) : "",
      fechaIncidente: e.event_type === "ACCIDENT" ? formatDate(e.event_datetime) : "",
      fechaMantenimiento: e.event_type === "MAINTENANCE" ? formatDate(e.event_datetime) : "",
    }));
  },

  async getAllEventsRaw(limit: number = 200, offset: number = 0): Promise<Record<string, unknown>[]> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.EVENTS}?limit=${limit}&offset=${offset}`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar el historial de eventos"));
    }
    const json = await response.json();
    const payload =
      json && typeof json === "object" && "data" in json
        ? ((json as { data?: unknown }).data as Record<string, unknown> | undefined)
        : undefined;
    const events = Array.isArray(payload?.events) ? (payload?.events as any[]) : unwrapList<any>(json);
    return events as Record<string, unknown>[];
  },

  async getOperationalEvents(params?: {
    eventType?: string;
    severity?: string;
    vehicleId?: string;
    driverId?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ events: OperationalEvent[]; total: number; limit: number; offset: number }> {
    const search = new URLSearchParams();
    if (params?.eventType) search.set("eventType", params.eventType);
    if (params?.severity) search.set("severity", params.severity);
    if (params?.vehicleId) search.set("vehicleId", params.vehicleId);
    if (params?.driverId) search.set("driverId", params.driverId);
    if (params?.startDate) search.set("startDate", params.startDate);
    if (params?.endDate) search.set("endDate", params.endDate);
    if (typeof params?.limit === "number") search.set("limit", String(params.limit));
    if (typeof params?.offset === "number") search.set("offset", String(params.offset));
    const qs = search.toString();

    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.EVENTS}${qs ? `?${qs}` : ""}`,
      { headers: authHeaders() },
    );
    if (!response.ok) {
      throw new Error(await buildErrorMessage(response, "Error al cargar eventos operativos"));
    }
    const json = await response.json();
    const data =
      json && typeof json === "object" && "data" in json
        ? (json as { data?: Record<string, unknown> }).data
        : (json as Record<string, unknown>);
    const events = Array.isArray((data as any)?.events)
      ? ((data as any).events as OperationalEvent[])
      : unwrapList<OperationalEvent>(json);
    const total =
      typeof (data as any)?.total === "number" ? ((data as any).total as number) : events.length;
    const limit =
      typeof (data as any)?.limit === "number"
        ? ((data as any).limit as number)
        : params?.limit ?? events.length;
    const offset =
      typeof (data as any)?.offset === "number"
        ? ((data as any).offset as number)
        : params?.offset ?? 0;
    return { events, total, limit, offset };
  },

  // funcion para obtener el reporte completo de eventos de una unidad

  async getHistorialReporte(idUnidad: string): Promise<EventoReporte[]> {
    if (!idUnidad) return [];
    try {
      let events: any[] = [];
      let vehicle: Record<string, unknown> | undefined;
      try {
        const result = await this.getHistorialUnidad(idUnidad, 1, 200);
        events = result.events;
        vehicle = result.vehicle as Record<string, unknown> | undefined;
      } catch {
        const resolved = await resolveVehicleIdFromFlota(idUnidad);
        if (resolved && resolved !== idUnidad) {
          const result = await this.getHistorialUnidad(resolved, 1, 200);
          events = result.events;
          vehicle = result.vehicle as Record<string, unknown> | undefined;
        } else {
          throw new Error("No se pudo resolver la unidad");
        }
      }
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
          unidad: String((vehicle as any)?.unit_number ?? (vehicle as any)?.plate ?? idUnidad),
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

