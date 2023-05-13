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

      <Route path='/dashboard' element={global.userEmail ? <Admin /> : <Dashboard />} /> {/**element={<Dashboard />} */}

      <Route path='/alerts' element={global.userEmail ? <Admin /> : <Alerts />} /> {/**element={<Alerts />}  */}

      <Route path='/manageDevices' element={global.userEmail ? <Admin /> : <DeviceManager />} /> {/** element={<DeviceManager />}  */}

      <Route path='/adminPortal' element={global.userEmail ? <Admin /> : <Login />}/> {/** element={<Admin/>}  */}

      <Route path='404' element={<NotFound />} />

      <Route path='*' element={<Navigate to='404' replace />} />

    </Routes>
  );
}

export default App;
