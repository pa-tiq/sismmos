import React from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import classes from "./ConfirmationForm.module.css";

const ConfirmationForm = (props) => {
  return (
    <Modal onHide={props.onHide}>
      <form className={classes.form_card} onSubmit={props.submitHandler}>
        <h3 className={classes.message}>{props.message}</h3>
        {props.message_secondary && (
          <div className={classes.message_secondary}>
            {props.message_secondary}
          </div>
        )}
        <Button
          onClick={props.submitHandler}
          className={classes.button_confirm}
        >
          {props.button_text}
        </Button>
      </form>
    </Modal>
  );
};

export default ConfirmationForm;
