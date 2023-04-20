import React, { useState, useEffect, useContext } from 'react';
import useHttp from '../hooks/use-http';
import OrderContext from './order-context';
import AuthContext from './auth-context';

const OrderProvider = (props) => {
  const httpObj = useHttp();
  const authContext = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [orderID, setOrderID] = useState(1);
  const [constraints, setConstraints] = useState({});

  const removeOrderHandler = async (orderId) => {
    const deleteConfig = {
      //url: `https://react-http-ccf63-default-rtdb.firebaseio.com/orders/${orderId}.json`,
      url: `http://localhost:8080/orders/order/${orderId}`,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + authContext.token,
      },
    };
    const createTask = () => {
      const updatedItems = orders.filter((item) => {
        return item.id !== orderId;
      });
      setOrders(updatedItems);
      setOrderID((prevData) => prevData - 1);
    };
    httpObj.sendRequest(deleteConfig, createTask);
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
      criador: order.criador,
    };

    const updateConfig = {
      //url: `https://react-http-ccf63-default-rtdb.firebaseio.com/orders/${order.id}.json`,
      url: `http://localhost:8080/orders/order/${order.id}`,
      method: 'PUT',
      body: orderToUpdate,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authContext.token,
      },
    };
    const createTask = () => {
      const updatedItems = [...orders];
      updatedItems[order.idx - 1] = order;
      setOrders(updatedItems);
    };
    httpObj.sendRequest(updateConfig, createTask);
  };

  const fetchOrdersHandler = async () => {
    const requestConfig = {
      //url: "https://react-http-ccf63-default-rtdb.firebaseio.com/orders.json",
      url: 'http://localhost:8080/orders/orders',
      headers: {
        Authorization: 'Bearer ' + authContext.token,
      },
    };
    const createTask = (response) => {
      const newOrders = response.orders;
      const loadedOrders = [];
      let index = 1;
      for (const orderKey in newOrders) {
        loadedOrders.push({
          id: newOrders[orderKey]._id,
          idx: `${index}`,
          status: newOrders[orderKey].status,
          material: newOrders[orderKey].material,
          ultima_atualizacao: newOrders[orderKey].ultima_atualizacao,
          requerente: newOrders[orderKey].requerente,
          prioridade: newOrders[orderKey].prioridade,
          tipo: newOrders[orderKey].tipo,
          log: newOrders[orderKey].log,
          criador: newOrders[orderKey].criador,
        });
        index++;
      }
      setOrderID(index);
      setOrders(loadedOrders);
    };
    httpObj.sendRequest(requestConfig, createTask);
  };

  const postOrderHandler = async (order) => {
    const log = [
      `Log do objeto ${orderID}: "${order.material}" `,
      `Criado em ${order.ultima_atualizacao} `,
    ];
    let lognew = '';
    for (const [key, value] of Object.entries(order)) {
      if (key !== 'ultima_atualizacao' && value.length !== 0)
        lognew += `${key}:${JSON.stringify(value)} `;
    }
    log.push(lognew);
    order.log = log;
    order.userId = authContext.userId;
    const postConfig = {
      //url: "https://react-http-ccf63-default-rtdb.firebaseio.com/orders.json",
      url: 'http://localhost:8080/orders/order',
      method: 'POST',
      body: order,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authContext.token,
      },
    };
    const createTask = (orderData) => {
      //const generatedId = orderData.name; //firebase-specific: "name" contains generated id
      const loadedOrder = {
        id: orderData.order._id,
        status: order.status,
        ultima_atualizacao: order.ultima_atualizacao,
        material: order.material,
        requerente: order.requerente,
        prioridade: order.prioridade,
        tipo: order.tipo,
        log: order.log,
        criador: orderData.criador,
      };
      loadedOrder.idx = `${orderID}`;
      setOrders((prevData) => prevData.concat(loadedOrder));
      setOrderID((prevData) => prevData + 1);
    };
    httpObj.sendRequest(postConfig, createTask);
  };

  const putConstraintsHandler = async (constraints) => {
    const log = [
      `Log das restrições de dados: `,
      `Criado em ${constraints.ultima_atualizacao} `,
    ];
    for (const [key, value] of Object.entries(constraints)) {
      if (key !== 'ultima_atualizacao' && value.length !== 0)
        log.push(`${key}:${JSON.stringify(value)}`);
    }
    constraints.log = log;
    const postConfig = {
      //url: 'https://react-http-ccf63-default-rtdb.firebaseio.com/constraints.json',
      url: 'http://localhost:8080/constraints/',
      method: 'PUT',
      body: constraints,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authContext.token,
      },
    };
    const createTask = (constraintsData) => {
      const loadedConstraints = {
        status: constraintsData.constraint.status,
        ultima_atualizacao: constraintsData.constraint.ultima_atualizacao,
        requerente: constraintsData.constraint.requerente,
        prioridade: constraintsData.constraint.prioridade,
        tipo: constraintsData.constraint.tipo,
        log: constraintsData.constraint.log,
      };
      setConstraints(loadedConstraints);
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
    console.log(constraints);
    console.log(newConst);
    let logNovo = [...constraints.log];
    for (const [key, value] of Object.entries(diff)) {
      if (!value && newConst[key] && newConst[key].length !== 0) {
        const msg = `[${newConst.ultima_atualizacao}] ${key}: ${
          constraints[key] ? JSON.stringify(constraints[key]) : '[ ]'
        } → ${JSON.stringify(newConst[key])}`;
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
      //url: `https://react-http-ccf63-default-rtdb.firebaseio.com/constraints.json`,
      url: `http://localhost:8080/constraints/${constraints.id}`,
      method: 'PATCH',
      body: updatedConstraint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authContext.token,
      },
    };
    const createTask = () => {
      fetchConstraintsHandler();
    };
    httpObj.sendRequest(updateConfig, createTask);
  };

  const fetchConstraintsHandler = async () => {
    const requestConfig = {
      //url: 'https://react-http-ccf63-default-rtdb.firebaseio.com/constraints.json',
      url: 'http://localhost:8080/constraints',
      headers: {
        Authorization: 'Bearer ' + authContext.token,
      },
    };
    const updateConstraints = (constr) => {
      const constraints = constr.constraints[0];
      let loadedConstraints = {};
      if (!constraints) {
        loadedConstraints = {};
      } else {
        loadedConstraints = {
          id: constraints._id,
          status: constraints.status,
          requerente: constraints.requerente,
          prioridade: constraints.prioridade,
          tipo: constraints.tipo,
          ultima_atualizacao: constraints.ultima_atualizacao,
          log: constraints.log,
        };
      }
      setConstraints(loadedConstraints);
    };
    httpObj.sendRequest(requestConfig, updateConstraints);
  };

  useEffect(() => {
    fetchOrdersHandler();
    fetchConstraintsHandler();
  }, []); //this only runs once - when the app starts

  return (
    <OrderContext.Provider
      value={{
        orders: orders,
        orderID: orderID,
        isLoading: httpObj.isLoading,
        error: httpObj.error,
        constraints: constraints,
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
