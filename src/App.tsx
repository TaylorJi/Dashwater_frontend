import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import DeviceManager from './pages/DeviceManager';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Admin from './pages/AdminPortal';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='/dashboard' element={global.userAuthenticated ? <Dashboard /> : <Login />} /> {/**element={<Dashboard />}  element={global.userAuthenticated ? <Dashboard /> : <Login />}*/}

      <Route path='/alerts' element={<Alerts />} /> {/**   element={global.userAuthenticated ? <Alerts /> : <Login />} */}

      <Route path='/manageDevices' element={<DeviceManager />} /> {/**  element={global.userAuthenticated ? <DeviceManager /> : <Login />} */}

      <Route path='/adminPortal' element={<Admin/>} /> {/**  element={global.userAuthenticated ? <Admin /> : <Login />} */}

      <Route path='404' element={<NotFound />} />

      <Route path='*' element={<Navigate to='404' replace />} />

    </Routes>
  );
}

export default App;
