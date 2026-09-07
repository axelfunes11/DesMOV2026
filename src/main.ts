import { initDatabase } from "./infrastructure/database/initdatabase"; 

const startServer = async () => {

    try { 

        await initDatabase();

        console.log("Backend iniciado correctamente.");

    } catch (error) {

        console.error("No fue posible iniciar el backend.");

        process.exit(1);

    }

};

startServer();