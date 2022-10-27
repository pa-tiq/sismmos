import React, {useContext} from "react";
import AuthContext from "../../store/auth-context";
import classes from "./NavigationTop.module.css";

const NavigationTop = (props) => {
  const context = useContext(AuthContext);

  const viewChangeHandler = (event) => {
    props.onChangeView(event.target.id);
  };

  return (
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <a id={props.views[2]} onClick={viewChangeHandler}>Admin</a>
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            <button onClick={context.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationTop;
