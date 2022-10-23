import React, { useState, useEffect } from "react";
import useHttp from "../hooks/use-http";
import OrderContext from "./order-context";

const OrderProvider = (props) => {

  const httpObj = useHttp();
  const { sendRequest: fetchOrdersFromBackend } = httpObj;
  const [orders, setOrders] = useState([]);
  const [orderID, setOrderID] = useState(1);

  const addOrderHandler = (order) => {
    order.idx = `${orderID}`;
    setOrders((prevData) => prevData.concat(order));
    setOrderID((prevData) => prevData+1);
  };
  const removeOrderHandler = (id) => {
    const updatedItems = orders.filter((item) => {
      return item.id !== id;
    });
    setOrders(updatedItems);
    setOrderID((prevData) => prevData-1)
  };
  const fetchOrdersHandler = () => {
    const requestConfig = {
      url: "https://react-http-ccf63-default-rtdb.firebaseio.com/orders.json",
    };
    const updateOrders = (newOrders) => {
      const loadedOrders = [];
      let index = 1;
      for (const orderKey in newOrders) {
        loadedOrders.push({
          idx: `${index}`,
          status: newOrders[orderKey].status,
          material: newOrders[orderKey].material,
          ultima_atualizacao: newOrders[orderKey].ultima_atualizacao,
          requerente: newOrders[orderKey].requerente,
          prioridade: newOrders[orderKey].prioridade,
          tipo: newOrders[orderKey].tipo,
        });
        index++;       
      }
      setOrderID(index);
      setOrders(loadedOrders);    
    };
    fetchOrdersFromBackend(requestConfig, updateOrders);
  };

  useEffect(() => {
    fetchOrdersHandler();
  }, []); //this only runs once - when the app starts
 
  return (
    <OrderContext.Provider
      value={{
        orders: orders,
        orderID: orderID,
        addOrder: addOrderHandler,
        removeOrder: removeOrderHandler,
        fetchOrders: fetchOrdersHandler
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider


