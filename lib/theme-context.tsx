'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkModeState] = useState(() => {
    // Initialize with saved theme to prevent flash
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('ethereal_dark_mode');
      return savedTheme === 'true';
    }
    return false;
  });

  // Apply theme on mount and when darkMode changes
  useEffect(() => {
    updateTheme(darkMode);
  }, [darkMode]);

  // Update theme in document
  const updateTheme = (isDark: boolean) => {
    if (typeof window !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Save to localStorage and update theme
  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
    localStorage.setItem('ethereal_dark_mode', String(value));
    updateTheme(value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
