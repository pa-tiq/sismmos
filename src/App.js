import React, { useContext, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import OrderProvider from './store/OrderProvider';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner'

const Login = React.lazy(() => import('./components/Login/Login'));
const Home = React.lazy(() => import('./components/Home/Home'));
const Admin = React.lazy(() => import('./components/Admin/Admin'));

function App() {
  const authContext = useContext(AuthContext);

  return (
    <Suspense fallback={<LoadingSpinner/>}>
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
    </Suspense>
  );
}

export default App;
