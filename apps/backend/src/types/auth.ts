import { Request } from "express";
import { UserRole } from "../../generated/prisma/enums";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    companyId: string;
    role: UserRole;
  };
}
