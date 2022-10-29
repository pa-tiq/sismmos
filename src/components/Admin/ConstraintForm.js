import React, { useState, Fragment, useRef, useEffect } from "react";
import classes from "./ConstraintForm.module.css";

const DUMMY = [
  'OI',
  'FDP',
]

const ConstraintForm = (props) => {

  const [constraints, setConstraints] = useState(props.constraints);
  const [edit,setEdit] = useState(null);

  const inputForm = useRef(null);

  useEffect(() => {
    props.updateConstraints(props.field,constraints);
  },[constraints])

  useEffect(() => {
    if(inputForm.current) inputForm.current.focus();
  },[edit]);

  function showEditor(e){
    setEdit({
      row: parseInt(e.target.id),
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    const input = e.target.firstChild.value;
    const dataCopy = [...constraints]
    dataCopy[edit.row] = input;
    setEdit(null);
    setConstraints(dataCopy);
  }

  function handleBlur(e){
    const input = e.target.value;
    const dataCopy = [...constraints]
    dataCopy[edit.row] = input;
    setEdit(null);
    setConstraints(dataCopy);
  }

  function handleKeyDown(e){
    if(e.key == "Escape"){
      setEdit(null);
    }
  }
  
  const addRowHandler = () => {
    let newcon = [...constraints];
    if(newcon.length !== 0){
      if (newcon[newcon.length-1] === '') return;
    }
    newcon.push('');
    setConstraints(newcon);
  }

  const deleteRowHandler = () => {
    let newcon = [...constraints];
    if(newcon.length === 0) return;
    newcon.pop();
    setConstraints(newcon);
  }

  const constraintsColumn = (
    <table className={classes.table} key={`${props.field}_table`}>
      <thead className={classes.table_header}>
        <tr className={classes.table_row}>
          <th className={classes.table_header}>
            {props.field}
            <button
              className={classes.button_remove}
              onClick={deleteRowHandler}
            />
            <button
              className={classes.button_add}
              onClick={addRowHandler}
            />
          </th>
          <th className={classes.table_header}></th>
        </tr>
      </thead>
      <tbody className={classes.table_body}>
        {constraints.map((row,idx)=>{
          if (edit && edit.row === idx) {
            row = (
              <form onSubmit={handleSubmit} onBlur={handleBlur} onKeyDown={handleKeyDown}>
              <input ref={inputForm} type="text" defaultValue={row} />
              </form>
            );
          }
          return(
            <tr className={classes.table_row} key={`${props.field}_row_${idx}`}>
              <td className={classes.table_data}>
                {row}
              </td>
              <td className={classes.table_button}>
                <button
                  className={classes.button_edit}
                  onClick={showEditor}
                  id={idx}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );  

  return (
    <div className={classes.control}>
      {constraintsColumn}
    </div>
  );
};

export default ConstraintForm;
