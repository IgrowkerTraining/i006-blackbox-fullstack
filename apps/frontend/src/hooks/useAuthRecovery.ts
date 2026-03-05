import { useState } from "react";
import { API_ENDPOINTS } from "@/src/constants/routes";

// Mock data for testing
const MOCK_USERS = [
  { email: "test@example.com", name: "Usuario Test" },
  { email: "admin@blackbox.com", name: "Administrador" },
  { email: "user@demo.com", name: "Usuario Demo" }
];

const MOCK_RESPONSES = {
  success: {
    message: "Correo de recuperación enviado exitosamente",
    resetToken: "mock-reset-token-12345"
  },
  error: {
    notFound: "No existe una cuenta con este correo electrónico",
    serverError: "Error del servidor al enviar el correo"
  }
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation - check if email exists in our mock data
      const userExists = MOCK_USERS.some(user => user.email.toLowerCase() === email.toLowerCase());

      if (!userExists) {
        throw new Error(MOCK_RESPONSES.error.notFound);
      }

      // Mock successful API response
      const response = MOCK_RESPONSES.success;
      console.log('Mock API Response:', response);

      // Simulate storing the reset token (in real app, this would be handled by backend)
      localStorage.setItem('mockResetToken', response.resetToken);
      localStorage.setItem('resetEmail', email);

      setSentEmail(email);
      setStep("success");

    } catch (err: any) {
      setError(err.message || "Lo sentimos, no se pudo enviar el correo de recuperación, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (newPassword: string, token?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock token validation
      const storedToken = token || localStorage.getItem('mockResetToken');
      const storedEmail = localStorage.getItem('resetEmail');

      if (!storedToken) {
        throw new Error("Token de restablecimiento inválido o expirado");
      }

      // Mock password validation
      if (newPassword.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres");
      }

      // Mock successful password reset
      console.log('Mock: Password reset successfully for email:', storedEmail);

      // Clean up mock data
      localStorage.removeItem('mockResetToken');
      localStorage.removeItem('resetEmail');

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
    // Clean up any existing mock data
    localStorage.removeItem('mockResetToken');
    localStorage.removeItem('resetEmail');
  };

  // Helper function to check if we have a valid reset flow
  const hasActiveResetFlow = () => {
    return localStorage.getItem('mockResetToken') !== null;
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
    // Mock data for testing
    mockData: {
      testEmails: MOCK_USERS.map(u => u.email),
      availableUsers: MOCK_USERS
    }
  };
}