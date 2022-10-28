import React, { useState, useContext, useRef, useEffect, Fragment } from "react";
import classes from "./Constraints.module.css";
import OrderContext from "../../store/order-context";
import Button from "../UI/Button/Button";
import ConstraintForm from "./ConstraintForm";

const Constraints = () => {
  const orderContext = useContext(OrderContext);
  const { constraints: constraints } = orderContext.constraints;
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
    let zero = ''
    if (minutes < 10) zero = '0';
    let currentDate = `${day}/${month}/${year} ${hours}:${zero}${minutes}`;
    constrObj.ultima_atualizacao = currentDate;
    orderContext.updateConstraints(constrObj);
  };

  const handleUpdateConstraints = (field,cons) => {    
    let newConst = {};
    if(!constraints && cons){
      newConst[`${field}`] = cons;
      setConstrObj(newConst);
      setUpdateIsValid(true);
    }
    else{
      for (const [key,value] of Object.keys(constraints)){
        newConst[`${key}`] = [...value];
      }
      if (JSON.stringify(newConst[`${field}`]) === JSON.stringify(cons)){
        return;
      }
      newConst[`${field}`] = cons;
      setConstrObj(newConst);
      setUpdateIsValid(true);
    }
  }

  let constr = [];
  useEffect(() => {
    if (!constraints) {
      constr = [
        ["status"],
        ["requerente"],
        ["prioridade"],
        ["tipo"],
      ];
    } else {
      let index = 0;
      for (const [key, value] of Object.entries(constraints)) {
        if( key!=="ultima_atualizacao" && key!=="log"){
          constr[index].push(key);
          value.forEach((element) => {
            constr[index].push(element);
          });
          index++;
        }
      }
    }
    setConstrArr(constr);
  }, [constraints]);

  return (
    <Fragment>
      <section className={classes.card_admin}>
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
      <Button disabled={!updateIsValid} onClick={submitHandler} className={classes.button_add}>
        Salvar Restrições
      </Button>
    </Fragment>
  );
};

export default Constraints;
