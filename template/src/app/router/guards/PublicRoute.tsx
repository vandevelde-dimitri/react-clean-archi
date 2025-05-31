import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../../hooks/authContext";

export default function PublicRoute() {
    const { isAuthenticated } = useContext(AuthContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
