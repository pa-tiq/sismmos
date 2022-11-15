import React, { useContext } from 'react';
import NewOrderForm from './NewOrderForm';
import Modal from '../UI/Modal/Modal';
import OrderContext from '../../store/order-context';

const NewOrder = (props) => {
  const orderContext = useContext(OrderContext);

  const enterOrderHandler = (order) => {
    props.editMode ? orderContext.updateOrder(order) : orderContext.addOrder(order);
    props.onHide();
  };

  return (
    <Modal onHide={props.onHide} key={'AddModal'}>
      <NewOrderForm
        onEnterOrder={enterOrderHandler}
        order={props.order}
        editMode={props.editMode}
        loading={orderContext.isLoading}
      />
    </Modal>
  );
};

export default NewOrder;
