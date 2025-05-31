import axios from "axios";

/**
 * Attempts to refresh access and refresh tokens using the current refresh token.
 * Returns the response from the API if successful.
 * Throws an error if the refresh fails.
 */
export async function refreshTokens() {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
        throw new Error("No refresh token available.");
    }

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}auth/refresh-token`,
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );
        return response;
    } catch (error) {
        throw new Error("Failed to refresh token: " + error);
    }
}
