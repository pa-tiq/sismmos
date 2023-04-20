import React, { useState, useContext, useMemo } from 'react';
import classes from './Admin.module.css';
import Card from '../UI/Card/Card';
import Constraints from './Constraints';
import OrderContext from '../../store/order-context';
import ConfirmationForm from '../UI/ConfirmationForm/ConfirmationForm';

const Admin = () => {
  const orderContext = useContext(OrderContext);
  const { constraints: constraints } = orderContext;
  const [showLog, setShowLog] = useState(false);

  const logText = useMemo(() => {
    let text = '';
    constraints.log?.forEach((element) => {
      text += element + '\n';
    });
    return text;
  }, [constraints]);

  const showLogHandler = () => {
    if (showLog === true) setShowLog(false);
    else setShowLog(true);
  };

  const hideLogHandler = () => {
    setShowLog(false);
  };

  return (
    <Card className={classes.card_admin}>
      <div className={classes.header}>
        <h1 className={classes.title}>{`Oi Admin!`}</h1>
      </div>
      <details className={classes.details} open>
        <summary>Restrições de dados</summary>
        <button className={classes.button_details} onClick={showLogHandler} />
        <Constraints />
      </details>
      {showLog && (
        <ConfirmationForm
          onHide={hideLogHandler}
          message={'Histórico das Restrições de Dados'}
          message_secondary={logText}
          button_text={'Ok'}
          submitHandler={hideLogHandler}
        />
      )}
    </Card>
  );
};

export default Admin;
