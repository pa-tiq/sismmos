import React, { useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import NavigationSide from "./NavigationSide";
import Orders from "../Orders/Orders";
import Dashboard from "../Dashboard/Dashbard";

const Home = () => {

  const views = [ "dashboard", "ordens" ];
  const [activeView, setActiveView] = useState(views[1]);
  const changeViewHandler = (selectedView) => {
    setActiveView(selectedView);
  };

  return (
    <section className={classes.homepage}>
      {/* <div className={classes.sidebar}>
        <NavigationSide views={views} onChangeView={changeViewHandler}/>
      </div> */}
      <div className={classes.home}>
        {activeView === views[0] && <Dashboard/>}
        {activeView === views[1] && <Orders/>}
      </div>
    </section>
  );
};

export default Home;
