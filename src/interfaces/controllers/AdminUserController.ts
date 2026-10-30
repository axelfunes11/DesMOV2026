import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../../infrastructure/models/UserModel";
import { createResponse } from "../responses/StandardResponse";

export class AdminUserController {

    createUser = async (
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
                profilePhoto,
                role
            } = req.body ?? {};

            // ==============================
            // VALIDAR CAMPOS
            // ==============================

            if (
                !name ||
                !lastName ||
                !username ||
                !email ||
                !password ||
                age === undefined ||
                !gender ||
                !city ||
                !phone ||
                !role
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

            // ==============================
            // VALIDAR ROL
            // ==============================

            const roleValue =
                String(role)
                    .trim()
                    .toUpperCase();

            if (
                roleValue !== "CENSISTA" &&
                roleValue !== "ADMIN"
            ) {
                return res.status(400).json(
                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "El rol debe ser CENSISTA o ADMIN"
                        }
                    )
                );
            }

            // ==============================
            // VALIDAR EMAIL
            // ==============================

            const emailExists =
                await UserModel.findOne({
                    where: {
                        email
                    }
                });

            if (emailExists) {
                return res.status(409).json(
                    createResponse(
                        409,
                        "Conflict",
                        {
                            detail:
                                "El email ya está registrado"
                        }
                    )
                );
            }

            // ==============================
            // VALIDAR USERNAME
            // ==============================

            const usernameExists =
                await UserModel.findOne({
                    where: {
                        username
                    }
                });

            if (usernameExists) {
                return res.status(409).json(
                    createResponse(
                        409,
                        "Conflict",
                        {
                            detail:
                                "El username ya está registrado"
                        }
                    )
                );
            }

            // ==============================
            // ENCRIPTAR PASSWORD
            // ==============================

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            // ==============================
            // CREAR USUARIO
            // ==============================

            const user =
                await UserModel.create({
                    name,
                    lastName,
                    username,
                    email,
                    password:
                        hashedPassword,
                    age:
                        Number(age),
                    gender,
                    city,
                    phone,
                    profilePhoto:
                        profilePhoto ?? null,
                    role:
                        roleValue
                });

            // ==============================
            // RESPUESTA
            // ==============================

            return res.status(201).json(
                createResponse(
                    201,
                    "Created",
                    {
                        user: {
                            id:
                                user.id,

                            name:
                                user.name,

                            lastName:
                                user.lastName,

                            username:
                                user.username,

                            email:
                                user.email,

                            age:
                                user.age,

                            gender:
                                user.gender,

                            city:
                                user.city,

                            phone:
                                user.phone,

                            role:
                                user.role
                        }
                    }
                )
            );

        } catch (error) {

            console.error(
                "Error creando usuario desde ADMIN:",
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