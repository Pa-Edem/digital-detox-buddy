// src/screens/SessionScreen.js

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularProgress from '../components/CircularProgress';
import { fontSize, roboto } from '../constants/fonts';
import { spacing } from '../constants/spacing';
import { useSessionContext } from '../contexts/SessionContext';
import { useTheme } from '../contexts/ThemeContext';

const SessionScreen = () => {
  const { sessionStatus, remainingTime, duration, pauseSession, resumeSession, endSession } = useSessionContext();
  const { theme, isDark } = useTheme();

  // Вычисляем прошедшее время
  const elapsedSeconds = duration - remainingTime;

  // Форматирование оставшегося времени
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getStatusInfo = () => {
    switch (sessionStatus) {
      case 'active':
        return { message: 'Сессия активна', color: theme.accent };
      case 'paused':
        return { message: 'Сессия на паузе', color: '#F39C12' };
      case 'completed':
        return { message: 'Сессия завершена!', color: theme.accent };
      case 'failed':
        return { message: 'Сессия провалена', color: '#E74C3C' };
      default:
        return { message: 'Нет активной сессии', color: theme.text };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Градиентный фон */}
      <LinearGradient colors={[theme.bgStart, theme.bgEnd]} style={StyleSheet.absoluteFill} />

      <View style={styles.content}>
        {/* Сообщение о статусе */}
        <Text style={[styles.statusMessage, { color: statusInfo.color }]}>{statusInfo.message}</Text>

        {/* Визуализация с точками и кругом прогресса */}
        <View style={styles.visualizationContainer}>
          <CircularProgress elapsedSeconds={elapsedSeconds} totalSeconds={duration} size={280} theme={theme} />
        </View>

        {/* Большой таймер с оставшимся временем */}
        <Text style={[styles.timer, { color: theme.title }]}>{formatTime(remainingTime)}</Text>

        {/* Кнопки управления */}
        <View style={styles.controlsContainer}>
          {sessionStatus === 'active' && (
            <>
              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: theme.accent }]}
                onPress={pauseSession}
                activeOpacity={0.7}
              >
                <Ionicons name='pause' size={28} color='#FFFFFF' />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: theme.text, opacity: 0.6 }]}
                onPress={endSession}
                activeOpacity={0.7}
              >
                <Ionicons name='stop' size={28} color='#FFFFFF' />
              </TouchableOpacity>
            </>
          )}

          {sessionStatus === 'paused' && (
            <>
              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: theme.accent }]}
                onPress={resumeSession}
                activeOpacity={0.7}
              >
                <Ionicons name='play' size={28} color='#FFFFFF' />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: theme.text, opacity: 0.6 }]}
                onPress={endSession}
                activeOpacity={0.7}
              >
                <Ionicons name='stop' size={28} color='#FFFFFF' />
              </TouchableOpacity>
            </>
          )}

          {sessionStatus === 'completed' && (
            <View style={styles.completedContainer}>
              <Text style={[styles.completedText, { color: theme.accent }]}>🎉 Отличная работа!</Text>
              <Text style={[styles.completedSubtext, { color: theme.text }]}>Вы успешно завершили сессию фокуса</Text>
            </View>
          )}

          {sessionStatus === 'failed' && (
            <View style={styles.completedContainer}>
              <Text style={[styles.completedText, { color: '#E74C3C' }]}>😢 Сессия провалена</Text>
              <Text style={[styles.completedSubtext, { color: theme.text }]}>Попробуйте еще раз</Text>
            </View>
          )}

          {sessionStatus === 'idle' && (
            <Text style={[styles.idleMessage, { color: theme.text }]}>
              Вернитесь на главный экран чтобы начать новую сессию
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statusMessage: {
    fontFamily: roboto.medium,
    fontSize: fontSize.lg,
    marginTop: spacing.md,
  },
  visualizationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontFamily: roboto.bold,
    fontSize: 64,
    fontVariant: ['tabular-nums'],
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  controlButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedContainer: {
    alignItems: 'center',
  },
  completedText: {
    fontFamily: roboto.bold,
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  completedSubtext: {
    fontFamily: roboto.regular,
    fontSize: fontSize.md,
    textAlign: 'center',
  },
  idleMessage: {
    fontFamily: roboto.regular,
    fontSize: fontSize.md,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SessionScreen;
