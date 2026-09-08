import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { createResponse } from "../responses/StandardResponse";

interface JwtPayload {
    id: number;
    email: string;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        res.status(401).json(
            createResponse(
                401,
                "Unauthorized",
                {
                    detail: "Token no proporcionado"
                }
            )
        );

        return;
    }

    const parts = authHeader.split(" ");

    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer"
    ) {

        res.status(401).json(
            createResponse(
                401,
                "Unauthorized",
                {
                    detail: "Formato de token inválido"
                }
            )
        );

        return;
    }

    const token = parts[1];

    try {

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error(
                "JWT_SECRET no está configurado"
            );
        }

        const decoded = jwt.verify(
            token,
            secret
        ) as JwtPayload;

        res.locals.userId = decoded.id;
        res.locals.userEmail = decoded.email;

        next();

    } catch (error) {

        res.status(401).json(
            createResponse(
                401,
                "Unauthorized",
                {
                    detail: "Token inválido o expirado"
                }
            )
        );
    }
};