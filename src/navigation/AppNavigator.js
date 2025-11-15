// DigitalDetoxBuddy/src/navigation/AppNavigator.js

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import SessionScreen from '../screens/SessionScreen';
import StatsScreen from '../screens/StatsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { theme, isDark } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopWidth: 0,
            elevation: 0,
            height: 80,
            paddingBottom: 10,
            paddingTop: 10,
          },

          tabBarActiveTintColor: theme.navActive,
          tabBarInactiveTintColor: theme.navInactive,

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Выбираем иконки на основе названия маршрута
            if (route.name === 'Home') {
              // Для главной используем иконку домика
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Session') {
              // Для сессии используем иконку времени/часов
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Stats') {
              // Для статистики используем иконку пульса/активности
              // Варианты: 'pulse', 'stats-chart', 'analytics'
              iconName = focused ? 'pulse' : 'pulse-outline';
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} options={{ title: 'Главная' }} />
        <Tab.Screen name='Session' component={SessionScreen} options={{ title: 'Сессия' }} />
        <Tab.Screen name='Stats' component={StatsScreen} options={{ title: 'Статистика' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
