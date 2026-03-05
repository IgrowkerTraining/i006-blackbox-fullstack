import React, { useState } from "react";

interface FlotaRow {
  id: string;
  status: "Activo" | "Observacion";
  chofer: string;
  ultimaInspeccion: string;
}

const rows: FlotaRow[] = [
  {
    id: "U505",
    status: "Activo",
    chofer: "Emiliano Cerati",
    ultimaInspeccion: "Hoy, 10:30 hrs",
  },
  {
    id: "U601",
    status: "Activo",
    chofer: "Josué Maradona",
    ultimaInspeccion: "Hoy, 8:30 hrs",
  },
  {
    id: "U789",
    status: "Activo",
    chofer: "Amanda Miguel",
    ultimaInspeccion: "Ayer 18:00 hrs",
  },
  {
    id: "U365",
    status: "Activo",
    chofer: "Elvis Crespo",
    ultimaInspeccion: "Ayer 13:00 hrs",
  },
  {
    id: "U236",
    status: "Observacion",
    chofer: "Natanael Cano",
    ultimaInspeccion: "Hace 2 días",
  },
];

const PAGES = ["1", "2", "3", "...", "8", "9", "10"];

const SortIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-3.5 h-3.5 opacity-50">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 9l4-4 4 4M16 15l-4 4-4-4"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m1.6-4.65a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export default function GestionFlota() {
  const [currentPage, setCurrentPage] = useState("2");

  return (
    <div className="min-h-full font-lato p-6 bg-gray-100">
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {/* ── Header: title + search ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            gap: "1rem",
          }}>
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#1e293b",
              whiteSpace: "nowrap",
            }}>
            Inventario Flota
          </h2>
          <div style={{ position: "relative", width: "320px", flexShrink: 0 }}>
            <input
              type="text"
              placeholder="Buscar unidad..."
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                padding: "0.625rem 2.5rem 0.625rem 1rem",
                fontSize: "0.875rem",
                color: "#334155",
                outline: "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                pointerEvents: "none",
              }}>
              <SearchIcon />
            </span>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full table-fixed text-sm">
            {/* Head */}
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {[
                  { label: "ID UNIDAD", w: "w-[130px]" },
                  { label: "ESTADO", w: "w-[160px]" },
                  { label: "CHOFER", w: "" },
                  { label: "ÚLTIMA INSPECCIÓN", w: "w-[220px]" },
                  { label: "ACCIÓN", w: "w-[150px]" },
                ].map(({ label, w }) => (
                <th key={label}
  className={`${w} px-5 py-4 text-left text-[11px] font-semibold
              uppercase tracking-wider text-slate-500 whitespace-nowrap`}>
                    <span className="inline-flex items-center gap-1.5">
                      {label}
                      {label !== "ACCIÓN" && <SortIcon />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100 bg-white">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {/* ID */}
                  <td className="px-5 py-5 font-medium text-slate-800 whitespace-nowrap">
                    {row.id}
                  </td>

                  {/* Estado — inline style garantiza el color */}
                  <td className="px-5 py-5 whitespace-nowrap">
                    <span
                      className="text-sm font-bold uppercase tracking-wide"
                      style={{
                        color: row.status === "Activo" ? "#22c55e" : "#f59e0b",
                      }}>
                      {row.status === "Activo" ? "ACTIVO" : "OBSERVACIÓN"}
                    </span>
                  </td>

                  {/* Chofer */}
                  <td className="px-5 py-5 text-slate-700">
                    <span className="block truncate">{row.chofer}</span>
                  </td>

                  {/* Última inspección */}
                  <td className="px-5 py-5 text-slate-500 whitespace-nowrap">
                    {row.ultimaInspeccion}
                  </td>

                  {/* Acción */}
                  <td className="px-5 py-5">
                    <button
                      type="button"
                      className="font-semibold text-blue-600 hover:text-blue-800
                                 transition-colors whitespace-nowrap">
                      Ver historial
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div
          className="mt-6 border-t border-gray-100 pt-5 flex flex-wrap items-center
                        justify-between gap-4 text-sm">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-slate-800 transition-colors">
            <span className="text-base leading-none">‹</span>
            Previous
          </button>

          <div className="flex items-center gap-1">
            {PAGES.map((page, i) => (
              <button
                key={`${page}-${i}`}
                type="button"
                onClick={() => page !== "..." && setCurrentPage(page)}
                className="min-w-[36px] h-9 rounded-lg px-3 font-medium transition-colors"
                style={{
                  backgroundColor:
                    page === currentPage ? "#2563eb" : "transparent",
                  color:
                    page === currentPage
                      ? "#ffffff"
                      : page === "..."
                        ? "#94a3b8"
                        : "#2563eb",
                  cursor: page === "..." ? "default" : "pointer",
                }}>
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-slate-800 transition-colors">
            Next
            <span className="text-base leading-none">›</span>
          </button>
        </div>
      </section>
    </div>
  );
}
