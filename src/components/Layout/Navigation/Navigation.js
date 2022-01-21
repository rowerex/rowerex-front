import React from "react";
import { ReactComponent as TaskIcon } from "../../../assets/icons/taskIcon.svg";
import { ReactComponent as BikeIcon } from "../../../assets/icons/bikeIcon.svg";
import { ReactComponent as PartIcon } from "../../../assets/icons/partIcon.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/userIcon.svg";

import classes from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <div>
      <ul className={classes.Navigation}>
        <div className={classes.navigationItem}>
          <TaskIcon />
          <p className={classes.navigationItem__label}>Tasks</p>
        </div>
        <div
          className={`${classes.navigationItem_active} ${classes.navigationItem}`}
        >
          <BikeIcon />
          <p className={classes.navigationItem__label}>Bikes</p>
        </div>
        <div className={classes.navigationItem}>
          <PartIcon />
          <p className={classes.navigationItem__label}>Parts</p>
        </div>
        <div className={classes.navigationItem}>
          <UserIcon />
          <p className={classes.navigationItem__label}>User</p>
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
