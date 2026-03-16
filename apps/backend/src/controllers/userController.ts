import { Request, Response } from "express";
import { UserService } from "../services/userServices";
import { UserRole } from "../../generated/prisma/enums";
import bcrypt from "bcrypt";
import { AuthRequest } from "../types/auth";
import { CreateUserSchema, UpdateUserSchema } from "../validations/userSchema";
import { ZodError } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         companyId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: "Carlos García"
 *         email:
 *           type: string
 *           format: email
 *           example: "carlos@lonestar.com"
 *         role:
 *           type: string
 *           enum: [ADMIN, OPERATOR, COMPLIANCE]
 *           example: "OPERATOR"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users for the authenticated company
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */
const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const users = await UserService.getAll(companyId);
    res.json(users);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message,
      code: error?.code,
    });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a specific user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching user
 */
const getByUserId = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const user = await UserService.getByUserId(id as string, companyId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching user",
      error: error?.message,
      code: error?.code,
    });
  }
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carlos García"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "carlos@lonestar.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "SecurePass123!"
 *               role:
 *                 type: string
 *                 enum: [ADMIN, OPERATOR, COMPLIANCE]
 *                 example: "OPERATOR"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Only Admins can create users
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Error creating new user
 */
const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const adminCompanyId = req.user?.companyId;
    const adminRole = req.user?.role;

    if (!adminCompanyId)
      return res.status(401).json({ error: "Not authorized" });

    if (adminRole !== UserRole.ADMIN) {
      return res.status(403).json({ message: "Only Admins can create users" });
    }

    const validatedData = CreateUserSchema.parse(req.body);

    const existingUser = await UserService.findByEmail(validatedData.email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    const newUser = await UserService.create(
      {
        name: validatedData.name,
        email: validatedData.email,
        passwordHash: passwordHash,
        role: validatedData.role,
      },
      adminCompanyId,
    );

    res.status(201).json(newUser);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    console.error("User creation error", error);
    res.status(500).json({
      message: "Error creating new user",
      error: error?.message,
      code: error?.code,
    });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carlos García"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "carlos.updated@lonestar.com"
 *               role:
 *                 type: string
 *                 enum: [ADMIN, OPERATOR, COMPLIANCE]
 *                 example: "COMPLIANCE"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */
const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;

    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    const dataToUpdate = UpdateUserSchema.parse(req.body);

    const updatedUser = await UserService.update(
      id as string,
      dataToUpdate,
      companyId,
    );

    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error updating user",
      error: error?.message,
      code: error?.code,
    });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully (no content)
 *       400:
 *         description: Cannot delete yourself
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Only Admins can delete users
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user
 */
const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const companyId = req.user?.companyId;
    const currentUserRole = req.user?.role;

    if (!companyId) return res.status(401).json({ error: "Not authorized" });

    // Solo Admin borra
    if (currentUserRole !== "ADMIN") {
      return res.status(403).json({ error: "Only Admins can delete users" });
    }

    // Evitar que el admin se borre a sí mismo
    if (id === req.user?.id) {
      return res.status(400).json({ error: "Cannot delete yourself" });
    }

    await UserService.remove(id as string, companyId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

export const UserController = {
  getAll,
  getByUserId,
  createUser,
  updateUser,
  deleteUser,
};
