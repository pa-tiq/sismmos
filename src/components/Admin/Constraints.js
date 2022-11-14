import React, { useState, useContext, useEffect } from 'react';
import classes from './Constraints.module.css';
import OrderContext from '../../store/order-context';
import Button from '../UI/Button/Button';
import ConstraintForm from './ConstraintForm';
import Card from '../UI/Card/Card';

const Constraints = () => {
  const orderContext = useContext(OrderContext);
  const { constraints: constraints } = orderContext;
  const [constrArr, setConstrArr] = useState([]);
  const [constrObj, setConstrObj] = useState({});
  const [updateIsValid, setUpdateIsValid] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let zero = '';
    if (minutes < 10) zero = '0';
    let currentDate = `${day}/${month}/${year} ${hours}:${zero}${minutes}`;
    constrObj.ultima_atualizacao = currentDate;
    if (!constraints || Object.keys(constraints).length === 0) {
      orderContext.putConstraints(constrObj);
    } else {
      orderContext.updateConstraints(constrObj);
    }
    setUpdateIsValid(false);
  };

  const handleUpdateConstraints = (field, cons) => {
    let newConst = {};
    if (!constraints && cons) {
      newConst[`${field}`] = cons;
      setConstrObj(newConst);
      setUpdateIsValid(true);
    } else {
      for (const [key, value] of Object.entries(constrObj)) {
        newConst[`${key}`] = [...value];
      }
      newConst[`${field}`] = cons;
      setConstrObj(newConst);

      const constraintsAreEqual =
        JSON.stringify(newConst[`${field}`]) === JSON.stringify(constraints[`${field}`]);
      const newConstraintEmpty =
        newConst[`${field}`].length === 0 ||
        (newConst[`${field}`].length === 1 && newConst[`${field}`][0] === '');
      const constraintExistsinDB = constraints[`${field}`];
      if (constraintsAreEqual || (newConstraintEmpty && !constraintExistsinDB)) {
        return;
      }
      setUpdateIsValid(true);
    }
  };

  let constr = [['status'], ['requerente'], ['prioridade'], ['tipo']];

  useEffect(() => {
    if (constraints) {
      for (const [key, value] of Object.entries(constraints)) {
        if (key !== 'ultima_atualizacao' && key !== 'log' && value) {
          constr.forEach((element) => {
            if (element[0] === key) {
              value.forEach((el) => {
                element.push(el);
              });
            }
          });
        }
      }
    }
    setConstrArr(constr);
  }, []);

  return (
    <Card className={classes.card_constraints}>
      <section className={classes.section_constraints}>
        {constrArr.map((element) => {
          return (
            <ConstraintForm
              field={element[0]}
              constraints={element.slice(1)}
              key={element[0]}
              updateConstraints={handleUpdateConstraints}
            />
          );
        })}
      </section>
      <Button
        disabled={!updateIsValid}
        onClick={submitHandler}
        className={classes.button_add}
      >
        Salvar Alterações
      </Button>
    </Card>
  );
};

export default Constraints;
