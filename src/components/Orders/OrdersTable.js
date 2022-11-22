import React, { useState, Fragment, useEffect } from 'react';
import classes from './OrdersTable.module.css';
import OrderItem from './OrderItem';
import Button from '../UI/Button/Button';

const HEADERS = [
  ['ID', 'idx'],
  ['Material', 'material'],
  ['Requerente', 'requerente'],
  ['Prioridade', 'prioridade'],
  ['Tipo', 'tipo'],
  ['Status', 'status'],
  ['Última Atualização', 'ultima_atualizacao'],
];

const OrdersTable = (props) => {
  const [orders, setOrders] = useState([]);
  const [sorting, setSorting] = useState({
    column: null,
    descending: false,
  });

  useEffect(() => {
    setOrders(props.orders);
  }, [props.orders]);

  const sort = (e) => {
    const columnId = e.target.cellIndex;
    const column = e.target.id;
    const descending = sorting.column === columnId && !sorting.descending;
    const dataCopy = [...orders];
    dataCopy.sort((a, b) => {
      if (a[column] === b[column]) return 0;
      return descending
        ? a[column] < b[column]
          ? 1
          : -1
        : a[column] > b[column]
        ? 1
        : -1;
    });
    setOrders(dataCopy);
    setSorting({ column: columnId, descending });
  };

  let ordersTable = (
    <h2 className={classes.message}>Nenhuma ordem de serviço encontrada.</h2>
  );

  if (orders.length > 0) {
    ordersTable = (
      <table className={classes.table}>
        <thead onClick={sort}>
          <tr className={classes.table_row_sort}>
            {HEADERS.map((title, index) => {
              let arrow = '';
              if (sorting.column === index) {
                arrow = sorting.descending ? ' \u25B4' : ' \u25BE';
              }
              return (
                <th className={classes.table_header_sort} key={`sort_${index}_${title[1]}`}>
                  {arrow}
                </th>
              );
            })}
          </tr>
          <tr className={classes.table_row}>
            {HEADERS.map((title, index) => {
              return (
                <th
                  className={classes.table_header}
                  key={`header_${index}_${title[1]}`}
                  id={title[1]}
                >
                  {title[0]}
                </th>
              );
            })}
            <th className={classes.table_header_actions}>Ações</th>
          </tr>
        </thead>
        <tbody className={classes.table_body}>
          {orders.map((row) => (
            <OrderItem order={row} onHide={props.onHide} key={row.id} id={row.id} />
          ))}
        </tbody>
      </table>
    );
  }

  let content = ordersTable;

  if (props.error) {
    let error =
      props.error.substring(0, 12) === 'NetworkError'
        ? 'Erro: acho que vc tá offline'
        : props.error;
    content = (
      <Fragment>
        <Button onClick={props.onFetch} className={classes.button}>
          Tentar Novamente
        </Button>
        ;{props.error && <p className={classes.message}>{error}</p>}
      </Fragment>
    );
  }

  if (props.loading) {
    content = <h2 className={classes.message}>Carregando ordens de serviço...</h2>;
  }

  return <Fragment>{content}</Fragment>;
};

export default OrdersTable;
