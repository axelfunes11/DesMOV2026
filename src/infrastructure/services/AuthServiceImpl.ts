import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

import {
    AuthService,
    LoginResult
} from "../../domain/services/AuthService";

import UserModel from "../models/UserModel";

export class AuthServiceImpl implements AuthService {

    async login(
        email: string,
        password: string
    ): Promise<LoginResult | null> {

        const user = await UserModel.findOne({
            where: { email }
        });

        if (!user) {
            return null;
        }

        const passwordIsValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordIsValid) {
            return null;
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT_SECRET no está configurado.");
        }

        const expiresIn = (
            process.env.JWT_EXPIRES_IN || "1h"
        ) as SignOptions["expiresIn"];

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            jwtSecret,
            {
                expiresIn
            }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        };
    }
}