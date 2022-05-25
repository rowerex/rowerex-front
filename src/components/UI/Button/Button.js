import React from "react";
import { ReactComponent as ServiceIcon } from "../../../assets/icons/button-service.svg";
import classes from "./Button.module.scss";
import { ReactComponent as DetachIcon } from "../../../assets/icons/button-detach.svg";
import { ReactComponent as AddIcon } from "../../../assets/icons/button-add.svg";

const Button = (props) => {
  let buttonClasses = `${classes.button}`+ " " +`${props.classes}` ;
  switch (props.priority) {
    case "secondary":
      buttonClasses += " " + `${classes.button_secondary}`;
  }
  switch (props.state) {
    case "disabled":
      buttonClasses += " " + `${classes.button_disabled}`;
      break;
    case "error":
      buttonClasses += " " + `${classes.button_error}`;
  }
  switch (props.size) {
    case "big":
      buttonClasses += " " + `${classes.button_big}`;
      break;
    case "fab":
      buttonClasses += " " + `${classes.button_fab}`;
      break;
    case "switch":
      buttonClasses += " " + `${classes.button_switch}`;
  }

  return (
    <button
      type={props.type || "button"}
      className={buttonClasses}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.variant === "service" && <ServiceIcon className={classes.icon} />}
      {props.variant === "detach" && <DetachIcon className={classes.icon} />}
      {props.variant === "add" && <AddIcon className={classes.icon} />}

      {props.children}
    </button>
  );
};

export default Button;
