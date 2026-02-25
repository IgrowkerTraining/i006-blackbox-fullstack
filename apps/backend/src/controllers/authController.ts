import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { CompanyServices } from "../services/companyServices";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, companyName, role, companyId } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const existingUser = await UserService.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "User is already registered" });
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const companyCount = await CompanyServices.count();
      let companyIdToUse = companyId;
      let companyNameResult = companyName;

      // Verifica si la compañía ha sido registrada
      if (companyCount === 0) {
        // La compañía no ha sido registrada, por lo que se trata del primer usuario
        if (!companyName) {
          return res.status(400).json({
            error: "companyName is required for the first user",
          });
        }
        const company = await CompanyServices.register({ name: companyName });
        companyIdToUse = company.id;
      } else {
        // La compañía ya está registrada, por lo que no se trata del primer usuario
        if (!companyId || !role) {
          return res.status(400).json({
            error: "companyId and role required",
          });
        }
      }

      const user = await UserService.register({
        name,
        email,
        passwordHash,
        role: companyCount === 0 ? "admin" : role,
        companyId: companyIdToUse,
      });

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
          companyId: user.companyId,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" },
      );

      res.status(201).json({
        user,
        companyName: companyNameResult,
        message: "User registered successfully",
        token,
      });
    } catch (error: any) {
      if (error.message === "User already exists") {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email and password are required",
        });
      }

      const user = await UserService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
          companyId: user.companyId,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" },
      );

      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyId: user.companyId,
        },
        message: "Login successful",
        token,
      });
    } catch (error: any) {
      if (error.message === "Invalid email or password") {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: "Login failed" });
    }
  }
}

export default new AuthController();
