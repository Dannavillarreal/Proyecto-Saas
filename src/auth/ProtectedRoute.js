import React, { useEffect, useState } from 'react';
import { isSessionActive, closeSession } from './auth';

function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(isSessionActive());

  useEffect(() => {
    const checkSession = () => {
      const active = isSessionActive();

      setAuthenticated(active);

      if (!active) {
        closeSession();
      }
    };

    const interval = setInterval(checkSession, 1000);

    window.addEventListener('focus', checkSession);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkSession);
    };
  }, []);

  if (!authenticated) {
    return null;
  }

  return children;
}

export default ProtectedRoute;