import {
    UserProfile,
    UserService,
    UpdateProfileData
} from "../../domain/services/Userservice";

import UserModel from "../models/UserModel";

export class UserServiceImpl
    implements UserService {
    async updateProfile(
        userId: number,
        data: UpdateProfileData
    ): Promise<UserProfile | null> {

        const user = await UserModel.findByPk(userId);

        if (!user) {
            return null;
        }

        await user.update(data);

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
            profilePhoto: user.profilePhoto
        };
    }
    async getProfile(
        userId: number
    ): Promise<UserProfile | null> {

        const user =
            await UserModel.findByPk(userId);

        if (!user) {
            return null;
        }

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
            profilePhoto: user.profilePhoto
        };
    }
}