import React, { useState, useEffect, useCallback, Fragment} from "react";
import classes from "./OrderTable.module.css";

const DUMMY_HEADERS = ['ID', 'Material', 'Última Atualização' ,'Requerente', 'Status', 'Prioridade', 'Tipo'];
const DUMMY_DATA = [
    ['1', 'Rádio Falcon NS43','13/03/2022', 'CMA', 'Novo','Alta','Apoio Direto'],
    ['2', 'Rádio Bear KNS43','13/03/2022', '4CTA', 'Novo','Alta','Apoio Direto'],
    ['3', 'Rádio Dog LS43','13/03/2022', '3BIS', 'Novo','Alta','Apoio Direto']
];

const OrderTable = (props) => {

  const [orders, setOrders] = useState(DUMMY_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState({
    column: null,
    descending: false,
  });

  async function addOrderHandler(order) {
    const response = await fetch(
      "https://react-http-ccf63-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const fetchOrdersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-ccf63-default-rtdb.firebaseio.com/orders.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedOrders = [];
      for (const key in data) {
        loadedOrders.push({
          id: key,
          material: data[key].material,
          requerente: data[key].requerente,
          status: data[key].status,
          prioridade: data[key].prioridade,
          tipo: data[key].tipo,
          dataAtualizacao: data[key].dataAtualizacao,
        });
      }
      setOrders(loadedOrders);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  function sort(e) {
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
  }

  return (
    <Fragment>
      <h1>Ordens de Serviço</h1>
      <table className={classes.table}>
      <thead onClick={sort} >
        <tr>
          {DUMMY_HEADERS.map((title, idx) => {
            if(sorting.column == idx){
              title += sorting.descending ? ' \u2191' : ' \u2193';
            }
            return <th className={classes.th} key={idx}>{title}</th>
          })}
      </tr>
      </thead>
      <tbody className={classes.tbody}>
        {orders.map((row, idx) => (
          <tr className={classes.tr} key={idx}>
          {row.map((cell, idx) => (
            <td className={classes.td} key={idx}>{cell}</td>
          ))}
          </tr>
      ))}
      </tbody>
    </table>
  </Fragment>
  );
};

export default OrderTable;
