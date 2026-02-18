import { Router } from "express";
import { UserController } from "../controllers/userController";
// JWT
const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getByUserId);
router.get("/", UserController.createUser);
router.get("/:id", UserController.updateUser);
router.get("/:id", UserController.deleteUser);

export default router;
