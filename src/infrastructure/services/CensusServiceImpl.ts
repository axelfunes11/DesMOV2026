import {
    CensusData,
    CensusResponse,
    CensusService
} from "../../domain/services/CensusService";

import CensusModel from "../models/CensusModel";
import { capitalizeWords } from "../../utils/TextFormatter";


export class CensusServiceImpl
    implements CensusService {


    // =====================================================
    // MAPEAR CENSO
    // =====================================================

    private mapCensus(
        census: CensusModel
    ): CensusResponse {

        return {

            id:
                census.id,

            nombre:
                census.nombre,

            apellido:
                census.apellido,

            totalMiembros:
                census.totalMiembros,

            cantidadTelevisiones:
                census.cantidadTelevisiones,


            /*
             * Sequelize devuelve DECIMAL
             * como string.
             *
             * Lo convertimos a number
             * antes de enviarlo al cliente.
             */
            latitude:
                Number(
                    census.latitude
                ),

            longitude:
                Number(
                    census.longitude
                ),


            tipoCarga:
                census.tipoCarga,

            createdBy:
                census.createdBy,

            createdAt:
                census.createdAt,

            updatedAt:
                census.updatedAt
        };
    }


    // =====================================================
    // CREAR CENSO
    // =====================================================

    async createCensus(
        userId: number,
        data: CensusData
    ): Promise<CensusResponse> {


        const census =
            await CensusModel.create({

                nombre: capitalizeWords(data.nombre),
                apellido: capitalizeWords(data.apellido),

                totalMiembros:
                    data.totalMiembros,

                cantidadTelevisiones:
                    data.cantidadTelevisiones,


                /*
                 * En el modelo son DECIMAL,
                 * por eso los guardamos
                 * como string.
                 */
                latitude:
                    data.latitude.toString(),

                longitude:
                    data.longitude.toString(),


                /*
                 * Todo censo creado
                 * desde la aplicación
                 * es NORMAL.
                 */
                tipoCarga:
                    "NORMAL",


                /*
                 * Usuario CENSISTA
                 * que creó el censo.
                 */
                createdBy:
                    userId
            });


        return this.mapCensus(
            census
        );
    }


    // =====================================================
    // OBTENER TODOS LOS CENSOS
    // =====================================================

    async getAllCensuses(): Promise<CensusResponse[]> {


        const censuses =
            await CensusModel.findAll({

                order: [
                    [
                        "createdAt",
                        "DESC"
                    ]
                ]
            });


        return censuses.map(
            census =>
                this.mapCensus(
                    census
                )
        );
    }
}