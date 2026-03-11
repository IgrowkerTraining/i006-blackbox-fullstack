import { Request, Response } from "express";
import { CompanyServices } from "../services/companyServices";

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: "Transporte Norte S.A."
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of all companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *       500:
 *         description: Internal Server Error
 */
export const getAll = async (_req: Request, res: Response) => {
  const companies = await CompanyServices.getAll();
  return res.status(200).json({
    success: true,
    data: companies,
  });
};

/**
 * @swagger
 * /api/companies/{id}/vehicles:
 *   get:
 *     summary: Get vehicles by company ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Company ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated list of vehicles for the company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Vehicle'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 50
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal Server Error
 */
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
