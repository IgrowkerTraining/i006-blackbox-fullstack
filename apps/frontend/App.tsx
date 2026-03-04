import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { AuthProvider } from "./src/context/AuthContext";
import { LoadingSpinner } from "./src/components/common/LoadingSpinner";
import { AppRoutes } from "./src/routes/AppRoutes";
import { useAuth } from "./src/hooks/useAuth";

const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Initializing Example App..." />;
  }

  return (

      <AppRoutes />

  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
