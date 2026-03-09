import React from 'react';
import { useDocumentTitle } from '@/src/hooks/useDocumentTitle';

type TimelineItem = {
  id: string;
  timeLabel: string;
  title: string;
  description: string;
  status: string;
  kind: "salida" | "mantenimiento" | "llegada";
};

const getStatusClasses = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes('sin')) return 'bg-emerald-100 text-emerald-700';
  if (normalized.includes('completado')) return 'bg-indigo-100 text-indigo-700';
  if (normalized.includes('hallazgo')) return 'bg-amber-100 text-amber-700';
  return 'bg-slate-100 text-slate-700';
};

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M8 2v4M16 2v4M3 10h18" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
  </svg>
);

/* SALIDA: arrow out of box (Departure) */
const IconSalida = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M7.5 3.75a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5v-12a1.5 1.5 0 00-1.5-1.5h-6zM15 10.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-2.69l3.97 3.97a.75.75 0 11-1.06 1.06l-3.97-3.97v2.69a.75.75 0 01-1.5 0v-4.5z" clipRule="evenodd" />
  </svg>
);

/* LLEGADA: arrow into box (Arrival) */
const IconLlegada = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5h-6a1.5 1.5 0 01-1.5-1.5v-12a1.5 1.5 0 011.5-1.5h6zM9 13.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h2.69l-3.97-3.97a.75.75 0 111.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v4.5z" clipRule="evenodd" />
  </svg>
);

const IconMantenimiento = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h3m-1.5 0v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-3.5 0a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
    />
  </svg>
);

const getKindIcon = (kind: TimelineItem["kind"]) => {
  if (kind === "mantenimiento") return <IconMantenimiento />;
  if (kind === "llegada") return <IconLlegada />;
  return <IconSalida />;
};

const HistorialFlotaPage: React.FC = () => {
  useDocumentTitle('historial de la unidad');

  const unit = {
    name: 'Unidad 505',
    driver: 'Mario Hernandez',
    status: 'Activo',
  };

  const timeline: TimelineItem[] = [
    {
      id: 't1',
      timeLabel: 'Hoy, 08:30 AM',
      title: 'Inspección de Salida (Departure)',
      description:
        'Revisión pre-viaje completada por Rick Ramirez. Checklist verificado. Firma electrónica válida registrada por el chofer.',
      status: 'Sin observaciones',
      kind: "salida",
    },
    {
      id: 't2',
      timeLabel: 'Ayer, 14:00 PM',
      title: 'Mantenimiento Preventivo',
      description:
        'Cambio de aceite, filtros y revisión de frenos de rutina. Trabajo realizado en Taller Central. Unidad liberada para operación.',
      status: 'Completado',
      kind: "mantenimiento",
    },
    {
      id: 't3',
      timeLabel: 'Hace 3 días, 18:45 PM',
      title: 'Inspección de Llegada (Arrival)',
      description:
        'Categoría: Luces y Señalización. Luz direccional trasera derecha parpadea de forma irregular. Severidad menor. Se reportó para mantenimiento preventivo al día siguiente.',
      status: 'Hallazgo registrado',
      kind: "llegada",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto w-full px-6 py-6 text-slate-900">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Historial de la Unidad</h1>
      </header>

      <section
        aria-labelledby="unit-summary-title"
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 id="unit-summary-title" className="text-lg font-semibold">
            {unit.name}
          </h2>
          <p className="text-sm text-slate-600 mt-2 inline-flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-500">
              <UserIcon />
            </span>
            Chofer asignado: {unit.driver}
          </p>
        </div>
        <div className="text-sm text-slate-600">
          Estado:{' '}
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700">
            {unit.status}
          </span>
        </div>
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
                <span className="absolute -left-10 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  {getKindIcon(item.kind)}
                </span>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <p className="text-xs text-slate-500 inline-flex items-center gap-2">
                    <CalendarIcon />
                    {item.timeLabel}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Cargar registros anteriores...
          </button>
        </div>
      </section>
    </main>
  );
};

export default HistorialFlotaPage;
