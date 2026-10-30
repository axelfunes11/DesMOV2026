import express from "express";
import cors from "cors";
import helmet from "helmet";

import AuthRoutes from "./interfaces/routes/AuthRoutes";
import UserRoutes from "./interfaces/routes/UserRoutes";
import censusRoutes from "./interfaces/routes/CensusRoutes";
import LocationRoutes from "./interfaces/routes/LocationRoutes";
import AdminRoutes from "./interfaces/routes/AdminRoutes";

import {
    createResponse
} from "./interfaces/responses/StandardResponse";

const app = express();

app.use(helmet());
app.use(cors());

app.use(
    express.json({
        limit: "10mb"
    })
);

// ==========================================
// HEALTH
// ==========================================

app.get(
    "/health",
    (req, res) => {

        return res.status(200).json(
            createResponse(
                200,
                "OK",
                {
                    status: "ok"
                }
            )
        );
    }
);

// ==========================================
// AUTH
// ==========================================

app.use(
    "/api/v1/auth",
    AuthRoutes
);

// ==========================================
// USERS
// ==========================================

app.use(
    "/api/v1/users",
    UserRoutes
);

// ==========================================
// CENSOS
// ==========================================

app.use(
    "/api/v1/censos",
    censusRoutes
);

// ==========================================
// GEOTRACKER / PARCIAL
// ==========================================

app.use(
    "/api/v1/ubicaciones",
    LocationRoutes
);

// ==========================================
// ADMINISTRACIÓN DESMOV
// ==========================================

app.use(
    "/api/v1/admin",
    AdminRoutes
);

export default app;