import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Documents from "../pages/Documents.jsx";
import Upload from "../pages/Upload.jsx";
import AskQuestions from "../pages/AskQuestions.jsx";
import HistoryDetails from "../pages/HistoryDetails.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
import ProtectedLayout from "../layouts/ProtectedLayout.jsx";

const AppRoutes = () => {
    return (
        <Routes>

            <Route
                path="/"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <ProtectedLayout>
                            <Dashboard />
                        </ProtectedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/documents"
                element={
                    <ProtectedRoute>
                        <ProtectedLayout>
                            <Documents />
                        </ProtectedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/upload"
                element={
                    <ProtectedRoute>
                        <ProtectedLayout>
                            <Upload />
                        </ProtectedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/ask"
                element={
                    <ProtectedRoute>
                        <ProtectedLayout>
                            <AskQuestions />
                        </ProtectedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/history/:historyId"
                element={
                    <ProtectedRoute>
                        <ProtectedLayout>
                            <HistoryDetails />
                        </ProtectedLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
};

export default AppRoutes;