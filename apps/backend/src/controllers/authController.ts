import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../prisma";
import { generateToken } from "../utils/generateToken";
import { UserRole } from "../../generated/prisma/enums";

interface RegisterDTO {
  company: {
    name: string;
    usdotNumber: string;
    state: string;
  };
  user: {
    name: string; // creo que seria mejor dejarlo separado pero esta bien asi por ahora
    email: string;
    password: string;
  };
}

interface LoginDTO {
  email: string;
  password: string;
}

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const data = req.body as RegisterDTO;

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
            usdotNumber: data.company.usdotNumber,
            state: data.company.state,
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
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({
        message: "Registration failed",
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const data = req.body as LoginDTO;
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
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        message: "Login failed",
      });
    }
  };
}

export default new AuthController();
