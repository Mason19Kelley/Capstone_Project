import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CreateAcct from './pages/CreateAcct/CreateAcct'
import LoginPage from './pages/Login/LoginPage'




// default App function that loads the full application
function App() {

  // example login api call, response returns JWT
  useEffect(() => {
    axios.post('http://localhost:3000/auth/login', {
      username: "SuperAdmin",
      password: "password"
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
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
