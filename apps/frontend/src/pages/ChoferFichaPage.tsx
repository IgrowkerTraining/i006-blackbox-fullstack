import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { PageDataContainer } from "../components/dataPage";
import { useApi } from "../hooks/useApi";
import { api } from "../services/api";
import type { ChoferFicha } from "../types/dataPages";

const StatusTruckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden
  >
    <path d="M3 7h12v10H3z" />
    <path d="M15 10h4l2 3v4h-6z" />
    <circle cx="7" cy="17" r="1.5" />
    <circle cx="18" cy="17" r="1.5" />
  </svg>
);

const ChoferFichaPage: React.FC = () => {
  const { idChofer } = useParams();

  const fetchChofer = useCallback(() => api.getChoferById(idChofer ?? ""), [idChofer]);
  const { data, loading, error, execute } = useApi<ChoferFicha>(fetchChofer);

  useEffect(() => {
    if (!idChofer) return;
    execute();
  }, [execute, idChofer]);

  return (
    <div className="max-w-5xl mx-auto w-full">
      <PageDataContainer title="Información de Choferes" filterLayout="stacked">
        {!idChofer ? (
          <ErrorMessage message="ID de chofer inválido." className="mb-4" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={execute} className="mb-4" />
        ) : loading || !data ? (
          <LoadingSpinner message="Cargando ficha..." inline />
        ) : (
          <div className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Foto */}
              <div className="w-full">
                <div className="rounded-lg overflow-hidden border border-slate-200 bg-surface-subtle">
                  <img
                    src={data.fotoUrl}
                    alt={`Foto de ${data.nombre}`}
                    className="w-full h-[240px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Datos */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{data.nombre}</h3>
                  <p className="text-sm text-slate-700">
                    Licencia: <span className="font-medium">{data.licencia}</span> |{" "}
                    Antigüedad: <span className="font-medium">{data.antiguedadAnios} Años</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="border border-slate-200 rounded-lg p-4 bg-white">
                    <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
                      Estado actual
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-green-700 font-medium text-sm">
                      <StatusTruckIcon />
                      <span>{data.estadoActual}</span>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-4 bg-white">
                    <p className="text-xs font-semibold tracking-wide text-slate-700">
                      Métrica de Cumplimiento (Últimos 30 días)
                    </p>
                    <p className="mt-2 text-sm text-slate-800 font-medium">
                      {data.metricaCumplimiento}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageDataContainer>
    </div>
  );
};

export default ChoferFichaPage;

