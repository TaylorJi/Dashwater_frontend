import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      {/* <Route path='404' element={<NotFound />} />

      <Route path='*' element={<Navigate to='404' replace />} /> */}

    </Routes>
  );
}

export default App;
