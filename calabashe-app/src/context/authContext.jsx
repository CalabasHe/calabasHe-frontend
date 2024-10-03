// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { getCookie, setCookie, removeCookie } from '../utils/cookies';
import { toast } from 'sonner';
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
    // window.location.reload()
    removeCookie('accessToken');
    removeCookie('refreshToken');
    toast.info('Logged out! Log in again to leave a review', {position:'top-right'})
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};