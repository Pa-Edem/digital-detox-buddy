// src/contexts/ThemeContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../constants/colors';

const THEME_STORAGE_KEY = '@digital_detox_theme';

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

const ThemeContext = createContext({
  theme: lightTheme,
  themeMode: THEME_MODES.LIGHT,
  isDark: false,
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeModeState] = useState(THEME_MODES.LIGHT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && Object.values(THEME_MODES).includes(savedTheme)) {
        setThemeModeState(savedTheme);
      }
    } catch (error) {
      console.error('Error loading saved theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTheme = async (mode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setThemeMode = (mode) => {
    if (!Object.values(THEME_MODES).includes(mode)) {
      console.warn(`Invalid theme mode: ${mode}`);
      return;
    }
    setThemeModeState(mode);
    saveTheme(mode);
  };

  const toggleTheme = () => {
    const newMode = themeMode === THEME_MODES.LIGHT ? THEME_MODES.DARK : THEME_MODES.LIGHT;
    setThemeMode(newMode);
  };

  const getThemePalette = () => {
    // TODO: В будущем здесь можно добавить логику для AUTO режима, который определяет тему на основе времени суток или системных настроек
    return themeMode === THEME_MODES.DARK ? darkTheme : lightTheme;
  };

  const theme = getThemePalette();
  const isDark = themeMode === THEME_MODES.DARK;

  if (isLoading) {
    return null; // Или можно показать splash screen
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        isDark,
        toggleTheme,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
