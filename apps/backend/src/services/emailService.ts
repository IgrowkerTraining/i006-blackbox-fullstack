import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@resend.dev";

interface SendPasswordResetEmailParams {
  to: string;
  resetToken: string;
  userName: string;
}

const sendPasswordResetEmail = async ({
  to,
  resetToken,
  userName,
}: SendPasswordResetEmailParams) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Recuperación de contraseña",
    html: `
      <h1>Hola ${userName},</h1>
      <p>Has solicitado recuperar tu contraseña. Haz clic en el siguiente enlace para establecer una nueva contraseña:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">Restablecer contraseña</a>
      <p>Este enlace expirará en 1 hora.</p>
      <p>Si no solicitaste este cambio, puedes ignorar este email.</p>
      <p>Saludos,<br>El equipo de BlackBox</p>
    `,
  });

  if (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export const EmailService = {
  sendPasswordResetEmail,
};
