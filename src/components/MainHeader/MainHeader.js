import React from 'react';
import NavigationTop from './NavigationTop';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {

  const viewChangeHandler = (event) => {
    props.onChangeView(event.target.id);
  };

  return (
    <header className={classes['main-header']}>
      <h1 id={props.views[0]} onClick={viewChangeHandler}>SisMMOS</h1>
      <NavigationTop views={props.views} onChangeView={props.onChangeView}/>
    </header>
  );
};

export default MainHeader;
