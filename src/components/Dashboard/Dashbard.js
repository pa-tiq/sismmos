import React, { Fragment, useState, useContext } from "react";
import classes from "./Dashboard.module.css";
import OrderContext from "../../store/order-context";
import Card from "../UI/Card/Card";

const Dashboard = () => {
  const orderContext = useContext(OrderContext);

  return (
    <section className={classes.dashboard}>
      <div className={classes.header}>
        <h1 className={classes.title}>{`Oi caralhudo, vc tem ${
          orderContext.orderID - 1
        } ordens de serviço cadastradas`}</h1>
      </div>
      <div className={classes.summary}>
        <Card className={classes.card}>Oieeeeeeee</Card>
      </div>
    </section>
  );
};

export default Dashboard;
