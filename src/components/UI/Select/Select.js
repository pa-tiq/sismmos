import React from "react";
import classes from "./Select.module.css";

const Select = (props) => {
  return (
    <div className={classes.control}>
      <label htmlFor={props.label} className={classes.label}>
        {`${props.label.charAt(0).toUpperCase() + props.label.slice(1)}`}
      </label>
      <select
        id={props.label}
        className={classes.select}
        onChange={props.onChange}
        ref={props.reff}
        key={`select_${props.label}`}
        defaultValue={props.editMode ? props.oldValue : undefined }
      >
        {props.options.map((option, idx) => {
          return (
            <option
              className={classes.options}
              key={`option_${props.label}_${idx}`}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
