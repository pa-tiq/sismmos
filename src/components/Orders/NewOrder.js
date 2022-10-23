import React, {Fragment} from "react";
import useHttp from "../../hooks/use-http";
import NewOrderForm from "./NewOrderForm";
import Modal from "../UI/Modal/Modal";

const NewOrder = (props) => {
  const httpObj = useHttp();

  const enterOrderHandler = async(order) => {
    const postConfig = {
      url: "https://react-http-ccf63-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: order,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const createTask = (orderData) => {
      const generatedId = orderData.name; //firebase-specific: "name" contains generated id
      const loadedOrder = {
        id:generatedId,
        status:order.status,
        ultima_atualizacao:order.ultima_atualizacao,
        material:order.material,
        requerente:order.requerente,
        prioridade:order.prioridade,
        tipo:order.tipo
      }
      props.onAddOrder(loadedOrder);
    };
    httpObj.sendRequest(postConfig, createTask);
  }

  return (
    <Modal onHide={props.onHide}>
      <NewOrderForm onEnterOrder={enterOrderHandler} loading={httpObj.isLoading} />
      {httpObj.error && <p>{httpObj.error}</p>}
    </Modal>
  );
};

export default NewOrder;