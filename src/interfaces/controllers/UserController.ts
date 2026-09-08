import {
    Request,
    Response
} from "express";

import { UserService } from "../../domain/services/Userservice";
import { createResponse } from "../responses/StandardResponse";

export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }
    updateProfile = async (
        req: Request,
        res: Response
    ): Promise<Response> => {

        try {

            const userId = Number(res.locals.userId);

            const {
                name,
                lastName,
                username,
                email,
                age,
                gender,
                city,
                phone,
                profilePhoto
            } = req.body ?? {};

            const user =
                await this.userService.updateProfile(
                    userId,
                    {
                        name,
                        lastName,
                        username,
                        email,
                        age,
                        gender,
                        city,
                        phone,
                        profilePhoto
                    }
                );

            if (!user) {
                return res.status(404).json(
                    createResponse(
                        404,
                        "Not Found",
                        {
                            detail: "Usuario no encontrado"
                        }
                    )
                );
            }

            return res.status(200).json(
                createResponse(
                    200,
                    "OK",
                    {
                        user
                    }
                )
            );

        } catch (error) {

            console.error(
                "Error al actualizar perfil:",
                error
            );

            return res.status(500).json(
                createResponse(
                    500,
                    "Internal Server Error",
                    null
                )
            );
        }
    };
    getProfile = async (
        req: Request,
        res: Response
    ): Promise<Response> => {

        try {

            const userId =
                Number(res.locals.userId);

            if (!userId) {

                return res.status(401).json(
                    createResponse(
                        401,
                        "Unauthorized",
                        null
                    )
                );
            }

            const user =
                await this.userService.getProfile(
                    userId
                );

            if (!user) {

                return res.status(404).json(
                    createResponse(
                        404,
                        "Not Found",
                        {
                            detail:
                                "Usuario no encontrado"
                        }
                    )
                );
            }

            return res.status(200).json(
                createResponse(
                    200,
                    "OK",
                    {
                        user
                    }
                )
            );

        } catch (error) {

            console.error(
                "Error al obtener perfil:",
                error
            );

            return res.status(500).json(
                createResponse(
                    500,
                    "Internal Server Error",
                    null
                )
            );
        }
    };
}