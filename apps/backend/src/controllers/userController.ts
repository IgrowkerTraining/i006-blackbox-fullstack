// controllers/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "../services/userServices";

// 1. Todos los usuarios
const getAll = async (req: Request, res: Response) => {
  try {
    // se deberia crear una interfaz para request
    //@ts-ignore
    const companyId = req.user?.companyId;

    if (!companyId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const users = await UserService.getAll(companyId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getByUserId = async (req: Request, res: Response) => {};
const create = async (req: Request, res: Response) => {};

export const UserController = {
  getAll,
  getByUserId,
  create,
};
