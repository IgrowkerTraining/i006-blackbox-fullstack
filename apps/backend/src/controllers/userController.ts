// controllers/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "../services/userServices";

// Tal vez seria mejor mover a un archivo propio
// esta interfaz es necesaria para enviar companyId
interface AuthRequest extends Request {
  user?: {
    id: string;
    companyId: string;
    role: string;
  };
}

interface UserParams {
  id: string;
}

// OBTENER TODOS LOS USUARIOS DE UNA COMPANIA
const getAll = async (
  req: AuthRequest & Request<UserParams>,
  res: Response,
) => {
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
const getByUserId = async (
  req: AuthRequest & Request<UserParams>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const user = await UserService.getByUserId(id, companyId);

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

// CREAT USUARIO
const createUser = async (
  req: AuthRequest & Request<UserParams>,
  res: Response,
) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });
    const newUser = await UserService.create(req.body, companyId); // esto deberia ser validado
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating new user" });
  }
};

// ACTUALIZAR USUARIO
const updateUser = async (
  req: AuthRequest & Request<UserParams>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    const dataToUpdate = req.body; // esto deberia ser validado
    if (!companyId) return res.status(401).json({ error: "Not authorized" });
    const updatedUser = await UserService.update(id, dataToUpdate, companyId);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user" });
  }
};

// ELIMINAR USUARIO
const deleteUser = async (
  req: AuthRequest & Request<UserParams>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;

    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    await UserService.remove(id, companyId);
    res.status(204).send();
  } catch (error: any) {
    if (error.message === "User not found or access denied") {
      return res.status(404).json({ error: "User not found" });
    }

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
