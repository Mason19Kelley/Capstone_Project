import { createContext, useState, ReactNode, FunctionComponent } from "react";

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

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    )
}

export { PageProvider, PageContext };
