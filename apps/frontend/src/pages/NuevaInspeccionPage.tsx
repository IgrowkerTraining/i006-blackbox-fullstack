import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useDocumentTitle } from "@/src/hooks/useDocumentTitle";

// Mock data
interface MockVehicle {
  id: string;
  label: string;
}
interface MockDriver {
  id: string;
  name: string;
  license_number: string;
  label: string;
}

const MOCK_VEHICLES: MockVehicle[] = [
  { id: "v1", label: "U302 Volvo VNL" },
  { id: "v2", label: "U505 Kenworth T680" },
  { id: "v3", label: "U201 Freightliner Cascadia" },
];

const MOCK_DRIVERS: MockDriver[] = [
  { id: "d1", name: "Mario Hernández", license_number: "TX-99281", label: "Mario Hernández (Lic:TX-99281)" },
  { id: "d2", name: "Julio Fernandez", license_number: "TX-88452", label: "Julio Fernandez (Lic:TX-88452)" },
];

type InspectionType = "SALIDA" | "LLEGADA" | null;
type ChecklistResult = boolean | null; // true = OK, false = fail, null = not set

const IconTruck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-600">
    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.036.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a3 3 0 116 0h.375c1.035 0 1.875-.84 1.875-1.875V15z" />
    <path d="M8.25 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.75 6.75a.75.75 0 000-1.5H12V15h5.25a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75zM15.75 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
  </svg>
);

const IconChecklist = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-600">
    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3.025-3.779z" clipRule="evenodd" />
  </svg>
);

/* SALIDA: arrow out of box (Departure) */
const IconSalida = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M7.5 3.75a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5v-12a1.5 1.5 0 00-1.5-1.5h-6zM15 10.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-2.69l3.97 3.97a.75.75 0 11-1.06 1.06l-3.97-3.97v2.69a.75.75 0 01-1.5 0v-4.5z" clipRule="evenodd" />
  </svg>
);

/* LLEGADA: arrow into box (Arrival) */
const IconLlegada = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5h-6a1.5 1.5 0 01-1.5-1.5v-12a1.5 1.5 0 011.5-1.5h6zM9 13.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h2.69l-3.97-3.97a.75.75 0 111.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v4.5z" clipRule="evenodd" />
  </svg>
);

const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

const NuevaInspeccionPage: React.FC = () => {
  useDocumentTitle("Nueva Inspeccion");
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [vehicleId, setVehicleId] = useState<string>("");
  const [driverId, setDriverId] = useState<string>("");
  const [inspectionType, setInspectionType] = useState<InspectionType>(null);
  const [checklist, setChecklist] = useState<{ doc: ChecklistResult; luces: ChecklistResult; neumaticos: ChecklistResult }>({
    doc: null,
    luces: null,
    neumaticos: null,
  });
  const [hasSignature, setHasSignature] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const selectedDriver = MOCK_DRIVERS.find((d) => d.id === driverId);

  // Signature canvas: sync internal size with display size so drawing stays aligned
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w <= 0 || h <= 0) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  };

  useEffect(() => {
    if (step !== 3) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    resizeCanvas();
    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [step]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasSignature(false);
  };

  const handleSave = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessAndGoToDashboard = () => {
    setShowSuccessModal(false);
    navigate(ROUTES.DASHBOARD);
  };

  const canGoNextStep1 = vehicleId && driverId && inspectionType !== null;
  const canGoStep3 = checklist.doc !== null && checklist.luces !== null && checklist.neumaticos !== null;

  return (
    <div className="min-h-full bg-slate-100 rounded-lg p-8 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Step indicator: círculo 1 alineado al borde izquierdo de la card, 3 al derecho */}
        <div className="flex items-center justify-between mb-10 px-0">
          {([1, 2, 3] as const).map((s) => (
            <div
              key={s}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-semibold ${
                step > s ? "bg-green-500 border-green-500 text-white" : step === s ? "border-[#3F51B5] bg-[#4E63A8] text-white" : "border-slate-300 bg-slate-100 text-slate-400"
              }`}
            >
              {step > s ? <IconCheck /> : s}
            </div>
          ))}
        </div>

        {/* Step 1: Identificación del activo */}
        {step === 1 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <IconTruck />
            <h2 className="text-lg font-semibold text-slate-800">Identificación del activo</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Unidad / Vehículo</label>
              <select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="select-dropdown w-full rounded-lg border border-slate-300 pl-3 py-2.5 text-slate-800 bg-white focus:ring-2 focus:ring-[#3F51B5] focus:border-[#3F51B5]"
              >
                <option value="">Seleccionar vehículo...</option>
                {MOCK_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Chofer Asignado</label>
              <select
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="select-dropdown w-full rounded-lg border border-slate-300 pl-3 py-2.5 text-slate-800 bg-white focus:ring-2 focus:ring-[#3F51B5] focus:border-[#3F51B5]"
              >
                <option value="">Seleccionar chofer...</option>
                {MOCK_DRIVERS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-6 pt-4">
              <button
                type="button"
                onClick={() => setInspectionType("SALIDA")}
                className={`flex-1 flex flex-col items-center justify-center gap-3 rounded-lg border-2 px-6 py-5 text-sm font-medium transition-colors ${
                  inspectionType === "SALIDA" ? "border-[#3F51B5] bg-[#3F51B5]/10 text-[#3F51B5]" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <IconSalida />
                <span>SALIDA (Departure)</span>
              </button>
              <button
                type="button"
                onClick={() => setInspectionType("LLEGADA")}
                className={`flex-1 flex flex-col items-center justify-center gap-3 rounded-lg border-2 px-6 py-5 text-sm font-medium transition-colors ${
                  inspectionType === "LLEGADA" ? "border-[#3F51B5] bg-[#3F51B5]/10 text-[#3F51B5]" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <IconLlegada />
                <span>LLEGADA (Arrival)</span>
              </button>
            </div>
          </div>
          <div className="mt-10 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canGoNextStep1}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-[65px] py-[15px] text-sm font-semibold text-slate-900 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
              <IconArrowRight />
            </button>
          </div>
        </div>
      )}

        {/* Step 2: Lista de verificación */}
        {step === 2 && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm pt-[36px] px-[80px] pb-[47px]">
            <div className="flex items-center gap-2 mb-6">
              <IconChecklist />
              <h2 className="text-lg font-semibold text-slate-800">Lista de verificación</h2>
            </div>
            <div className="space-y-6">
              {[
                { key: "doc" as const, title: "Documentación y Permisos", desc: "Licencia, Seguro, Registro." },
                { key: "luces" as const, title: "Luces y Señalización", desc: "Frontales, Traseras, Freno, Direccionales." },
                { key: "neumaticos" as const, title: "Neumáticos y Ruedas", desc: "Presión, Profundidad, Pernos." },
              ].map(({ key, title, desc }) => (
                <div key={key} className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 py-[28px] pl-[27px] pr-[24px]" style={{ backgroundColor: "#F2F2F2" }}>
                  <div>
                    <p className="font-medium text-slate-800">{title}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
                  </div>
                  <div className="flex items-center gap-[50px] flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setChecklist((c) => ({ ...c, [key]: true }))}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border-[3px] transition-colors ${
                        checklist[key] === true
                          ? "border-green-500 text-green-600"
                          : "hover:border-green-400 hover:text-green-600"
                      }`}
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderColor: checklist[key] === true ? undefined : "#757575",
                        color: checklist[key] === true ? undefined : "#757575",
                      }}
                      title="OK"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <path d="M5 12l5 5 10-10" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setChecklist((c) => ({ ...c, [key]: false }))}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border-[3px] transition-colors ${
                        checklist[key] === false
                          ? "border-red-500 text-red-600"
                          : "hover:border-red-400 hover:text-red-600"
                      }`}
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderColor: checklist[key] === false ? undefined : "#757575",
                        color: checklist[key] === false ? undefined : "#757575",
                      }}
                      title="Falla"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 rounded-lg border-none bg-transparent px-4 py-2.5 text-sm font-black hover:opacity-80 transition-opacity"
              style={{ color: "#757575" }}
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={!canGoStep3}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 py-[15px] px-[65px] text-sm font-semibold text-slate-900 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
              <IconArrowRight />
            </button>
          </div>
          </div>
        )}

        {/* Step 3: Cierre y Conformidad */}
        {step === 3 && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-[80px] py-[36px]">
            <div className="flex items-center gap-2 mb-6">
            <span className="flex h-6 w-6 items-center justify-center rounded border-2 border-slate-700 text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-slate-800">Cierre y Conformidad</h2>
            </div>
            <div
              className="mb-6 border-l-4"
              style={{
                backgroundColor: "rgba(255, 201, 67, 0.5)",
                borderLeftColor: "#FFC945",
                padding: "20px 24px",
              }}
            >
              <p className="text-sm text-slate-800">
                <strong>Declaración:</strong> Certifico que he revisado el vehículo y que los datos ingresados son veraces conforme a las regulaciones FMCSA.
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Firma del Conductor: {selectedDriver ? selectedDriver.name : "—"}
              </label>
              <canvas
                ref={canvasRef}
                className="w-full h-[220px] border-2 border-dotted touch-none cursor-crosshair rounded-lg"
                style={{ touchAction: "none", backgroundColor: "#F2F2F2", borderColor: "#62748E" }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
              <button
                type="button"
                onClick={clearSignature}
                className="mt-2 text-sm text-[#3F51B5] hover:underline"
              >
                Borrar Firma
              </button>
            </div>
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-lg border-none bg-transparent px-4 py-2.5 text-sm font-black hover:opacity-80 transition-opacity"
                style={{ color: "#757575" }}
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!hasSignature}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 py-[15px] px-[65px] text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.047-1.048A3.375 3.375 0 1011.625 18z" clipRule="evenodd" />
                </svg>
                Guardar Inspección
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Success modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
            <p className="text-lg font-bold text-slate-800 uppercase tracking-wide mb-4">Guardado exitosamente</p>
            <div className="flex justify-center mb-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white">
                <IconCheck />
              </span>
            </div>
            <p className="text-slate-600 mb-6">La inspección ha sido guardada en el historial</p>
            <button
              type="button"
              onClick={closeSuccessAndGoToDashboard}
              className="w-full rounded-lg px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:opacity-90"
            style={{ backgroundColor: "#FFC943" }}
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NuevaInspeccionPage;
