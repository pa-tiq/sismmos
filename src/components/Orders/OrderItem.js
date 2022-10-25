import React, { Fragment, useContext, useState } from "react";
import classes from "./OrderItem.module.css";
import OrderContext from "../../store/order-context";
import EditOrder from "./EditOrder";

const OrderItem = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const orderContext = useContext(OrderContext);
  const handleRemove = () => {
    orderContext.removeOrder(props.order.id);
  };

  const showEditHandler = () => {
    if (showEdit === true) setShowEdit(false);
    else setShowEdit(true);
  };

  const hideEditHandler = () => {
    setShowEdit(false);
  };

  return (
    <Fragment>
      <tr
        className={classes.table_row}
        key={`row_${props.order.idx}`}
        id={`row_${props.order.idx}`}
      >
        <td
          className={classes.table_data}
          key={`idx_${props.order.idx}`}
          id={`idx_${props.order.idx}`}
        >
          {props.order.idx}
        </td>
        <td
          className={classes.table_data}
          key={`material_${props.order.idx}`}
          id={`material_${props.order.idx}`}
        >
          {props.order.material}
        </td>
        <td
          className={classes.table_data}
          key={`requerente_${props.order.idx}`}
          id={`requerente_${props.order.idx}`}
        >
          {props.order.requerente}
        </td>
        <td
          className={classes.table_data}
          key={`status_${props.order.idx}`}
          id={`status_${props.order.idx}`}
        >
          {props.order.status}
        </td>
        <td
          className={classes.table_data}
          key={`prioridade_${props.order.idx}`}
          id={`prioridade_${props.order.idx}`}
        >
          {props.order.prioridade}
        </td>
        <td
          className={classes.table_data}
          key={`tipo_${props.order.idx}`}
          id={`tipo_${props.order.idx}`}
        >
          {props.order.tipo}
        </td>
        <td
          className={classes.table_data}
          key={`ultima_atualizacao_${props.order.idx}`}
          id={`ultima_atualizacao_${props.order.idx}`}
        >
          {props.order.ultima_atualizacao}
        </td>
        <td
          className={classes.table_button}
          key={`button_${props.order.idx}`}
          id={`button_${props.order.idx}`}
        >
          <button
            className={classes.edit}
            key={`button_edit_${props.order.idx}`}
            id={`button_edit_${props.order.idx}`}
            onClick={showEditHandler}
          />
          <button
            className={classes.remove}
            key={`button_remove_${props.order.idx}`}
            id={`button_remove_${props.order.idx}`}
            onClick={handleRemove}
          />
        </td>
      </tr>
      {showEdit && <EditOrder onHide={hideEditHandler} order={props.order} />}
    </Fragment>
  );
};

export default OrderItem;
