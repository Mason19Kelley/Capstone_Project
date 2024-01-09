import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './routes'
import { AuthProvider } from './context/AuthContext'



const App: React.FC = () => {


  return (
    <AuthProvider>
      <Router>
          <AppRoutes/>
      </Router>
    </AuthProvider>
    
  );
}

export default App
