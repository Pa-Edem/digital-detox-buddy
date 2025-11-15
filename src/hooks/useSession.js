// src/hooks/useSession.js
import { useEffect, useRef, useState } from 'react';

const useSession = () => {
  const [sessionStatus, setSessionStatus] = useState('idle');

  const [duration, setDuration] = useState(25 * 60);
  const [remainingTime, setRemainingTime] = useState(duration);
  const timerRef = useRef(null);

  const startSession = (customDuration) => {
    const sessionDuration = customDuration || duration;
    setDuration(sessionDuration);
    setRemainingTime(sessionDuration);
    setSessionStatus('active');
  };

  const pauseSession = () => {
    setSessionStatus('paused');
  };

  const resumeSession = () => {
    setSessionStatus('active');
  };

  const endSession = () => {
    setSessionStatus('idle');
    setRemainingTime(duration);
  };

  useEffect(() => {
    if (sessionStatus === 'active') {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            setSessionStatus('completed');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [sessionStatus]);

  return {
    sessionStatus,
    duration,
    remainingTime,
    startSession,
    pauseSession,
    resumeSession,
    endSession,
  };
};

export default useSession;
