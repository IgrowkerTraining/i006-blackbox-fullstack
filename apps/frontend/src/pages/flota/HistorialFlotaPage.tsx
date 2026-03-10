import React from 'react';
import { useDocumentTitle } from '@/src/hooks/useDocumentTitle';
import { useFlota } from '@/src/hooks/useFlota';

interface Props {
  vehicleId: string;
}

const HistorialFlotaPage: React.FC<Props> = ({ vehicleId }) => {
  useDocumentTitle('Historial de la unidad');

  const { unit, timeline, loading, error, hasMoreEvents, loadMoreEvents } = useFlota(vehicleId);

  return (
    <main className="max-w-5xl mx-auto w-full px-6 py-6 text-slate-900">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Historial de la Unidad</h1>
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
                Chofer asignado: {unit.driver}
              </p>
            </div>
            <div className="text-sm text-slate-600">
              Estado:{' '}
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700">
                {unit.status}
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
          <span className="absolute left-3 top-2 bottom-2 w-px bg-slate-200" aria-hidden="true" />
          <div className="space-y-5">
            {timeline.map((item) => (
              <article key={item.id} className="relative bg-slate-50 rounded-lg p-4 md:p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <p className="text-xs text-slate-500">{item.timeLabel}</p>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-700">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
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
              onClick={loadMoreEvents}  // ✅ corregido
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