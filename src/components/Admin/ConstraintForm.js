import React, { useState, Fragment, useRef, useEffect } from "react";
import classes from "./ConstraintForm.module.css";

const DUMMY = [
  'OI',
  'FDP',
]

const ConstraintForm = (props) => {

  const [constraints, setConstraints] = useState([]);
  const [edit,setEdit] = useState(null);

  const inputForm = useRef(null);

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
    setEdit(null);
  }

  function handleKeyDown(e){
    if(e.key == "Escape"){
      setEdit(null);
    }
  }
  
  const addRowHandler = () => {

  }

  const deleteRowHandler = () => {
    
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
        {DUMMY.map((row,idx)=>{
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
