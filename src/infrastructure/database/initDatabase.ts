import sequelize from "./sequelize";

export const initDatabase = async (): Promise<void> => {

    try {

        await sequelize.authenticate();

        console.log("Conexión a PostgreSQL establecida correctamente.");

    } catch (error) {

        console.error("Error al conectar con PostgreSQL:", error);

        throw error;

    }

};