import React, { useEffect, useState } from 'react'
import './App.css'
import CreateAcct from './pages/CreateAcct/CreateAcct'
import { BrowserRouter as Router} from 'react-router-dom'
import { AuthAPI } from './api/AuthAPI';
import AppRoutes from './routes'


const App: React.FC = () => {

  // example login call
  useEffect(() => {
    AuthAPI.login("username", "password")
      .then(response => {
          //checking if auth header works
          AuthAPI.checkUser().then(response => console.log(response)).catch(error => console.error(error));
      }).catch(error => {
          console.error(error);
        });
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );


}

export default App
