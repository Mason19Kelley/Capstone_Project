import { createContext, useState, ReactNode, FunctionComponent } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void; // Simplified the type for setLoggedIn
}

// Providing a default value for the context
const defaultAuthContextValue: AuthContextProps = {
  isLoggedIn: false,
  setLoggedIn: () => {}, // No-op function as a placeholder
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContextValue);

interface AuthProviderProps {
  children: ReactNode; // Correctly typing children prop
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };