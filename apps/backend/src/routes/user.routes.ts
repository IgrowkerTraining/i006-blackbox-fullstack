import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";
const router = Router();

router.get("/", authMiddleware, UserController.getAll);
router.get("/:id", authMiddleware, UserController.getByUserId);
router.post("/", authMiddleware, UserController.createUser);
router.put("/:id", authMiddleware, UserController.updateUser); // Podria ser mejor patch para actualizar solo un campo opcionalmente
router.delete("/:id", authMiddleware, UserController.deleteUser);

export default router;
