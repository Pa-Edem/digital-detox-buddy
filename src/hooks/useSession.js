// src/hooks/useSession.js

import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const SESSION_STORAGE_KEY = '@digital_detox_session';

// Настройка уведомлений
/*
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
*/

const useSession = () => {
  const [sessionStatus, setSessionStatus] = useState('idle');
  const [remainingTime, setRemainingTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const intervalRef = useRef(null);
  const appState = useRef(AppState.currentState);
  const pauseTimeoutRef = useRef(null);
  const autoFailTimeoutRef = useRef(null);

  const GRACE_PERIOD_MS = 5000;
  const AUTO_FAIL_TIMEOUT_MS = 2 * 60 * 60 * 1000; // 2 часа

  // Загрузка сохраненной сессии при запуске
  useEffect(() => {
    loadSavedSession();
    // requestNotificationPermissions();
  }, []);

  // Запрос разрешений на уведомления
  /*
  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Разрешение на уведомления не получено');
    }
  };
  
  // Отправка уведомления о паузе
  const sendPauseNotification = async (reason) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: reason === 'call' ? '☎️ Звонок' : '⏸️ Сессия на паузе',
          body: 'Текущая сессия на паузе. Вернитесь в приложение и продолжите сессию.',
          sound: true,
        },
        trigger: null, // Показать сразу
      });
    } catch (error) {
      console.error('Ошибка отправки уведомления:', error);
    }
  };
  */

  // Отслеживание состояния приложения
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      console.log('AppState:', appState.current, '→', nextAppState);

      // Стало неактивным (звонок, уведомление, свернули)
      if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        if (sessionStatus === 'active') {
          console.log('⚠️ Неактивно - запускаем grace period');

          // Отложенная пауза (на случай быстрого возврата)
          pauseTimeoutRef.current = setTimeout(() => {
            console.log('⏸️ Автопауза');

            // const reason = nextAppState === 'inactive' ? 'call' : 'background';
            pauseSession();
            // sendPauseNotification(reason);
          }, GRACE_PERIOD_MS);
        }
      }

      // Вернулись обратно
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // Отменяем отложенную паузу
        if (pauseTimeoutRef.current) {
          console.log('✅ Быстрый возврат - отменяем паузу');
          clearTimeout(pauseTimeoutRef.current);
          pauseTimeoutRef.current = null;
        }

        // Отменяем уведомления
        // Notifications.cancelAllScheduledNotificationsAsync();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription?.remove();
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [sessionStatus]);

  // Основной таймер
  useEffect(() => {
    if (sessionStatus === 'active') {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setSessionStatus('completed');
            saveSession('completed', 0, duration);

            // Уведомление о завершении
            /*
            Notifications.scheduleNotificationAsync({
              content: {
                title: '🎉 Сессия завершена!',
                body: 'Отличная работа! Ваше дерево выросло.',
                sound: true,
              },
              trigger: null,
            });
            */

            return 0;
          }

          const newTime = prev - 1;

          // Сохраняем каждые 10 секунд
          if (newTime % 10 === 0) {
            saveSession('active', newTime, duration);
          }

          return newTime;
        });
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [sessionStatus]);

  // Сохранение сессии в AsyncStorage
  const saveSession = async (status, remaining, dur) => {
    try {
      const sessionData = {
        status,
        remainingTime: remaining,
        duration: dur,
        savedAt: Date.now(),
      };
      await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
    } catch (error) {
      console.error('Ошибка сохранения сессии:', error);
    }
  };

  // Загрузка сохраненной сессии
  const loadSavedSession = async () => {
    try {
      const savedData = await AsyncStorage.getItem(SESSION_STORAGE_KEY);

      if (savedData) {
        const { status, remainingTime: savedTime, duration: savedDuration, savedAt } = JSON.parse(savedData);

        const now = Date.now();
        const pausedForMs = now - savedAt;
        const pausedForHours = pausedForMs / (1000 * 60 * 60);

        // Если пауза < 24 часов - восстанавливаем
        if (status === 'paused' && pausedForHours < 24) {
          console.log('♻️ Восстановление сессии на паузе');
          setRemainingTime(savedTime);
          setDuration(savedDuration);
          setSessionStatus('paused');
        } else if (status === 'active') {
          // Если сессия была активна - завершаем (JS не работал в фоне)
          console.log('❌ Активная сессия завершена (приложение было закрыто)');
          await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
        } else if (pausedForHours >= 24) {
          // Слишком долгая пауза - удаляем
          console.log('🗑️ Сессия удалена (пауза > 24 часов)');
          await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки сессии:', error);
    }
  };

  // Старт сессии
  const startSession = (durationInSeconds) => {
    setDuration(durationInSeconds);
    setRemainingTime(durationInSeconds);
    setSessionStatus('active');
    saveSession('active', durationInSeconds, durationInSeconds);

    // Отменяем все старые уведомления
    // Notifications.cancelAllScheduledNotificationsAsync();
  };

  // Пауза
  const pauseSession = () => {
    setSessionStatus('paused');

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    saveSession('paused', remainingTime, duration);

    // Запускаем таймер автозавершения (2 часа)
    autoFailTimeoutRef.current = setTimeout(() => {
      console.log('❌ Сессия автоматически завершена (пауза > 2 часов)');
      setSessionStatus('failed');
      setRemainingTime(0);

      AsyncStorage.removeItem(SESSION_STORAGE_KEY);

      // Уведомление о провале
      /*
      Notifications.scheduleNotificationAsync({
        content: {
          title: '❌ Сессия завершена',
          body: 'Вы не вернулись в течение 2 часов. Сессия провалена.',
          sound: true,
        },
        trigger: null,
      });
      */
    }, AUTO_FAIL_TIMEOUT_MS);
  };

  // Возобновление
  const resumeSession = () => {
    // Отменяем автозавершение
    if (autoFailTimeoutRef.current) {
      clearTimeout(autoFailTimeoutRef.current);
      autoFailTimeoutRef.current = null;
    }

    setSessionStatus('active');
    saveSession('active', remainingTime, duration);

    // Отменяем уведомления
    // Notifications.cancelAllScheduledNotificationsAsync();
  };

  // Завершение
  const endSession = () => {
    setSessionStatus('completed');
    setRemainingTime(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (autoFailTimeoutRef.current) {
      clearTimeout(autoFailTimeoutRef.current);
    }

    AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    // Notifications.cancelAllScheduledNotificationsAsync();
  };

  return {
    sessionStatus,
    remainingTime,
    duration,
    startSession,
    pauseSession,
    resumeSession,
    endSession,
  };
};

export default useSession;
