import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/sequelize";

interface LocationAttributes {
    id: number;
    userId: number;
    nombre: string;
    descripcion: string;
    latitud: number;
    longitud: number;
    createdAt?: Date;
    updatedAt?: Date;
}

type LocationCreation = Optional<LocationAttributes, "id" | "createdAt" | "updatedAt">;

class LocationModel extends Model<LocationAttributes, LocationCreation> implements LocationAttributes {
    declare id: number;
    declare userId: number;
    declare nombre: string;
    declare descripcion: string;
    declare latitud: number;
    declare longitud: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

LocationModel.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    latitud: { type: DataTypes.DOUBLE, allowNull: false },
    longitud: { type: DataTypes.DOUBLE, allowNull: false }
}, {
    sequelize,
    tableName: "ubicaciones",
    modelName: "Ubicacion",
    timestamps: true
});

export default LocationModel;
