import React, { useContext, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Admin from './components/Admin/Admin';
import AuthContext from './store/auth-context';
import OrderProvider from './store/OrderProvider';

function App() {
  const authContext = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!authContext.isLoggedIn && <Login />}
        {authContext.isLoggedIn && (
          <OrderProvider>
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<Home />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </OrderProvider>
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
