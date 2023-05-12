import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Authentication from './components/dashboard/auth/Authentication';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import DeviceManager from './pages/DeviceManager';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='/dashboard' element={<Authentication> <Dashboard /> </Authentication>} />

      <Route path='/alerts' element={<Alerts />} />

      <Route path='/manageDevices' element={<DeviceManager />} />

      <Route path='404' element={<NotFound />} />

      <Route path='*' element={<Navigate to='404' replace />} />

    </Routes>
  );
}

export default App;
