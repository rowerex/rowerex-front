import React from "react";
import {ReactComponent as BellActive} from "../../../assets/icons/bell-active-big.svg";
import {ReactComponent as BellInactive} from "../../../assets/icons/bell-inactive-big.svg";

import classes from "./HeaderBig.module.scss";

const Header = (props) => {
  let description = "No active reminders";
  let icon = <BellInactive className={classes.icon}/>;
  let wrapperClass = props.color === "black" ? classes.wrapper_black : classes.wrapper;

  if (props.reminders > 1) {
    description = `${props.reminders} active reminders`;
    icon = <BellActive className={classes.icon}/>;
  } else if (props.reminders === 1) {
    description = `${props.reminders} active reminder`;
    icon = <BellActive className={classes.icon}/>;
  }

  return (
    <header className={classes.header}>
      <div className={wrapperClass}>
        <h2 className={classes.title}>{props.children}</h2>
        <p className={classes.titleLabel}>{props.label}</p>
        <div className={classes.container}>
          {icon}
          <p className={classes.description}>{description}</p>
        </div>
      </div>
      <img className={classes.image} src={props.image} alt={props.alt}/>
    </header>
  );
};

export default Header;
