import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import { AuthAPI } from './api/AuthAPI';
import AppRoutes from './routes'


const App: React.FC = () => {

  // example login call
  useEffect(() => {
    AuthAPI.login("SuperAdmin", "hello")
      .then(response => {
          //checking if auth header works
          AuthAPI.checkUser().then(response => console.log(response)).catch(error => console.error(error));
      }).catch(error => {
          if(error.response.status === 401){
            console.log("incorrect password")
          } else if (error.response.status === 500){
            console.log("user not found")
          }
        });
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );


}

export default App
