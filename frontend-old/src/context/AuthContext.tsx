import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
    type User,
} from "../services/auth";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (identifier: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (data: {
        username: string;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        display_name: string;
    }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = user !== null;

    // Check authentication when the application starts
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getCurrentUser();

                setUser(
                    response.is_authenticated ? response.user : null
                );
            } catch (error) {
                console.error("Authentication check failed:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Login
    const login = async (identifier: string, password: string) => {
        const response = await loginUser({ identifier, password });
        setUser(response.user);
    };

    // Logout
    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    // Register
    const register = async (data: {
        username: string;
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        display_name: string;
    }) => {
        const response = await registerUser(data);
        setUser(response.user);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to access authentication
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
