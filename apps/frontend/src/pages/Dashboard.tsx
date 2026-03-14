import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useDocumentTitle } from "@/src/hooks/useDocumentTitle";
import { api, type OperationalEvent } from "@/src/services/api";
import LoadingSpinner from "@/src/components/common/LoadingSpinner";
import ErrorMessage from "@/src/components/common/ErrorMessage";

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#3F51B5]">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
  </svg>
);

const IconAlert = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
);

const IconGear = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoHexagon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
    <path d="M12 2L20 6v8l-8 4-8-4V6l8-4z" />
  </svg>
);

type ActivityItem = {
  type: "success" | "warning" | "info";
  title: string;
  detail: string;
  detailHighlight?: string;
  detailSuffix?: string;
  time: string;
};

const toDateString = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const timeAgo = (value?: string | null) => {
  if (!value) return "Hace un momento";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Hace un momento";
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Hace menos de 1 min";
  if (diffMin < 60) return `Hace ${diffMin} min`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `Hace ${diffHours} h`;
  const diffDays = Math.floor(diffHours / 24);
  return `Hace ${diffDays} d`;
};

const getInspectionType = (event: OperationalEvent) => {
  const inspection = event.inspection_details?.[0];
  if (inspection?.type_inspection === "ARRIVAL") return "Inspeccion de Llegada";
  if (inspection?.type_inspection === "DEPARTURE") return "Inspeccion de Salida";
  return "Inspeccion";
};

const getUnitLabel = (event: OperationalEvent) => {
  const vehicle = event.vehicle ?? undefined;
  return String(
    vehicle?.unit_number ??
      vehicle?.plate ??
      event.vehicle_id ??
      "Sin unidad",
  );
};

const hasFinding = (event: OperationalEvent) => {
  if (event.general_result === "WITH_OBS") return true;
  const inspection = event.inspection_details?.[0];
  if (!inspection) return false;
  const flags = [
    inspection.documentation_verified,
    inspection.vehicle_condition === "NOT_ACCEPTABLE",
    inspection.lights_ok,
    inspection.tires_ok,
    inspection.brakes_ok,
    inspection.safety_elements_ok,
  ];
  return flags.some((flag) => flag === false);
};

const buildActivity = (event: OperationalEvent): ActivityItem => {
  const unit = getUnitLabel(event);
  const driverName = event.driver?.name ?? "Sin chofer";
  const when = timeAgo(event.event_datetime ?? null);

  if (event.event_type === "INSPECTION") {
    const finding = hasFinding(event);
    return {
      type: finding ? "warning" : "success",
      title: `${getInspectionType(event)}: Unidad ${unit}`,
      detail: `Chofer: ${driverName}${finding ? " (" : ""}`,
      detailHighlight: finding ? "Con observaciones" : undefined,
      detailSuffix: finding ? ")" : undefined,
      time: when,
    };
  }

  if (event.event_type === "MAINTENANCE") {
    return {
      type: "info",
      title: `Mantenimiento registrado: Unidad ${unit}`,
      detail: `Chofer: ${driverName}`,
      time: when,
    };
  }

  if (event.event_type === "ACCIDENT") {
    return {
      type: "warning",
      title: `Accidente reportado: Unidad ${unit}`,
      detail: `Chofer: ${driverName}`,
      time: when,
    };
  }

  return {
    type: "info",
    title: `Evento operativo: Unidad ${unit}`,
    detail: `Chofer: ${driverName}`,
    time: when,
  };
};

const Dashboard: React.FC = () => {
  useDocumentTitle("Dashboard");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [flotaActiva, setFlotaActiva] = useState(0);
  const [flotaTotal, setFlotaTotal] = useState(0);
  const [inspeccionesHoy, setInspeccionesHoy] = useState(0);
  const [inspeccionesSalida, setInspeccionesSalida] = useState(0);
  const [inspeccionesLlegada, setInspeccionesLlegada] = useState(0);
  const [hallazgosAbiertos, setHallazgosAbiertos] = useState(0);
  const [alertText, setAlertText] = useState("Sin alertas recientes.");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      const startDate = toDateString(today);
      const endDate = toDateString(tomorrow);

      const [flota, inspectionsTodayRes, recentRes, inspectionsRes] = await Promise.all([
        api.getFlota(),
        api.getOperationalEvents({
          eventType: "INSPECTION",
          startDate,
          endDate,
          limit: 200,
          offset: 0,
        }),
        api.getOperationalEvents({ limit: 8, offset: 0 }),
        api.getOperationalEvents({ eventType: "INSPECTION", limit: 200, offset: 0 }),
      ]);

      const total = flota.length;
      const active = flota.filter((item) => {
        const anyItem = item as Record<string, unknown>;
        const estado = String(item.estado ?? anyItem.status ?? "").toUpperCase();
        const isActiveFlag =
          typeof anyItem.is_active === "boolean" ? anyItem.is_active : undefined;
        if (isActiveFlag === false) return false;
        if (estado && estado !== "ACTIVO") return false;
        return true;
      }).length;
      setFlotaTotal(total);
      setFlotaActiva(active);

      const todayEvents = inspectionsTodayRes.events ?? [];
      const arrival = todayEvents.filter(
        (event) => event.inspection_details?.[0]?.type_inspection === "ARRIVAL",
      ).length;
      const departure = todayEvents.filter(
        (event) => event.inspection_details?.[0]?.type_inspection === "DEPARTURE",
      ).length;
      setInspeccionesHoy(todayEvents.length);
      setInspeccionesLlegada(arrival);
      setInspeccionesSalida(departure);

      const inspections = inspectionsRes.events ?? [];
      const now = Date.now();
      const recentFindings = inspections.filter((event) => {
        if (!event.event_datetime) return false;
        const diffDays = (now - new Date(event.event_datetime).getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= 7 && hasFinding(event);
      });
      setHallazgosAbiertos(recentFindings.length);
      setAlertText(
        recentFindings.length > 0
          ? `Se registraron ${recentFindings.length} hallazgos en los ultimos 7 dias.`
          : "Sin hallazgos recientes.",
      );

      const recent = recentRes.events ?? [];
      setActivities(recent.map(buildActivity));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const flotaOperativa = useMemo(() => {
    if (flotaTotal <= 0) return "Operativa: 0%";
    const pct = Math.round((flotaActiva / flotaTotal) * 100);
    return `Operativa: ${pct}%`;
  }, [flotaActiva, flotaTotal]);

  if (loading) {
    return <LoadingSpinner message="Cargando dashboard..." inline />;
  }

  return (
    <div className="min-h-full">
      {error && <ErrorMessage message={error} onRetry={loadDashboard} className="mb-6" />}
      <div className="mb-12">
        <button
          type="button"
          onClick={() => navigate(ROUTES.INSPECCION_NUEVA)}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-[38px] py-[20px]  font-medium text-accent shadow-sm hover:bg-slate-50 transition-colors border border-slate-200"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent">
            <IconPlus />
          </span>
          Nueva Inspeccion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm pt-[22px] pb-[26px] pl-[27px]">
          <p className="text-sm font-medium text-slate-400">Flota Activa</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{flotaActiva}</p>
          <p className="text-sm text-green-600 mt-1">{flotaOperativa}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm pt-[22px] pb-[26px] pl-[27px]">
          <p className="text-sm font-medium text-slate-400">Inspecciones de hoy</p>
          <p className="text-3xl font-bold text-accent mt-1">{inspeccionesHoy}</p>
          <p className="text-sm text-slate-600 mt-1">
            {inspeccionesSalida} Salidas / {inspeccionesLlegada} Llegadas
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm pt-[22px] pb-[26px] pl-[27px]">
          <p className="text-sm font-medium text-slate-400">Hallazgos Abiertos</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">{hallazgosAbiertos}</p>
          <p className="text-sm text-slate-600 mt-1">Requieren Atencion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <h2 className="text-lg font-semibold text-slate-800 pl-[27px] pr-5 pt-5 pb-4">Actividad reciente en Patio</h2>
            <div className="divide-y divide-slate-200">
              {activities.length === 0 && (
                <div className="pl-[35px] pr-5 py-[20px] text-sm text-slate-500">
                  No hay actividad reciente.
                </div>
              )}
              {activities.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 pl-[35px] pr-5 py-[20px]"
                >
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === "success"
                        ? "bg-green-500"
                        : item.type === "warning"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                    }`}
                  >
                    {item.type === "success" && <IconCheck />}
                    {item.type === "warning" && <IconAlert />}
                    {item.type === "info" && <IconGear />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800">{item.title}</p>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {item.detail}
                      {item.detailHighlight != null && (
                        <span className="text-amber-600 font-medium">{item.detailHighlight}</span>
                      )}
                      {item.detailSuffix}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col min-h-0">
          <div className="bg-slate-900 rounded-xl px-[25px] py-5 shadow-sm border border-slate-700 flex-1 min-h-0 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-semibold text-[20px]">BlackBox Engine</span>
              <LogoHexagon />
            </div>
            <p className="text-sm text-slate-400 mb-4">Analisis de patrones semanales disponible</p>
            <div
              className="rounded-[10px] mb-[30px] p-5"
              style={{
                backgroundColor: "#3D3D39",
                border: "1px solid #505050",
                boxShadow:
                  "inset 2px 0 0 rgba(192, 192, 192, 0.35), inset -2px 0 0 rgba(192, 192, 192, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.2), 0 2px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <span
                className="inline-block font-bold uppercase tracking-wide mb-2 text-[17px]"
                style={{ color: "#FF4B4B" }}
              >
                Alerta
              </span>
              <p className="text-[15px] leading-snug text-white">
                {alertText}
              </p>
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-300 transition-colors"
            >
              Ver Reporte Completo
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
