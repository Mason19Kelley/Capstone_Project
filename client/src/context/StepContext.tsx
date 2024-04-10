import { FunctionComponent, ReactNode, createContext, useState } from 'react';

interface StepContextType {
  currentStep: number;
  setCurrentStep: (content: number) => void;
}

const defaultStepContextValue: StepContextType = {
  currentStep: 0,
  setCurrentStep: () => {},
};

const StepContext = createContext<StepContextType>(defaultStepContextValue);

interface StepProviderProps {
    children: ReactNode;
}

const StepProvider: FunctionComponent<StepProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
};

export { StepProvider, StepContext };