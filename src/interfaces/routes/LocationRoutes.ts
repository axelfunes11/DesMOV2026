import { Router } from "express";
import { LocationController } from "../controllers/LocationController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const controller = new LocationController();

// Ambos roles autenticados pueden guardar y ver SUS propias ubicaciones.
router.post("/", authMiddleware, controller.create);
router.get("/", authMiddleware, controller.getMine);

export default router;
