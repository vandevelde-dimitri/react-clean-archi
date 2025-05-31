import { createContext, useEffect, useState, type ReactNode } from "react";

// Define the structure of the authentication context
interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderType {
    children: ReactNode;
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {}, // default empty implementation
    logout: () => {}, // default empty implementation
});

/*
 * AuthProvider component
 * - Provides authentication state and functions (login, logout) to the app
 * - Checks localStorage for an existing token on mount
 */
export function AuthProvider({ children }: AuthProviderType) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check for an access token on initial load
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token); // Convert token existence to boolean
        console.log("AuthProvider initialized, isAuthenticated:", !!token);
    }, []);

    /**
     * Log in the user
     * - Store the access token in localStorage
     * - Set isAuthenticated to true
     */
    const login = (token: string) => {
        localStorage.setItem("access_token", token);
        setIsAuthenticated(true);
    };

    /**
     * Log out the user
     * - Remove the token from localStorage
     * - Set isAuthenticated to false
     */
    const logout = () => {
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
