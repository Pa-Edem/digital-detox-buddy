// src/screens/HomeScreen.js

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/icons/Logo';
import { commonColors } from '../constants/colors';
import { fontSize, roboto, robotoCondensed } from '../constants/fonts';
import { radius, spacing } from '../constants/spacing';
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
    totalTime: '8h 30m',
  };

  return (
    <SafeAreaView style={[styles.container]} edges={['top', 'left', 'right']}>
      <LinearGradient colors={[theme.bgStart, theme.bgEnd]} style={StyleSheet.absoluteFill}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

        {/* Весь контент в одном View без прокрутки */}
        <View style={styles.content}>
          {/* Хедер с логотипом и иконкой настроек */}
          <View style={styles.header}>
            {/* SVG Логотип с адаптивными цветами */}
            <Logo
              width={48}
              height={48}
              primaryColor={theme.nav}
              lockColor={commonColors.fox}
              plantColor={theme.accent}
            />

            <TouchableOpacity style={[styles.settingsButton]} onPress={toggleTheme} activeOpacity={0.7}>
              <Ionicons name='settings-outline' size={24} color={theme.nav} />
            </TouchableOpacity>
          </View>

          {/* Приветственный заголовок */}
          <View style={styles.greetingSection}>
            <Text style={[styles.greetingTitle, { color: theme.title }]}>Готовы{'\n'}сфокусироваться?</Text>

            <Text style={[styles.greetingSubtitle, { color: theme.text }]}>
              Выберите длительность сессии и{'\n'}начните растить свое дерево.
            </Text>
          </View>

          {/* Карточка статистики */}
          <LinearGradient colors={[theme.bgStartStat, theme.bgEndStat]} style={styles.statsCard}>
            <Text style={[styles.statsTitle, { color: theme.title }]}>За эту неделю:</Text>

            <View style={styles.statsRow}>
              <Text style={[styles.statsLabel, { color: theme.title }]}>Количество сессий:</Text>
              <Text style={[styles.statsValue, { color: theme.title }]}>{weeklyStats.sessions}</Text>
            </View>

            <View style={styles.statsRow}>
              <Text style={[styles.statsLabel, { color: theme.title }]}>Общее время фокуса:</Text>
              <Text style={[styles.statsValue, { color: theme.title }]}>{weeklyStats.totalTime}</Text>
            </View>
          </LinearGradient>

          {/* Кнопки выбора длительности */}
          <View style={styles.durationContainer}>
            <DurationButton minutes={15} icon='pulse' theme={theme} onPress={() => handleStartSession(15)} />

            <DurationButton
              minutes={25}
              icon='book-outline'
              theme={theme}
              isAccent={true}
              onPress={() => handleStartSession(25)}
            />

            <DurationButton
              minutes={50}
              icon='battery-charging-outline'
              theme={theme}
              onPress={() => handleStartSession(50)}
            />
          </View>

          {/* Кнопка CUSTOM */}
          <LinearGradient colors={[theme.bgStartCust, theme.bgEndCust]} style={styles.customButton}>
            <TouchableOpacity
              style={styles.customButtonInner}
              onPress={() => {
                // TODO: Открыть диалог выбора кастомной длительности
                console.log('Custom duration');
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.customButtonText, { color: theme.text }]}>CUSTOM...</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Компонент кнопки выбора длительности
const DurationButton = ({ minutes, icon, theme, isAccent = false, onPress }) => {
  const gradientColors = isAccent ? [theme.bgStartStat, theme.bgEndStat] : [theme.bgStartTime, theme.bgEndTime];

  const textColor = isAccent ? theme.accent : theme.text;
  const iconColor = isAccent ? theme.accent : theme.text;

  return (
    <TouchableOpacity style={styles.durationButtonContainer} onPress={onPress} activeOpacity={0.7}>
      <LinearGradient colors={gradientColors} borderColor={theme.border} style={styles.durationButton}>
        <Ionicons name={icon} size={28} color={iconColor} />
        <Text style={[styles.durationText, { color: textColor }]}>{minutes} min</Text>
      </LinearGradient>
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
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Приветствие
  greetingSection: {
    alignItems: 'center',
    marginTop: -spacing.xxl,
  },
  greetingTitle: {
    fontFamily: robotoCondensed.bold,
    fontSize: fontSize.xxl,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: fontSize.xxl,
  },
  greetingSubtitle: {
    fontFamily: roboto.regular,
    fontSize: fontSize.sm,
    textAlign: 'center',
    lineHeight: fontSize.lg,
  },

  // Карточка статистики
  statsCard: {
    marginTop: -spacing.xl,
    borderRadius: radius.xl,
    padding: spacing.md,
    paddingVertical: spacing.sm,
    shadowColor: commonColors.shadow,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  statsTitle: {
    fontFamily: robotoCondensed.medium,
    fontSize: fontSize.lg,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statsLabel: {
    fontFamily: robotoCondensed.regular,
    fontSize: fontSize.md,
  },
  statsValue: {
    fontFamily: robotoCondensed.medium,
    fontSize: fontSize.md,
  },

  // Кнопки длительности
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.xs,
  },
  durationButtonContainer: {
    width: '32%',
  },
  durationButton: {
    aspectRatio: 0.7,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: spacing.md,
    shadowColor: commonColors.shadow,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  durationText: {
    fontFamily: robotoCondensed.medium,
    fontSize: fontSize.md,
    marginTop: spacing.xs,
  },

  // Кнопка CUSTOM
  customButton: {
    height: 54,
    borderRadius: radius.lg,
    borderWidth: 1,
    shadowColor: commonColors.shadow,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    marginBottom: spacing.sm,
  },
  customButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonText: {
    fontFamily: robotoCondensed.medium,
    fontSize: fontSize.md,
  },
});

export default HomeScreen;
