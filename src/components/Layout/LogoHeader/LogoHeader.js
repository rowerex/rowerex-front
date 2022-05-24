import React from "react";
import classes from "./LogoHeader.module.scss";
import { ReactComponent as Logo } from "../../../assets/logo.svg";


const Header = () => {
  return (
    <header className={classes.header}>
      <Logo className={classes.logo}/>
    </header>
  );
};

export default Header;
