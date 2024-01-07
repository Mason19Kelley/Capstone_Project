import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './routes'


// const AuthContext = React.createContext<{ isAuthenticated: boolean; login: () => void }>({
//   isAuthenticated: false,
//   login: () => {},
// });

// // test comment
// const App: React.FC = () => {

//   const [isAuthenticated, setIsAuthenticated] = useState(true);

//   const login = () => {
//     // In a real-world scenario, you would perform authentication here
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     // In a real-world scenario, you would perform logout here
//     setIsAuthenticated(false);
//   };
  

const App: React.FC = () => {
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
    <Router>
      <AppRoutes />
    </Router>
  );


}

export default App
