import React, { Fragment, useContext, useState, useMemo } from "react";
import classes from "./OrderItem.module.css";
import OrderContext from "../../store/order-context";
import EditOrder from "./EditOrder";
import ConfirmationForm from "../UI/ConfirmationForm/ConfirmationForm";

const OrderItem = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const { order : order } = props;
  const logText = useMemo(() => {
    let text = '';
    order.log?.forEach((element) => {
      text += element + '\n';
    })
    return text;
  },[order])

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
      <tr
        className={classes.table_row}
        key={`row_${order.idx}`}
        id={`row_${order.idx}`}
      >
        <td
          className={classes.table_data}
          key={`idx_${order.idx}`}
          id={`idx_${order.idx}`}
        >
          {order.idx}
        </td>
        <td
          className={classes.table_data}
          key={`material_${order.idx}`}
          id={`material_${order.idx}`}
        >
          {order.material}
        </td>
        <td
          className={classes.table_data}
          key={`requerente_${order.idx}`}
          id={`requerente_${order.idx}`}
        >
          {order.requerente}
        </td>
        <td
          className={classes.table_data}
          key={`status_${order.idx}`}
          id={`status_${order.idx}`}
        >
          {order.status}
        </td>
        <td
          className={classes.table_data}
          key={`prioridade_${order.idx}`}
          id={`prioridade_${order.idx}`}
        >
          {order.prioridade}
        </td>
        <td
          className={classes.table_data}
          key={`tipo_${order.idx}`}
          id={`tipo_${order.idx}`}
        >
          {order.tipo}
        </td>
        <td
          className={classes.table_data}
          key={`ultima_atualizacao_${order.idx}`}
          id={`ultima_atualizacao_${order.idx}`}
        >
          {order.ultima_atualizacao}
        </td>
        <td
          className={classes.table_button}
          key={`button_${order.idx}`}
          id={`button_${order.idx}`}
        >
          <button
            className={classes.details}
            key={`button_details_${order.idx}`}
            id={`button_details_${order.idx}`}
            onClick={showLogHandler}
          />
          <button
            className={classes.edit}
            key={`button_edit_${order.idx}`}
            id={`button_edit_${order.idx}`}
            onClick={showEditHandler}
          />
          <button
            className={classes.remove}
            key={`button_remove_${order.idx}`}
            id={`button_remove_${order.idx}`}
            onClick={showDeleteHandler}
          />
        </td>
      </tr>
      {showEdit && <EditOrder onHide={hideEditHandler} order={order} />}
      {showDeleteConfirmation && (
        <ConfirmationForm
          onHide={hideDeleteHandler}
          message={"Tem certeza que quer excluir esse item?"}
          button_text={"Excluir"}
          submitHandler={handleRemove}
        />
      )}
      {showLog && (
        <ConfirmationForm
          onHide={hideLogHandler}
          message={"Histórico da Ordem de Serviço"}
          message_secondary={logText}
          button_text={"Ok"}
          submitHandler={hideLogHandler}
        />
      )}
    </Fragment>
  );
};

export default OrderItem;
