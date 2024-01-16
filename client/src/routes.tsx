import React from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/Login/LoginPage'
import CreateAcct from './pages/CreateAcct/CreateAcct'
import NotFound from './pages/NotFound/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
//import PrivateRoute from './PrivateRoute'



const AppRoutes: React.FC = () => {
  return (
    <Routes>


      <Route index element={<LoginPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/createacct" element={<CreateAcct />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }/>
    </Routes>
  );
};

export default AppRoutes;