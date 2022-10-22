import React, { useState, Fragment, useEffect } from "react";
import classes from './OrdersTable.module.css';

const DUMMY_HEADERS = [
  "ID",
  "Material",
  "Última Atualização",
  "Requerente",
  "Status",
  "Prioridade",
  "Tipo",
];

const OrdersTable = (props) => {

  const [orders, setOrders] = useState(props.orders);
  const [sorting, setSorting] = useState({
    column: null,
    descending: false,
  });

  useEffect(()=>{
    setOrders(props.orders);
  },[props.orders])

  let ordersTable = <h2>Nenhuma ordem de serviço encontrada.</h2>;

  const sort = (e) => {
    const column = e.target.cellIndex;
    const descending = sorting.column === column && !sorting.descending;
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
    setSorting({ column, descending });
  };

  if (orders.length > 0) {

    for(const [key,value] of Object.entries(props.orders)){
      <td className={classes.td} key={key}>
        {value}
      </td>
    }

    ordersTable = (
      <table className={classes.table}>
        <thead onClick={sort}>
          <tr>
            {DUMMY_HEADERS.map((title, idx) => {
              if (sorting.column === idx) {
                title += sorting.descending ? " \u2191" : " \u2193";
              }
              return (
                <th className={classes.th} key={idx}>
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {orders.map((row, idx) => (
            <tr className={classes.tr} key={idx}>
              <td className={classes.td}>{row.idx}</td>
              <td className={classes.td}>{row.material}</td>
              <td className={classes.td}>{row.ultima_atualizacao}</td>
              <td className={classes.td}>{row.requerente}</td>
              <td className={classes.td}>{row.status}</td>
              <td className={classes.td}>{row.prioridade}</td>
              <td className={classes.td}>{row.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  let content = ordersTable;

  if (props.error) {
    content = <button onClick={props.onFetch}>Tentar Novamente</button>;
  }

  if (props.loading) {
    content = <h2>Carregando ordens de serviço...</h2>;
  }

  return (
    <Fragment>{content}</Fragment>
    
  );
};

export default OrdersTable;
