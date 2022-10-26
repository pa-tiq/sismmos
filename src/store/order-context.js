import React from "react";

const OrderContext = React.createContext({
  orders: [],
  orderID: 0,
  isLoading: false,
  error: null,
  getLog: (orderId) => {},
  addOrder: (order) => {},
  removeOrder: (orderId) => {},
  updateOrder: (order) => {},
  fetchOrders: () => {},
});

export default OrderContext;
