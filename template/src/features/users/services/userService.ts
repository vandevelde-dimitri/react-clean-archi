import { useApi } from "../../../shared/api/useApi";
import { mockUsers } from "../data/mockUsers";
import type { User } from "../types/user.types";

// Initialize the shared API instance (e.g., axios instance)
const api = useApi();

// Environment variable that toggles between real API and mock data
// Set VITE_USE_FAKE_API=true in .env to enable mock mode
const USE_FAKE_API = import.meta.env.VITE_USE_FAKE_API === "true";

export const getAllUsers = async (): Promise<User[]> => {
    if (USE_FAKE_API) {
        // Return static mock user list
        return mockUsers;
    } else {
        // Fetch user list from backend API
        const { data } = await api.get<User[]>("user");
        return data;
    }
};

export const getUser = async (id: string): Promise<User> => {
    if (USE_FAKE_API) {
        // Search for the user in mock data
        const user = mockUsers.find((u) => u.id === id);
        if (!user) {
            // Simulate an error if the user is not found
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    } else {
        // Fetch user list from backend API
        const { data } = await api.get<User>(`user/${id}`);
        return data;
    }
};
