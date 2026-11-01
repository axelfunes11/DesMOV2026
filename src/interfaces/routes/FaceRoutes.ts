import {
    Router
} from "express";

import {
    FaceController
} from "../controllers/FaceController";

import {
    authMiddleware
} from "../middlewares/AuthMiddleware";


const router =
    Router();


const faceController =
    new FaceController();


router.post(
    "/verify",
    authMiddleware,
    faceController.verify
);


export default router;