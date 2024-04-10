import React from 'react'
import './App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from './routes'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/contentContext'
import { PageProvider } from './context/PageContext'
import { StepProvider } from './context/StepContext'



const App: React.FC = () => {
  
  return (
    <AuthProvider>
    <PageProvider>
      <StepProvider>
    <ContentProvider>
      <Router>
          <AppRoutes/>
      </Router>
    </ContentProvider>
    </StepProvider>
    </PageProvider>
    </AuthProvider>
    
  );
}

export default App
