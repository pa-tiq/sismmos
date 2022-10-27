import React, { useState, Fragment, useRef, useEffect } from "react";
import classes from "./Constraints.module.css";

const ConstraintForm = (props) => {

  const fieldRef = useRef("");
  const [constraints,setConstraints] = useState([]);
  const [amount,setAmount] = useState(1);

  const AddInputHandler = (event) => {
    event.preventDefault();
    setAmount((prevAmount)=>prevAmount+1);
  };

  useEffect(()=>{
    setConstraints(props.constraints);
    props.constraints.length == 0 ? setAmount(1) : setAmount(props.constraints.length);
  },[])

  useEffect(()=>{ 
    if(amount>1 && amount===constraints.length){
      inputs = (
        <Fragment>
          {
          constraints.map((element,idx)=>{
            return(<input type="text" id={`${props.field}_${idx}`} defaultValue={element}/>)
          })
          }
        </Fragment>
      );
    }
    if(amount>1 && amount>constraints.length){
      inputs = (<input type="text" id={`${props.field}_0`} ref={fieldRef} />);
      for(let i = 1; i<amount; i++){
        inputs += (<input type="text" id={`${props.field}_${i}`}/>);
      }
    }
  },[amount,constraints])

  let inputs = (<input type="text" id={`${props.field}_0`} ref={fieldRef} />);


  return (
    <div className={classes.control}>
      <label htmlFor={`${props.field}_0`}>props.field</label>
      {inputs}
      <button className={classes.constraint_button} onClick={AddInputHandler}>➕</button>
    </div>
  );
};

export default ConstraintForm;
