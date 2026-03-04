import React from "react";
import { CheckCircle } from "lucide-react";

interface ForgotPasswordSuccessStepProps {
  email?: string;
  onClose?: () => void;
}

export default function ForgotPasswordSuccessStep({ email, onClose }: ForgotPasswordSuccessStepProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6 w-full">
      
      <div className="bg-green-100 rounded-full p-4">
        <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={2} />
      </div>

      <div className="space-y-4">
        
        <h3 className="text-xl font-bold text-slate-900">
          ¡Correo Enviado!
        </h3>

        
        <p className="text-sm text-slate-500">
          {email ? (
            <>Enviamos un enlace a <strong>{email}</strong> para restablecer tu contraseña. Revisa tu bandeja de entrada.</>
          ) : (
            <>Hemos enviado un enlace a tu correo. Revisa tu bandeja de entrada para restablecer tu contraseña.</>
          )}
        </p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Aceptar
        </button>
      )}
    </div>
  );
}