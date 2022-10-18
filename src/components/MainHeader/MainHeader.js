import React from 'react';
import NavigationTop from './NavigationTop';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes['main-header']}>
      <h1>SisMMOS</h1>
      <NavigationTop/>
    </header>
  );
};

export default MainHeader;
