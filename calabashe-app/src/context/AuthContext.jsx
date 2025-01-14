// src/context/AuthContext.js
import {createContext, useState, useEffect} from 'react';
import {getCookie, setCookie, removeCookie} from '../utils/cookies.jsx';
import {toast} from 'sonner';
import reviews from "../pages/Reviews.jsx";

export const AuthContext = createContext(null);


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem('userType') || null);
  const [userDeatil, setUserDeatil] = useState(
      {
        email: localStorage.getItem('email') || '',
        lastName: localStorage.getItem('lastName') || '',
        reviews: localStorage.getItem('myReviewsCount') || 0,
        profileImage: localStorage.getItem('profileImage') || '',
      }
  );
  useEffect(() => {
    const accessToken = getCookie('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  const login = (accessToken, refreshToken) => {
    setCookie('accessToken', accessToken, 1); // Store for 1 day
    setCookie('refreshToken', refreshToken, 7); // Store for 7 days
    setIsLoggedIn(true);
  };

  const modifyUserType = (type = 'doctor', profileImage = '', lastName = '', email = '', reviews= 0) => {
    setUserType(type);
    localStorage.setItem('userType', type);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('profileImage', profileImage);
    localStorage.setItem('myReviewsCount', reviews)
  }

  const logout = () => {
    // window.location.reload()
    removeCookie('accessToken');
    removeCookie('refreshToken');
    toast.info('Logged out! Log in again to leave a review', {position: 'top-right'})
    setIsLoggedIn(false);
    localStorage.removeItem('userType');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('lastName');
    localStorage.removeItem("myReviewsCount");
    localStorage.removeItem("userName");
    localStorage.removeItem("userType");
    setUserType(null);
  };

  return (
      <AuthContext.Provider value={{isLoggedIn, login, logout, modifyUserType, userType}}>
        {children}
      </AuthContext.Provider>
  );
};