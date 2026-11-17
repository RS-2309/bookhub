import api from "./api";

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    display_name: string;
    bio: string;
    profile_picture: string | null;
    date_of_birth: string | null;
}

interface AuthResponse {
    message: string;
    user: User;
}

interface CurrentUserResponse {
    is_authenticated: boolean;
    user: User | null;
}

interface Credentials {
    identifier: string;
    password: string;
}

interface RegistrationData {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    display_name: string;
}

// Fetch CSRF cookie
export const getCSRFToken = async (): Promise<void> => {
    await api.get("auth/csrf/");
};

// Get current authenticated user
export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
    const response = await api.get<CurrentUserResponse>("auth/me/");
    return response.data;
};

// Login
export const loginUser = async (
    credentials: Credentials
): Promise<AuthResponse> => {
    await getCSRFToken();

    const response = await api.post<AuthResponse>(
        "auth/login/",
        credentials
    );

    return response.data;
};

// Logout
export const logoutUser = async (): Promise<void> => {
    await getCSRFToken();

    await api.post("auth/logout/");
};

// Register
export const registerUser = async (
    data: RegistrationData
): Promise<AuthResponse> => {
    await getCSRFToken();

    const response = await api.post<AuthResponse>(
        "auth/register/",
        data
    );

    return response.data;
};
