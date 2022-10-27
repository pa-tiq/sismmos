import React, { useState, useEffect } from "react";
import useHttp from "../hooks/use-http";
import OrderContext from "./order-context";

const OrderProvider = (props) => {
  const httpObj = useHttp();
  const [orders, setOrders] = useState([]);
  const [orderID, setOrderID] = useState(1);
  const [constraints, setConstraints] = useState({});

  const removeOrderHandler = async (orderId) => {
    const deleteConfig = {
      url: `https://react-http-ccf63-default-rtdb.firebaseio.com/orders/${orderId}.json`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const createTask = () => {
      removeOrder(orderId);
    };
    httpObj.sendRequest(deleteConfig, createTask);
  };

  const removeOrder = (id) => {
    const updatedItems = orders.filter((item) => {
      return item.id !== id;
    });
    setOrders(updatedItems);
    setOrderID((prevData) => prevData - 1);
  };

  const updateOrderHandler = async (order) => {
    const oldOrder = orders[order.idx - 1];
    const diff = {
      status: order.status === oldOrder.status,
      material: order.material === oldOrder.material,
      requerente: order.requerente === oldOrder.requerente,
      prioridade: order.prioridade === oldOrder.prioridade,
      tipo: order.tipo === oldOrder.tipo,
    };
    let logNovo = [...oldOrder.log];
    for (const [key, value] of Object.entries(diff)) {
      if (!value) {
        const msg = `[${order.ultima_atualizacao}] ${key}: "${oldOrder[key]}" → "${order[key]}" `;
        logNovo.push(msg);
      }
    }
    order.log = logNovo;
    const orderToUpdate = {
      status: order.status,
      ultima_atualizacao: order.ultima_atualizacao,
      material: order.material,
      requerente: order.requerente,
      prioridade: order.prioridade,
      tipo: order.tipo,
      log: order.log,
    };
    const updateConfig = {
      url: `https://react-http-ccf63-default-rtdb.firebaseio.com/orders/${order.id}.json`,
      method: "PATCH",
      body: orderToUpdate,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const createTask = () => {
      updateOrder(order);
    };
    httpObj.sendRequest(updateConfig, createTask);
  };

  const updateOrder = (order) => {
    const updatedItems = [...orders];
    updatedItems[order.idx - 1] = order;
    setOrders(updatedItems);
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
          id: orderKey,
          idx: `${index}`,
          status: newOrders[orderKey].status,
          material: newOrders[orderKey].material,
          ultima_atualizacao: newOrders[orderKey].ultima_atualizacao,
          requerente: newOrders[orderKey].requerente,
          prioridade: newOrders[orderKey].prioridade,
          tipo: newOrders[orderKey].tipo,
          log: newOrders[orderKey].log,
        });
        index++;
      }
      setOrderID(index);
      setOrders(loadedOrders);
    };
    httpObj.sendRequest(requestConfig, updateOrders);
  };

  const postOrderHandler = async (order) => {
    const log = [
      `Log do objeto ${orderID}: "${order.material}" `,
      `Criado em ${order.ultima_atualizacao} `,
    ];
    order.log = log;
    const postConfig = {
      url: "https://react-http-ccf63-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: order,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const createTask = (orderData) => {
      const generatedId = orderData.name; //firebase-specific: "name" contains generated id
      const loadedOrder = {
        id: generatedId,
        status: order.status,
        ultima_atualizacao: order.ultima_atualizacao,
        material: order.material,
        requerente: order.requerente,
        prioridade: order.prioridade,
        tipo: order.tipo,
        log: order.log,
      };
      addOrderHandler(loadedOrder);
    };
    httpObj.sendRequest(postConfig, createTask);
  };

  const addOrderHandler = (order) => {
    order.idx = `${orderID}`;
    setOrders((prevData) => prevData.concat(order));
    setOrderID((prevData) => prevData + 1);
  };

  const getOrderLog = (orderId) => {
    const getLogConfig = {
      url: `https://react-http-ccf63-default-rtdb.firebaseio.com/orders/${orderId}/log.json`,
    };
    const getLogTask = (orderData) => {
      console.log(orderData);
    };
    httpObj.sendRequest(getLogConfig, getLogTask);
  };

  const putConstraintsHandler = async (constraints) => {
    const log = [
      `Log da restrições de dados: `,
      `Criado em ${constraints.ultima_atualizacao} `,
    ];
    constraints.log = log;
    const postConfig = {
      url: "https://react-http-ccf63-default-rtdb.firebaseio.com/constraints.json",
      method: "PUT",
      body: constraints,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const createTask = (constraintsData) => {
      const loadedOrder = {
        status: constraintsData.status,
        ultima_atualizacao: constraintsData.ultima_atualizacao,
        requerente: constraintsData.requerente,
        prioridade: constraintsData.prioridade,
        tipo: constraintsData.tipo,
        log: constraintsData.log,
      };
      setConstraints(loadedOrder);
    };
    httpObj.sendRequest(postConfig, createTask);
  };

  const updateConstraintsHandler = async (newConst) => {
    const diff = {
      status:
        JSON.stringify(newConst.status) === JSON.stringify(constraints.status),
      requerente:
        JSON.stringify(newConst.requerente) ===
        JSON.stringify(constraints.requerente),
      prioridade:
        JSON.stringify(newConst.prioridade) ===
        JSON.stringify(constraints.prioridade),
      tipo: JSON.stringify(newConst.tipo) === JSON.stringify(constraints.tipo),
    };
    let logNovo = [...constraints.log];
    for (const [key, value] of Object.entries(diff)) {
      if (!value) {
        const msg = `[${newConst.ultima_atualizacao}] ${key}: "${JSON.stringify(
          constraints[key]
        )}" → "${JSON.stringify(newConst[key])}" `;
        logNovo.push(msg);
      }
    }
    newConst.log = logNovo;
    const updatedConstraint = {
      status: newConst.status,
      ultima_atualizacao: newConst.ultima_atualizacao,
      requerente: newConst.requerente,
      prioridade: newConst.prioridade,
      tipo: newConst.tipo,
      log: newConst.log,
    };
    const updateConfig = {
      url: `https://react-http-ccf63-default-rtdb.firebaseio.com/constraints.json`,
      method: "PATCH",
      body: updatedConstraint,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const createTask = () => {
      setConstraints(newConst);
    };
    httpObj.sendRequest(updateConfig, createTask);
  };

  const fetchConstraintsHandler = () => {
    const requestConfig = {
      url: "https://react-http-ccf63-default-rtdb.firebaseio.com/constraints.json",
    };
    const updateConstraints = (constraints) => {
      const loadedConstraints = {
        status: constraints.status,
        ultima_atualizacao: constraints.ultima_atualizacao,
        requerente: constraints.requerente,
        prioridade: constraints.prioridade,
        tipo: constraints.tipo,
        log: constraints.log,
      };
      setConstraints(loadedConstraints);
    };
    httpObj.sendRequest(requestConfig, updateConstraints);
  };

  useEffect(() => {
    fetchOrdersHandler();
    setTimeout(() => {
      fetchConstraintsHandler();
    }, 5000);
  }, []); //this only runs once - when the app starts

  return (
    <OrderContext.Provider
      value={{
        orders: orders,
        orderID: orderID,
        isLoading: httpObj.isLoading,
        error: httpObj.error,
        constraints: constraints,
        getLog: getOrderLog,
        addOrder: postOrderHandler,
        removeOrder: removeOrderHandler,
        updateOrder: updateOrderHandler,
        fetchOrders: fetchOrdersHandler,
        putConstraints: putConstraintsHandler,
        updateConstraints: updateConstraintsHandler,
        fetchConstraints: fetchConstraintsHandler,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
