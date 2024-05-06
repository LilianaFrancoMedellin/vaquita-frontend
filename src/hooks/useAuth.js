import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAuth = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('token');
      try {
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('token');
      }
    };
    checkAuth();

    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [location.pathname]);

  return { isAuthenticated };
};

export { useAuth };
