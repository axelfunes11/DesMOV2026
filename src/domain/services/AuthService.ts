export type UserRole =
    "CENSISTA" |
    "ADMIN";


export interface PublicUser {

    id: number;

    name: string;

    lastName: string | null;

    username: string | null;

    email: string;

    age: number | null;

    gender: string | null;

    city: string | null;

    phone: string | null;

    profilePhoto: string | null;

    role: UserRole;
}


export interface LoginResult {

    user: PublicUser;

    token: string;
}


export interface RegisterData {

    name: string;

    lastName: string;

    username: string;

    email: string;

    password: string;

    age: number;

    gender: string;

    city: string;

    phone: string;

    profilePhoto?: string | null;
}


export type RegisterResult =

    | {
        success: true;

        user: PublicUser;
    }

    | {
        success: false;

        reason:
            | "EMAIL_EXISTS"
            | "USERNAME_EXISTS";
    };


export interface AuthService {

    login(
        email: string,
        password: string
    ): Promise<LoginResult | null>;


    register(
        data: RegisterData
    ): Promise<RegisterResult>;
}