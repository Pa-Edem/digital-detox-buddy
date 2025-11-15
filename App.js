// DigitalDetoxBuddy/App.js

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SessionProvider } from './src/contexts/SessionContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
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
