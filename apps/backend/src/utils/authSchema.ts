import { z } from "zod";

export const RegisterSchema = z.object({
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    usdotNumber: z.string().optional(),
    state: z.string().optional(),
  }),
  user: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  }),
});

export const LoginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Exportar los tipos inferidos
export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
