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
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new company and admin user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - company
   *               - user
   *             properties:
   *               company:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                     example: "Lone Star Freight"
   *                   usdotNumber:
   *                     type: string
   *                     example: "TX-123456"
   *                   state:
   *                     type: string
   *                     example: "Texas"
   *               user:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                     example: "Rick Ramirez"
   *                   email:
   *                     type: string
   *                     example: "rick@lonestar.com"
   *                   password:
   *                     type: string
   *                     example: "SecurePass123!"
   *     responses:
   *       201:
   *         description: Registration successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 company:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     name:
   *                       type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   *                     role:
   *                       type: string
   *       400:
   *         description: Validation failed
   *       409:
   *         description: Email already registered
   */
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
        error: error.message,
        code: error.code,
      });
    }
  };

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login with email and password
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: "rick@lonestar.com"
   *               password:
   *                 type: string
   *                 format: password
   *                 example: "SecurePass123!"
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 company:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     name:
   *                       type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   *                     role:
   *                       type: string
   *       400:
   *         description: Validation failed
   *       401:
   *         description: Invalid credentials
   *       403:
   *         description: User is inactive
   */
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

  /**
   * @swagger
   * /api/auth/forgot-password:
   *   post:
   *     summary: Request password reset email
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: "rick@lonestar.com"
   *     responses:
   *       200:
   *         description: Reset email sent (or not, for security)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "If the email exists, a reset link has been sent"
   *       400:
   *         description: Email is required
   *       500:
   *         description: Failed to process request
   */
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

  /**
   * @swagger
   * /api/auth/reset-password:
   *   post:
   *     summary: Reset password with token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - token
   *               - newPassword
   *             properties:
   *               token:
   *                 type: string
   *                 example: "a1b2c3d4e5f6..."
   *               newPassword:
   *                 type: string
   *                 format: password
   *                 minLength: 6
   *                 example: "NewSecurePass123!"
   *     responses:
   *       200:
   *         description: Password updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Password updated successfully"
   *       400:
   *         description: Invalid token or password validation failed
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid or expired token"
   *       500:
   *         description: Failed to reset password
   */
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
