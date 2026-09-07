import sequelize from "./sequelize";
import "../models";

export const initDatabase = async (): Promise<void> => {

    try {

        await sequelize.authenticate();

        console.log(
            "Conexión a PostgreSQL establecida correctamente."
        );

        await sequelize.sync();

        console.log(
            "Modelos sincronizados correctamente."
        );

    } catch (error) {

        console.error(
            "Error al conectar con PostgreSQL:",
            error
        );

        throw error;
    }
};