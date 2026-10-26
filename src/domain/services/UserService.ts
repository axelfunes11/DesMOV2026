export type UserRole =
    "CENSISTA" |
    "ADMIN";


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


    /*
     * La fotografía se devuelve
     * al Android como Base64.
     */
    profilePhoto: string | null;


    /*
     * Rol del usuario.
     *
     * CENSISTA:
     * puede registrar censos.
     *
     * ADMIN:
     * puede visualizar censos.
     */
    role: UserRole;
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


/*
 * No colocamos "role" dentro de
 * UpdateProfileData.
 *
 * El usuario NO debe poder cambiar
 * su propio rol desde "Mi perfil".
 */
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