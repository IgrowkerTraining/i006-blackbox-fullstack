import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '@/src/hooks/useDocumentTitle';
import { useFlota } from '@/src/hooks/useFlota';

const HistorialFlotaPage: React.FC = () => {
  useDocumentTitle('Historial de la unidad');

  const { idUnidad } = useParams();
  const { unit, timeline, loading, error, hasMoreEvents, loadMoreEvents } = useFlota(idUnidad);

  const getStatusBadge = (status?: string) => {
    const value = (status ?? '').toUpperCase();
    if (value === 'WITH_OBS') {
      return { label: 'Hallazgo registrado', className: 'bg-amber-100 text-amber-700' };
    }
    if (value === 'WITHOUT_OBS') {
      return { label: 'Sin Observaciones', className: 'bg-emerald-100 text-emerald-700' };
    }
    if (value === 'COMPLETED' || value === 'DONE') {
      return { label: 'Completado', className: 'bg-slate-200 text-slate-700' };
    }
    return { label: status || 'Sin estado', className: 'bg-slate-100 text-slate-600' };
  };

  const getTimelineIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-indigo-600"
    >
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    </svg>
  );

  return (
    <main className="max-w-5xl mx-auto w-full px-6 py-6 text-slate-900">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Historial de la unidad</h1>
      </header>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section
        aria-labelledby="unit-summary-title"
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        {!unit && loading ? (
          <div className="animate-pulse space-y-2 w-full">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-3 bg-slate-200 rounded w-1/3" />
          </div>
        ) : unit ? (
          <>
            <div>
              <h2 id="unit-summary-title" className="text-lg font-semibold">{unit.name}</h2>
              <p className="text-sm text-slate-600 mt-2 inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM3.75 20.25a8.25 8.25 0 0116.5 0 .75.75 0 01-.75.75H4.5a.75.75 0 01-.75-.75z" />
                  </svg>
                </span>
                Chofer asignado: {unit.driver}
              </p>
            </div>
            <div className="text-sm text-slate-600">
              Estado:{' '}
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700">
                {unit.status === 'ACTIVO' ? 'Activo' : unit.status}
              </span>
            </div>
          </>
        ) : null}
      </section>

      <section
        aria-labelledby="timeline-title"
        className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6"
      >
        <h2 id="timeline-title" className="text-base font-semibold mb-5">
          Línea de tiempo operativa
        </h2>

        <div className="relative pl-10">
          <span className="absolute left-4 top-2 bottom-2 w-px bg-slate-200" aria-hidden="true" />
          <div className="space-y-5">
            {timeline.map((item) => (
              <article key={item.id} className="relative">
                <span className="absolute left-0 top-3 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 border border-indigo-200">
                  {getTimelineIcon()}
                </span>
                <div className="ml-6 bg-slate-50 rounded-lg p-4 md:p-5 border border-slate-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <p className="text-xs text-slate-500 inline-flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-400">
                        <path d="M7.5 2.25a.75.75 0 01.75.75V4.5h7.5V3a.75.75 0 011.5 0v1.5h.75A2.25 2.25 0 0120.25 6.75v11.25A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6.75A2.25 2.25 0 016 4.5h.75V3a.75.75 0 01.75-.75zM5.25 9h13.5v9A.75.75 0 0118 18.75H6A.75.75 0 015.25 18v-9z" />
                      </svg>
                      {item.timeLabel}
                    </p>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(item.status).className}`}>
                      {getStatusBadge(item.status).label}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">{item.title}</h3>
                  {item.status?.toUpperCase() === 'WITH_OBS' ? (
                    <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                      <p className="text-xs font-semibold text-amber-700">Categoría: Checklist</p>
                      <p className="mt-2 text-sm text-slate-700">{item.description}</p>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  )}
                </div>
              </article>
            ))}

            {loading && timeline.length > 0 && (
              <div className="animate-pulse space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-slate-100 rounded-lg h-20" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          {hasMoreEvents ? (
            <button
              type="button"
              onClick={loadMoreEvents}
              disabled={loading}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Cargando...' : 'Cargar registros anteriores...'}
            </button>
          ) : (
            <p className="text-xs text-slate-400">No hay más registros</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default HistorialFlotaPage;
