import React, {useContext} from "react";
import EditOrderForm from "./EditOrderForm";
import Modal from "../UI/Modal/Modal";
import OrderContext from "../../store/order-context";

const EditOrder = (props) => {
  const orderContext = useContext(OrderContext);

  const editOrderHandler = (order) => {
    orderContext.updateOrder(order);
    props.onHide();
  }

  return (
    <Modal onHide={props.onHide}>
      <EditOrderForm order={props.order} onEditOrder={editOrderHandler} loading={orderContext.isLoading} />
      {orderContext.error && <p>{orderContext.error}</p>}
    </Modal>
  );
};

export default EditOrder;