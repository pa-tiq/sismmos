import React, { useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import NavigationSide from "./NavigationSide";
import Orders from "./Orders";

const Home = () => {

  const views = [ "home", "ordens" ];
  const [activeView, setActiveView] = useState(views[0]);
  const changeViewHandler = (selectedView) => {
    setActiveView(selectedView);
  };

  return (
    <section className={classes.homepage}>
      <div className={classes.sidebar}>
        <NavigationSide views={views} onChangeView={changeViewHandler}/>
      </div>
      <Card className={classes.home}>
        {activeView === views[0] && <h1>Welcome back!</h1>}
        {activeView === views[1] && <Orders/>}
      </Card>
    </section>
  );
};

export default Home;
