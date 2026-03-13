import { z } from "zod";

// Schema para crear un driver
export const CreateDriverSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  license_number: z
    .string()
    .min(1, "License number is required")
    .min(3, "License number must be at least 3 characters")
    .max(50, "License number must not exceed 50 characters")
    .trim()
    .regex(
      /^[A-Z0-9-]+$/i,
      "License number can only contain letters, numbers, and hyphens",
    ),
  is_active: z.boolean().optional().default(true),
});

// Schema para actualizar un driver
export const UpdateDriverSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim()
    .optional(),
  license_number: z
    .string()
    .min(3, "License number must be at least 3 characters")
    .max(50, "License number must not exceed 50 characters")
    .trim()
    .regex(
      /^[A-Z0-9-]+$/i,
      "License number can only contain letters, numbers, and hyphens",
    )
    .optional(),
  is_active: z.boolean().optional(),
});

// Exportar tipos inferidos
export type CreateDriverDTO = z.infer<typeof CreateDriverSchema>;
export type UpdateDriverDTO = z.infer<typeof UpdateDriverSchema>;
