import React, {useContext} from "react";
import useHttp from "../../hooks/use-http";
import NewOrderForm from "./NewOrderForm";
import Modal from "../UI/Modal/Modal";
import OrderContext from "../../store/order-context";

const NewOrder = (props) => {
  const orderContext = useContext(OrderContext);

  const enterOrderHandler = (order) => {
    orderContext.addOrder(order);
    props.onHide();
  }

  return (
    <Modal onHide={props.onHide}>
      <NewOrderForm onEnterOrder={enterOrderHandler} loading={orderContext.isLoading} />
      {orderContext.error && <p>{orderContext.error}</p>}
    </Modal>
  );
};

export default NewOrder;