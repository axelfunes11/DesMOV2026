import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import sequelize from "./sequelize";
import UserModel from "../models/UserModel";

dotenv.config();

const createUser = async (): Promise<void> => {
    try {
        await sequelize.authenticate();

        const name = process.env.SEED_USER_NAME;
        const email = process.env.SEED_USER_EMAIL;
        const password = process.env.SEED_USER_PASSWORD;

        if (!name || !email || !password) {
            throw new Error("Faltan variables para crear el usuario de prueba.");
        }

        const existingUser = await UserModel.findOne({
            where: { email }
        });

        if (existingUser) {
            console.log("El usuario de prueba ya existe.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        console.log("Usuario de prueba creado correctamente.");

    } catch (error) {
        console.error("Error al crear usuario:", error);
    } finally {
        await sequelize.close();
    }
};

createUser();