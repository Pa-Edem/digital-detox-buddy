// DigitalDetoxBuddy/App.js
import { SessionProvider } from './src/contexts/SessionContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <AppNavigator />
      </SessionProvider>
    </ThemeProvider>
  );
}
