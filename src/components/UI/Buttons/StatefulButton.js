import React, {useState} from "react";
import { ReactComponent as ServiceIcon } from "../../../assets/icons/button-service.svg";
import { ReactComponent as DetachIcon } from "../../../assets/icons/button-link.svg";
import { ReactComponent as AddIcon } from "../../../assets/icons/button-add.svg";
import { ReactComponent as RetireIcon } from "../../../assets/icons/button-retire.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { ReactComponent as InProgressAction } from "../../../assets/icons/button-in-progress.svg";

import classes from "./Button.module.scss";

const StatefulButton = (props) => {
  let [ready, setReady] = useState(true);
  let [inProgress, setInProgress] = useState(false);
  let [error, setError] = useState(false);
  let [success, setSuccess] = useState(false);
  let [disabled, setDisabled] = useState(false);

  let buttonClasses = `${classes.button}`+ " " +`${props.classes}` ;

  if (disabled) {
      buttonClasses += " " + `${classes.button_disabled}`;
  }
  switch (props.size) {
    case "big":
      buttonClasses += " " + `${classes.button_big}`;
      break;
    case "fab":
      buttonClasses += " " + `${classes.button_fab}`;
      break;
    case "icon":
      buttonClasses += " " + `${classes.button_icon}`;

  }

  const action = () => {
    setInProgress(true);
    setReady(false);
    props.onClick()
        .then(() => {
          setInProgress(false);
          setSuccess(true);
          setDisabled(props.disableOnSuccess);
          setReady(!props.disableOnSuccess)
        });
  }

  return (
    <button
      type={props.type || "button"}
      className={buttonClasses}
      onClick={!ready ? () => {} : () => {action()}}
      disabled={disabled}
    >
      {ready && props.variant === "service" && <ServiceIcon className={classes.icon} />}
      {ready && props.variant === "detach" && <DetachIcon />}
      {ready && props.variant === "add" && <AddIcon className={classes.icon} />}
      {ready && props.variant === "retire" && <RetireIcon className={classes.icon} />}
      {ready && props.variant === "close" && <CloseIcon />}

      {inProgress && <InProgressAction className={classes.iconRotating + " " + classes.icon} />}
      {success && !inProgress && '✔ '}
      {error && 'error!'}
      {success ? props.successLabel : props.children}
    </button>
  );
};

StatefulButton.defaultProps = {
  disableOnSuccess: true
};

export default StatefulButton;
