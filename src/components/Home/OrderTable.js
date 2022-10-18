import React, { useState, useEffect, useCallback} from "react";
import classes from "./OrderTable.module.css";

const OrderTable = (props) => {

  const [orders, setOrders] = useState();
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

  return <h1>Ordens</h1>;
};

export default OrderTable;
