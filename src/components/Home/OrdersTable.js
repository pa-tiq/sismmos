import React, { useState, Fragment, useEffect, useCallback } from "react";
import classes from "./OrdersTable.module.css";

const HEADERS = [
  ["ID","id"],
  ["Material","material"],
  ["Última Atualização","ultima_atualizacao"],
  ["Requerente","requerente"],
  ["Status","status"],
  ["Prioridade","prioridade"],
  ["Tipo","tipo"]
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

  let ordersTable = <h2>Nenhuma ordem de serviço encontrada.</h2>;

  const sort = (e) => {
    const columnId = e.target.cellIndex;
    const column = e.target.id;
    const descending = sorting.column === columnId && !sorting.descending;
    const dataCopy = [...orders];
    console.log(column);
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
    setSorting({ column:columnId, descending });
  };

  if (orders.length > 0) {
    ordersTable = (
      <table className={classes.table}>
        <thead onClick={sort}>
          <tr>
            {HEADERS.map((title, idx) => {
              let header = title[0];
              if (sorting.column === idx) {
                header = title[0] + (sorting.descending ? " \u2191" : " \u2193");
              }
              return (
                <th className={classes.th} key={idx} id={title[1]}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {orders.map((row, idx) => (
            <tr className={classes.tr} key={idx}>
              <td className={classes.td} id={"id"}>
                {row.id}
              </td>
              <td className={classes.td} id={"material"}>
                {row.material}
              </td>
              <td className={classes.td} id={"ultima_atualizacao"}>
                {row.ultima_atualizacao}
              </td>
              <td className={classes.td} id={"requerente"}>
                {row.requerente}
              </td>
              <td className={classes.td} id={"status"}>
                {row.status}
              </td>
              <td className={classes.td} id={"prioridade"}>
                {row.prioridade}
              </td>
              <td className={classes.td} id={"tipo"}>
                {row.tipo}
              </td>
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

  return <Fragment>{content}</Fragment>;
};

export default OrdersTable;
