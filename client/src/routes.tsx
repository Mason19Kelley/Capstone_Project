import React from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/Login/LoginPage'
import CreateOrg from './pages/CreateOrg/CreateOrg'
import NotFound from './pages/NotFound/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import ForgetPass from './pages/ForgetPass/ForgetPass';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import EditCourse from './components/Course_Management/Editcourse';
//import PrivateRoute from './PrivateRoute'



const AppRoutes: React.FC = () => {
  return (
    <Routes>


      <Route index element={<LoginPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/forget" element={<ForgetPass/>} />
      <Route path="/createorg" element={<CreateOrg />} />
      <Route path="/passwordReset" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }/>
      <Route path="/editCourse/:id" element={
        <ProtectedRoute>
          <EditCourse />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;