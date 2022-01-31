import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.scss";

const Input = ({ ...props }) => {
  return (
    <label className={classes.label} htmlFor={props.name}>
      <p>{props.name}</p>
      <input
        className={classes.input}
        type={props.type || "text"}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder || ""}
        maxLength={props.maxLength}
      />
    </label>
  );

  Input.propTypes = {
    tag: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
  };

  Input.defaultProps = {
    maxLength: 200,
  };
};

export default Input;
