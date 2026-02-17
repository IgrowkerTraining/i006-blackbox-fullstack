import { Request, Response } from "express";
import { CompanyServices } from "../services/companyServices";

export const getAll = async (_req: Request, res: Response) => {
  const companies = await CompanyServices.getAll();
  return res.status(200).json({
    success: true,
    data: companies,
  });
};
