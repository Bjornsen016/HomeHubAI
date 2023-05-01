import { createContext, useContext, useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import Task from './components/Task/Task';
import Weather from './components/Weather/Weather';
import BusTimetable from './components/BusTable/BusTimetable';

type ModuleComponent = React.FC | null;

type ModuleContextType = {
  bigComponent: ModuleComponent;
  smallComponent1: ModuleComponent;
  smallComponent2: ModuleComponent;
  setBigComponent: React.Dispatch<React.SetStateAction<ModuleComponent>>;
  setSmallComponent1: React.Dispatch<React.SetStateAction<ModuleComponent>>;
  setSmallComponent2: React.Dispatch<React.SetStateAction<ModuleComponent>>;
};

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

interface ModuleProviderProps {
  children: React.ReactNode;
}

export const ModuleProvider: React.FC<ModuleProviderProps> = ({ children }) => {
  const [bigComponent, setBigComponent] = useState<ModuleComponent>(
    () => Calendar
  );
  const [smallComponent1, setSmallComponent1] = useState<ModuleComponent>(
    () => Task
  );
  const [smallComponent2, setSmallComponent2] = useState<ModuleComponent>(
    () => Weather
  );

  const value: ModuleContextType = {
    bigComponent,
    smallComponent1,
    smallComponent2,
    setBigComponent,
    setSmallComponent1,
    setSmallComponent2,
  };

  return (
    <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>
  );
};

export const useModule = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModule must be used within a ModuleProvider');
  }
  return context;
};
