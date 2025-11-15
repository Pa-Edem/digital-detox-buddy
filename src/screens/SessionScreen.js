// src/screens/SessionScreen.js
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSessionContext } from '../contexts/SessionContext';

const SessionScreen = () => {
  const { sessionStatus, remainingTime, pauseSession, resumeSession, endSession } = useSessionContext();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusInfo = () => {
    switch (sessionStatus) {
      case 'active':
        return {
          message: 'Сессия активна',
          color: '#27AE60',
        };
      case 'paused':
        return {
          message: 'Сессия на паузе',
          color: '#F39C12',
        };
      case 'completed':
        return {
          message: 'Сессия завершена!',
          color: '#3498DB',
        };
      default:
        return {
          message: 'Нет активной сессии',
          color: '#95A5A6',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <View style={styles.container}>
      {/* Сообщение о статусе с динамическим цветом */}
      <Text style={[styles.statusMessage, { color: statusInfo.color }]}>{statusInfo.message}</Text>

      {/* Большой таймер показывающий оставшееся время */}
      <Text style={styles.timer}>{formatTime(remainingTime)}</Text>

      {/* Подсказка о том что здесь будет визуализация */}
      <Text style={styles.hint}>Здесь будет расти ваше дерево</Text>

      {/* Контейнер для кнопок управления сессией */}
      <View style={styles.controlsContainer}>
        {/* Показываем разные кнопки в зависимости от статуса сессии */}
        {sessionStatus === 'active' && (
          // Если сессия активна показываем кнопку паузы
          <TouchableOpacity style={[styles.controlButton, styles.pauseButton]} onPress={pauseSession}>
            <Text style={styles.controlButtonText}>Пауза</Text>
          </TouchableOpacity>
        )}

        {sessionStatus === 'paused' && (
          // Если сессия на паузе показываем кнопку возобновления
          <TouchableOpacity style={[styles.controlButton, styles.resumeButton]} onPress={resumeSession}>
            <Text style={styles.controlButtonText}>Продолжить</Text>
          </TouchableOpacity>
        )}

        {/* Кнопка завершения показывается всегда когда есть активная или приостановленная сессия */}
        {(sessionStatus === 'active' || sessionStatus === 'paused') && (
          <TouchableOpacity style={[styles.controlButton, styles.endButton]} onPress={endSession}>
            <Text style={styles.controlButtonText}>Завершить</Text>
          </TouchableOpacity>
        )}

        {/* Если сессия завершена показываем поздравительное сообщение */}
        {sessionStatus === 'completed' && (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>🎉 Отличная работа!</Text>
            <Text style={styles.completedSubtext}>Вы успешно завершили сессию фокуса</Text>
          </View>
        )}

        {/* Если нет активной сессии показываем сообщение с инструкцией */}
        {sessionStatus === 'idle' && (
          <Text style={styles.idleMessage}>Вернитесь на главный экран чтобы начать новую сессию</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  statusMessage: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 20,
    // В React Native можно использовать специальные шрифты для моноширинного отображения цифр
    // fontVariant это массив вариантов шрифта tabular-nums делает все цифры одинаковой ширины
    fontVariant: ['tabular-nums'],
  },
  hint: {
    fontSize: 16,
    color: '#66BB6A',
    marginBottom: 40,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // flexWrap wrap позволяет элементам переноситься на новую строку если не помещаются
    flexWrap: 'wrap',
    gap: 15,
  },
  controlButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pauseButton: {
    backgroundColor: '#F39C12',
  },
  resumeButton: {
    backgroundColor: '#27AE60',
  },
  endButton: {
    backgroundColor: '#E74C3C',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedContainer: {
    alignItems: 'center',
  },
  completedText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#27AE60',
    marginBottom: 10,
  },
  completedSubtext: {
    fontSize: 16,
    color: '#66BB6A',
    textAlign: 'center',
  },
  idleMessage: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SessionScreen;
