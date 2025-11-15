// src/screens/HomeScreen.js

import { Ionicons } from '@expo/vector-icons';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../constants/spacing';
import { useSessionContext } from '../contexts/SessionContext';
import { useTheme } from '../contexts/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { startSession } = useSessionContext();

  const handleStartSession = (minutes) => {
    const seconds = minutes * 60;
    startSession(seconds);
    navigation.navigate('Session');
  };

  // Временные данные статистики
  const weeklyStats = {
    sessions: 123,
    totalTime: '8 h 30 min',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Весь контент в одном View без прокрутки */}
      <View style={styles.content}>
        {/* Хедер с логотипом и иконкой настроек */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.logoText, { color: theme.accent }]}>Digital</Text>
            <Text style={[styles.logoText, { color: theme.accent }]}>Detox</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.settingsButton,
              { backgroundColor: isDark ? 'rgba(61, 65, 83, 0.6)' : 'rgba(197, 197, 208, 0.5)' },
            ]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons name='settings-outline' size={24} color={isDark ? '#FFFFFF' : '#3D4153'} />
          </TouchableOpacity>
        </View>

        {/* Приветственный заголовок */}
        <View style={styles.greetingSection}>
          <Text style={[styles.greetingTitle, { color: theme.textPrimary }]}>Готовы{'\n'}сфокусироваться?</Text>

          <Text style={[styles.greetingSubtitle, { color: theme.textSecondary }]}>
            Выберите длительность сессии и{'\n'}начните растить свое дерево.
          </Text>
        </View>

        {/* Карточка статистики */}
        <View style={[styles.statsCard, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.statsTitle, { color: isDark ? '#FFFFFF' : '#3D4153' }]}>За эту неделю:</Text>

          <View style={styles.statsRow}>
            <Text style={[styles.statsLabel, { color: isDark ? '#FFFFFF' : '#3D4153' }]}>Количество сессий:</Text>
            <Text style={[styles.statsValue, { color: isDark ? '#FFFFFF' : '#3D4153' }]}>{weeklyStats.sessions}</Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={[styles.statsLabel, { color: isDark ? '#FFFFFF' : '#3D4153' }]}>Общее время фокуса:</Text>
            <Text style={[styles.statsValue, { color: isDark ? '#FFFFFF' : '#3D4153' }]}>{weeklyStats.totalTime}</Text>
          </View>
        </View>

        {/* Кнопки выбора длительности */}
        <View style={styles.durationContainer}>
          <DurationButton
            minutes={15}
            icon='pulse'
            theme={theme}
            isDark={isDark}
            onPress={() => handleStartSession(15)}
          />

          <DurationButton
            minutes={25}
            icon='book-outline'
            theme={theme}
            isDark={isDark}
            isAccent={true}
            onPress={() => handleStartSession(25)}
          />

          <DurationButton
            minutes={50}
            icon='battery-charging-outline'
            theme={theme}
            isDark={isDark}
            onPress={() => handleStartSession(50)}
          />
        </View>

        {/* Кнопка CUSTOM */}
        <TouchableOpacity
          style={[
            styles.customButton,
            {
              borderColor: isDark ? theme.accent : '#9C27B0',
              backgroundColor: 'transparent',
            },
          ]}
          onPress={() => {
            // TODO: Открыть диалог выбора кастомной длительности
            console.log('Custom duration');
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.customButtonText, { color: theme.textPrimary }]}>CUSTOM</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Компонент кнопки выбора длительности
const DurationButton = ({ minutes, icon, theme, isDark, isAccent = false, onPress }) => {
  const buttonBg = isAccent ? theme.accent : isDark ? 'rgba(61, 65, 83, 0.6)' : 'rgba(197, 197, 208, 0.6)';

  const textColor = isAccent ? '#FFFFFF' : theme.textPrimary;
  const iconColor = isAccent ? '#FFFFFF' : theme.accent;

  return (
    <TouchableOpacity
      style={[styles.durationButton, { backgroundColor: buttonBg }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={28} color={iconColor} />
      <Text style={[styles.durationText, { color: textColor }]}>{minutes} min</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
  },

  // Хедер
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: spacing.xs,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 26,
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Приветствие
  greetingSection: {
    alignItems: 'center',
    marginTop: -spacing.lg,
  },
  greetingTitle: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 48,
  },
  greetingSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Карточка статистики
  statsCard: {
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statsLabel: {
    fontSize: 15,
    fontWeight: '400',
  },
  statsValue: {
    fontSize: 15,
    fontWeight: '600',
  },

  // Кнопки длительности
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  durationButton: {
    width: '30%',
    aspectRatio: 0.75,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  durationText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: spacing.xs,
  },

  // Кнопка CUSTOM
  customButton: {
    height: 54,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});

export default HomeScreen;
