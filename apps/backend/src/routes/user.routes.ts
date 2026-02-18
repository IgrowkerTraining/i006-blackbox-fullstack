import { Router } from "express";
import { UserController } from "../controllers/userController";
// JWT
const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getByUserId);
router.get("/", UserController.create);

export default router;
