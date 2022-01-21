import React from "react";
import classes from "./Header.module.scss";

const Header = (props) => {
  return (
    <>
      <header>
        <h1 className={classes.header}>{props.children}</h1>
      </header>
      <div className={classes.image}>
        <img src={props.image} alt={props.alt} />
      </div>
    </>
  );
};

export default Header;
