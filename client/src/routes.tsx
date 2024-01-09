import React from 'react';
import { Routes, Route, Outlet, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/Login/LoginPage'
import CreateAcct from './pages/CreateAcct/CreateAcct'
import NotFound from './pages/NotFound/NotFound';
//import PrivateRoute from './PrivateRoute'


interface AppRoutesProps {
  onLogin: (username: string, password: string) => void;
  authenticated: boolean
}

const AppRoutes: React.FC<AppRoutesProps> = ({ onLogin, authenticated }) => {
  console.log("authenticated")
  return (
    <Routes>


      <Route index element={<LoginPage onLogin={onLogin} authentication={authenticated}/>} />
      <Route path="/login" element={<LoginPage onLogin={onLogin} authentication={authenticated}/>} />
      
      <Route path="/createacct" element={<CreateAcct />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/home" element={<HomePage />}/>
    </Routes>
  );
};

export default AppRoutes;