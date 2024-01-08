// src/AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './login';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="./App" element={<App />} />
        <Route path="./login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
