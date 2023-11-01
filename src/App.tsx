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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <Authentication>
            {/* <DeviceDetailsWrapper> */}
              <Dashboard />
            {/* </DeviceDetailsWrapper> */}
          </Authentication>
        }
      />

      <Route
        path="/alerts"
        element={
          <Authentication>
            {/* <DeviceDetailsWrapper> */}
              <Alerts />
            {/* </DeviceDetailsWrapper> */}
          </Authentication>
        }
      />

      <Route
        path="/manageDevices"
        element={
          <Authentication>
            {/* <DeviceDetailsWrapper> */}
              <DeviceManager />
            {/* </DeviceDetailsWrapper> */}
          </Authentication>
        }
      />

      <Route
        path="/adminPortal"
        element={
          <Authentication>
            {/* <DeviceDetailsWrapper> */}
              <Admin />
            {/* </DeviceDetailsWrapper> */}
          </Authentication>
        }
      />

      <Route path="404" element={<NotFound />} />

      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  );
}

export default App;
