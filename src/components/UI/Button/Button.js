import React from "react";
import { ReactComponent as ServiceIcon } from "../../../assets/icons/button-service.svg";
import classes from "./Button.module.scss";
import { ReactComponent as DetachIcon } from "../../../assets/icons/button-detach.svg";

const Button = (props) => {
  let buttonClasses = `${classes.button}`;
  switch (props.priority) {
    case "secondary":
      buttonClasses += " " + `${classes.button_secondary}`;
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
      {props.children}
    </button>
  );
};

export default Button;
