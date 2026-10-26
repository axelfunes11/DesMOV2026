import {
    DataTypes,
    Model,
    Optional
} from "sequelize";

import sequelize from "../database/sequelize";


export type TipoCarga =
    "NORMAL" |
    "MASSIVE";


interface CensusAttributes {

    id: number;

    nombre: string;

    apellido: string;

    totalMiembros: number;

    cantidadTelevisiones: number;

    /*
     * PostgreSQL DECIMAL normalmente
     * es manejado por Sequelize como string.
     */
    latitude: string;

    longitude: string;

    tipoCarga: TipoCarga;

    /*
     * ID del usuario CENSISTA
     * que creó el registro.
     *
     * Puede ser null para carga masiva.
     */
    createdBy?: number | null;

    createdAt?: Date;

    updatedAt?: Date;
}


interface CensusCreationAttributes
    extends Optional<
        CensusAttributes,
        | "id"
        | "tipoCarga"
        | "createdBy"
        | "createdAt"
        | "updatedAt"
    > { }


class CensusModel
    extends Model<
        CensusAttributes,
        CensusCreationAttributes
    >
    implements CensusAttributes {

    public id!: number;

    public nombre!: string;

    public apellido!: string;

    public totalMiembros!: number;

    public cantidadTelevisiones!: number;

    public latitude!: string;

    public longitude!: string;

    public tipoCarga!: TipoCarga;

    public createdBy!: number | null;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}


CensusModel.init(
    {

        id: {

            type:
                DataTypes.INTEGER,

            autoIncrement:
                true,

            primaryKey:
                true
        },


        nombre: {

            type:
                DataTypes.STRING(100),

            allowNull:
                false
        },


        apellido: {

            type:
                DataTypes.STRING(100),

            allowNull:
                false
        },


        totalMiembros: {

            type:
                DataTypes.INTEGER,

            allowNull:
                false,

            validate: {
                min: 1
            }
        },


        cantidadTelevisiones: {

            type:
                DataTypes.INTEGER,

            allowNull:
                false,

            validate: {
                min: 0
            }
        },


        latitude: {

            type:
                DataTypes.DECIMAL(
                    10,
                    7
                ),

            allowNull:
                false
        },


        longitude: {

            type:
                DataTypes.DECIMAL(
                    10,
                    7
                ),

            allowNull:
                false
        },


        tipoCarga: {

            type:
                DataTypes.ENUM(
                    "NORMAL",
                    "MASSIVE"
                ),

            allowNull:
                false,

            defaultValue:
                "NORMAL"
        },


        createdBy: {

            type:
                DataTypes.INTEGER,

            allowNull:
                true,

            references: {

                model:
                    "users",

                key:
                    "id"
            }
        }

    },
    {

        sequelize,

        tableName:
            "censos",

        modelName:
            "Census",

        timestamps:
            true
    }
);


export default CensusModel;