import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { AuthAPI } from './api/AuthAPI';





// test comment
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
      <HomePage />
    </div>
  )
}

export default App
