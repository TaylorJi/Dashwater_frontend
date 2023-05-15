import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { redirect } from "react-router-dom";
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import DeviceManager from './pages/DeviceManager';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Admin from './pages/AdminPortal';



function App() {
  useEffect(() => {
    console.log('global.userAuthenticated: ' + global.userAuthenticated);
}, []);

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='/dashboard' element={global.userAuthenticated ? <Dashboard /> : <Login />} /> {/**element={<Dashboard />}  element={global.userAuthenticated ? <Dashboard /> : <Login />}*/}

      <Route path='/alerts' element={global.userAuthenticated ? <Alerts /> : <Login />} /> {/** element={<Alerts />}  element={global.userAuthenticated ? <Alerts /> : <Login />} */}

      <Route path='/manageDevices' element={global.userAuthenticated ? <DeviceManager /> : <Login />} /> {/** element={<DeviceManager />} element={global.userAuthenticated ? <DeviceManager /> : <Login />} */}

      <Route path='/adminPortal' element={global.userAuthenticated ? <Admin /> : <Login />} /> {/** element={<Admin/>} element={global.userAuthenticated ? <Admin /> : <Login />} */}

      <Route path='404' element={<NotFound />} />

      <Route path='*' element={<Navigate to='404' replace />} />

    </Routes>
    </>
  );
}

export default App;
