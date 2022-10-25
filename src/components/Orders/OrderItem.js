import React, { useContext } from "react";
import classes from "./OrderItem.module.css";
import OrderContext from "../../store/order-context";

const OrderItem = (props) => {
  const orderContext = useContext(OrderContext);
  const handleRemove = () => {
    orderContext.removeOrder(props.id);
  };

  return (
    <tr className={classes.table_row} key={`row_${props.idx}`}>
      <td className={classes.table_data} key={`idx_${props.idx}`}>
        {props.idx}
      </td>
      <td className={classes.table_data} key={`material_${props.idx}`}>
        {props.material}
      </td>
      <td className={classes.table_data} key={`ultima_atualizacao_${props.idx}`}>
        {props.ultima_atualizacao}
      </td>
      <td className={classes.table_data} key={`requerente_${props.idx}`}>
        {props.requerente}
      </td>
      <td className={classes.table_data} key={`status_${props.idx}`}>
        {props.status}
      </td>
      <td className={classes.table_data} key={`prioridade_${props.idx}`}>
        {props.prioridade}
      </td>
      <td className={classes.table_data} key={`tipo_${props.idx}`}>
        {props.tipo}
      </td>
      <td className={classes.table_button} key={`button_${props.idx}`}>
        <button className={classes.edit} key={`button_edit_${props.idx}`} />
        <button
          className={classes.remove}
          key={`button_remove_${props.id}`}
          onClick={handleRemove}
        />
      </td>
    </tr>
  );
};

export default OrderItem;
