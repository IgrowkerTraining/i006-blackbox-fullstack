import { z } from "zod";
import { UserRole } from "../../generated/prisma/enums";

// 1. Validación para CREAR un usuario (POST)
export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(UserRole, {
    message: "Invalid role. Must be ADMIN, OPERATOR, or COMPLIANCE",
  }),
});

// 2. Validación para ACTUALIZAR un usuario (PUT)
// opcionales porque puede ser que no cambien todos los campos
export const UpdateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.email("Invalid email format").optional(),
  role: z
    .enum(UserRole, {
      message: "Invalid role. Must be ADMIN, OPERATOR, or COMPLIANCE",
    })
    .optional(),
  isActive: z.boolean().optional(),
});

// Exportar los tipos inferidos

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
