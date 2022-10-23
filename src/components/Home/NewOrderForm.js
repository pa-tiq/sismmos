import React, { useRef } from "react";
import classes from "./NewOrderForm.module.css";
import Button from "../UI/Button/Button";

const NewOrderForm = (props) => {
  const materialRef = useRef('');
  const requerenteRef = useRef('');
  const prioridadeRef = useRef('');
  const tipoRef = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredMaterial = materialRef.current.value;
    const enteredRequerente = requerenteRef.current.value;
    const enteredPrioridade = prioridadeRef.current.value;
    const enteredTipo = tipoRef.current.value;

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;

    if (
      enteredMaterial.trim().length > 0 &&
      enteredRequerente.trim().length > 0 &&
      enteredPrioridade.trim().length > 0 &&
      enteredTipo.trim().length > 0
    ) {
      const order = {
        status:'Novo',
        ultima_atualizacao:currentDate,
        material:enteredMaterial,
        requerente:enteredRequerente,
        prioridade:enteredPrioridade,
        tipo:enteredTipo
      }
      props.onEnterOrder(order);
    }
  };

  return (
    <form className={classes.form_card} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="material">Material</label>
        <input type="text" id="material" ref={materialRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="requerente">Requerente</label>
        <input type="text" id="requerente" ref={requerenteRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="prioridade">Prioridade</label>
        <input type="text" id="prioridade" ref={prioridadeRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="tipo">Tipo</label>
        <input type="text" id="tipo" ref={tipoRef} />
      </div>
      <Button className={classes.add}>{props.loading ? "Enviando..." : "Adicionar Ordem"}</Button>
    </form>
  );
};

export default NewOrderForm;
