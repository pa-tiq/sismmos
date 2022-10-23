import React from "react";

const OrderContext = React.createContext({
  orders: [],
  orderID: 0,
  isLoading: false,
  error: null,
  addOrder: (order) => {},
  removeOrder: (orderId) => {},
  fetchOrders: () => {},
});

export default OrderContext;
