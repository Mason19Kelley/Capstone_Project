import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './routes'
import { AuthProvider } from './context/AuthContext'


const App: React.FC = () => {

  // example login call
  // useEffect(() => {
  //   AuthAPI.login("usernam", "password")
  //     .then(response => {
  //         //checking if auth header works
  //         AuthAPI.checkUser().then(response => console.log(response)).catch(error => console.error(error));
  //     }).catch(error => {
  //         if(error.response.status === 401){
  //           console.log("incorrect password")
  //         } else if (error.response.status === 500){
  //           console.log("user not found")
  //         }
  //       });
  // }, []);

  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
    
  );


}

export default App
