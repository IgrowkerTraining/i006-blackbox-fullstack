import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

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

const activities = [
  {
    type: "success" as const,
    title: "Inspección de Salida: Unidad 505",
    detail: "Chofer: Mario Hernandez (Sin observaciones)",
    time: "Hace 15 min",
  },
  {
    type: "warning" as const,
    title: "Inspección de Llegada: Unidad 302",
    detail: "Chofer: Julio Fernandez (",
    detailHighlight: "Exit trasera rota",
    detailSuffix: ")",
    time: "Hace 1 hora",
  },
  {
    type: "info" as const,
    title: "Mantenimiento Registrado: Unidad 505",
    detail: "Cambio de aceite y filtros (Agendado)",
    time: "Hace 3 horas",
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate(ROUTES.INSPECCION_NUEVA)}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-[38px] py-[20px] text-sm font-medium text-[#3F51B5] shadow-sm hover:bg-slate-50 transition-colors border border-slate-200"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#3F51B5]">
            <IconPlus />
          </span>
          Nueva Inspección
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm pt-[22px] pb-[26px] pl-[27px]">
          <p className="text-sm font-medium text-slate-600">Flota Activa</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">42</p>
          <p className="text-sm text-green-600 mt-1">↑ 100% Operativa</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm pt-[22px] pb-[26px] pl-[27px]">
          <p className="text-sm font-medium text-slate-600">Inspecciones de hoy</p>
          <p className="text-3xl font-bold text-blue-700 mt-1">14</p>
          <p className="text-sm text-slate-600 mt-1">8 Salidas / 6 Llegadas</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm pt-[22px] pb-[26px] pl-[27px]">
          <p className="text-sm font-medium text-slate-600">Hallazgos Abiertos</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">3</p>
          <p className="text-sm text-slate-600 mt-1">Requieren Atención</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-[45px]">
            <h2 className="text-lg font-semibold text-slate-800 pl-[27px] pr-5 pt-5 pb-4">Actividad reciente en Patio</h2>
            <div className="divide-y divide-slate-200">
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

        <section className="pt-[2.75rem] flex flex-col min-h-0">
          <div className="bg-slate-900 rounded-xl px-[25px] py-5 shadow-sm border border-slate-700 flex-1 min-h-0 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-semibold text-[20px]">BlackBox Engine</span>
              <LogoHexagon />
            </div>
            <p className="text-sm text-slate-400 mb-4">Análisis de patrones semanales disponible</p>
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
                Se detecta recurrencia en fallas de documentación en el turno de la tarde (14:00 -
                18:00) en los últimos 7 días.
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
