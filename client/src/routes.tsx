import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/Login/LoginPage'
import CreateAcct from './pages/CreateAcct/CreateAcct'


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/createacct" element={<CreateAcct />} />
    </Routes>
  );
};

export default AppRoutes;