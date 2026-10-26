import {
    Request,
    Response
} from "express";

import {
    CensusService
} from "../../domain/services/CensusService";

import {
    createResponse
} from "../responses/StandardResponse";


export class CensusController {

    constructor(
        private readonly censusService: CensusService
    ) { }


    // =====================================================
    // CREAR CENSO
    // =====================================================

    create = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const userId =
                res.locals.userId as number;


            const {
                nombre,
                apellido,
                totalMiembros,
                cantidadTelevisiones,
                latitude,
                longitude
            } = req.body;


            // =================================================
            // VALIDACIONES BÁSICAS
            // =================================================

            if (
                !nombre ||
                !apellido
            ) {

                res.status(400).json(

                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "Nombre y apellido son obligatorios"
                        }
                    )
                );

                return;
            }


            if (
                totalMiembros === undefined ||
                cantidadTelevisiones === undefined ||
                latitude === undefined ||
                longitude === undefined
            ) {

                res.status(400).json(

                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "Faltan datos obligatorios del censo"
                        }
                    )
                );

                return;
            }


            const totalMiembrosNumber =
                Number(
                    totalMiembros
                );


            const cantidadTelevisionesNumber =
                Number(
                    cantidadTelevisiones
                );


            const latitudeNumber =
                Number(
                    latitude
                );


            const longitudeNumber =
                Number(
                    longitude
                );


            // =================================================
            // VALIDAR NÚMEROS
            // =================================================

            if (
                !Number.isInteger(
                    totalMiembrosNumber
                ) ||
                totalMiembrosNumber < 1
            ) {

                res.status(400).json(

                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "El total de miembros debe ser un número entero mayor o igual a 1"
                        }
                    )
                );

                return;
            }


            if (
                !Number.isInteger(
                    cantidadTelevisionesNumber
                ) ||
                cantidadTelevisionesNumber < 0
            ) {

                res.status(400).json(

                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "La cantidad de televisiones debe ser un número entero mayor o igual a 0"
                        }
                    )
                );

                return;
            }


            if (
                !Number.isFinite(
                    latitudeNumber
                ) ||
                latitudeNumber < -90 ||
                latitudeNumber > 90
            ) {

                res.status(400).json(

                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "Latitud inválida"
                        }
                    )
                );

                return;
            }


            if (
                !Number.isFinite(
                    longitudeNumber
                ) ||
                longitudeNumber < -180 ||
                longitudeNumber > 180
            ) {

                res.status(400).json(

                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "Longitud inválida"
                        }
                    )
                );

                return;
            }


            // =================================================
            // CREAR CENSO
            // =================================================

            const census =
                await this.censusService
                    .createCensus(
                        userId,
                        {
                            nombre:
                                nombre.trim(),

                            apellido:
                                apellido.trim(),

                            totalMiembros:
                                totalMiembrosNumber,

                            cantidadTelevisiones:
                                cantidadTelevisionesNumber,

                            latitude:
                                latitudeNumber,

                            longitude:
                                longitudeNumber
                        }
                    );


            res.status(201).json(

                createResponse(
                    201,
                    "Censo creado correctamente",
                    {
                        census
                    }
                )
            );


        } catch (error) {

            console.error(
                "Error al crear censo:",
                error
            );


            res.status(500).json(

                createResponse(
                    500,
                    "Internal Server Error",
                    {
                        detail:
                            "Error al crear el censo"
                    }
                )
            );
        }
    };


    // =====================================================
    // OBTENER TODOS LOS CENSOS
    // =====================================================

    getAll = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const censuses =
                await this.censusService
                    .getAllCensuses();


            res.status(200).json(

                createResponse(
                    200,
                    "OK",
                    {
                        censuses
                    }
                )
            );


        } catch (error) {

            console.error(
                "Error al obtener censos:",
                error
            );


            res.status(500).json(

                createResponse(
                    500,
                    "Internal Server Error",
                    {
                        detail:
                            "Error al obtener los censos"
                    }
                )
            );
        }
    };
}