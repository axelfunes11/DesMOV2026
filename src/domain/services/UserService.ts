export interface UserProfile {

    id: number;

    name: string;

    lastName: string | null;

    username: string | null;

    email: string;

    age: number | null;

    gender: string | null;

    city: string | null;

    phone: string | null;

    // La foto se devuelve al Android como Base64
    profilePhoto: string | null;
}


export interface UpdateProfileData {

    name?: string;

    lastName?: string;

    username?: string;

    email?: string;

    age?: number;

    gender?: string;

    city?: string;

    phone?: string;
}


export interface UserService {

    getProfile(
        userId: number
    ): Promise<UserProfile | null>;


    updateProfile(
        userId: number,
        data: UpdateProfileData
    ): Promise<UserProfile | null>;


    updateProfilePhoto(
        userId: number,
        photoData: Buffer
    ): Promise<UserProfile | null>;
}