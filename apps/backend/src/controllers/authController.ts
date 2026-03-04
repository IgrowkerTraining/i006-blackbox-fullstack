import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { EmailService } from "../services/emailService";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../../prisma";
import { generateToken } from "../utils/generateToken";
import { UserRole } from "../../generated/prisma/enums";
import { RegisterSchema, LoginSchema } from "../utils/authSchema";
import crypto from "crypto";

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const data = RegisterSchema.parse(req.body);

      // Chequea que el email no exista globalmente
      const existingUser = await prisma.user.findUnique({
        where: { email: data.user.email },
      });

      // Puede estar en otra empresa
      if (existingUser) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      const passwordHash = await bcrypt.hash(data.user.password, 10);

      // Crea compania y admin (primer usuario)
      const result = await prisma.$transaction(async (tx) => {
        // Crea tenant
        const company = await tx.company.create({
          data: {
            name: data.company.name,
            usdotNumber: data.company.usdotNumber ?? "",
            state: data.company.state ?? "",
          },
        });

        // Usuario admin
        const user = await tx.user.create({
          data: {
            name: `${data.user.name}`,
            email: data.user.email,
            passwordHash,
            role: UserRole.ADMIN, // El primer usuario seria el admin
            companyId: company.id,
          },
        });

        return { company, user };
      });

      // JWT
      const token = generateToken({
        userId: result.user.id,
        companyId: result.company.id,
        role: result.user.role,
      });

      return res.status(201).json({
        token,
        company: {
          id: result.company.id,
          name: result.company.name,
        },
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      console.error("Registration error:", error);
      return res.status(500).json({
        message: "Registration failed",
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const data = LoginSchema.parse(req.body);
      // Buscar usuario por email (incluye la compania porque es saas)
      const user = await prisma.user.findUnique({
        where: { email: data.email },
        include: { company: true },
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      // Verificar si el usuario está activo, no es necesario por ahora me parece pero por las dudas
      if (!user.isActive) {
        return res.status(403).json({
          message: "User is inactive",
        });
      }

      // Comparar password
      const isValid = await bcrypt.compare(data.password, user.passwordHash);

      if (!isValid) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      // Generar JWT
      const token = generateToken({
        userId: user.id,
        companyId: user.companyId,
        role: user.role,
      });

      return res.status(200).json({
        token,
        company: {
          id: user.company.id,
          name: user.company.name,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      console.error("Login error:", error);
      return res.status(500).json({
        message: "Login failed",
      });
    }
  };

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = await UserService.findByEmail(email);
      if (!user) {
        return res.status(200).json({
          message: "If the email exists, a reset link has been sent",
        });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000);

      await EmailService.sendPasswordResetEmail({
        to: email,
        resetToken,
        userName: user.name,
      });

      await UserService.setResetPasswordToken(email, resetToken, resetExpires);

      res.status(200).json({
        message: "If the email exists, a reset link has been sent",
      });
    } catch (error: any) {
      console.error("Forgot password error:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res
          .status(400)
          .json({ error: "Token and new password are required" });
      }

      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
      }

      const user = await UserService.findByResetToken(token);
      if (!user) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(newPassword, saltRounds);

      await UserService.updatePassword(user.id, passwordHash);

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
      console.error("Reset password error:", error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  }
}

export default new AuthController();
