import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const AVAILABLE_THEMES = ['default', 'theme-dark', 'theme-ocean', 'theme-rose', 'theme-forest'];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'default');

  useEffect(() => {
    const root = document.documentElement;
    AVAILABLE_THEMES.forEach((t) => root.classList.remove(t));
    if (theme !== 'default') root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, AVAILABLE_THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
