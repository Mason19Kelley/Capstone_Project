import { createContext, useState, ReactNode, FunctionComponent } from 'react';
import { User } from '../models/user.model';
import { Organization } from '../models/organization.model';

interface AuthContextProps {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void; // Simplified the type for setLoggedIn
  user: User | null;
  setUser: (user: User | null) => void;
  organization: string | null;
  setOrganization: (organization: string | null) => void; // Changed the parameter type
  EditCourseContext : string | null;
  setEditCourseContext : (value : string | null) => void;
}

// Providing a default value for the context
const defaultAuthContextValue: AuthContextProps = {
  isLoggedIn: false,
  setLoggedIn: () => {}, // No-op function as a placeholder
  user: null,
  setUser: () => {},
  organization: '',
  setOrganization: () => {},
  EditCourseContext : '',
  setEditCourseContext : () => {}
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContextValue);

interface AuthProviderProps {
  children: ReactNode; // Correctly typing children prop
}
// stores auth context for user and logged in
const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<string | null>(null);
  const [EditCourseContext, setEditCourseContext] = useState<string | null>('Edit_Course');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser, organization, setOrganization, EditCourseContext, setEditCourseContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };