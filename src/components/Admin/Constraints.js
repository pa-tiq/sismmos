import React, { useState, useContext, useRef, Fragment } from "react";
import classes from "./Constraints.module.css";
import OrderContext from "../../store/order-context";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ConstraintForm from "./ConstraintForm";

const Constraints = () => {
  const orderContext = useContext(OrderContext);

  const statusRef = useRef("");
  const requerenteRef = useRef("");
  const prioridadeRef = useRef("");
  const tipoRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const aaaa = (
    <Fragment>
    <div className={classes.control}>
    <label htmlFor="status">Status</label>
    <input type="text" id="status" ref={statusRef} />
    <button className={classes.constraint_button}>➕</button>
  </div>
  <div className={classes.control}>
    <label htmlFor="requerente">Requerentes</label>
    <input type="text" id="requerente" ref={requerenteRef} />
    <button className={classes.constraint_button}>➕</button>
  </div>
  <div className={classes.control}>
    <label htmlFor="prioridade">Prioridades</label>
    <input type="text" id="prioridade" ref={prioridadeRef} />
    <button className={classes.constraint_button}>➕</button>
  </div>
  <div className={classes.control}>
    <label htmlFor="tipo">Tipo</label>
    <input type="text" id="tipo" ref={tipoRef} />
    <button className={classes.constraint_button}>➕</button>
  </div>
  </Fragment>
  );

  let constr = [];
  let index = 0;
  for (const [key,value] of Object.entries(orderContext.constraints)){
    constr[index].push(key);
    value.forEach((element)=>{
      constr[index].push(element);
    })
    index++;
  }

  return (
    <section className={classes.card_admin}>
      {constr.map((element) => {
        return(<ConstraintForm field={element[0]} constraints={element.subarray(1)}/>)
      })}

      <Button onClick={submitHandler} className={classes.button_add}>
      Salvar Restrições
    </Button>
    </section>
  );
};

export default Constraints;
