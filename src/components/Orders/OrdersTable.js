import React, { useState, Fragment, useEffect } from "react";
import classes from "./OrdersTable.module.css";
import OrderItem from "./OrderItem";
import Button from "../UI/Button/Button";

const HEADERS = [
  ["ID", "idx"],
  ["Material", "material"],
  ["Requerente", "requerente"],
  ["Prioridade", "prioridade"],
  ["Tipo", "tipo"],
  ["Status", "status"],
  ["Última Atualização", "ultima_atualizacao"],
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
      <table className={classes.table} key={"table_orders"} id={"table_orders"}>
        <thead onClick={sort} key={"table_headers"} id={"table_headers"}>
          <tr
            className={classes.table_row}
            key={"headers_row"}
            id={"headers_row"}
          >
            {HEADERS.map((title, index) => {
              let header = title[0];
              if (sorting.column === index) {
                header =
                  title[0] + (sorting.descending ? " \u2191" : " \u2193");
              }
              return (
                <th
                  className={classes.table_header}
                  key={`header_${index}_${title[1]}`}
                  id= {title[1]}
                >
                  {header}
                </th>
              );
            })}
            <th
              className={classes.table_header_actions}
              key={"edit_remove"}
              id={"edit_remove"}
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody
          className={classes.table_body}
          key={"table_body"}
          id={"table_body"}
        >
          {orders.map((row) => (
            <OrderItem order={row} onHide={props.onHide} key={row.id} id={row.id}/>
          ))}
        </tbody>
      </table>
    );
  }

  let content = ordersTable;

  if (props.error) {
    console.log(props.error.substring(0,12));
    let error = props.error.substring(0,12)==='NetworkError' ? 'Erro: acho que vc tá offline' : props.error;
    content = 
      <Fragment>
        <Button onClick={props.onFetch} className={classes.button}>Tentar Novamente</Button>;
        {props.error && <p className={classes.message}>{error}</p>}
      </Fragment>
  }

  if (props.loading) {
    content = (
      <h2 className={classes.message}>Carregando ordens de serviço...</h2>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default OrdersTable;
