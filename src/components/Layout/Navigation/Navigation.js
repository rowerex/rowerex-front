import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as BikeIcon } from "../../../assets/icons/menu-bike.svg";
import { ReactComponent as PartIcon } from "../../../assets/icons/menu-part.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/menu-user.svg";

import classes from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <nav>
      <ul className={classes.Navigation}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${classes.navigationItem_active}`
              : `${classes.navigationItem}`
          }
          to="/"
        >
          <BikeIcon />
          <p>Bikes</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${classes.navigationItem_active}`
              : `${classes.navigationItem}`
          }
          to="/parts"
        >
          <PartIcon /> <p>Parts</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${classes.navigationItem_active}`
              : `${classes.navigationItem}`
          }
          to="/user"
        >
          <UserIcon />
          <p>User</p>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
