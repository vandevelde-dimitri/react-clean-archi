// src/shared/utils/logoutUser.ts

/**
 * Clears tokens and redirects the user to the home or login page.
 */
export function logoutUser(redirectTo: string = "/signin") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = redirectTo;
}
