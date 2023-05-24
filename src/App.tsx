import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import DeviceManager from './pages/DeviceManager';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Admin from './pages/AdminPortal';


function App() {
  useEffect(() => {
  }, []);

  let authenticatd = localStorage.getItem('authenticated');

  const routes = useRoutes([
    { path: '/', element: <Login /> },
    {
      path: '/dashboard',
      element: authenticatd === 'true' ? <Dashboard /> : <Navigate to="/" replace />,
    },
    {
      path: '/alerts',
      element: authenticatd === 'true' ? <Alerts /> : <Navigate to="/" replace />,
    },
    {
      path: '/manageDevices',
      element: authenticatd === 'true' ? <DeviceManager /> : <Navigate to="/" replace />,
    },
    {
      path: '/adminPortal',
      element: authenticatd === 'true' ? <Admin /> : <Navigate to="/" replace />,
    },
    { path: '404', element: <NotFound /> },
    { path: '*', element: <Navigate to="404" replace /> },
  ]);

  return <>{routes}</>;
}

export default App;