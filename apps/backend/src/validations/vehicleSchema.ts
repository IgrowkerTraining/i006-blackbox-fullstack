import { z } from "zod";

// ==================== VEHICLE SCHEMAS ====================
export const CreateVehicleSchema = z.object({
  unit_number: z
    .string()
    .min(1, "Unit number must not be empty")
    .max(50, "Unit number must not exceed 50 characters")
    .trim()
    .optional(),
  plate: z
    .string()
    .min(1, "Plate must not be empty")
    .max(20, "Plate must not exceed 20 characters")
    .trim()
    .regex(
      /^[A-Z0-9-]+$/i,
      "Plate can only contain letters, numbers, and hyphens",
    )
    .optional(),
  is_active: z.boolean().optional().default(true),
  driverId: z.uuid("Driver ID must be a valid UUID").optional(),
});

export const UpdateVehicleSchema = z.object({
  unit_number: z
    .string()
    .min(1, "Unit number must not be empty")
    .max(50, "Unit number must not exceed 50 characters")
    .trim()
    .optional(),
  plate: z
    .string()
    .min(1, "Plate must not be empty")
    .max(20, "Plate must not exceed 20 characters")
    .trim()
    .regex(
      /^[A-Z0-9-]+$/i,
      "Plate can only contain letters, numbers, and hyphens",
    )
    .optional(),
  is_active: z.boolean().optional(),
  driverId: z.uuid("Driver ID must be a valid UUID").optional(),
});

// Exportar tipos inferidos
export type CreateVehicleDTO = z.infer<typeof CreateVehicleSchema>;
export type UpdateVehicleDTO = z.infer<typeof UpdateVehicleSchema>;
