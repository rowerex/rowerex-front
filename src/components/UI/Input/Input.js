import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.scss";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.wrapper}>
      <label className={classes.label} htmlFor={props.name}>
        {props.name}
      </label>
      <input
        required={props.isRequired || false}
        className={classes.input}
        type={props.type || "text"}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder || ""}
        maxLength={props.maxLength}
        value={props.value}
        onChange={props.onChange}
        ref={ref}
      />
    </div>
  );


});
Input.propTypes = {
    name: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
};

Input.defaultProps = {
    maxLength: 200,
};
export default Input;
