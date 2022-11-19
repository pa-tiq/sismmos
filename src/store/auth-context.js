import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/use-http';

const AuthContext = React.createContext({
  isLoading: false,
  error: null,
  isLoggedIn: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const httpObj = useHttp();
  //const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUserLoginInfo = localStorage.getItem('isLoggedIn');
    if (storedUserLoginInfo === '1') {
      setIsLoggedIn(true);
    }
  }, []); //this only runs once - when the app starts

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setEmail(email);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
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
    const createTask = (response) => {
      console.log('resposta: ', response);
    };
    httpObj.sendRequest(putConfig, createTask);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: httpObj.isLoading,
        error: httpObj.error,
        isLoggedIn: isLoggedIn,
        email: email,
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
