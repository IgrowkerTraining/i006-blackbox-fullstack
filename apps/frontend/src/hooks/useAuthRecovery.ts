import { useState } from "react";
import { API_ENDPOINTS } from "@/src/constants/routes";

const buildErrorMessage = async (response: Response, fallback: string) => {
  try {
    const data = await response.json();
    const msg = data?.error || data?.message;
    if (msg) return msg;
  } catch {
    // ignore JSON parse errors
  }
  return fallback;
};

export function useAuthRecovery() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "success">("email");
  const [sentEmail, setSentEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const sendResetEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        throw new Error(await buildErrorMessage(response, "Error al enviar correo de recuperación"));
      }

      setSentEmail(email);
      setStep("success");
    } catch (err: any) {
      setError(err.message || "Lo sentimos, hubo un error al enviar el correo de recuperación");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (newPassword: string, token?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (newPassword.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      const storedToken = token;
      if (!storedToken) {
        throw new Error("Token de restablecimiento inválido o expirado");
      }

      const response = await fetch(
        `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.RESET_PASSWORD}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: storedToken, newPassword }),
        },
      );

      if (!response.ok) {
        throw new Error(await buildErrorMessage(response, "Error al restablecer la contraseña"));
      }

      return { success: true };
    } catch (err: any) {
      setError(err.message || "Error al restablecer la contraseña");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep("email");
    setSentEmail("");
    setError(null);
  };

  const hasActiveResetFlow = () => {
    return false;
  };

  return {
    isLoading,
    step,
    sentEmail,
    error,
    sendResetEmail,
    resetPassword,
    reset,
    hasActiveResetFlow,
  };
}
