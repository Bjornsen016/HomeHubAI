
import React, { createContext, useContext, useState } from 'react';
import { useUserAuthContext } from './UserAuthProvider';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: any;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  setDarkMode: () => {}
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { userInfo } = useUserAuthContext();

  const toggleDarkMode = async () => {
    setDarkMode(!darkMode);
    if(userInfo){
      await fetch(`http://localhost:5001/api/user/updateSettings/${userInfo.email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ darkMode: !darkMode })
    });}
      
  };
  

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
