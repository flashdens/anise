import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
    darkMode: false,
    setDarkMode: mode => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

interface DarkModeProviderProps {
    children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('darkMode');
            return stored === 'true';
        }
        return false;
    });

    useEffect(() => {
        // Update dark mode in the document
        if (darkMode)
            document.documentElement.classList.add("dark");
        else
            document.documentElement.classList.remove("dark");

        // Save state to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('darkMode', darkMode.toString());
        }
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
