import { createContext, useState, ReactNode, FunctionComponent } from 'react';

interface contentContextProps {
  contentID: string ;
  setContentID: (content: string) => void;
  courseName: string;
  setCourseName: (course: string) => void;
  jsonInformation: any;
  setJsonInformation: (json: any) => void;
}

// Providing a default value for the context
const defaultContentContext: contentContextProps = {
  contentID: '',
  setContentID: () => {}, 
  courseName: '',
  setCourseName: () => {},
  jsonInformation: {},
  setJsonInformation: () => {}
};

const contentContext = createContext<contentContextProps>(defaultContentContext);

interface ContentProviderProps {
  children: ReactNode; // Correctly typing children prop
}
// stores auth context for user and logged in
const ContentProvider: FunctionComponent<ContentProviderProps> = ({ children }) => {  
  const [contentID, setContentID] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [jsonInformation, setJsonInformation] = useState<any>({});

  return (
    <contentContext.Provider value={{ contentID, setContentID, courseName, setCourseName, jsonInformation, setJsonInformation }}>
      {children}
    </contentContext.Provider>
  );
};

export { ContentProvider, contentContext };