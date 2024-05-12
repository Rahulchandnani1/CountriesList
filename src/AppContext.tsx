import React, { createContext, useContext, useState } from 'react';

// Define the shape of your context
interface AppContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context
const AppContext = createContext<AppContextProps>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Define the props for the AppProvider component
interface AppProviderProps {
  children: React.ReactNode;
}

// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => useContext(AppContext);
