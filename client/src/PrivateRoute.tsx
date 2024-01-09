import { Outlet, Navigate } from 'react-router-dom'

interface PrivateRouteProps {
    path: string
    authenticated: boolean;
  }

const PrivateRoute: React.FC<PrivateRouteProps> = ({ authenticated }) => {
    console.log(authenticated)
    return (
        authenticated ? <Outlet></Outlet> : <Navigate to="/home"/>
    )
}

export default PrivateRoute;