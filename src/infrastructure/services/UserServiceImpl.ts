import {
    UserProfile,
    UserService,
    UpdateProfileData
} from "../../domain/services/UserService";

import UserModel from "../models/UserModel";


export class UserServiceImpl
    implements UserService {


    private mapUser(
        user: UserModel
    ): UserProfile {

        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            age: user.age,
            gender: user.gender,
            city: user.city,
            phone: user.phone,

            profilePhoto: user.profilePhotoData
                ? user.profilePhotoData.toString("base64")
                : null
        };
    }


    async getProfile(
        userId: number
    ): Promise<UserProfile | null> {

        const user =
            await UserModel.findByPk(
                userId
            );

        if (!user) {
            return null;
        }

        return this.mapUser(user);
    }


    async updateProfile(
        userId: number,
        data: UpdateProfileData
    ): Promise<UserProfile | null> {

        const user =
            await UserModel.findByPk(
                userId
            );

        if (!user) {
            return null;
        }


        await user.update(data);


        return this.mapUser(user);
    }


    async updateProfilePhoto(
        userId: number,
        photoData: Buffer
    ): Promise<UserProfile | null> {

        const user =
            await UserModel.findByPk(
                userId
            );

        if (!user) {
            return null;
        }


        await user.update({
            profilePhotoData:
                photoData
        });


        return this.mapUser(user);
    }
}