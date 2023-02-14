import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/use-http';

const AuthContext = React.createContext({
  isLoading: false,
  error: null,
  isLoggedIn: false,
  token: null,
  userId: null,
  email: '',
  name: '',
  onLogin: (email, password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const httpObj = useHttp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserLoginInfo = localStorage.getItem('isLoggedIn');
    const storedToken = localStorage.getItem('token');
    const storedExpiryDate = localStorage.getItem('expiryDate');
    const storedUserId = localStorage.getItem('userId');
    const storedEmail = localStorage.getItem('email');
    const storedName = localStorage.getItem('name');
    if (
      !storedToken ||
      !storedExpiryDate ||
      !storedUserId ||
      !storedEmail ||
      !storedName
    ) {
      return;
    }
    if (storedUserLoginInfo === '1') {
      setIsLoggedIn(true);
    }
    if (new Date(storedExpiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const remainingMilliseconds =
      new Date(storedExpiryDate).getTime() - new Date().getTime();
    setEmail(storedEmail);
    setName(storedName);
    setToken(storedToken);
    setUserId(storedUserId);
    setAutoLogout(remainingMilliseconds);
  }, []); //this only runs once - when the app starts

  const loginHandler = (email, password) => {
    setEmail(email);
    const postConfig = {
      url: 'http://localhost:8080/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: email,
        password: password,
      },
    };
    const createTask = (response) => {
      setIsLoggedIn(true);
      setToken(response.token);
      setName(response.name);
      setEmail(response.email);
      setUserId(response.userId);
      localStorage.setItem('isLoggedIn', '1');
      localStorage.setItem('token', response.token);
      localStorage.setItem('name', response.name);
      localStorage.setItem('email', response.email);
      localStorage.setItem('userId', response.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
    };
    httpObj.sendRequest(postConfig, createTask);
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
    setIsLoggedIn(false);
    setToken(null);
  };

  const signupHandler = async (email, name, password) => {
    const putConfig = {
      url: 'http://localhost:8080/auth/signup',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: email,
        password: password,
        name: name,
      },
    };
    const createTask = (response) => {};
    httpObj.sendRequest(putConfig, createTask);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: httpObj.isLoading,
        error: httpObj.error,
        isLoggedIn: isLoggedIn,
        token: token,
        userId: userId,
        email: email,
        name: name,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onSignup: signupHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
