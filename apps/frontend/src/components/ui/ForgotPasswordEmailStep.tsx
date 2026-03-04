import React, { useState } from "react";

interface ForgotPasswordEmailStepProps {
  onSubmit: (email: string) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

// Mock test emails for quick testing
const TEST_EMAILS = [
  "test@example.com",
  "admin@blackbox.com",
  "user@demo.com"
];

export default function ForgotPasswordEmailStep({ onSubmit, isLoading = false, error }: ForgotPasswordEmailStepProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  const handleQuickTest = (testEmail: string) => {
    setEmail(testEmail);
    onSubmit(testEmail);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-center text-[#6b7260] text-sm">
        Escribe tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      {/* Quick test buttons for development */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-700 font-medium mb-2">Pruebas rápidas (desarrollo):</p>
        <div className="flex flex-wrap gap-2">
          {TEST_EMAILS.map((testEmail) => (
            <button
              key={testEmail}
              type="button"
              onClick={() => handleQuickTest(testEmail)}
              disabled={isLoading}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded transition-colors disabled:opacity-50"
            >
              {testEmail}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-[#404445]">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@empresa.com"
            required
            className="w-full px-4 py-2 bg-white text-[#1a1a1a] rounded-lg border border-[#d0d5dd] focus:border-[#f5c518] focus:ring-2 focus:ring-[#f5c518]/20 outline-none transition-all duration-200 text-sm font-['DM_Sans',sans-serif]"
          />
        </div>

        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => onSubmit(email)}
          disabled={isLoading || !email}
          className={`w-full py-2.5 bg-[var(--accent)] text-[var(--bg)] font-bold rounded-lg border-none cursor-pointer tracking-wider transition-all duration-200 text-sm font-['DM_Sans',sans-serif] ${isLoading || !email
              ? "cursor-not-allowed opacity-80"
              : "hover:shadow-lg shadow-[var(--accent)]/30"
            }`}
        >
          {isLoading ? "Enviando enlace..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}