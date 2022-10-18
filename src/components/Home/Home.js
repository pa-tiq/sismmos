import React from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import NavigationSide from "./NavigationSide";

const Home = () => {
  return (
    <section className={classes.homepage}>
      <div className={classes.sidebar}>
        <NavigationSide/>
      </div>
      <Card className={classes.home}>
        <h1>Welcome back!</h1>
      </Card>
    </section>
  );
};

export default Home;
