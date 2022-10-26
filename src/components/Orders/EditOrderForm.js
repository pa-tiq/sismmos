import React, { useRef } from "react";
import classes from "./NewOrderForm.module.css";
import Button from "../UI/Button/Button";

const EditOrderForm = (props) => {
  const materialRef = useRef("");
  const requerenteRef = useRef("");
  const prioridadeRef = useRef("");
  const tipoRef = useRef("");
  const statusRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredMaterial = materialRef.current.value;
    const enteredRequerente = requerenteRef.current.value;
    const enteredPrioridade = prioridadeRef.current.value;
    const enteredTipo = tipoRef.current.value;
    const enteredStatus = statusRef.current.value;

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let zero = ''
    if (minutes < 10) zero = '0';
    let currentDate = `${day}/${month}/${year} ${hours}:${zero}${minutes}`;

    if (
      enteredMaterial.trim().length > 0 &&
      enteredRequerente.trim().length > 0 &&
      enteredPrioridade.trim().length > 0 &&
      enteredTipo.trim().length > 0 &&
      enteredStatus.trim().length > 0
    ) {
      const diff = {
        status: props.order.status === enteredStatus,
        material: props.order.material === enteredMaterial,
        requerente: props.order.requerente === enteredRequerente,
        prioridade: props.order.prioridade === enteredPrioridade,
        tipo: props.order.tipo === enteredTipo,
      };

      if (
        diff.status &&
        diff.material &&
        diff.requerente &&
        diff.prioridade &&
        diff.tipo
      )
        return;

      const order = {
        idx: props.order.idx,
        id: props.order.id,
        status: enteredStatus,
        ultima_atualizacao: currentDate,
        material: enteredMaterial,
        requerente: enteredRequerente,
        prioridade: enteredPrioridade,
        tipo: enteredTipo,
      };
      props.onEditOrder(order);
    }
  };

  return (
    <form className={classes.form_card} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="material">Material</label>
        <input
          type="text"
          id="material"
          ref={materialRef}
          defaultValue={props.order.material}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="requerente">Requerente</label>
        <input
          type="text"
          id="requerente"
          ref={requerenteRef}
          defaultValue={props.order.requerente}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="prioridade">Prioridade</label>
        <input
          type="text"
          id="prioridade"
          ref={prioridadeRef}
          defaultValue={props.order.prioridade}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="tipo">Tipo</label>
        <input
          type="text"
          id="tipo"
          ref={tipoRef}
          defaultValue={props.order.tipo}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="status">Status</label>
        <input
          type="text"
          id="status"
          ref={statusRef}
          defaultValue={props.order.status}
        />
      </div>
      <Button onClick={submitHandler} className={classes.button_add}>
        {props.loading ? "Enviando..." : "Atualizar Ordem"}
      </Button>
    </form>
  );
};

export default EditOrderForm;
