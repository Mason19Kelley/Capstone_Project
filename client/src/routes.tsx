import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/Login/LoginPage'
import CreateAcct from './pages/CreateAcct/CreateAcct'
import NotFound from './pages/NotFound/NotFound';



const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/createacct" element={<CreateAcct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;