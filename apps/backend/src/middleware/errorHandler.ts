import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { Prisma } from "../../generated/prisma/client";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  // Errores Conocidos de Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: Error de restricción unica (ej. email ya registrado)
    if (err.code === "P2002") {
      const target = (err.meta?.target as string[]) || "Field";
      const msg = `Unique constraint failed on the ${target}`;
      error = new AppError({
        message: msg,
        httpCode: 409, // Conflicto
      });
    }
    // P2025: Registro no encontrado (al intentar actualizar/eliminar)
    else if (err.code === "P2025") {
      error = new AppError({
        message: "Record not found",
        httpCode: 404,
      });
    }
    // P2003: Error de lave foránea (ej. crear usuario sin companyId)
    else if (err.code === "P2003") {
      const fieldName = err.meta?.field_name || "field";
      error = new AppError({
        message: `Foreign key constraint failed on ${fieldName}`,
        httpCode: 400,
      });
    }
    // Otros errores conocidos de base de datos
    else {
      error = new AppError({
        message: `Database error: ${err.message}`,
        httpCode: 400,
      });
    }
  }

  // Errores de Validación de Prisma (Tipos incorrectos, campos faltantes)
  if (err instanceof Prisma.PrismaClientValidationError) {
    // Prisma devuelve logs muy tecnicos y largos.
    // Devolvemos un mensaje generico mejor.
    error = new AppError({
      message: "Invalid input data: Database validation failed",
      httpCode: 400,
    });
  }

  // Errores de Inicialización (Conexion a DB o credenciales incorrectas)
  if (err instanceof Prisma.PrismaClientInitializationError) {
    error = new AppError({
      message: "Could not connect to the database server",
      httpCode: 500,
    });
  }

  // Errores de JWT
  if (err.name === "JsonWebTokenError") {
    error = new AppError({
      message: "Invalid token. Please log in again.",
      httpCode: 401,
    });
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError({
      message: "Your token has expired. Please log in again.",
      httpCode: 401,
    });
  }

  // Respuesta final
  // Por defecto, sera un error 500 si no entra en ningun caso anterior (bug tal vez)
  if (!(error instanceof AppError)) {
    console.error("UNHANDLED ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

  return res.status(error.httpCode).json({
    success: false,
    message: error.message,
    // Solo en modo development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
