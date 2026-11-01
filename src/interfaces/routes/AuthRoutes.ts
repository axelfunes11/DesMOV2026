import { Router } from "express";

import {
    AuthController
} from "../controllers/AuthController";

import {
    AuthServiceImpl
} from "../../infrastructure/services/AuthServiceImpl";


const router = Router();

const authService =
    new AuthServiceImpl();

const authController =
    new AuthController(
        authService
    );


// ==========================================
// LOGIN
// ==========================================

router.post(
    "/login",
    authController.login
);


export default router;