import {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";

import {
    createResponse
} from "../responses/StandardResponse";


type UserRole =
    "CENSISTA" |
    "ADMIN";


interface JwtPayload {

    id: number;

    email: string;

    role: UserRole;
}


export const authMiddleware = (

    req: Request,

    res: Response,

    next: NextFunction

): void => {


    // =====================================================
    // OBTENER HEADER AUTHORIZATION
    // =====================================================

    const authHeader =
        req.headers.authorization;


    if (!authHeader) {

        res.status(401).json(

            createResponse(

                401,

                "Unauthorized",

                {
                    detail:
                        "Token no proporcionado"
                }
            )
        );

        return;
    }


    // =====================================================
    // VALIDAR FORMATO BEARER TOKEN
    // =====================================================

    const parts =
        authHeader.split(" ");


    if (

        parts.length !== 2 ||

        parts[0] !== "Bearer"

    ) {

        res.status(401).json(

            createResponse(

                401,

                "Unauthorized",

                {
                    detail:
                        "Formato de token inválido"
                }
            )
        );

        return;
    }


    const token =
        parts[1];


    // =====================================================
    // VALIDAR JWT
    // =====================================================

    try {

        const secret =
            process.env.JWT_SECRET;


        if (!secret) {

            throw new Error(
                "JWT_SECRET no está configurado"
            );
        }


        const decoded =

            jwt.verify(
                token,
                secret
            ) as JwtPayload;


        // =================================================
        // VALIDAR CONTENIDO DEL TOKEN
        // =================================================

        if (

            !decoded.id ||

            !decoded.email ||

            !decoded.role

        ) {

            res.status(401).json(

                createResponse(

                    401,

                    "Unauthorized",

                    {
                        detail:
                            "Token incompleto"
                    }
                )
            );

            return;
        }


        if (

            decoded.role !== "CENSISTA" &&

            decoded.role !== "ADMIN"

        ) {

            res.status(401).json(

                createResponse(

                    401,

                    "Unauthorized",

                    {
                        detail:
                            "Rol inválido"
                    }
                )
            );

            return;
        }


        // =================================================
        // GUARDAR DATOS PARA LOS SIGUIENTES MIDDLEWARES
        // =================================================

        res.locals.userId =
            decoded.id;


        res.locals.userEmail =
            decoded.email;


        res.locals.userRole =
            decoded.role;


        next();

    } catch (error) {

        res.status(401).json(

            createResponse(

                401,

                "Unauthorized",

                {
                    detail:
                        "Token inválido o expirado"
                }
            )
        );
    }
};