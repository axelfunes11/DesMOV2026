import { Router } from "express";
import { AdminUserController } from "../controllers/AdminUserController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { requireRole } from "../middlewares/RoleMiddleware";

const router = Router();

const adminUserController =
    new AdminUserController();

router.post(
    "/users",
    authMiddleware,
    requireRole("ADMIN"),
    adminUserController.createUser
);

export default router;