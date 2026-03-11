import { Request, Response } from "express";
import { CompanyServices } from "../services/companyServices";

export const getAll = async (_req: Request, res: Response) => {
  const companies = await CompanyServices.getAll();
  return res.status(200).json({
    success: true,
    data: companies,
  });
};

export const getVehiclesById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { page, limit } = req.query;

  const pageNumber = page ? parseInt(page as string) : 1;
  const limitNumber = limit ? parseInt(limit as string) : 10;

  const result = await CompanyServices.getVehiclesById(
    id as string,
    pageNumber,
    limitNumber,
  );

  return res.status(200).json({
    success: true,
    data: result.vehicles,
    pagination: result.pagination,
  });
};
``;
