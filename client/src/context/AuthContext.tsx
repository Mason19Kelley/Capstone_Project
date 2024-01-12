import { createContext, useState, ReactNode, FunctionComponent } from 'react';
import { User } from '../models/user.model';

interface AuthContextProps {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void; // Simplified the type for setLoggedIn
  user: User | null;
  setUser: (user: User) => void;
}

// Providing a default value for the context
const defaultAuthContextValue: AuthContextProps = {
  isLoggedIn: false,
  setLoggedIn: () => {}, // No-op function as a placeholder
  user: null,
  setUser: () => {}
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContextValue);

interface AuthProviderProps {
  children: ReactNode; // Correctly typing children prop
}
// stores auth context for user and logged in
const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };