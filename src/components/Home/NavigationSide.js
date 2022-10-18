import React from "react";
import classes from "./NavigationSide.module.css";
import Card from "../UI/Card/Card";

const NavigationSide = (props) => {

  const viewChangeHandler = (event) => {
    props.onChangeView(event.target.id);
  }

  return (
    <Card className={classes.nav}>
      <ul>
        <li>
          <a id={props.views[0]} onClick={viewChangeHandler}>Home</a>
        </li>
        <li>
          <a id={props.views[1]} onClick={viewChangeHandler}>Dashboard</a>
        </li>
      </ul>
    </Card>
  );
};

export default NavigationSide;