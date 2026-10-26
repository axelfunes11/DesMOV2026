import {
    DataTypes,
    Model,
    Optional
} from "sequelize";

import sequelize from "../database/sequelize";


export type UserRole =
    "CENSISTA" |
    "ADMIN";


interface UserAttributes {

    id: number;

    name: string;

    lastName?: string | null;

    username?: string | null;

    email: string;

    password: string;

    age?: number | null;

    gender?: string | null;

    city?: string | null;

    phone?: string | null;

    profilePhoto?: string | null;

    profilePhotoData?: Buffer | null;

    role: UserRole;

    createdAt?: Date;

    updatedAt?: Date;
}


interface UserCreationAttributes
    extends Optional<
        UserAttributes,
        | "id"
        | "lastName"
        | "username"
        | "age"
        | "gender"
        | "city"
        | "phone"
        | "profilePhoto"
        | "profilePhotoData"
        | "role"
    > { }


class UserModel
    extends Model<
        UserAttributes,
        UserCreationAttributes
    >
    implements UserAttributes {

    public id!: number;

    public name!: string;

    public lastName!: string | null;

    public username!: string | null;

    public email!: string;

    public password!: string;

    public age!: number | null;

    public gender!: string | null;

    public city!: string | null;

    public phone!: string | null;

    public profilePhoto!: string | null;

    public profilePhotoData!: Buffer | null;

    public role!: UserRole;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
}


UserModel.init(
    {

        id: {

            type:
                DataTypes.INTEGER,

            autoIncrement:
                true,

            primaryKey:
                true
        },


        name: {

            type:
                DataTypes.STRING(100),

            allowNull:
                false
        },


        lastName: {

            type:
                DataTypes.STRING(100),

            allowNull:
                true
        },


        username: {

            type:
                DataTypes.STRING(50),

            allowNull:
                true,

            unique:
                true
        },


        email: {

            type:
                DataTypes.STRING(150),

            allowNull:
                false,

            unique:
                true
        },


        password: {

            type:
                DataTypes.STRING(255),

            allowNull:
                false
        },


        age: {

            type:
                DataTypes.INTEGER,

            allowNull:
                true
        },


        gender: {

            type:
                DataTypes.STRING(30),

            allowNull:
                true
        },


        city: {

            type:
                DataTypes.STRING(100),

            allowNull:
                true
        },


        phone: {

            type:
                DataTypes.STRING(30),

            allowNull:
                true
        },


        profilePhoto: {

            type:
                DataTypes.STRING(500),

            allowNull:
                true
        },


        profilePhotoData: {

            type:
                DataTypes.BLOB("long"),

            allowNull:
                true
        },


        role: {

            type:
                DataTypes.ENUM(
                    "CENSISTA",
                    "ADMIN"
                ),

            allowNull:
                false,

            defaultValue:
                "CENSISTA"
        }

    },
    {

        sequelize,

        tableName:
            "users",

        modelName:
            "User",

        timestamps:
            true
    }
);


export default UserModel;