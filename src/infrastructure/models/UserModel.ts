import {
    DataTypes,
    Model,
    Optional
} from "sequelize";

import sequelize from "../database/sequelize";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes
    extends Optional<UserAttributes, "id"> {}

class UserModel
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {

    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "users",
        modelName: "User",
        timestamps: true
    }
);

export default UserModel;