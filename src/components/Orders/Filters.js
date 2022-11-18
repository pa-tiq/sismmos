import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from './Orders.module.css';
import Card from '../UI/Card/Card';
import Select from '../UI/Select/Select';
import Input from '../UI/Input/Input';
import OrderContext from '../../store/order-context';

const Filters = (props) => {
  const orderContext = useContext(OrderContext);
  const { orders } = orderContext;
  const [values, setValues] = useState({
    requerente: [''],
    prioridade: [''],
    tipo: [''],
    status: [''],
  });

  useEffect(() => {
    let allvalues = {
      requerente: [''],
      prioridade: [''],
      tipo: [''],
      status: [''],
    }
    orders.forEach((order)=>{
      if(!allvalues.requerente.slice(1).includes(order.requerente)) allvalues.requerente.push(order.requerente);
      if(!allvalues.prioridade.slice(1).includes(order.prioridade)) allvalues.prioridade.push(order.prioridade);
      if(!allvalues.tipo.slice(1).includes(order.tipo)) allvalues.tipo.push(order.tipo);
      if(!allvalues.status.slice(1).includes(order.status)) allvalues.status.push(order.status);
    });
    setValues(allvalues);
  }, [orders]);

  const requerenteRef = useRef('');
  const prioridadeRef = useRef('');
  const tipoRef = useRef('');
  const statusRef = useRef('');

  const refs = {
    requerente: requerenteRef,
    prioridade: prioridadeRef,
    tipo: tipoRef,
    status: statusRef,
  };

  const requerenteChangeHandler = (e) => {
    props.onSelectChange('requerente',e.target.value);
  };  
  const prioridadeChangeHandler = (e) => {
    props.onSelectChange('prioridade',e.target.value);
  };  
  const tipoChangeHandler = (e) => {
    props.onSelectChange('tipo',e.target.value);
  };  
  const statusChangeHandler = (e) => {
    props.onSelectChange('status',e.target.value);
  };

  const changeHandlers = {
    requerente: requerenteChangeHandler,
    prioridade: prioridadeChangeHandler,
    tipo: tipoChangeHandler,
    status: statusChangeHandler,
  };

  const filters = Object.keys(refs).map((key) => {
    if (refs[key]) {
      return (
        <Card className={classes.filters} key={`filter_${key}`}>
          <Select reff={refs[key]} label={key} options={values[key]} onChange={changeHandlers[key]}/>
        </Card>
      );
    } else {
      return (
        <Card className={classes.filters} key={`filter_${key}`}>
          <label htmlFor={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}`}</label>
          <input
            type='text'
            id={key}
            ref={refs[key]}
            defaultValue={props.editMode ? props.order[key] : undefined}
          />
        </Card>
      );
    }
  });
  return (
    <div className={classes.search_and_filters}>
      <Card className={classes.search}>
        <Input
          className={classes.searchInput}
          label='Pesquisa'
          type='input'
          id='search'
          onChange={props.onSearchInputChange}
        />
      </Card>
      {filters}
    </div>
  );
};

export default Filters;
