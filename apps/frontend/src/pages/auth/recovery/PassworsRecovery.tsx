import isotipoBlackbox from "@/src/assets/Isotipos/isotipo_blackbox.png";
import logotipoBlackbox from "@/src/assets/Logo/logotipo_blackbox.png";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthRecovery } from "@/src/hooks/useAuthRecovery";
import { useDocumentTitle } from "@/src/hooks/useDocumentTitle";

export default function PasswordRecovery() {
  useDocumentTitle("Recuperar contraseña");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { isLoading, error, resetPassword, hasActiveResetFlow } = useAuthRecovery();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("token") || "";
  }, [location.search]);


  useEffect(() => {
    if (!token && !hasActiveResetFlow()) {
      navigate("/reset-password", { replace: true });

    }
  }, [hasActiveResetFlow, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.");
      return;
    }

    try {
      await resetPassword(newPassword, token);
      setShowModal(true);
    } catch (err: any) {
      
      console.error('Password reset failed:', err.message);
    }
  };

  return (
    <div className="h-screen flex w-full font-lato overflow-hidden">
      {/* ── Panel izquierdo: fondo gris claro + isotipo ── */}
      <div className="hidden lg:flex flex-1 bg-white h-screen items-center justify-center overflow-hidden">
        <img
          src={isotipoBlackbox}
          alt="BlackBox Isotipo"
          className="w-full h-auto object-contain md:w-[280px] md:h-[280px] lg:w-[596px] lg:h-[596px]"
        />
      </div>

      {/* Panel derecho: fondo negro + card blanca */}
      <div className="flex w-full lg:flex-1 h-screen bg-black items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg bg-white shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-3 md:gap-4 lg:gap-6 overflow-hidden">

          {/* Logotipo */}
          <div className="flex justify-center">
            <img
              src={logotipoBlackbox}
              alt="BlackBox"
              className="w-[438] h-[8] md:w-48 lg:w-56 object-contain"
            />
          </div>

          {/* Título */}
          <div className="flex flex-col gap-1">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-slate-900">
              Recuperar contraseña
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              Define tu nueva contraseña para mantener segura tu cuenta.
            </p>

          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

            {/* Nueva contraseña */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="new-password" className="text-sm font-medium text-slate-700">
                Nueva contraseña
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pr-10 bg-white border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 rounded-lg px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showNew ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm-password" className="text-sm font-medium text-slate-700">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10 bg-white border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 rounded-lg px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showConfirm ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Debe contener 8 caracteres como mínimo, números y símbolos
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Botón submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-2.5 md:py-3 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm md:text-base"
            >
              {isLoading ? "Actualizando..." : "Actualizar contraseña"}
            </button>
          </form>
        </div>
      </div>

      {/* Modal de éxito */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full flex flex-col items-center text-center gap-6">
            <div className="bg-green-100 rounded-full p-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">¡Contraseña Restablecida!</h3>
            <p className="text-sm text-slate-500">
              Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar sesión
              con tu nueva contraseña.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/login", { replace: true });
              }}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-2.5 md:py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm md:text-base"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
