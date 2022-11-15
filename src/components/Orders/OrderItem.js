import React, { Fragment, useContext, useState, useMemo } from 'react';
import classes from './OrderItem.module.css';
import OrderContext from '../../store/order-context';
import ConfirmationForm from '../UI/ConfirmationForm/ConfirmationForm';
import NewOrder from './NewOrder';

const OrderItem = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const { order: order } = props;
  const logText = useMemo(() => {
    let text = '';
    order.log?.forEach((element) => {
      text += element + '\n';
    });
    return text;
  }, [order]);

  const orderContext = useContext(OrderContext);
  const handleRemove = () => {
    orderContext.removeOrder(order.id);
  };

  const showLogHandler = () => {
    if (showLog === true) setShowLog(false);
    else setShowLog(true);
  };

  const hideLogHandler = () => {
    setShowLog(false);
  };

  const showEditHandler = () => {
    if (showEdit === true) setShowEdit(false);
    else setShowEdit(true);
  };

  const hideEditHandler = () => {
    setShowEdit(false);
  };

  const showDeleteHandler = () => {
    if (showDeleteConfirmation === true) setShowDeleteConfirmation(false);
    else setShowDeleteConfirmation(true);
  };

  const hideDeleteHandler = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <Fragment>
      <tr className={classes.table_row} key={`row_${order.idx}`} id={`row_${order.idx}`}>
        <td className={classes.table_data}>{order.idx}</td>
        <td className={classes.table_data}>{order.material}</td>
        <td className={classes.table_data}>{order.requerente}</td>
        <td className={classes.table_data}>{order.prioridade}</td>
        <td className={classes.table_data}>{order.tipo}</td>
        <td className={classes.table_data}>{order.status}</td>
        <td className={classes.table_data}>{order.ultima_atualizacao}</td>
        <td className={classes.table_button}>
          <button className={classes.details} onClick={showLogHandler} />
          <button className={classes.edit} onClick={showEditHandler} />
          <button className={classes.remove} onClick={showDeleteHandler} />
        </td>
      </tr>
      {showEdit && <NewOrder onHide={hideEditHandler} editMode={true} order={order} />}
      {showDeleteConfirmation && (
        <ConfirmationForm
          onHide={hideDeleteHandler}
          message={'Tem certeza que quer excluir esse item?'}
          button_text={'Excluir'}
          submitHandler={handleRemove}
        />
      )}
      {showLog && (
        <ConfirmationForm
          onHide={hideLogHandler}
          message={'Histórico da Ordem de Serviço'}
          message_secondary={logText}
          button_text={'Ok'}
          submitHandler={hideLogHandler}
        />
      )}
    </Fragment>
  );
};

export default OrderItem;
