import { useEffect, useState } from 'react'
import './App.css'
import CreateAcct from './pages/CreateAcct/CreateAcct'
import HomePage from './pages/HomePage/HomePage'
import { AuthAPI } from './api/AuthAPI';
import LoginPage from './pages/Login/LoginPage'





// default App function that loads the full application
function App() {

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
    <div>
      <CreateAcct />
    </div>
  )
}

export default App
