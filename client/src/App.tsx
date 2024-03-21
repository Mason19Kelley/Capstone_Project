import React from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './routes'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/contentContext'



const App: React.FC = () => {
  
  return (
    <AuthProvider>
    <ContentProvider>
      <Router>
          <AppRoutes/>
      </Router>
    </ContentProvider>
    </AuthProvider>
    
  );
}

export default App
