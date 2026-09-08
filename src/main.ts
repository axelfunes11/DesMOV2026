import dotenv from "dotenv";

import app from "./app";
import { initDatabase } from "./infrastructure/database/initdatabase";

dotenv.config();

const PORT = Number(process.env.PORT || 3000);

const startServer = async (): Promise<void> => {
    try {
        await initDatabase();

        app.listen(PORT, () => {
            console.log(`Backend ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("No fue posible iniciar el backend.");
        process.exit(1);
    }
};

startServer();