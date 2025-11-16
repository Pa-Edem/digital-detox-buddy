// DigitalDetoxBuddy/App.js

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SessionProvider } from './src/contexts/SessionContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

// Импортируем хуки для шрифтов
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import {
  RobotoCondensed_400Regular,
  RobotoCondensed_500Medium,
  RobotoCondensed_700Bold,
} from '@expo-google-fonts/roboto-condensed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Предотвращаем автоматическое скрытие splash screen
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Загружаем шрифты
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    RobotoCondensed_400Regular,
    RobotoCondensed_500Medium,
    RobotoCondensed_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Скрываем splash screen когда шрифты загружены
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Пока шрифты загружаются, ничего не показываем
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SessionProvider>
          <AppNavigator />
        </SessionProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
