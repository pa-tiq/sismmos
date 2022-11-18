import React from "react";
import classes from "./Home.module.css";
import Orders from "../Orders/Orders";

const Home = () => {

  return (
    <section className={classes.homepage}>
      <div className={classes.home}>
        <Orders/>
      </div>
    </section>
  );
};

export default Home;
