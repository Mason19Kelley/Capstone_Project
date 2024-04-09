import React from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './routes'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/contentContext'
import { PageProvider } from './context/PageContext'



const App: React.FC = () => {
  
  return (
    <AuthProvider>
    <PageProvider>
    <ContentProvider>
      <Router>
          <AppRoutes/>
      </Router>
    </ContentProvider>
    </PageProvider>
    </AuthProvider>
    
  );
}

export default App
