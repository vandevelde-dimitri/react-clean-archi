import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserListPage from "../../features/users/pages/UserListPage";
import { UserPage } from "../../features/users/pages/UserPage";
import PrivateRoute from "./guards/PrivateRoute";
import PublicRoute from "./guards/PublicRoute";

export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<PublicRoute />}>
                <Route
                    path="/forgot-password"
                    element={<h1>forgot password</h1>}
                />
                <Route path="/new-password" element={<h1>new password</h1>} />
                <Route path="/signin" element={<h1>sign in page</h1>} />
                <Route path="/signup" element={<h1>sign up page</h1>} />
                {
                    // ... other public routes
                }
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<UserListPage />} />
                <Route path="/user/:id" element={<UserPage />} />
                {
                    // ... other private routes
                }
            </Route>
        </Routes>
    </BrowserRouter>
);
