import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import isotipoBlackbox from "../assets/Isotipos/isotipo_blackbox.png";
import Maskgroup from "../assets/Logo/Maskgroup.png"
import { Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.login({ email, password });
      login(response.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e6e0] flex items-center justify-center gap-12 p-8 font-['DM_Sans',sans-serif]">
      {/* Left side — Isotipo */}
      <div className="hidden lg:flex flex-shrink-0">
        <img
          src={isotipoBlackbox}
          alt="BlackBox Isotipo"
          className="w-[596px] h-[596px] object-contain"
        />
      </div>

      {/* Right side — Card */}
      <div className="w-full max-w-md bg-[#151a10] rounded-2xl p-12 shadow-2xl border border-[#2a2f22]">
        {/* Brand name */}
        <img src={Maskgroup} alt="BlackBox Logo" className="h-12 mb-8" />

        <h2 className="text-xl font-semibold text-[#f0ede6] mb-8">
          Ingresa a tu cuenta
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-[#a0a890] mb-2 tracking-wide">
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-[#a0a890] mb-2 tracking-wide">
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
                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? (
                  <EyeOff size={18} color="#888" />
                ) : (
                  <Eye size={18} color="#888" />
                )}
              </button>
            </div>
            <p className="text-xs text-[#6b7260] mt-1">
              Debe contener 8 caracteres como mínimo, números y símbolos
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-xs text-[#e05c5c] p-2 bg-[rgba(224,92,92,0.1)] rounded-md border border-[rgba(224,92,92,0.25)]">
              {error}
            </div>
          )}

          {/* Remember me + Forgot password */}
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
            <a href="/forgot-password" className="text-xs text-[#a0a890] hover:text-[#f0ede6] no-underline transition-colors">
              ¿Olvidaste la contraseña?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 bg-[#f5c518] text-[#1a1200] font-bold rounded-lg border-none cursor-pointer tracking-wider transition-all duration-200 text-sm font-['DM_Sans',sans-serif] ${isLoading
              ? "bg-[#b89010] cursor-not-allowed"
              : "hover:bg-[#e0b010] shadow-lg shadow-[#f5c518]/30 hover:shadow-[#f5c518]/50"
              }`}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;