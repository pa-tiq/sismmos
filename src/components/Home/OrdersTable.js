import React, { useState, Fragment, useEffect } from "react";
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
    setSorting({ column:columnId, descending });
  };

  let ordersTable = <h2 className={classes.message}>Nenhuma ordem de serviço encontrada.</h2>;

  if (orders.length > 0) {
    ordersTable = (
      <table className={classes.table}>
        <thead onClick={sort}>
          <tr className={classes.table_row} >
            {HEADERS.map((title, idx) => {
              let header = title[0];
              if (sorting.column === idx) {
                header = title[0] + (sorting.descending ? " \u2191" : " \u2193");
              }
              return (
                <th className={classes.table_header} key={idx} id={title[1]}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={classes.table_body}>
          {orders.map((row, idx) => (
            <tr className={classes.table_row} key={idx}>
              <td className={classes.table_data} id={"id"}>
                {row.idx}
              </td>
              <td className={classes.table_data} id={"material"}>
                {row.material}
              </td>
              <td className={classes.table_data} id={"ultima_atualizacao"}>
                {row.ultima_atualizacao}
              </td>
              <td className={classes.table_data} id={"requerente"}>
                {row.requerente}
              </td>
              <td className={classes.table_data} id={"status"}>
                {row.status}
              </td>
              <td className={classes.table_data} id={"prioridade"}>
                {row.prioridade}
              </td>
              <td className={classes.table_data} id={"tipo"}>
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
    content = <h2 className={classes.message}>Carregando ordens de serviço...</h2>;
  }

  return <Fragment>{content}</Fragment>;
};

export default OrdersTable;
