import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/use-http';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const httpObj = useHttp();
  const [users, setUsers] = useState([]);
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
    const postConfig = {
      url: 'http://localhost:8080/auth/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    };
    const createTask = () => {

    };
    httpObj.sendRequest(postConfig, createTask);
  };

  return (
    <AuthContext.Provider
      value={{
        users: users,
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
