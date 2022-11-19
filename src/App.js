import React, { useContext, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/MainHeader/Layout';
import AuthContext from './store/auth-context';
import OrderProvider from './store/OrderProvider';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
import Login from './components/Auth/Login';

const Signup = React.lazy(() => import('./components/Auth/Signup'));
const Home = React.lazy(() => import('./components/Home/Home'));
const Admin = React.lazy(() => import('./components/Admin/Admin'));

function App() {
  const authContext = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <main>
          {!authContext.isLoggedIn ? (
          <Routes>
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
          ) : (
            <OrderProvider>
              <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='/login' element={<Navigate to='/home' />} />
                <Route path='/home' element={<Home />} />
                <Route path='/admin' element={<Admin />} />
              </Routes>
            </OrderProvider>
          )}
        </main>
      </Suspense>
    </Layout>
  );
}

export default App;
