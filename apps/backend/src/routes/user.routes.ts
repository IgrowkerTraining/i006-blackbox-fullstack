import { Router } from "express";
import { UserController } from "../controllers/userController";
// JWT
const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getByUserId);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser); // Podria ser mejor patch para actualizar solo un campo opcionalmente
router.delete("/:id", UserController.deleteUser);

export default router;
