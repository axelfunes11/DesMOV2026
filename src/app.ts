import express from "express";
import cors from "cors";
import helmet from "helmet";

import AuthRoutes from "./interfaces/routes/AuthRoutes";
import UserRoutes from "./interfaces/routes/UserRoutes";
import { createResponse } from "./interfaces/responses/StandardResponse";
import censusRoutes from "./interfaces/routes/CensusRoutes";
import LocationRoutes from "./interfaces/routes/LocationRoutes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(
    express.json({
        limit: "10mb"
    })
);

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
app.use("/api/v1/censos",censusRoutes);
app.use("/api/v1/ubicaciones", LocationRoutes);
export default app;