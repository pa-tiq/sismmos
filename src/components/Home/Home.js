import React, { useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import NavigationSide from "./NavigationSide";

const Home = () => {

  const views = { welcome: "welcome", ordens: "ordens" };
  const [activeView, setActiveView] = useState(views.welcome);
  const changeViewHandler = (selectedView) => {
    setActiveView(selectedView);
  };

  return (
    <section className={classes.homepage}>
      <div className={classes.sidebar}>
        <NavigationSide views={views} onChangeView={changeViewHandler}/>
      </div>
      <Card className={classes.home}>
        {activeView === views.welcome && <h1>Welcome back!</h1>}
        {activeView === views.ordens && <h1>Ordens</h1>}
      </Card>
    </section>
  );
};

export default Home;
