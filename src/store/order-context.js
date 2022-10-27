import React from "react";

const OrderContext = React.createContext({
  orders: [],
  orderID: 0,
  isLoading: false,
  error: null,
  constraints: {},
  getLog: (orderId) => {},
  addOrder: (order) => {},
  removeOrder: (orderId) => {},
  updateOrder: (order) => {},
  fetchOrders: () => {},
  putConstraints: () => {},
  updateConstraints: () => {},
  fetchConstraints: () => {},
});

export default OrderContext;
