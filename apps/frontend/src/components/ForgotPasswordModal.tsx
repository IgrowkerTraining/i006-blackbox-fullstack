import React, { useState } from "react";
import Modal from "./ui/Modal";
import ForgotPasswordEmailStep from "./ui/ForgotPasswordEmailStep";
import ForgotPasswordSuccessStep from "./ui/ForgotPasswordSuccessStep";
import { useAuthRecovery } from "@/src/hooks/useAuthRecovery";

export default function ForgotPasswordModal() {
  const [open, setOpen] = useState(false);
  const { isLoading, step, sentEmail, error, sendResetEmail, reset } = useAuthRecovery();

  const handleClose = () => {
    setOpen(false);
    reset();
  };


  return (
    <div>
      <button
      type="button"

        onClick={() => setOpen(true)}
        className="text-xs text-[#a0a890] hover:text-[#f0ede6] no-underline transition-colors"
      >
        ¿Olvidaste la contraseña?
      </button>

      <Modal
        isOpen={open}
        onClose={handleClose}
        title={step === "email" ? "Restablecer contraseña" : ""}
      >
        {step === "email" ? (
          <ForgotPasswordEmailStep
           onSubmit={sendResetEmail}
           isLoading={isLoading}
           error={error}
           />
        ) : (
          <ForgotPasswordSuccessStep email={sentEmail} onClose={handleClose} />
        )}
      </Modal>
    </div>
  );
}