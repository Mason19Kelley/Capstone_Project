import { createContext, useContext, useState, ReactNode, FunctionComponent } from "react";
import Dashboard from "../components/Dashboard/Dashboard";

interface PageContextProps {
    page: string
    setPage: (content: string) => void;
}
  
// Providing a default value for the context
const defaultPageContextValue: PageContextProps = {
    page: '',
    setPage: () => {}
};

const PageContext = createContext<PageContextProps>(defaultPageContextValue);

interface PageProviderProps {
    children: ReactNode;
}

const PageProvider: FunctionComponent<PageProviderProps> = ({ children }) => {
    const [page, setPage] = useState('Dashboard');

    const setPageState = (newPage: string) => {
        setPage(newPage);
    }
    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    )
}

export { PageProvider, PageContext };
