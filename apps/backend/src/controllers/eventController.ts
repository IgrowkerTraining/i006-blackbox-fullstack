import { Response } from "express";
import { EventServices } from "../services/eventServices";
import { AuthRequest } from "../types/auth";

export const createInspection = async (req: AuthRequest, res: Response) => {
  const companyId = req.user?.companyId;
  const userId = req.user?.id;
  if (!companyId || !userId) {
    return res.status(401).json({ error: "Not authorized" });
  }

  const newInpsection = await EventServices.createInspection(
    req.body,
    companyId,
    userId,
  );
  if (!newInpsection) {
    return res.status(400).json({ error: "Failed to create inspection" });
  }

  return res.status(201).json({
    success: true,
    message: "Inspection created successfully",
    data: newInpsection,
  });
};

export const EventController = {
  createInspection,
};
