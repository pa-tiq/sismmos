import React, {useContext} from "react";
import AuthContext from "../../store/auth-context";
import classes from "./NavigationSide.module.css";
import Card from "../UI/Card/Card";

const NavigationSide = () => {
  const context = useContext(AuthContext);
  return (
    <Card className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href="/">Dashboard</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a href="/">New Order</a>
          </li>
        )}
      </ul>
    </Card>
  );
};

export default NavigationSide;