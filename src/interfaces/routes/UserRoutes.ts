import { Router } from "express";

import { UserController } from "../controllers/UserController";
import { UserServiceImpl } from "../../infrastructure/services/UserServiceImpl";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

const userService =
    new UserServiceImpl();

const userController =
    new UserController(userService);

router.get("/me",authMiddleware,userController.getProfile); 
router.put("/me",authMiddleware,userController.updateProfile);
export default router;