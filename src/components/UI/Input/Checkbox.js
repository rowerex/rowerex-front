import classes from "./Input.module.scss";
import React from "react";


const Checkbox = (props) => {

  return (
    <label className={classes.checkboxLabel} htmlFor={props.id}>
      <input className={classes.checkbox} type="checkbox"
             id={props.id}
             name={props.name}
             checked={props.checked}
             onChange={props.onChange}/>
      <span className={classes.checkmark}></span>
      {props.children}
    </label>
  )
}

export default Checkbox;