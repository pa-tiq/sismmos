import React from "react";
import classes from "./NavigationSide.module.css";
import Card from "../UI/Card/Card";

const NavigationSide = (props) => {
  const viewChangeHandler = (event) => {
    props.onChangeView(event.target.id);
  };

  return (
    <Card className={classes.nav}>
      <ul>
        <li>
          <button id={props.views[0]} onClick={viewChangeHandler}>
            Dashboard
          </button>
        </li>
        <li>
          <button id={props.views[1]} onClick={viewChangeHandler}>
            Ordens de Serviço
          </button>
        </li>
      </ul>
    </Card>
  );
};

export default NavigationSide;
