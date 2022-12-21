import React from "react";
import { ReactComponent as ServiceIcon } from "../../../assets/icons/button-service.svg";
import { ReactComponent as DetachIcon } from "../../../assets/icons/button-link.svg";
import { ReactComponent as AddIcon } from "../../../assets/icons/button-add.svg";
import { ReactComponent as RetireIcon } from "../../../assets/icons/button-retire.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";

import classes from "./Button.module.scss";

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
    case "big-inline":
      buttonClasses += " " + `${classes.button_bigInline}`;
      break;
    case "fab":
      buttonClasses += " " + `${classes.button_fab}`;
      break;
    case "icon":
      buttonClasses += " " + `${classes.button_icon}`;

  }

  return (
    <button
      type={props.type || "button"}
      className={buttonClasses}
      onClick={props.state === 'disabled' ? () => {} : props.onClick}
      disabled={props.state === 'disabled'}
    >
      {props.variant === "service" && <ServiceIcon className={classes.icon} />}
      {props.variant === "detach" && <DetachIcon className={classes.icon} />}
      {props.variant === "add" && <AddIcon className={classes.icon} />}
      {props.variant === "retire" && <RetireIcon className={classes.icon} />}
      {props.variant === "close" && <CloseIcon />}


      {props.children}
    </button>
  );
};

export default Button;
