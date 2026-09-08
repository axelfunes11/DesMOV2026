import { Request, Response } from "express";
import { AuthService } from "../../domain/services/AuthService";
import { createResponse } from "../responses/StandardResponse";

export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    login = async (
        req: Request,
        res: Response
    ): Promise<Response> => {

        try {

            const { email, password } = req.body ?? {};

            if (!email || !password) {
                return res.status(400).json(
                    createResponse(
                        400,
                        "Bad Request",
                        {
                            login: false,
                            detail: "Email y password son obligatorios."
                        }
                    )
                );
            }

            const result = await this.authService.login(
                email,
                password
            );

            if (!result) {
                return res.status(401).json(
                    createResponse(
                        401,
                        "Unauthorized",
                        {
                            login: false
                        }
                    )
                );
            }

            return res.status(200).json(
                createResponse(
                    200,
                    "OK",
                    {
                        login: true,
                        user: result.user,
                        token: result.token
                    }
                )
            );

        } catch (error) {

            console.error("Error en login:", error);

            return res.status(500).json(
                createResponse(
                    500,
                    "Internal Server Error",
                    null
                )
            );
        }
    };


    // AQUÍ VA REGISTER, TODAVÍA DENTRO DE LA CLASE

    register = async (
        req: Request,
        res: Response
    ): Promise<Response> => {

        try {

            const {
                name,
                lastName,
                username,
                email,
                password,
                age,
                gender,
                city,
                phone,
                profilePhoto
            } = req.body ?? {};

            if (
                !name ||
                !lastName ||
                !username ||
                !email ||
                !password ||
                age === undefined ||
                !gender ||
                !city ||
                !phone
            ) {

                return res.status(400).json(
                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail: "Faltan datos obligatorios"
                        }
                    )
                );
            }

            const result = await this.authService.register({
                name,
                lastName,
                username,
                email,
                password,
                age: Number(age),
                gender,
                city,
                phone,
                profilePhoto: profilePhoto ?? null
            });

            if (!result.success) {

                const detail =
                    result.reason === "EMAIL_EXISTS"
                        ? "El email ya está registrado"
                        : "El username ya está registrado";

                return res.status(409).json(
                    createResponse(
                        409,
                        "Conflict",
                        {
                            detail
                        }
                    )
                );
            }

            return res.status(201).json(
                createResponse(
                    201,
                    "Created",
                    {
                        user: result.user
                    }
                )
            );

        } catch (error) {

            console.error("Error en registro:", error);

            return res.status(500).json(
                createResponse(
                    500,
                    "Internal Server Error",
                    null
                )
            );
        }
    };

} // ← ESTE es el cierre final de AuthController