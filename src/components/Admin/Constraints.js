import React, { useState, useContext, useRef, useEffect } from "react";
import classes from "./Constraints.module.css";
import OrderContext from "../../store/order-context";
import Button from "../UI/Button/Button";
import ConstraintForm from "./ConstraintForm";

const Constraints = () => {
  const orderContext = useContext(OrderContext);
  const { constraints: constraints } = orderContext.constraints;
  const [constrArr, setConstrArr] = useState([]);

  const statusRef = useRef("");
  const requerenteRef = useRef("");
  const prioridadeRef = useRef("");
  const tipoRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
  };

  let constr = [];
  useEffect(() => {
    if (!constraints) {
      constr = [
        ["status", ""],
        ["requerente", ""],
        ["prioridade", ""],
        ["tipo", ""],
      ];
    } else {
      let index = 0;
      for (const [key, value] of Object.entries(constraints)) {
        constr[index].push(key);
        value.forEach((element) => {
          constr[index].push(element);
        });
        index++;
      }
    }
    setConstrArr(constr);
  }, [constraints]);

  return (
    <section className={classes.card_admin}>
      {constrArr.map((element) => {
        return (
          <ConstraintForm
            field={element[0]}
            constraints={element.slice(1)}
            key={element[0]}
          />
        );
      })}
      <Button onClick={submitHandler} className={classes.button_add}>
        Salvar Restrições
      </Button>
    </section>
  );
};

export default Constraints;
