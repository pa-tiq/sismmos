import React from 'react';
import classes from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = (props) => {
  return(
  !props.link ? (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
    >
      {props.loading ? 'Carregando...' : props.children}
    </button>
  ) : (
    <Link className={`${classes.button} ${props.className}`} to={props.link}>
      {props.children}
    </Link>
  )
  );
};

export default Button;
