import React, { useState, useContext } from "react";
import classes from "./Admin.module.css";
import OrderContext from "../../store/order-context";
import Card from "../UI/Card/Card";
import Constraints from "./Constraints";

const Admin = () => {
  const orderContext = useContext(OrderContext);

  return (
    <Card className={classes.card_admin}>
      <div className={classes.header}>
        <h1 className={classes.title}>{`Oi Admin!`}</h1>
      </div>
      <Constraints/>
    </Card>
  );
};

export default Admin;
