import React from "react";

const OrderContext = React.createContext({
  oders: [],
  orderID:0,
  addOrder: (order) => {},
  removeOrder: (orderId) => {},
  getOrders: () => {}
});

export default OrderContext;
