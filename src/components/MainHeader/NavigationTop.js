import React, { useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './NavigationTop.module.css';

const NavigationTop = (props) => {
  const context = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
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
              <button onClick={context.onLogout}>Logout</button>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavigationTop;
