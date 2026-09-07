export interface LoginResult {
    user: {
        id: number;
        name: string;
        email: string;
    };
    token: string;
}

export interface AuthService {
    login(
        email: string,
        password: string
    ): Promise<LoginResult | null>;
}