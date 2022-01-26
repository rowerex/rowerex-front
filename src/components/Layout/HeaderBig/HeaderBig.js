import React from "react";
import classes from "./HeaderBig.module.scss";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <p className={classes.titleLabel}>{props.label}</p>
        <h2 className={classes.title}>{props.children}</h2>
        <p className={classes.description}>{props.description}</p>
      </div>
      <img className={classes.image} src={props.image} alt={props.alt} />
    </header>
  );
};

export default Header;
