import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import AppLayout from "../components/layout/AppLayout";
import AuthLayout from "../components/layout/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ChoferesPage from "../pages/ChoferesPage";
import ChoferFichaPage from "../pages/ChoferFichaPage";
import FlotaPage from "../pages/FlotaPage";
import HistorialPage from "../pages/HistorialPage";
import HistorialReportePage from "../pages/HistorialReportePage";
import PlaceholderPage from "../pages/PlaceholderPage";
import NuevaInspeccionPage from "../pages/NuevaInspeccionPage";
import PassworsRecovery from "../pages/auth/recovery/PassworsRecovery";
import FleetManagement from "../pages/GestionFlota";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public/Auth routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        }
      />,
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <AuthLayout>
              <PassworsRecovery />

            </AuthLayout>
          </PublicRoute>
        }
      />
      ,
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthLayout>
              <Register />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* Protected/App routes */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.INSPECCION_NUEVA}
        element={
          <ProtectedRoute>
            <AppLayout>
              <NuevaInspeccionPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/choferes"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ChoferesPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/choferes/:idChofer/ficha"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ChoferFichaPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/flota"
        element={
          <ProtectedRoute>
            <AppLayout>
              <FlotaPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/historial"
        element={
          <ProtectedRoute>
            <AppLayout>
              <HistorialPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/historial/reporte/:idUnidad"
        element={
          <ProtectedRoute>
            <AppLayout>
              <HistorialReportePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/blackbox-engine"
        element={
          <ProtectedRoute>
            <AppLayout>
              <PlaceholderPage title="BlackBox Engine" />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;