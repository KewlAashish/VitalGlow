// src/routes/PrivateRoutes.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ClientProfilePage from "../pages/ClientProfilePage";


export default function PrivateRoutes() {
  const isAuthenticated = !!localStorage.getItem("user"); // moved inside

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/client/:clientId"
        element={
          isAuthenticated ? <ClientProfilePage /> : <Navigate to="/login" replace />
        }
      />

    </Routes>
  );
}