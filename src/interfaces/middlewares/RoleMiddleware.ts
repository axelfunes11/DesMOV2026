import {
    Request,
    Response,
    NextFunction
} from "express";

import {
    createResponse
} from "../responses/StandardResponse";


export type UserRole =
    "CENSISTA" |
    "ADMIN";


export const requireRole = (

    ...allowedRoles: UserRole[]

) => {

    return (

        req: Request,

        res: Response,

        next: NextFunction

    ): void => {


        // =================================================
        // OBTENER EL ROL DEL TOKEN
        // =================================================

        const userRole =
            res.locals.userRole as
                UserRole | undefined;


        if (!userRole) {

            res.status(401).json(

                createResponse(

                    401,

                    "Unauthorized",

                    {
                        detail:
                            "No se encontró el rol del usuario"
                    }
                )
            );

            return;
        }


        // =================================================
        // COMPROBAR SI EL ROL ESTÁ PERMITIDO
        // =================================================

        if (

            !allowedRoles.includes(
                userRole
            )

        ) {

            res.status(403).json(

                createResponse(

                    403,

                    "Forbidden",

                    {
                        detail:
                            "No tienes permisos para realizar esta acción"
                    }
                )
            );

            return;
        }


        next();
    };
};