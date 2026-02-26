import jwt from "jsonwebtoken";
import { UserRole } from "../../generated/prisma/enums";

interface JWTPayload {
  sub: string;
  cid: string;
  rol: UserRole;
  iat: number;
  exp: number;
}

const secret = process.env.JWT_SECRET!;
if (!secret) {
  throw new Error("Falta variable de entorno JWT_SECRET");
}

export function generateToken(data: {
  userId: string;
  companyId: string;
  role: string; // Recibe el Enum convertido a string
}) {
  return jwt.sign(
    {
      sub: data.userId,
      cid: data.companyId,
      rol: data.role,
    },
    secret,
    { expiresIn: "7d" },
  );
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, secret) as JWTPayload;
}
