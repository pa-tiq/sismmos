import React, { useState, useEffect } from "react";

const OrderContext = React.createContext({
  isLoggedIn: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
});

export const OrderContextProvider = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log('order-context');
  }, []); //this only runs once - when the app starts

  const addOrderHandler = (order) => {
    setOrders((prevData) => prevData.concat(order));
  };

  const removeOrderHandler = (orderId) => {
    console.log('remove item');
  };

  return (
    <OrderContext.Provider
      value={{
        orders: orders,
        onAdd: addOrderHandler,
        onRemove: removeOrderHandler,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
