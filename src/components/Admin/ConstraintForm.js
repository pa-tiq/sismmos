import React, { useState, Fragment, useRef, useEffect } from "react";
import classes from "./Constraints.module.css";

const ConstraintForm = (props) => {

  const [constraints, setConstraints] = useState([]);
  const [amount, setAmount] = useState(1);

  const AddInputHandler = (event) => {
    event.preventDefault();
    let constr = [];
    let element = [];
    for(let i=0; i<amount; i++){
      element = document.getElementById(`${props.field}_${i}`);
      constr.push(element.value);
    }
    setConstraints(constr);
    setAmount((prevAmount) => prevAmount + 1);    
  };

  const DeleteInputHandler = (event) => {
    event.preventDefault();
    setAmount((prevAmount) => {
      if (prevAmount > 1) return prevAmount - 1;
      else return prevAmount;
    });
  };

  const handleInputBlur = (e) => {
    console.log('inputblur: ',e.target.value);
  }

  useEffect(() => {
    setConstraints(props.constraints);
    props.constraints.length == 0
      ? setAmount(1)
      : setAmount(props.constraints.length);
  }, []);

  let inputs = <input type="text" id={`${props.field}_0`} onBlur={handleInputBlur} defaultValue={constraints[0]}/>;

  useEffect(() => {

  }, [amount, constraints]);

  if (amount > 1 && amount === constraints.length) {
    inputs = (
      <Fragment>
        {constraints.map((element, idx) => {
          return (
            <input
              type="text"
              id={`${props.field}_${idx}`}
              defaultValue={element}
              onBlur={handleInputBlur}
            />
          );
        })}
      </Fragment>
    );
  }
  if (amount > 1 && amount > constraints.length) {
    let n = [0];
    for (let i = 1; i < amount; i++) {
      n.push(i);
    }
    inputs = (
      <Fragment>
        {n.map((idx) => {
          return (
            <input
              type="text"
              id={`${props.field}_${idx}`}
              key={idx}
              onBlur={handleInputBlur}
              defaultValue={constraints[idx]}
            />
          );
        })}
      </Fragment>
    );
    
  }

  let content = <Fragment>{inputs}</Fragment>;

  return (
    <div className={classes.control}>
      <label htmlFor={`${props.field}_0`}>{props.field.toUpperCase()}</label>
      {content}
      <button
        className={classes.constraint_button}
        onClick={DeleteInputHandler}
      >
        ➖
      </button>
      <button className={classes.constraint_button} onClick={AddInputHandler}>
        ➕
      </button>
    </div>
  );
};

export default ConstraintForm;
