import React, { useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  const context = useContext(AuthContext);

  const logoutHandler = () => {
    context.onLogout();
  }

  return (
    <header className={classes.header}>
      <h1>SisMMOS</h1>
      <nav>
        <ul>
          {context.isLoggedIn ? (
            <Fragment>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? classes.active : undefined)}
                  to='/home'
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? classes.active : undefined)}
                  to='/users'
                >
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? classes.active : undefined)}
                  to='/admin'
                >
                  Admin
                </NavLink>
              </li>
              <li>
              <NavLink
                  className={classes.button}
                  to='/' onClick={logoutHandler}
                >
                  Logout
                </NavLink>
              </li>
            </Fragment>
          ) : (
            <Fragment>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : undefined)}
                to='/login'
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : undefined)}
                to='/signup'
              >
                Cadastrar
              </NavLink>
            </li>
          </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
