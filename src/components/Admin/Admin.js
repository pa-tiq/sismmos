import React, { useState, useContext } from "react";
import classes from "./Dashboard.module.css";
import OrderContext from "../../store/order-context";
import Card from "../UI/Card/Card";

const Admin = () => {
  const orderContext = useContext(OrderContext);

  return (
    <Card className={classes.home}>
      <section className={classes.admin}>
        <div className={classes.header}>
          <h1 className={classes.title}>{`Oi Admin!`}</h1>
        </div>
        <div className={classes.summary}>
          <Card className={classes.card}>Oieeeeeeee</Card>
        </div>
      </section>
    </Card>
  );
};

export default Admin;
