import { ReactNode, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
  }

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useContext(AuthContext)
    if ([1,2].includes(user?.role?.id ?? -1)) {
      return <Navigate to="/home" replace />;
    }
  
    return children;
  };