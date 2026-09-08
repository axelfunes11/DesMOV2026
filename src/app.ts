import express from "express";
import cors from "cors";
import helmet from "helmet";

import AuthRoutes from "./interfaces/routes/AuthRoutes";
import UserRoutes from "./interfaces/routes/UserRoutes";
import { createResponse } from "./interfaces/responses/StandardResponse";


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    return res.status(200).json(
        createResponse(
            200,
            "OK",
            {
                status: "ok"
            }
        )
    );
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users",UserRoutes);

export default app;