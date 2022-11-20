import React, { useRef, useContext } from 'react';
import classes from './NewOrderForm.module.css';
import Button from '../UI/Button/Button';
import OrderContext from '../../store/order-context';
import Select from '../UI/Select/Select';

const NewOrderForm = (props) => {
  const orderContext = useContext(OrderContext);
  const { constraints: constraints } = orderContext;
  const materialRef = useRef('');
  const requerenteRef = useRef('');
  const prioridadeRef = useRef('');
  const tipoRef = useRef('');
  const statusRef = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredMaterial = materialRef.current.value;
    const enteredRequerente = requerenteRef.current.value;
    const enteredPrioridade = prioridadeRef.current.value;
    const enteredTipo = tipoRef.current.value;
    const enteredStatus = statusRef.current.value;

    if (
      enteredMaterial.trim().length > 0 &&
      enteredRequerente.trim().length > 0 &&
      enteredPrioridade.trim().length > 0 &&
      enteredTipo.trim().length > 0 &&
      enteredStatus.trim().length > 0
    ) {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let zero = '';
      if (minutes < 10) zero = '0';
      let currentDate = `${day}/${month}/${year} ${hours}:${zero}${minutes}`;

      const order = {
        status: enteredStatus,
        ultima_atualizacao: currentDate,
        material: enteredMaterial,
        requerente: enteredRequerente,
        prioridade: enteredPrioridade,
        tipo: enteredTipo,
      };
      if(props.editMode){
        order.idx = props.order.idx;
        order.id = props.order.id;
        order.criador = props.order.criador;
      }
      props.onEnterOrder(order);
    }
  };

  const hasConstraints = {
    requerente:
      constraints && constraints.requerente && constraints.requerente.length > 0,
    prioridade:
      constraints && constraints.prioridade && constraints.prioridade.length > 0,
    tipo: constraints && constraints.tipo && constraints.tipo.length > 0,
    status: constraints && constraints.status && constraints.status.length > 0,
  };

  const refs = {
    requerente: requerenteRef,
    prioridade: prioridadeRef,
    tipo: tipoRef,
    status: statusRef,
  };

  const inputs = Object.keys(hasConstraints).map((key) => {
    if (hasConstraints[key]) {
      return (
        <Select
          reff={refs[key]}
          label={key}
          options={constraints[key]}
          key={`select_${key}`}
          editMode={props.editMode}
          oldValue={props.editMode ? props.order[key] : undefined}
        />
      );
    } else {
      return (
        <div className={classes.control} key={`input_${key}`}>
          <label htmlFor={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}`}</label>
          <input
            type='text'
            id={key}
            ref={refs[key]}
            defaultValue={props.editMode ? props.order[key] : undefined}
          />
        </div>
      );
    }
  });

  return (
    <form className={classes.form_card} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='material'>Material</label>
        <input
          type='text'
          id='material'
          ref={materialRef}
          defaultValue={props.editMode ? props.order.material : undefined}
        />
      </div>
      {inputs}
      <Button onClick={submitHandler} className={classes.button_add}>
        {props.loading
          ? 'Enviando...'
          : props.editMode
          ? 'Editar Ordem'
          : 'Adicionar Ordem'}
      </Button>
    </form>
  );
};

export default NewOrderForm;
