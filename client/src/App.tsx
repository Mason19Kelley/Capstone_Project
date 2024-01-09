import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import { AuthAPI } from './api/AuthAPI';
import AppRoutes from './routes'
import LoginPage from './pages/Login/LoginPage'


const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin =  (user: string, password: string) => {
  // example login call
 
    AuthAPI.login(user, password)
      .then(response => {
                    //checking if auth header works
          AuthAPI.checkUser().then(response => {console.log(response); setAuthenticated(true)}).catch(error => console.error(error));
      }).catch(error => {
          if(error.response.status === 401){
            console.log("incorrect password")
          } else if (error.response.status === 500){
            console.log("user not found")
          }
        });

    // Do something with the user and password, for example, send to an authentication API
    console.log('User:', user);
    console.log('Password:', password);
    
  };
  

  return (
    <Router>
        <AppRoutes onLogin={handleLogin} authenticated={authenticated}/>
        <LoginPage onLogin = {handleLogin} authentication={authenticated} />
    </Router>
  );
}

export default App
