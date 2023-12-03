import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import Authentication from "./components/dashboard/auth/Authentication";
import DeviceDetailsWrapper from "./components/wrappers/DeviceDetailsWrapper/DeviceDetailsWrapper";
import Alerts from "./pages/Alerts";
import Dashboard from "./pages/Dashboard";
import DeviceManager from "./pages/DeviceManager";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Admin from "./pages/AdminPortal";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <DeviceDetailsWrapper>
            <Dashboard />
          </DeviceDetailsWrapper>
        }
      />

      {/* <Route
        path="/alerts"
        element={
          <DeviceDetailsWrapper>
            <Alerts />
          </DeviceDetailsWrapper>
        }
      /> */}

      <Route
        path="/manageDevices"
        element={
          <DeviceDetailsWrapper>
            <DeviceManager />
          </DeviceDetailsWrapper>
        }
      />

      {/* <Route
        path="/adminPortal"
        element={
          <Authentication>
              <Admin />
          </Authentication>
        }
      /> */}
      <Route
        path="/adminPortal"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route path="404" element={<NotFound />} />

      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  );
}

export default App;
