import React, { Fragment, useState, useContext } from "react";
import classes from "./Dashboard.module.css";
import OrderContext from "../../store/order-context";

const Dashboard = () => {

  const orderContext = useContext(OrderContext);

  return (
    <Fragment>
      <h1>{`Oi caralhudo, vc tem ${orderContext.orderID} ordens de serviço cadastradas`}</h1>
    </Fragment>
  );
};
 
export default Dashboard;