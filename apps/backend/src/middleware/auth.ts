import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/generateToken";
import { UserRole } from "../../generated/prisma/enums";
import { AuthRequest } from "../types/auth";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Not authorized" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = verifyToken(token);

    req.user = {
      id: decoded.sub,
      companyId: decoded.cid,
      role: decoded.rol as UserRole,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
