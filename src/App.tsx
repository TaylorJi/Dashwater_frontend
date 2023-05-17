import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import DeviceManager from './pages/DeviceManager';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Admin from './pages/AdminPortal';
import PrivateRoute from './components/adminPortal/PrivateRoute';

// function App() {
//   useEffect(() => {
//     console.log('global.userAuthenticated: ' + global.userAuthenticated);
//   }, []);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <PrivateRoute
//           path="/dashboard"
//           element={<Dashboard />}
//           isAuthenticated={global.userAuthenticated}
//         />
//         <PrivateRoute
//           path="/alerts"
//           element={<Alerts />}
//           isAuthenticated={global.userAuthenticated}
//         />
//         <PrivateRoute
//           path="/manageDevices"
//           element={<DeviceManager />}
//           isAuthenticated={global.userAuthenticated}
//         />
//         <PrivateRoute
//           path="/adminPortal"
//           element={<Admin />}
//           isAuthenticated={global.userAuthenticated}
//         />
//         <Route path="404" element={<NotFound />} />
//         <Route path="*" element={<Navigate to="404" replace />} />
//       </Routes>
//     </>
//   );
// }

function App() {
  useEffect(() => {
    console.log('global.userAuthenticated: ' + global.userAuthenticated);
  }, []);

  const routes = useRoutes([
    { path: '/', element: <Login /> },
    {
      path: '/dashboard',
      element: global.userAuthenticated ? <Dashboard /> : <Navigate to="/" replace />,
    },
    {
      path: '/alerts',
      element: global.userAuthenticated ? <Alerts /> : <Navigate to="/" replace />,
    },
    {
      path: '/manageDevices',
      element: global.userAuthenticated ? <DeviceManager /> : <Navigate to="/" replace />,
    },
    {
      path: '/adminPortal',
      element: global.userAuthenticated ? <Admin /> : <Navigate to="/" replace />,
    },
    { path: '404', element: <NotFound /> },
    { path: '*', element: <Navigate to="404" replace /> },
  ]);

  return <>{routes}</>;
}

export default App;