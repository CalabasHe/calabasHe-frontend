// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { getCookie, setCookie, removeCookie } from '../utils/cookies';

export const AuthContext = createContext(null);


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  const login = (accessToken, refreshToken) => {
    setCookie('accessToken', accessToken, 1); // Store for 1 day
    setCookie('refreshToken', refreshToken, 7); // Store for 7 days
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    window.location.reload()
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};