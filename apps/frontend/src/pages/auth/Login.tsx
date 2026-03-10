import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/hooks/useAuth";
import isotipoBlackbox from "@/src/assets/Isotipos/isotipo_blackbox.png";
import Maskgroup from "@/src/assets/Logo/Maskgroup.png";
import { Eye, EyeOff } from "lucide-react";
import ForgotPasswordModal from "@/src/components/ForgotPasswordModal";
import { useDocumentTitle } from "@/src/hooks/useDocumentTitle";



const Login: React.FC = () => {
  useDocumentTitle("Iniciar sesion");
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await login(email, password); 
    navigate("/dashboard");
  } catch(err) {
    console.error("Error al iniciar sesión:", err);
  }
}




  return (
    <div className="min-h-screen bg-white overflow-hidden flex items-center justify-center gap-12 p-8 md:p-6 md:gap-8 lg:gap-8 font-['DM_Sans',sans-serif]">
      <div className="hidden md:flex lg:flex flex-shrink-0 md:max-w-[280px] lg:max-w-none">
        <img
          src={isotipoBlackbox}
          alt="BlackBox Isotipo"
          className="w-full h-auto object-contain md:w-[280px] md:h-[280px] lg:w-[596px] lg:h-[596px]"
        />
      </div>

      <div className="w-full max-w-md bg-[#151a10] rounded-2xl p-12 md:p-8 md:max-w-[90%] lg:p-12 lg:max-w-md shadow-2xl border border-[#2a2f22]">
        <img
          src={Maskgroup}
          alt="BlackBox Logo"
          className="w-full h-auto p-4 mb-10 md:p-3 md:mb-6 lg:p-4 lg:mb-10"
        />
        <h2 className="text-xl font-semibold font-['Roboto',sans-serif] text-[#f0ede6] mt-8 mb-6 md:mt-6 md:mb-5 lg:mt-8 lg:mb-6">
          Ingresa a tu cuenta
        </h2>



        <form onSubmit={handleSubmit}  className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[#a0a890] mb-2 tracking-wide">
              Usuario
            </label>
            <input
              id="email"
              type="email"
              placeholder="harry@potter.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-4 py-2 bg-white text-[#1a1a1a] rounded-lg border-2 border-transparent focus:border-[#f5c518] focus:ring-2 focus:ring-[#f5c518]/20 outline-none transition-all duration-200 text-sm font-['DM_Sans',sans-serif]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-[#a0a890] mb-2 tracking-wide">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2 pr-12 bg-white text-[#1a1a1a] rounded-lg border-2 border-transparent focus:border-[#f5c518] focus:ring-2 focus:ring-[#f5c518]/20 outline-none transition-all duration-200 text-sm font-['DM_Sans',sans-serif]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-0 flex items-center"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Ver contraseña"
                }>
                {showPassword ? (
                  <Eye size={18} color="#888" />
                ) : (
                  <EyeOff size={18} color="#888" />
                )}
              </button>
            </div>
            <p className="text-xs text-[#6b7260] mt-1">
              Debe contener 8 caracteres como mínimo, números y símbolos
            </p>
          </div>

          {error && (
            <div className="text-xs text-[#e05c5c] p-2 bg-[rgba(224,92,92,0.1)] rounded-md border border-[rgba(224,92,92,0.25)]">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between my-6">
            <label className="flex items-center gap-2 text-xs text-[#a0a890] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 cursor-pointer accent-[#f5c518]"
              />
              Recordarme
            </label>
            <ForgotPasswordModal />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 bg-blackbox-yellow text-blackbox-white font-bold rounded-lg border-none cursor-pointer tracking-wider transition-all duration-200 text-sm font-lato ${loading
                ? "bg-blackbox-yellow cursor-not-allowed"
                : "hover:bg-blackbox-yellow/90 shadow-lg shadow-blackbox-yellow/30 hover:shadow-blackblox-yellow/50"
              }`}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
