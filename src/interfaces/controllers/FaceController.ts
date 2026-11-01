import {
    Request,
    Response
} from "express";

import UserModel from "../../infrastructure/models/UserModel";

import {
    createResponse
} from "../responses/StandardResponse";


interface LivenessResult {
    confidence: number | string;
    status: string;
    referenceImageBase64: string;
}


interface CompareFacesResult {
    matched: boolean;
    similarity: number;
    threshold: number;
}


export class FaceController {

    verify = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const userId =
                Number(res.locals.userId);

            const {
                sessionId
            } = req.body as {
                sessionId?: string;
            };


            // ==========================================
            // VALIDAR SESSION ID
            // ==========================================

            if (
                !sessionId ||
                !sessionId.trim()
            ) {

                res.status(400).json(
                    createResponse(
                        400,
                        "Bad Request",
                        {
                            detail:
                                "sessionId es requerido"
                        }
                    )
                );

                return;
            }


            // ==========================================
            // VALIDAR CONFIGURACIÓN
            // ==========================================

            const getResultsUrl =
                process.env.GET_SESSION_RESULTS_URL;

            const compareFacesUrl =
                process.env.COMPARE_FACES_URL;


            if (
                !getResultsUrl ||
                !compareFacesUrl
            ) {

                res.status(500).json(
                    createResponse(
                        500,
                        "Internal Server Error",
                        {
                            detail:
                                "Las URLs de Face Liveness no están configuradas"
                        }
                    )
                );

                return;
            }


            // ==========================================
            // OBTENER USUARIO AUTENTICADO
            // ==========================================

            const user =
                await UserModel.findByPk(
                    userId
                );


            if (!user) {

                res.status(404).json(
                    createResponse(
                        404,
                        "Not Found",
                        {
                            detail:
                                "Usuario no encontrado"
                        }
                    )
                );

                return;
            }


            // ==========================================
            // VALIDAR FOTO DE PERFIL
            // ==========================================

            if (!user.profilePhotoData) {

                res.status(400).json(
                    createResponse(
                        400,
                        "Profile photo required",
                        {
                            detail:
                                "El usuario no tiene una foto de perfil registrada"
                        }
                    )
                );

                return;
            }


            // ==========================================
            // OBTENER RESULTADO DE FACE LIVENESS
            // ==========================================

            const livenessResponse =
                await fetch(
                    getResultsUrl,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body:
                            JSON.stringify({
                                sessionId
                            })
                    }
                );


            const liveness =
                (await livenessResponse.json()) as LivenessResult;


            if (!livenessResponse.ok) {

                res.status(502).json(
                    createResponse(
                        502,
                        "Face Liveness Error",
                        {
                            detail:
                                "No fue posible obtener el resultado de Face Liveness"
                        }
                    )
                );

                return;
            }


            // ==========================================
            // VALIDAR ESTADO
            // ==========================================

            if (
                liveness.status !==
                "SUCCEEDED"
            ) {

                res.status(403).json(
                    createResponse(
                        403,
                        "Face Liveness Failed",
                        {
                            verified: false,
                            status:
                                liveness.status
                        }
                    )
                );

                return;
            }


            // ==========================================
            // VALIDAR CONFIANZA DE PRUEBA DE VIDA
            // ==========================================

            const confidence =
                Number(
                    liveness.confidence
                );


            const minimumConfidence =
                Number(
                    process.env
                        .LIVENESS_MIN_CONFIDENCE
                    ?? "90"
                );


            if (
                !Number.isFinite(confidence) ||
                confidence <
                minimumConfidence
            ) {

                res.status(403).json(
                    createResponse(
                        403,
                        "Low Liveness Confidence",
                        {
                            verified: false,
                            confidence,
                            minimumConfidence
                        }
                    )
                );

                return;
            }


            // ==========================================
            // VALIDAR SELFIE DE LIVENESS
            // ==========================================

            if (
                !liveness.referenceImageBase64 ||
                liveness.referenceImageBase64
                    .startsWith(
                        "No se encontró"
                    )
            ) {

                res.status(422).json(
                    createResponse(
                        422,
                        "Reference Image Missing",
                        {
                            detail:
                                "Face Liveness no devolvió una imagen de referencia"
                        }
                    )
                );

                return;
            }


            // ==========================================
            // FOTO GUARDADA DEL USUARIO
            // ==========================================

            const profilePhotoBase64 =
                user.profilePhotoData
                    .toString("base64");


            const threshold =
                Number(
                    process.env
                        .FACE_MATCH_THRESHOLD
                    ?? "90"
                );


            // ==========================================
            // COMPARAR LOS DOS ROSTROS
            // ==========================================

            const compareResponse =
                await fetch(
                    compareFacesUrl,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body:
                            JSON.stringify({
                                sourceImageBase64:
                                    profilePhotoBase64,

                                targetImageBase64:
                                    liveness
                                        .referenceImageBase64,

                                threshold
                            })
                    }
                );


            const comparison =
                (await compareResponse.json()) as CompareFacesResult;


            if (!compareResponse.ok) {

                res.status(502).json(
                    createResponse(
                        502,
                        "Compare Faces Error",
                        {
                            detail:
                                "No fue posible comparar los rostros"
                        }
                    )
                );

                return;
            }


            // ==========================================
            // ROSTRO NO COINCIDE
            // ==========================================

            if (!comparison.matched) {

                res.status(403).json(
                    createResponse(
                        403,
                        "Face does not match",
                        {
                            verified: false,

                            livenessConfidence:
                                confidence,

                            similarity:
                                comparison.similarity,

                            threshold:
                                comparison.threshold
                        }
                    )
                );

                return;
            }


            // ==========================================
            // VERIFICACIÓN EXITOSA
            // ==========================================

            res.status(200).json(
                createResponse(
                    200,
                    "Face verified",
                    {
                        verified: true,

                        livenessConfidence:
                            confidence,

                        similarity:
                            comparison.similarity,

                        threshold:
                            comparison.threshold
                    }
                )
            );

        } catch (error) {

            console.error(
                "Error FaceController:",
                error
            );


            res.status(500).json(
                createResponse(
                    500,
                    "Internal Server Error",
                    {
                        detail:
                            error instanceof Error
                                ? error.message
                                : "Error desconocido"
                    }
                )
            );
        }
    };
}