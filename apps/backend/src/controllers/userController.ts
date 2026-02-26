import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { UserRole } from "../../generated/prisma/enums";
import bcrypt from "bcrypt";
import { AuthRequest } from "../types/auth";

// OBTENER TODOS LOS USUARIOS DE UNA COMPANIA
const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const users = await UserService.getAll(companyId);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// OBTENER UN USUARIO
const getByUserId = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const user = await UserService.getByUserId(id as string, companyId);

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

// CREAR USUARIO
const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const adminCompanyId = req.user?.companyId;
    const adminRole = req.user?.role;
    if (!adminCompanyId)
      return res.status(401).json({ error: "Not authorized" });
    if (adminRole !== "ADMIN") {
      return res.status(403).json({ message: "Only Admins can create users" });
    }
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await UserService.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await UserService.create(
      {
        name,
        email,
        passwordHash,
        role: role as UserRole, // operador o compliance por ejemplo
      },
      adminCompanyId,
    ); // esto deberia ser validado
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating new user" });
  }
};

// ACTUALIZAR USUARIO
const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });
    const dataToUpdate = req.body; // esto deberia ser validado

    const updatedUser = await UserService.update(
      id as string,
      dataToUpdate,
      companyId,
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user" });
  }
};

// ELIMINAR USUARIO
const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    const currentUserRole = req.user?.role;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });
    // Solo Admin borra
    if (currentUserRole !== "ADMIN") {
      return res.status(403).json({ error: "Only Admins can delete users" });
    }
    // Evitar que el admin se borre a sí mismo
    if (id === req.user?.id) {
      return res.status(400).json({ error: "Cannot delete yourself" });
    }
    await UserService.remove(id as string, companyId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

export const UserController = {
  getAll,
  getByUserId,
  createUser,
  updateUser,
  deleteUser,
};
