import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

import {
    AuthService,
    LoginResult,
    RegisterData,
    RegisterResult,
    PublicUser
} from "../../domain/services/AuthService";

import UserModel from "../models/UserModel";

export class AuthServiceImpl implements AuthService {

    private mapUser(user: UserModel): PublicUser {

        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            age: user.age,
            gender: user.gender,
            city: user.city,
            phone: user.phone,
            profilePhoto: user.profilePhoto
        };
    }

    async login(
        email: string,
        password: string
    ): Promise<LoginResult | null> {

        const user = await UserModel.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return null;
        }

        const passwordIsValid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordIsValid) {
            return null;
        }

        const jwtSecret =
            process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error(
                "JWT_SECRET no está configurado."
            );
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
            user: this.mapUser(user),
            token
        };
    }

    async register(
        data: RegisterData
    ): Promise<RegisterResult> {

        const emailExists =
            await UserModel.findOne({
                where: {
                    email: data.email
                }
            });

        if (emailExists) {
            return {
                success: false,
                reason: "EMAIL_EXISTS"
            };
        }

        const usernameExists =
            await UserModel.findOne({
                where: {
                    username: data.username
                }
            });

        if (usernameExists) {
            return {
                success: false,
                reason: "USERNAME_EXISTS"
            };
        }

        const hashedPassword =
            await bcrypt.hash(
                data.password,
                10
            );

        const user =
            await UserModel.create({
                name: data.name,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                password: hashedPassword,
                age: data.age,
                gender: data.gender,
                city: data.city,
                phone: data.phone,
                profilePhoto:
                    data.profilePhoto ?? null
            });

        return {
            success: true,
            user: this.mapUser(user)
        };
    }
}