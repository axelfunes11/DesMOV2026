import {
    Request,
    Response
} from "express";

import { UserService } from "../../domain/services/UserService";
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


            const {
                name,
                lastName,
                username,
                email,
                age,
                gender,
                city,
                phone
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
                        phone
                    }
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


    updateProfilePhoto = async (
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


            const {
                profilePhoto
            } = req.body ?? {};


            if (
                !profilePhoto ||
                typeof profilePhoto !== "string"
            ) {

                return res.status(400).json(
                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "La fotografía es obligatoria"
                        }
                    )
                );
            }


            /*
             * Por si Android manda algo como:
             *
             * data:image/jpeg;base64,/9j/4AA...
             *
             * eliminamos el encabezado y
             * dejamos únicamente el Base64.
             */
            const cleanBase64 =
                profilePhoto.replace(
                    /^data:image\/[a-zA-Z0-9.+-]+;base64,/,
                    ""
                );


            const photoBuffer =
                Buffer.from(
                    cleanBase64,
                    "base64"
                );


            if (photoBuffer.length === 0) {

                return res.status(400).json(
                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "La fotografía no es válida"
                        }
                    )
                );
            }


            // Máximo 5 MB
            if (
                photoBuffer.length >
                5 * 1024 * 1024
            ) {

                return res.status(413).json(
                    createResponse(
                        413,
                        "Payload Too Large",
                        {
                            detail:
                                "La fotografía supera el tamaño permitido"
                        }
                    )
                );
            }


            const user =
                await this.userService
                    .updateProfilePhoto(
                        userId,
                        photoBuffer
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
                "Error al actualizar fotografía:",
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