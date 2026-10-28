import { Request, Response } from "express";
import LocationModel from "../../infrastructure/models/LocationModel";
import { createResponse } from "../responses/StandardResponse";

const mapLocation = (location: LocationModel) => ({
    id: location.id,
    nombre: location.nombre,
    descripcion: location.descripcion,
    latitud: Number(location.latitud),
    longitud: Number(location.longitud),
    createdAt: location.createdAt
});

export class LocationController {
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = Number(res.locals.userId);
            const { nombre, descripcion, latitud, longitud } = req.body ?? {};
            const lat = Number(latitud);
            const lng = Number(longitud);

            if (typeof nombre !== "string" || !nombre.trim() || nombre.trim().length > 100 ||
                typeof descripcion !== "string" || !descripcion.trim() ||
                latitud === undefined || latitud === null ||
                longitud === undefined || longitud === null ||
                !Number.isFinite(lat) || lat < -90 || lat > 90 ||
                !Number.isFinite(lng) || lng < -180 || lng > 180) {
                res.status(400).json(createResponse(400, "Bad Request", {
                    detail: "Envia nombre, descripcion, latitud (-90 a 90) y longitud (-180 a 180) validos."
                }));
                return;
            }

            const location = await LocationModel.create({
                userId,
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                latitud: lat,
                longitud: lng
            });

            res.status(201).json(createResponse(201, "Ubicacion guardada", {
                ubicacion: mapLocation(location)
            }));
        } catch (error) {
            console.error("Error al guardar ubicacion:", error);
            res.status(500).json(createResponse(500, "Internal Server Error", {
                detail: "No fue posible guardar la ubicacion"
            }));
        }
    };

    getMine = async (_req: Request, res: Response): Promise<void> => {
        try {
            const userId = Number(res.locals.userId);
            const locations = await LocationModel.findAll({
                where: { userId },
                order: [["createdAt", "DESC"]]
            });

            res.status(200).json(createResponse(200, "OK", {
                ubicaciones: locations.map(mapLocation)
            }));
        } catch (error) {
            console.error("Error al listar ubicaciones:", error);
            res.status(500).json(createResponse(500, "Internal Server Error", {
                detail: "No fue posible obtener las ubicaciones"
            }));
        }
    };
}
