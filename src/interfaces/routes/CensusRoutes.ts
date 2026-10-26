import {
    Router
} from "express";

import {
    CensusController
} from "../controllers/CensusController";

import {
    CensusServiceImpl
} from "../../infrastructure/services/CensusServiceImpl";

import {
    authMiddleware
} from "../middlewares/AuthMiddleware";

import {
    requireRole
} from "../middlewares/RoleMiddleware";


const router =
    Router();


const censusService =
    new CensusServiceImpl();


const censusController =
    new CensusController(
        censusService
    );


// =========================================================
// CREAR CENSO
// SOLO CENSISTA
// =========================================================

router.post(
    "/",
    authMiddleware,
    requireRole(
        "CENSISTA"
    ),
    censusController.create
);


// =========================================================
// OBTENER TODOS LOS CENSOS
// SOLO ADMIN
// =========================================================

router.get(
    "/",
    authMiddleware,
    requireRole(
        "ADMIN"
    ),
    censusController.getAll
);


export default router;