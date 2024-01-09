import { ReactNode, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
  }

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn, setLoggedIn } = useContext(AuthContext)
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };