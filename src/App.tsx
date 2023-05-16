import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { redirect } from "react-router-dom";
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

      <Route path='/dashboard' element={<Dashboard />} /> 

      <Route path='/alerts' element={<Alerts />} /> 

      <Route path='/manageDevices' element={<DeviceManager />} /> 

      <Route path='/adminPortal' element={<Admin/>} /> 

      <Route path='404' element={<NotFound />} />

      <Route path='*' element={<Navigate to='404' replace />} />

    </Routes>
  );
}

export default App;
