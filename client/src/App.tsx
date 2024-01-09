import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import { AuthAPI } from './api/AuthAPI';
import AppRoutes from './routes'
import LoginPage from './pages/Login/LoginPage'


const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (user: string, password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.login(user, password)
        .then(response => {
          setAuthenticated(true);
          console.log(authenticated)
          resolve(); // Resolve the promise on successful login
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            console.log("incorrect password");
          } else if (error.response && error.response.status === 500) {
            console.log("user not found");
          }
          console.error(error);
          reject(error); // Reject the promise on login failure
        });
    });
  };
  
  

  return (
    <Router>
        <AppRoutes onLogin={handleLogin} authenticated={authenticated}/>
        <LoginPage onLogin = {handleLogin} authentication={authenticated} />
    </Router>
  );
}

export default App
