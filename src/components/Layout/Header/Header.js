import React from "react";
import classes from "./Header.module.scss";

const Header = (props) => {
  return (
    <>
      <header>
        <h1 className={classes.header}>{props.children}</h1>
        <img className={classes.image} src={props.image} alt={props.alt} />
      </header>
      <div className={classes.image}></div>
    </>
  );
};

export default Header;
