import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const FROM_EMAIL = process.env.FROM_EMAIL;

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

  await transporter.sendMail({
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
};

export const EmailService = {
  sendPasswordResetEmail,
};
