// src/contexts/SessionContext.js
import { createContext, useContext } from 'react';
import useSession from '../hooks/useSession';

const SessionContext = createContext(undefined);

export const SessionProvider = ({ children }) => {
  const sessionState = useSession();

  return <SessionContext.Provider value={sessionState}>{children}</SessionContext.Provider>;
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error(
      'useSessionContext должен использоваться внутри SessionProvider. ' +
        'Убедитесь что компонент обернут в <SessionProvider>.'
    );
  }

  return context;
};
