// src/contexts/SessionContext.js

// Импортируем React и необходимые хуки
// createContext - функция для создания нового контекста
// useContext - хук для чтения значения из контекста
import { createContext, useContext } from 'react';

// Импортируем наш хук управления сессиями
import useSession from '../hooks/useSession';

// Создаем контекст
// createContext принимает начальное значение которое будет использоваться
// только если компонент пытается использовать контекст вне провайдера
// Мы передаем null и позже проверим это чтобы дать понятное сообщение об ошибке
const SessionContext = createContext(null);

// Компонент провайдер который оборачивает приложение
// и предоставляет состояние сессии всем дочерним компонентам
// Принимает children - это все компоненты которые находятся внутри провайдера
export const SessionProvider = ({ children }) => {
  // Вызываем хук useSession здесь один раз
  // Это создает единственный экземпляр состояния для всего приложения
  const sessionState = useSession();

  // Возвращаем Provider который делает sessionState доступным
  // для всех компонентов внутри children
  return <SessionContext.Provider value={sessionState}>{children}</SessionContext.Provider>;
};

// Кастомный хук для удобного и безопасного использования контекста
// Это именованный экспорт - обратите внимание на ключевое слово export перед const
export const useSessionContext = () => {
  // Получаем значение из контекста
  const context = useContext(SessionContext);

  // Проверяем что мы внутри провайдера
  // Если context === null значит компонент использует хук вне SessionProvider
  if (context === null) {
    throw new Error(
      'useSessionContext должен использоваться внутри SessionProvider. ' +
        'Убедитесь что компонент обернут в <SessionProvider>.'
    );
  }

  // Возвращаем значение контекста
  return context;
};
