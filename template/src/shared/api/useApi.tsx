/**
 * useApi is a reusable Axios instance with:
 * - Base URL from environment variable
 * - Request interceptor to add the access token
 * - Response interceptor to handle:
 *    - 401 Unauthorized: tries to refresh tokens
 *    - 500 Server Error: logs out and redirects to home
 *
 * You can import this hook to perform authenticated API calls:
 * const api = useApi();
 * const { data } = await api.get("/users");
 */

import axios, { type AxiosInstance } from "axios";
import { refreshTokens } from "../../services/auth";
import { logoutUser } from "../utils/logoutUser";

export function useApi(): AxiosInstance {
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Request interceptor: inject access token if available
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor: handle 401/500 errors and attempt token refresh
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const refreshToken = localStorage.getItem("refresh_token");
                if (refreshToken) {
                    try {
                        const result = await refreshTokens();

                        const newAccessToken = result?.data.datas.accessToken;
                        const newRefreshToken = result?.data.datas.refreshToken;

                        localStorage.setItem("access_token", newAccessToken);
                        localStorage.setItem("refresh_token", newRefreshToken);

                        originalRequest.headers[
                            "Authorization"
                        ] = `Bearer ${newAccessToken}`;
                        return axios(originalRequest); // Retry original request
                    } catch {
                        logoutUser(); // Clean & redirect
                    }
                } else {
                    logoutUser(); // Clean & redirect
                }
            }

            if (error.response?.status === 500) {
                logoutUser(); // Clean & redirect
            }

            return Promise.reject(error);
        }
    );

    return api;
}
